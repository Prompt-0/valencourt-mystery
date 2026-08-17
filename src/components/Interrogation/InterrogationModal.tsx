import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import type { SuspectDialogueTopic, ClueId } from '../../types/game';
import {
  X,
  MessageSquare,
  AlertTriangle,
  Scale,
  ShieldAlert,
} from 'lucide-react';

export const InterrogationModal: React.FC = () => {
  const {
    interrogatingSuspect,
    openInterrogation,
    evidence,
    discoveredClueIds,
    presentEvidence,
    askQuestion,
    suspects,
  } = useGame();

  const [activeTopic, setActiveTopic] = useState<SuspectDialogueTopic | null>(null);
  const [isPresentingEvidence, setIsPresentingEvidence] = useState(false);
  const [selectedClueToPresent, setSelectedClueToPresent] = useState<ClueId | null>(null);
  const [dialogueHistory, setDialogueHistory] = useState<
    { sender: 'detective' | 'suspect'; text: string; isContradiction?: boolean }[]
  >([]);

  if (!interrogatingSuspect) return null;

  const currentSuspect = suspects.find((s) => s.id === interrogatingSuspect.id) || interrogatingSuspect;

  const handleAsk = (topic: SuspectDialogueTopic) => {
    setActiveTopic(topic);
    askQuestion(currentSuspect.id, topic.id);

    const isBroken = currentSuspect.brokenContradictions.includes(topic.id);
    const responseText = isBroken && topic.contradictionSuccessResponse
      ? topic.contradictionSuccessResponse
      : topic.response;

    setDialogueHistory((prev) => [
      ...prev,
      { sender: 'detective', text: topic.question },
      { sender: 'suspect', text: responseText, isContradiction: isBroken },
    ]);
  };

  const handlePresentEvidenceConfirm = () => {
    if (!activeTopic || !selectedClueToPresent) return;

    const success = presentEvidence(currentSuspect.id, activeTopic.id, selectedClueToPresent);
    const clue = evidence.find((c) => c.id === selectedClueToPresent);

    if (success) {
      setDialogueHistory((prev) => [
        ...prev,
        {
          sender: 'detective',
          text: `[Presents Evidence: ${clue?.name}] You claim you were elsewhere, but this evidence proves otherwise!`,
        },
        {
          sender: 'suspect',
          text: activeTopic.contradictionSuccessResponse || '...(Caught in a lie!)...',
          isContradiction: true,
        },
      ]);
    } else {
      setDialogueHistory((prev) => [
        ...prev,
        {
          sender: 'detective',
          text: `[Presents Evidence: ${clue?.name}] What do you have to say about this?`,
        },
        {
          sender: 'suspect',
          text: '...(They look puzzled)... "Detective, that has nothing to do with what I just stated."',
        },
      ]);
    }

    setIsPresentingEvidence(false);
    setSelectedClueToPresent(null);
  };

  const availableTopics = currentSuspect.dialogueTopics.filter((t) => {
    if (t.unlockedByDefault) return true;
    if (t.requiresClueId && discoveredClueIds.includes(t.requiresClueId)) return true;
    return false;
  });

  const discoveredEvidenceList = evidence.filter((c) => discoveredClueIds.includes(c.id));

  return (
    <div className="modal-backdrop" onClick={() => openInterrogation(null)}>
      <div
        className="interrogation-window animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Suspect Portrait & Psychology Panel */}
        <div className="interrogation-portrait-panel">
          <img
            src={currentSuspect.portrait}
            alt={currentSuspect.name}
            className="interrogation-portrait"
          />

          <h3 style={{ fontSize: '20px', color: '#f3e5ab', marginBottom: '2px' }}>
            {currentSuspect.name}
          </h3>
          <div style={{ fontSize: '12px', color: '#9ba1b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
            {currentSuspect.role}
          </div>

          <div style={{ width: '100%', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ color: '#d4af37' }}>Psychological Composure</span>
              <span style={{ color: currentSuspect.composure <= 0 ? '#ff4d4d' : '#f3e5ab', fontWeight: 700 }}>
                {currentSuspect.composure}%
              </span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#222', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${currentSuspect.composure}%`,
                  background: currentSuspect.composure <= 0 ? '#8b1e1e' : 'linear-gradient(90deg, #d4af37, #50c878)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          <div style={{ fontSize: '13px', color: '#8891a4', textAlign: 'left', lineHeight: '1.4', background: '#12141c', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)', width: '100%' }}>
            <strong style={{ color: '#d4af37' }}>Alibi Statement: </strong>
            "{currentSuspect.initialAlibi}"
          </div>

          {currentSuspect.isConfessed && (
            <div
              style={{
                marginTop: '14px',
                padding: '8px 12px',
                background: '#8b1e1e',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <ShieldAlert size={16} /> DEFENSES BROKEN / CONFESSED
            </div>
          )}
        </div>

        {/* Right Dialogue & Interaction Feed */}
        <div className="interrogation-dialogue-panel">
          <div
            style={{
              padding: '14px 20px',
              background: '#0d0f15',
              borderBottom: '1px solid var(--border-gold)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} color="#d4af37" />
              <span style={{ fontFamily: 'var(--font-serif)', color: '#f3e5ab', fontSize: '16px' }}>
                Formal Interrogation Record
              </span>
            </div>

            <button
              onClick={() => openInterrogation(null)}
              style={{ background: 'transparent', color: '#aaa', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Dialogue History Stream */}
          <div className="interrogation-feed">
            {dialogueHistory.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#6e7687', marginTop: '40px', fontStyle: 'italic' }}>
                Select an interrogation topic below to begin questioning {currentSuspect.name}.
              </div>
            ) : (
              dialogueHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`dialogue-bubble ${item.sender}`}
                  style={{
                    background: item.isContradiction ? '#2b1a1a' : undefined,
                    borderRight: item.isContradiction ? '3px solid #ff4d4d' : undefined,
                  }}
                >
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#8d95a8', marginBottom: '4px', fontFamily: 'var(--font-sans)' }}>
                    {item.sender === 'detective' ? 'Detective Julian Vance' : currentSuspect.name}
                  </div>
                  {item.text}
                </div>
              ))
            )}
          </div>

          {/* Interrogation Controls */}
          <div className="interrogation-controls">
            {!isPresentingEvidence ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#d4af37', fontFamily: 'var(--font-serif)' }}>
                    Inquiry Topics:
                  </span>
                  {activeTopic?.isContradictionTrigger && !currentSuspect.brokenContradictions.includes(activeTopic.id) && (
                    <button
                      className="gothic-btn gothic-btn-danger"
                      style={{ padding: '5px 12px', fontSize: '11px' }}
                      onClick={() => setIsPresentingEvidence(true)}
                    >
                      <AlertTriangle size={14} />
                      <span>Present Contradictory Evidence</span>
                    </button>
                  )}
                </div>

                <div className="topics-list">
                  {availableTopics.map((topic) => (
                    <button
                      key={topic.id}
                      className="topic-btn"
                      onClick={() => handleAsk(topic)}
                    >
                      {topic.title}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Evidence Presentation Drawer */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffd700', fontSize: '13px' }}>
                    <AlertTriangle size={16} />
                    <strong>Select Evidence to Contradict "{activeTopic?.title}":</strong>
                  </div>
                  <button
                    onClick={() => setIsPresentingEvidence(false)}
                    style={{ background: 'transparent', color: '#aaa', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '10px' }}>
                  {discoveredEvidenceList.map((clue) => {
                    const isSelected = selectedClueToPresent === clue.id;
                    return (
                      <button
                        key={clue.id}
                        onClick={() => setSelectedClueToPresent(clue.id)}
                        style={{
                          padding: '6px 12px',
                          background: isSelected ? '#3b2f15' : '#171922',
                          border: `1px solid ${isSelected ? '#d4af37' : '#333'}`,
                          borderRadius: '4px',
                          color: isSelected ? '#ffd700' : '#cfd4e2',
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        {clue.name}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    className="gothic-btn"
                    onClick={() => setIsPresentingEvidence(false)}
                    style={{ padding: '6px 14px', fontSize: '12px' }}
                  >
                    Back
                  </button>
                  <button
                    className="gothic-btn gothic-btn-danger"
                    disabled={!selectedClueToPresent}
                    onClick={handlePresentEvidenceConfirm}
                    style={{ padding: '6px 14px', fontSize: '12px', opacity: selectedClueToPresent ? 1 : 0.5 }}
                  >
                    <Scale size={14} />
                    <span>Confront with Evidence</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
