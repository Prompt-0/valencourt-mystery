import type { DeductionRecipe } from '../types/game';

export const DEDUCTION_RECIPES: DeductionRecipe[] = [
  {
    id: 'deduction_toxic_rosewater',
    clueA: 'brandy_snifter',
    clueB: 'physician_satchel',
    title: 'The Sweetened Poison',
    conclusion: 'The lethal potassium cyanide in Arthur’s cognac was flavored with Rosewater Syrup—a signature masking agent found exclusively in Dr. Albright’s medical satchel!',
    unlockedClueId: 'cyanide_reagent_result',
    points: 25,
  },
  {
    id: 'deduction_locked_room_entry',
    clueA: 'dumbwaiter_secret_shaft',
    clueB: 'whale_oil_winch',
    title: 'The Subterranean Ingress',
    conclusion: 'The Study was not impenetrable! A concealed dumbwaiter shaft links the Wine Cellar directly to the panel behind Arthur’s clock, freshly hoisted between 01:00 AM and 02:00 AM.',
    unlockedClueId: 'muddy_work_boots',
    points: 20,
  },
  {
    id: 'deduction_false_time_of_death',
    clueA: 'shattered_watch',
    clueB: 'victim_body',
    title: 'The Staged Time of Death',
    conclusion: 'Arthur was already in advanced rigor mortis by 02:30 AM, proving death occurred near 01:00 AM from the poisoned decanter. The pocket watch was smashed at 02:14 by Silas in a panicked robbery!',
    points: 25,
  },
  {
    id: 'deduction_eleanor_conspiracy',
    clueA: 'half_burned_letter',
    clueB: 'soot_stained_robe',
    title: 'Eleanor’s Hearthside Coverup',
    conclusion: 'Lady Eleanor was not asleep in bed; she crept downstairs at 01:30 AM to burn incriminating letters to Albright after learning of Arthur’s imminent disinheritance!',
    points: 20,
  },
  {
    id: 'deduction_dying_message_alb',
    clueA: 'torn_cipher',
    clueB: 'physician_satchel',
    title: 'The Victim’s Dying Accusation',
    conclusion: 'Arthur’s dying scrawl ("ALB... calix amicus" / "the cup of a friend") was not occult gibberish, but an explicit accusation of Dr. Julian Albright spiking his nightcap cup!',
    points: 30,
  },
  {
    id: 'deduction_true_motive',
    clueA: 'secret_amended_will',
    clueB: 'half_burned_letter',
    title: 'The Double Ruin Motive',
    conclusion: 'Dr. Albright faced total ruin: Arthur threatened to revoke his medical license and cut Eleanor out of the millions in estate wealth that very night.',
    points: 25,
  },
];
