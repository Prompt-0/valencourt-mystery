export interface AstronomicalDialOption {
  value: string;
  label: string;
  symbol: string;
}

export interface AstronomicalPuzzleState {
  lunarPhase: string;
  zodiacSign: string;
  solsticeSeason: string;
  planetarySigil: string;
}

export const ASTRONOMICAL_DIALS = {
  lunarPhase: [
    { value: 'new_moon', label: 'New Moon', symbol: '🌑' },
    { value: 'crescent', label: 'Waxing Crescent', symbol: '🌒' },
    { value: 'full_moon', label: 'Full Moon', symbol: '🌕' },
    { value: 'blood_moon', label: 'Eclipse / Blood Moon', symbol: '🌘' },
  ],
  zodiacSign: [
    { value: 'aries', label: 'Aries (The Ram)', symbol: '♈' },
    { value: 'scorpio', label: 'Scorpio (The Scorpion)', symbol: '♏' },
    { value: 'sagittarius', label: 'Sagittarius (The Archer)', symbol: '♐' },
    { value: 'aquarius', label: 'Aquarius (The Waterbearer)', symbol: '♒' },
  ],
  solsticeSeason: [
    { value: 'vernal_equinox', label: 'Vernal Equinox (Spring)', symbol: '🌱' },
    { value: 'summer_solstice', label: 'Summer Solstice (Sun Peak)', symbol: '☀️' },
    { value: 'autumn_equinox', label: 'Autumn Equinox (Harvest)', symbol: '🍂' },
    { value: 'winter_solstice', label: 'Winter Solstice (Midwinter)', symbol: '❄️' },
  ],
  planetarySigil: [
    { value: 'mars', label: 'Mars (War)', symbol: '♂' },
    { value: 'jupiter', label: 'Jupiter (Thunder)', symbol: '♃' },
    { value: 'saturn', label: 'Saturn (Time / Chronos)', symbol: '♄' },
    { value: 'mercury', label: 'Mercury (Hermes)', symbol: '☿' },
  ],
};

export const ASTRONOMICAL_SOLUTION: AstronomicalPuzzleState = {
  lunarPhase: 'blood_moon',
  zodiacSign: 'sagittarius',
  solsticeSeason: 'winter_solstice',
  planetarySigil: 'saturn',
};

export interface ChemicalReagent {
  id: string;
  name: string;
  formula: string;
  color: string;
  targetReaction: string;
  notes: string;
}

export const CHEMICAL_REAGENTS: ChemicalReagent[] = [
  {
    id: 'ferric_chloride',
    name: 'Ferric Chloride + Ferrous Sulfate',
    formula: 'FeCl3 + FeSO4',
    color: '#8b4513',
    targetReaction: 'Prussian Blue precipitate indicating Potassium Cyanide salts',
    notes: 'Standard Prussian Blue test for hydrocyanic and cyanide ions.',
  },
  {
    id: 'silver_nitrate',
    name: 'Silver Nitrate Solution',
    formula: 'AgNO3',
    color: '#c0c0c0',
    targetReaction: 'Milky white curd precipitate indicating Halides',
    notes: 'Tests for common chlorides and inorganic mineral contaminants.',
  },
  {
    id: 'iodine_indicator',
    name: 'Potassium Triiodide Reagent',
    formula: 'KI3',
    color: '#d2691e',
    targetReaction: 'Deep amber-brown shift indicating Alkaloid base (Atropine / Belladonna)',
    notes: 'General reagent for plant alkaloids and belladonna derivatives.',
  },
];

export interface CipherLetterMap {
  [cipherChar: string]: string;
}

export const CIPHER_TEXT_ORIGINAL = "ABC DFE GHIJKLM NOPQ RS TLK UVWXY... ZAB CDE FGH IJKLMNOP";
export const CIPHER_DYING_MESSAGE = "A L B... NON ME OCCIDIT NOCTIS UMBRA SED CALIX AMICUS";
