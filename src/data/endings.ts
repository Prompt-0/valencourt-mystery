import type { EndingResult } from '../types/game';

export const ENDING_MASTER_TRUTH: EndingResult = {
  id: 'master_truth',
  title: 'The Truth of Valencourt Manor',
  rank: 'S+ Master Inquisitor',
  accuracyScore: 100,
  narrativeText: `As thunder crashes against the stone spires of Valencourt Manor, you step forward in the grand Drawing Room and lay out the undeniable chain of deductive truth.

Lord Arthur Valencourt was not slain by an intruder in the dead of night, nor by an ancient occult curse. He was poisoned at midnight by his trusted physician, Dr. Julian Albright, who dissolved potassium cyanide sweetened with his dispensary’s private rosewater syrup into Arthur’s evening digestif decanter.

Arthur, facing sudden paralysis in his locked study, managed to turn the heavy deadbolt from within, desperately scrawled the initials "ALB..." across the Codex Noctis manuscript, and collapsed across his desk.

The broken pocket watch stopped at 02:14 was not the time of death, but the mark of Silas Vance’s panicked robbery when he scaled the subterranean dumbwaiter to confront his uncle and found only a corpse. Lady Eleanor’s midnight excursion to the hearth was merely a desperate attempt to incinerate the correspondence that had provoked Arthur’s rage.

Faced with the forensic toxicology proof and the reconstructed timeline, Dr. Albright breaks down in tears, confessing in full before the arriving constabulary.`,
  fateOfSuspects: [
    {
      name: 'Dr. Julian Albright',
      outcome: 'Taken into custody by Scotland Yard for premeditated murder. He signs a full confession, exonerating Eleanor of complicity.',
    },
    {
      name: 'Lady Eleanor Valencourt',
      outcome: 'Grieves the tragic spiral of events. With the amended will discovered, she receives a modest living annuity while the antiquities are donated to the public trust.',
    },
    {
      name: 'Silas Vance',
      outcome: 'Cleared of murder charges. He receives a probationary fine for burglary and uses his mechanical talents to start an honest engineering firm.',
    },
    {
      name: 'Mlle. Cecile Dubois',
      outcome: 'Successfully repatriates the stolen French cathedral relics with official diplomatic recognition.',
    },
    {
      name: 'Moritz Graves',
      outcome: 'Maintains the Valencourt estate as its rightful steward, his lifelong secret finally laid to rest with quiet dignity.',
    },
  ],
};

export const ENDING_WRONG_SILAS: EndingResult = {
  id: 'wrong_accused',
  title: 'The Scapegoat’s Condemnation',
  rank: 'B- Flawed Deduction',
  accuracyScore: 45,
  narrativeText: `You point the finger of accusation at young Silas Vance. His muddy boots, custom lockpicks, and the shattered pocket watch found at 02:14 seem like an airtight case of violent patricide.

Silas screams his innocence as the local constables drag him away in iron manacles. But weeks later, independent toxicology tests from London reveal the cyanide and rosewater traces you overlooked.

Dr. Albright and Lady Eleanor quietly board a steamship for South America, taking the remaining family fortune with them, while an innocent man languishes behind bars.`,
  fateOfSuspects: [
    {
      name: 'Silas Vance',
      outcome: 'Wrongfully convicted of murder and sentenced to life imprisonment at Dartmoor.',
    },
    {
      name: 'Dr. Julian Albright',
      outcome: 'Escapes justice and flees the country with Eleanor under assumed identities.',
    },
    {
      name: 'Lady Eleanor Valencourt',
      outcome: 'Liquidates the remaining estate assets and vanishes abroad, haunted by guilt.',
    },
  ],
};

export const ENDING_WRONG_ELEANOR: EndingResult = {
  id: 'wrong_accused',
  title: 'The Widow’s Shadow',
  rank: 'B- Flawed Deduction',
  accuracyScore: 50,
  narrativeText: `You accuse Lady Eleanor of murdering her husband using botanical belladonna extract from the Conservatory and burning her letters in the fireplace.

Though Eleanor admits to her affair, she fiercely denies poisoning Arthur’s cognac. During the trial, forensic experts prove that belladonna was never the lethal agent, creating reasonable doubt and resulting in a hung jury.

Overcome with remorse for allowing Eleanor to take the blame, Dr. Albright takes his own life in his clinic, leaving behind an ambiguous suicide note that leaves the Valencourt mystery forever shrouded in doubt.`,
  fateOfSuspects: [
    {
      name: 'Lady Eleanor Valencourt',
      outcome: 'Acquitted after an agonizing public trial, but socially ostracized and penniless.',
    },
    {
      name: 'Dr. Julian Albright',
      outcome: 'Dies of poisoning in his study before justice can properly interrogate him.',
    },
    {
      name: 'The Valencourt Mystery',
      outcome: 'Becomes a sensationalized cold case in Victorian tabloids, never truly resolved.',
    },
  ],
};

export const ENDING_BOTCHED: EndingResult = {
  id: 'botched_case',
  title: 'The Unsolved Enigma',
  rank: 'F- Tragic Miscarriage',
  accuracyScore: 20,
  narrativeText: `Your deductions lack forensic evidence and fail to reconcile the locked-room paradox. The accusations crumble under the simplest scrutiny from the magistrates.

With no coherent theory presented by morning, the suspects depart into the fog. The death of Lord Arthur Valencourt is officially ruled an "Unexplained Accidental Poisoning," and your reputation as a master detective is severely tarnished.`,
  fateOfSuspects: [
    {
      name: 'The Case',
      outcome: 'Archived as an unsolved mystery in Scotland Yard’s Black Museum.',
    },
  ],
};
