import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import type { ClueId } from '../../types/game';
import { DEDUCTION_RECIPES } from '../../data/deductions';
import { Sparkles, Link2, CheckCircle2, HelpCircle } from 'lucide-react';

export const MindPalaceTab: React.FC = () => {
  const {
    evidence,
    discoveredClueIds,
    checkMindPalaceDeduction,
    deductionsMade,
  } = useGame();

  const [selectedClueA, setSelectedClueA] = useState<ClueId | null>(null);
  const [selectedClueB, setSelectedClueB] = useState<ClueId | null>(null);
  const [deductionFeedback, setDeductionFeedback] = useState<string | null>(null);

  const discoveredClues = evidence.filter((c) => discoveredClueIds.includes(c.id));

  const handleSelectClue = (clueId: ClueId) => {
    setDeductionFeedback(null);
    if (!selectedClueA) {
      setSelectedClueA(clueId);
    } else if (selectedClueA === clueId) {
      setSelectedClueA(null);
    } else if (!selectedClueB) {
      setSelectedClueB(clueId);
    } else if (selectedClueB === clueId) {
      setSelectedClueB(null);
    } else {
      setSelectedClueB(clueId);
    }
  };

  const handleSynthesize = () => {
    if (!selectedClueA || !selectedClueB) return;
    const success = checkMindPalaceDeduction(selectedClueA, selectedClueB);
    if (success) {
      setDeductionFeedback('Breakthrough! A new deductive conclusion has been synthesized.');
      setSelectedClueA(null);
      setSelectedClueB(null);
    } else {
      setDeductionFeedback('No logical connection found between these two pieces of evidence.');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '18px', color: '#f3e5ab' }}>
            The Mind Palace (Evidence Pinboard)
          </h3>
          <p style={{ fontSize: '13px', color: '#8f96a6', fontFamily: 'var(--font-sans)' }}>
            Select any two pieces of evidence and synthesize them to unlock critical deductions and solve the locked room enigma.
          </p>
        </div>

        {/* Synthesis Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#d4af37', fontFamily: 'var(--font-serif)' }}>
            {selectedClueA && selectedClueB
              ? 'Ready to Synthesize Hypothesis'
              : selectedClueA
              ? 'Select 2nd Evidence Piece'
              : 'Select 2 Clues on the Pinboard'}
          </div>
          <button
            className={`gothic-btn ${selectedClueA && selectedClueB ? 'gothic-btn-gold' : ''}`}
            disabled={!selectedClueA || !selectedClueB}
            onClick={handleSynthesize}
            style={{ opacity: selectedClueA && selectedClueB ? 1 : 0.5 }}
          >
            <Sparkles size={16} />
            <span>Synthesize Clues</span>
          </button>
        </div>
      </div>

      {deductionFeedback && (
        <div
          style={{
            padding: '10px 16px',
            marginBottom: '16px',
            borderRadius: '4px',
            background: deductionFeedback.startsWith('Breakthrough') ? '#1e382b' : '#3d1c1c',
            border: `1px solid ${deductionFeedback.startsWith('Breakthrough') ? '#50c878' : '#ff4d4d'}`,
            color: '#fff',
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {deductionFeedback.startsWith('Breakthrough') ? <CheckCircle2 size={16} /> : <HelpCircle size={16} />}
          {deductionFeedback}
        </div>
      )}

      {/* Interactive Corkboard Pinboard */}
      <div className="corkboard-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '24px', overflowY: 'auto' }}>
        {discoveredClues.map((clue) => {
          const isSelected = selectedClueA === clue.id || selectedClueB === clue.id;
          return (
            <div
              key={clue.id}
              className={`pinboard-item ${isSelected ? 'selected' : ''}`}
              style={{
                position: 'relative',
                width: '210px',
                background: isSelected ? '#fffdf7' : '#f4ecd8',
              }}
              onClick={() => handleSelectClue(clue.id)}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#7a5a3a', fontWeight: 700, marginBottom: '4px' }}>
                {clue.category}
              </div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#2b1b11', marginBottom: '6px' }}>
                {clue.name}
              </div>
              <div style={{ fontSize: '12px', color: '#4a3828', lineHeight: '1.35' }}>
                {clue.summary.slice(0, 75)}...
              </div>
            </div>
          );
        })}
      </div>

      {/* Completed Deductions Ledger */}
      <div style={{ marginTop: '24px' }}>
        <h4 style={{ fontSize: '16px', color: '#f3e5ab', marginBottom: '12px' }}>
          Established Deductions ({deductionsMade.length}/{DEDUCTION_RECIPES.length})
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {DEDUCTION_RECIPES.map((recipe) => {
            const isCompleted = deductionsMade.includes(recipe.id);
            return (
              <div
                key={recipe.id}
                style={{
                  padding: '12px 18px',
                  background: isCompleted ? '#16231d' : '#12141c',
                  border: `1px solid ${isCompleted ? '#50c878' : 'var(--border-subtle)'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  opacity: isCompleted ? 1 : 0.6,
                }}
              >
                <div style={{ marginTop: '2px' }}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="#50c878" />
                  ) : (
                    <Link2 size={18} color="#666" />
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: isCompleted ? '#8cf5b8' : '#888', fontSize: '15px' }}>
                    {isCompleted ? recipe.title : '??? Undiscovered Deduction ???'}
                  </div>
                  <div style={{ fontSize: '13px', color: isCompleted ? '#d8fae5' : '#666', marginTop: '2px' }}>
                    {isCompleted
                      ? recipe.conclusion
                      : 'Connect corresponding evidence on the pinboard to unveil this conclusion.'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
