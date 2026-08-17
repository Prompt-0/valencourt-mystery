import type { Clue } from '../types/game';

export const INITIAL_EVIDENCE: Clue[] = [
  {
    id: 'victim_body',
    name: "Lord Arthur's Corpse",
    category: 'Forensic',
    summary: 'The victim is slumped over his mahogany desk. Faint almond scent on lips, petechial hemorrhaging, and a pinpoint puncture at the base of neck.',
    detailedInspection: `Lord Arthur Valencourt, 64. 
Time of death was initially estimated between 01:00 AM and 02:15 AM.
Forensic Examination Notes:
• Lips and breath carry a distinct odor of bitter almonds (cyanide/prussic acid).
• Eyes exhibit petechial hemorrhages consistent with rapid respiratory arrest.
• Rigor mortis is slightly advanced in the fingers, which still clutch a torn manuscript page.
• Small puncture mark at the nape of his neck—was it a needle injection, or did he collapse onto his fountain pen nib during asphyxiation?`,
    locationFound: 'The Locked Study',
    imageFallbackIcon: 'Skull',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['albright', 'eleanor'],
    isKeyEvidence: true,
    discovered: true,
    tags: ['Victim', 'Poison', 'Locked Room', 'Time of Death'],
  },
  {
    id: 'brandy_snifter',
    name: 'Tipped Brandy Snifter & Decanter',
    category: 'Forensic',
    summary: 'A crystal snifter knocked on its side on the desk. A puddle of dark amber cognac remains, mixed with a faint syrupy residue.',
    detailedInspection: `An 1898 vintage French cognac decanter and an overturned crystal glass.
• The bottom of the glass contains several droplets of dark liquid.
• Chemical testing (Toxicology Lab) reveals high concentrations of potassium cyanide dissolved with rosewater flavoring.
• Rosewater was known to be used exclusively by Dr. Albright to mask the acrid taste of tinctures in his private clinic.`,
    locationFound: 'The Locked Study',
    imageFallbackIcon: 'Wine',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['albright'],
    isKeyEvidence: true,
    discovered: true,
    tags: ['Murder Weapon', 'Chemical Residue', 'Rosewater', 'Cyanide'],
  },
  {
    id: 'shattered_watch',
    name: 'Shattered Gold Pocket Watch',
    category: 'Physical',
    summary: "Arthur's gold pocket watch with cracked crystal, stopped precisely at 02:14. Glass shards were found scattered outwardly.",
    detailedInspection: `A 24-karat gold Waltham pocket watch engraved with the Valencourt family crest.
• The glass crystal is severely fractured and the hands are locked at 02:14.
• Crucial Observation: The crystal was smashed with impact force, but the winding spring was wound tight. Shards were blown across the carpet, suggesting it was dropped or slammed by an intruder in panic rather than during a slow death.`,
    locationFound: 'The Locked Study Floor',
    imageFallbackIcon: 'Clock',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['silas'],
    isKeyEvidence: true,
    discovered: true,
    tags: ['Timeline', 'Physical Force', 'Staged Death'],
  },
  {
    id: 'brass_study_key',
    name: 'Heavy Brass Study Key',
    category: 'Physical',
    summary: 'Found lying on the interior desk. The solid oak door was locked with the deadbolt engaged from the inside.',
    detailedInspection: `An ornate heavy brass key.
• There is only one known copy of this key in the household.
• When the household broke open the study door at 02:30 AM after hearing no response, the iron bolt was found firmly locked from within.
• How did an assassin enter or leave without the key? Either they used an unknown passage or the poison was planted hours earlier!`,
    locationFound: 'The Locked Study Desk',
    imageFallbackIcon: 'Key',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['moritz', 'silas'],
    isKeyEvidence: true,
    discovered: true,
    tags: ['Locked Room', 'Security', 'Ingress/Egress'],
  },
  {
    id: 'torn_cipher',
    name: 'Blood-Stained Cipher Manuscript',
    category: 'Document',
    summary: 'A parchment page from the 14th-century Codex Noctis. In the margins, Arthur scrawled a cryptic message in his dying moments.',
    detailedInspection: `Ancient vellum inscribed with Latin and occult astronomical sigils.
In the bottom margin, written with trembling ink:
"A... L... B... [smudged] Non me occidit noctis umbra... sed calix amicus..."
(Translation: "Not the shadow of night kills me... but the cup of a friend...")
The initial letters "ALB" could point directly to Dr. Julian Albright!`,
    locationFound: 'Arthur’s Cold Hand',
    imageFallbackIcon: 'FileText',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['albright', 'cecile'],
    isKeyEvidence: true,
    discovered: true,
    tags: ['Dying Message', 'Cipher', 'Motive'],
  },
  {
    id: 'half_burned_letter',
    name: 'Charred Love Letter',
    category: 'Document',
    summary: 'Rescued from the Drawing Room hearth. Contains romantic correspondence between Lady Eleanor and an unnamed lover.',
    detailedInspection: `A half-incinerated fragment of scented stationery found in the Drawing Room fireplace grate:
"...if Arthur finds out before the new testament is filed, we are both ruined. He promised to expose your malpractice and leave me penniless. We must act tonight before the storm clears..."
Handwriting matches Lady Eleanor Valencourt!`,
    locationFound: 'The Drawing Room Fireplace',
    imageFallbackIcon: 'Flame',
    inspectableImage: '/images/drawing_room.jpg',
    relatedSuspects: ['eleanor', 'albright'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Motive', 'Conspiracy', 'Secret Affair', 'Extortion'],
  },
  {
    id: 'astronomical_lockbox',
    name: 'Astronomical Brass Safe',
    category: 'Physical',
    summary: 'A heavy brass chest on the library mantle with four interlocking celestial dials (Moon, Zodiac, Solstice, Planetary Sigil).',
    detailedInspection: `Lord Arthur was obsessed with Renaissance celestial mechanics.
This intricate lockbox requires aligning 4 astronomical dials in the correct configuration to trigger the spring release.
A note in Arthur’s Latin journal hints:
"When the Blood Moon aligns with the Archer, at Winter Solstice under Saturn's gaze, truth is unveiled."`,
    locationFound: 'The Antiquities Library',
    imageFallbackIcon: 'Lock',
    inspectableImage: '/images/antiquities_library.jpg',
    relatedSuspects: ['eleanor', 'cecile'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Puzzle', 'Secret Compartment', 'Will'],
  },
  {
    id: 'secret_amended_will',
    name: 'Amended Last Will & Testament',
    category: 'Document',
    summary: 'Discovered inside the astronomical lockbox. Signed and witnessed just yesterday, stripping Eleanor and Silas of all inheritance!',
    detailedInspection: `Legal document dated October 16, 1928:
"I, Lord Arthur Valencourt, revoke all prior testaments. To my wife Eleanor, having uncovered her unfaithfulness, I bequeath nothing save a single copper penny. To my rogue nephew Silas Vance, zero.
The entirety of the Valencourt estate, antiquities, and coastal manor shall pass to the Royal Antiquities Society of London..."`,
    locationFound: 'Inside Astronomical Safe',
    imageFallbackIcon: 'Scroll',
    inspectableImage: '/images/antiquities_library.jpg',
    relatedSuspects: ['eleanor', 'silas', 'albright'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Motive', 'Inheritance', 'Disinheritance'],
  },
  {
    id: 'physician_satchel',
    name: "Dr. Albright's Medical Kit",
    category: 'Forensic',
    summary: "Found in Dr. Albright's guest room. A glass bottle of Rosewater tincture and an empty vial with Potassium Cyanide residue.",
    detailedInspection: `Dr. Albright's black leather Gladstone bag.
Inside:
• Standard surgical instruments, morphine ampoules, and laudanum.
• A small brown glass dropper bottle labeled "Essentia Rosae" (Rosewater Syrup).
• A glass vial labeled "Kalium Cyanatum" (Potassium Cyanide) with crystal residue on the rim, 90% empty! Albright claims it was for euthanizing beetle specimens in his entomology hobby.`,
    locationFound: 'The Drawing Room / Guest Satchel',
    imageFallbackIcon: 'Briefcase',
    inspectableImage: '/images/portrait_albright.jpg',
    relatedSuspects: ['albright'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Poison Supply', 'Direct Evidence', 'Medical Malpractice'],
  },
  {
    id: 'cyanide_reagent_result',
    name: 'Toxicology Report: Prussian Blue Reaction',
    category: 'Forensic',
    summary: 'Chemical testing confirmed pure Potassium Cyanide masked with concentrated Rosewater Syrup in the victim’s brandy.',
    detailedInspection: `Laboratory Reagent Test Results:
1. Ferric Chloride + Ferrous Sulfate test yielded an intense Prussian Blue precipitate, indicating Lethal Potassium Cyanide.
2. Odor Profile & Gas Chromatography confirm Rosewater masking agent matching Dr. Albright's dispensary stock.
3. Rapid lethality: Death occurred within 10–15 minutes of ingestion.`,
    locationFound: 'Toxicology Mini-Lab',
    imageFallbackIcon: 'FlaskConical',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['albright'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Forensic Proof', 'Chemical Match'],
  },
  {
    id: 'soot_stained_robe',
    name: "Eleanor's Soot-Stained Silk Robe",
    category: 'Physical',
    summary: "The hem of Lady Eleanor's black silk dressing gown has fresh chimney soot, matching the Drawing Room fireplace.",
    detailedInspection: `Fine black silk mourning dressing gown.
The hem and cuffs carry fresh wood ash and chimney soot.
Contradicts her claim that she remained asleep in her bedroom with laudanum all night from 11:30 PM until morning!`,
    locationFound: 'Lady Eleanor’s Wardrobe',
    imageFallbackIcon: 'Shirt',
    inspectableImage: '/images/portrait_eleanor.jpg',
    relatedSuspects: ['eleanor'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Alibi Breaker', 'Physical Evidence'],
  },
  {
    id: 'whale_oil_winch',
    name: 'Freshly Oiled Dumbwaiter Winch',
    category: 'Physical',
    summary: 'The manual dumbwaiter winch in the Wine Cellar was recently lubricated with Moritz’s rare imported whale oil.',
    detailedInspection: `An ancient heavy-duty dumbwaiter hoist connecting the subterranean wine cellar directly to the wood paneling inside the Study.
• The gears have fresh grease that smells of spermaceti whale oil—the exact oil Moritz Graves uses for maintaining manor clocks.
• The cable shows fresh strain marks indicating someone (or something) was hoisted up between 01:00 AM and 02:00 AM!`,
    locationFound: 'The Wine Cellar',
    imageFallbackIcon: 'Wrench',
    inspectableImage: '/images/wine_cellar.jpg',
    relatedSuspects: ['moritz', 'silas'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Secret Ingress', 'Mechanical Passage', 'Locked Room Solution'],
  },
  {
    id: 'blue_velvet_thread',
    name: 'Torn Blue Velvet Thread',
    category: 'Physical',
    summary: 'Found caught in the hidden bookshelf hinge between the Library and the Study. Matches Cecile Dubois’s coat.',
    detailedInspection: `A tiny tuft of royal blue velvet fibers snagged on the iron catch of the revolving bookshelf mechanism.
Under microscopic inspection, the weave matches the cuff of Mademoiselle Cecile Dubois’s imported Parisian velvet jacket.
Proves Cecile secretly entered Arthur's private study during the storm!`,
    locationFound: 'Library Secret Hinge',
    imageFallbackIcon: 'Scissors',
    inspectableImage: '/images/antiquities_library.jpg',
    relatedSuspects: ['cecile'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Secret Passage', 'Trespassing', 'Burglary'],
  },
  {
    id: 'muddy_work_boots',
    name: "Silas's Salt-Stained Work Boots",
    category: 'Physical',
    summary: 'Muddy boots hidden behind wine casks. The coastal clay and sea gravel match the boathouse trail.',
    detailedInspection: `Heavy leather boots caked with wet red clay and sea sand.
The tread pattern matches the wet footprints leading from the cellar grate to the dumbwaiter shaft.
Silas lied about only arriving at the front gates at 03:00 AM—he snuck in through the cellar hours earlier!`,
    locationFound: 'Behind Cellar Wine Casks',
    imageFallbackIcon: 'Footprints',
    inspectableImage: '/images/wine_cellar.jpg',
    relatedSuspects: ['silas'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Alibi Breaker', 'Footprints', 'Cellar Ingress'],
  },
  {
    id: 'boathouse_lockpick',
    name: 'Precision Mechanical Lockpicks',
    category: 'Physical',
    summary: 'Found in Silas’s coat pocket. Custom tempered steel tools designed for heavy Victorian lever locks.',
    detailedInspection: `A set of custom-machined steel tension wrenches and lockpicks crafted by an experienced mechanical engineer.
Silas admitted to using them on the cellar storm doors, but claims he never harmed his uncle.`,
    locationFound: 'Silas’s Jacket',
    imageFallbackIcon: 'KeyRound',
    inspectableImage: '/images/portrait_silas.jpg',
    relatedSuspects: ['silas'],
    isKeyEvidence: false,
    discovered: false,
    tags: ['Burglar Tools', 'Engineering'],
  },
  {
    id: 'belladonna_clippings',
    name: 'Pruned Belladonna Stems',
    category: 'Forensic',
    summary: 'Freshly cut stems of Atropa Belladonna in the Conservatory. However, chemical tests show Arthur did NOT die of belladonna.',
    detailedInspection: `Deadly nightshade clippings found in the Conservatory rubbish bin.
While Eleanor spent hours tending to poisonous botanicals, toxicology confirms the lethal agent was swift cyanide, NOT slow belladonna alkaloid poisoning.
A red herring indicating Eleanor might have contemplated poison, but someone beat her to the deed!`,
    locationFound: 'The Grand Conservatory',
    imageFallbackIcon: 'Flower2',
    inspectableImage: '/images/grand_conservatory.jpg',
    relatedSuspects: ['eleanor'],
    isKeyEvidence: false,
    discovered: false,
    tags: ['Red Herring', 'Botanical Poison'],
  },
  {
    id: 'dumbwaiter_secret_shaft',
    name: 'Study Secret Dumbwaiter Hatch',
    category: 'Physical',
    summary: 'A concealed wood-paneled dumbwaiter hatch behind the study grandfather clock, big enough for a slender man or mechanical hoist.',
    detailedInspection: `Behind the grandfather clock lies a 2x2 foot panel opening into the vertical service shaft down to the wine cellar.
The latch is unbolted. Dust has been disturbed.
This explains how Silas reached the locked study without the door key, and found Arthur already slumped over his desk!`,
    locationFound: 'Behind Study Clock',
    imageFallbackIcon: 'DoorClosed',
    inspectableImage: '/images/locked_study.jpg',
    relatedSuspects: ['silas', 'moritz'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Locked Room Secret', 'Passage'],
  },
  {
    id: 'arthurs_latin_journal',
    name: "Arthur's Astrological Journal",
    category: 'Document',
    summary: 'Contains the cipher lock combination for the library safe: Blood Moon, Sagittarius (Archer), Winter Solstice, Saturn.',
    detailedInspection: `Lord Arthur's personal esoteric diary:
"Let none open the chest of my true will except he who knows the celestial alignment:
Dial 1 (Lunar): Eclipse / Blood Moon
Dial 2 (Zodiac): Sagittarius (The Centaur Archer)
Dial 3 (Season): Winter Solstice (Dec 21)
Dial 4 (Planetary): Saturn (Chronos)"`,
    locationFound: 'The Antiquities Library Desk',
    imageFallbackIcon: 'BookOpen',
    inspectableImage: '/images/antiquities_library.jpg',
    relatedSuspects: ['eleanor', 'cecile'],
    isKeyEvidence: true,
    discovered: false,
    tags: ['Safe Code', 'Journal', 'Clues'],
  },
];
