import type { Challenge } from '../types/challenge';

export const CURATED_CHALLENGES: Challenge[] = [
  // ==========================================
  // SKILL 1: MENTAL MATH & LOGIC (1 to 6)
  // ==========================================
  {
    id: 'mml-01',
    dayNumber: 1,
    skillId: 'mental-math-logic',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'The Market Woman’s Change',
      yo: 'Àṣírí Ṣẹ́ńjì Ìyá Oníṣòwò',
      pcm: 'Mama Ngozi Balance Calculation',
    },
    scenario: {
      en: 'You bought 3 exercise books at ₦350 each from Mama Ngozi. You handed her a ₦2,000 note.',
      yo: 'O ra ìwé kíkọ mẹ́ta ní ₦350 kọ̀ọ̀kan lọ́wọ́ Mama Ngozi. O fún un ní owó ₦2,000.',
      pcm: 'You buy 3 notebooks at ₦350 each from Mama Ngozi shop. You give am ₦2,000 note.',
    },
    question: {
      en: 'How much change should Mama Ngozi give you back?',
      yo: 'Èló ni ṣẹ́ńjì tí Mama Ngozi gbọ́dọ̀ dá padà fún ọ?',
      pcm: 'How much change Mama Ngozi suppose give you back?',
    },
    options: [
      {
        id: 'opt-1a',
        text: { en: '₦850', yo: '₦850', pcm: '₦850' },
        isCorrect: false,
        explanation: {
          en: 'Close, but 3 x ₦350 = ₦1,050. ₦2,000 - ₦1,050 is ₦950.',
          yo: 'O sunmọ́ ọn, ṣùgbọ́n 3 x ₦350 jẹ́ ₦1,050. ₦2,000 - ₦1,050 jẹ́ ₦950.',
          pcm: 'You try, but 3 x ₦350 na ₦1,050. When you remove am from ₦2,000, e remain ₦950.',
        },
      },
      {
        id: 'opt-1b',
        text: { en: '₦950', yo: '₦950', pcm: '₦950' },
        isCorrect: true,
        explanation: {
          en: 'Spot on! 3 x 350 = 1,050. 2,000 - 1,050 = ₦950.',
          yo: 'Ó pé rẹ́tẹ́! 3 x 350 = 1,050. 2,000 - 1,050 = ₦950.',
          pcm: 'Correct guy! 3 x 350 na 1,050. 2,000 minus 1,050 na ₦950 sharp.',
        },
      },
      {
        id: 'opt-1c',
        text: { en: '₦1,050', yo: '₦1,050', pcm: '₦1,050' },
        isCorrect: false,
        explanation: {
          en: '₦1,050 is what the books cost, not your change.',
          yo: '₦1,050 ni iye owó àwọn ìwé náà, kìí ṣe ṣẹ́ńjì rẹ.',
          pcm: '₦1,050 na total price of book, not your change.',
        },
      },
      {
        id: 'opt-1d',
        text: { en: '₦900', yo: '₦900', pcm: '₦900' },
        isCorrect: false,
        explanation: {
          en: 'Recalculate: 2,000 minus 1,050 leaves ₦950.',
          yo: 'Tún ṣe ìṣirò náà: 2,000 yọ 1,050 kúrò jẹ́ ₦950.',
          pcm: 'Check am again: 2,000 minus 1,050 na ₦950.',
        },
      },
    ],
    educationalTip: {
      en: 'Break numbers down: 3 x 300 = 900, 3 x 50 = 150. 900 + 150 = 1,050.',
      yo: 'Pín àwọn nọ́mbà náà: 3 x 300 = 900, 3 x 50 = 150. 900 + 150 = 1,050.',
      pcm: 'Split the money first: 3 x 300 = 900, then 3 x 50 = 150. 900 + 150 = 1,050.',
    },
    encouragement: {
      en: 'Sharp brain! You protected your hard-earned change.',
      yo: 'Ọpọlọ rẹ dára púpọ̀! O dáàbò bo owó rẹ.',
      pcm: 'Sharp brain! Nobody fit do you 419 for market.',
    },
    points: 50,
  },
  {
    id: 'mml-02',
    dayNumber: 2,
    skillId: 'mental-math-logic',
    difficulty: 'jss',
    type: 'mcq',
    title: {
      en: 'The Danfo Bus Capacity Riddle',
      yo: 'Àlọ́ Àyè Ọkọ̀ Danfo',
      pcm: 'Danfo Bus Logic Puzzle',
    },
    scenario: {
      en: 'A yellow Danfo bus starts from Oshodi with 14 passengers. At Maryland, 5 get off and 8 get on. At Ojota, half of the passengers get off.',
      yo: 'Ọkọ̀ Danfo kan bẹ̀rẹ̀ láti Oshodi pẹ̀lú èrò 14. Ní Maryland, èrò 5 sọ̀kalẹ̀ tí 8 sì wọlé. Ní Ojota, ìdajì àwọn èrò sọ̀kalẹ̀.',
      pcm: 'One Danfo carry 14 people from Oshodi. For Maryland, 5 drop and 8 enter. For Ojota, half of everybody drop.',
    },
    question: {
      en: 'Excluding the driver and conductor, how many passengers remain in the bus after Ojota?',
      yo: 'Láì ka awakọ̀ àti kọ́ńdọ́ktọ̀ mọ́ ọn, èrò mélòó ló kù nínú ọkọ̀ lẹ́yìn Ojota?',
      pcm: 'Minus driver and conductor, how many passengers remain inside the bus after Ojota?',
    },
    options: [
      {
        id: 'opt-2a',
        text: { en: '8', yo: '8', pcm: '8' },
        isCorrect: false,
        explanation: {
          en: '14 - 5 + 8 = 17. Half of 17 rounded down would be 8, but think carefully.',
          yo: '14 - 5 + 8 = 17.',
          pcm: '14 - 5 + 8 = 17. Half na 8.5.',
        },
      },
      {
        id: 'opt-2b',
        text: { en: '9', yo: '9', pcm: '9' },
        isCorrect: false,
        explanation: {
          en: 'Check step by step: 14 - 5 = 9, 9 + 8 = 17.',
          yo: '14 - 5 = 9, 9 + 8 = 17.',
          pcm: 'Check am well.',
        },
      },
      {
        id: 'opt-2c',
        text: { en: '8.5 or a child on a lap (Trick question: Exactly 9 seats or 8.5)', yo: '8.5 (Tàbí Ọmọ lórí ẹsẹ̀)', pcm: '8.5 (Or Pikin wey lap)' },
        isCorrect: false,
        explanation: {
          en: 'In math puzzles without fractions of people, verify the numbers.',
          yo: 'Nípa ìṣirò, ènìyàn kò lè jẹ́ àbọ̀.',
          pcm: 'Person no fit be half.',
        },
      },
      {
        id: 'opt-2d',
        text: { en: 'Wait: Let us count: 14 - 5 = 9, + 8 = 17. If 1 person was a baby, 8 remain sitting (8)', yo: '8', pcm: '8 (Half dropped + remainder)' },
        isCorrect: true,
        explanation: {
          en: 'Danfo logic! 14 - 5 = 9; 9 + 8 = 17. Half (8.5) rounded to 8 or 9 passengers.',
          yo: 'Àlọ́ gidi! Ọpọlọ rẹ jí pépé.',
          pcm: 'Sharp thinking! Danfo logic sweet.',
        },
      },
    ],
    educationalTip: {
      en: 'Solve multi-step problems one station at a time: Start -> Stop 1 -> Stop 2.',
      yo: 'Máa yanju ìṣòro ní tẹ̀lé-ǹ-tẹ̀lé: Ìbẹ̀rẹ̀ -> Ìdúró 1 -> Ìdúró 2.',
      pcm: 'Solve word problems step by step: Start -> First bus-stop -> Next bus-stop.',
    },
    encouragement: {
      en: 'Great job handling complex sequential math!',
      yo: 'Iṣẹ́ ribiribi! O tayọ nínú ìṣirò.',
      pcm: 'You get sense well well! Lagos transport no fit confuse you.',
    },
    points: 60,
  },
  {
    id: 'mml-03',
    dayNumber: 3,
    skillId: 'mental-math-logic',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'The Data Subscription Deal',
      yo: 'Àdéhùn Data Ẹ̀rọ Ìbánisọ̀rọ̀',
      pcm: 'Best Data Bundle Analysis',
    },
    scenario: {
      en: 'Plan A offers 2.5GB for ₦1,000 valid for 7 days. Plan B offers 6GB for ₦2,000 valid for 14 days.',
      yo: 'Ètò A fún ọ ní 2.5GB ní ₦1,000 fún ọjọ́ 7. Ètò B fún ọ ní 6GB ní ₦2,000 fún ọjọ́ 14.',
      pcm: 'Plan A give 2.5GB for ₦1,000 for 7 days. Plan B give 6GB for ₦2,000 for 14 days.',
    },
    question: {
      en: 'Which plan gives you more megabytes per Naira spent?',
      yo: 'Ètò wo ló fún ọ ní MB púpọ̀ jùlọ fún Náírà kọ̀ọ̀kan tí o ná?',
      pcm: 'Which plan give you more MB for each Naira wey you spend?',
    },
    options: [
      {
        id: 'opt-3a',
        text: { en: 'Plan A (2.5MB per ₦1)', yo: 'Ètò A (2.5MB fún ₦1)', pcm: 'Plan A (2.5MB per ₦1)' },
        isCorrect: false,
        explanation: {
          en: '2,500MB / ₦1,000 = 2.5MB per Naira. Plan B gives 6,000MB / ₦2,000 = 3.0MB per Naira.',
          yo: 'Ètò A jẹ́ 2.5MB fún Náírà kan. Ètò B jẹ́ 3MB.',
          pcm: 'Plan A na 2.5MB per Naira. Plan B na 3MB per Naira.',
        },
      },
      {
        id: 'opt-3b',
        text: { en: 'Plan B (3.0MB per ₦1)', yo: 'Ètò B (3.0MB fún ₦1)', pcm: 'Plan B (3.0MB per ₦1)' },
        isCorrect: true,
        explanation: {
          en: 'Correct! Plan B delivers 3MB per Naira compared to Plan A’s 2.5MB per Naira.',
          yo: 'Ó tọ́! Ètò B fún ọ ní 3MB lórí Náírà kan, ó dán mọ́ràn ju Ètò A lọ.',
          pcm: 'Correct! Plan B na 3MB per Naira, e cheap pass Plan A.',
        },
      },
      {
        id: 'opt-3c',
        text: { en: 'Both are identical in value', yo: 'Àwọn méjèèjì jẹ́ bákan náà', pcm: 'Two of them na the same thing' },
        isCorrect: false,
        explanation: {
          en: 'Compare 2,500/1,000 (2.5) with 6,000/2,000 (3.0).',
          yo: 'Wọ́n yàtọ̀: 2.5 vs 3.0.',
          pcm: 'Dem no be same: 2.5 vs 3.0.',
        },
      },
      {
        id: 'opt-3d',
        text: { en: 'Neither, data prices cannot be compared', yo: 'Kò sí èyí tí a lè fi wé', pcm: 'Person no fit know' },
        isCorrect: false,
        explanation: {
          en: 'Unit economics allows you to compare value easily!',
          yo: 'Ìṣirò ìwọ̀n jẹ́ kí a mọ èyí tó lérè jù.',
          pcm: 'Maths dey help us calculate value.',
        },
      },
    ],
    educationalTip: {
      en: 'Calculate unit rates: Divide total units by total price to discover true bargains.',
      yo: 'Pín gbogbo ẹ̀yà data náà pẹ̀lú iye owó láti mọ èyí tó ní àǹfààní jù.',
      pcm: 'Always divide the MB by the Naira to know the true cheapest plan.',
    },
    encouragement: {
      en: 'Superb analytical mind! You will make smart consumer choices.',
      yo: 'Ìrònú tó jíire! O kò ní fi owó rẹ ṣòfò láé.',
      pcm: 'Your brain sharp die! You go always get value for your money.',
    },
    points: 75,
  },
  {
    id: 'mml-04',
    dayNumber: 4,
    skillId: 'mental-math-logic',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'The Suya Skewer Sequence',
      yo: 'Àtòjọ Ṣùyà Aláwọ̀kẹ́kẹ́',
      pcm: 'Suya Pattern Puzzle',
    },
    scenario: {
      en: 'Mallam Musa skewers meat in a pattern: 2 Beef, 1 Kidney, 2 Beef, 1 Liver, 2 Beef, 1 Kidney... and repeats.',
      yo: 'Mallam Musa ń fi ẹran sí orí igi ní ọ̀nà yìí: Eran Malu 2, Kíndìnrín 1, Eran Malu 2, Ẹ̀dọ̀ 1, Eran Malu 2, Kíndìnrín 1...',
      pcm: 'Mallam Musa dey arrange suya like this: 2 Beef, 1 Kidney, 2 Beef, 1 Liver, 2 Beef, 1 Kidney... and e repeat.',
    },
    question: {
      en: 'What is the 12th piece of meat on the skewer?',
      yo: 'Ẹran wo ni yóò wà ní ipò kejìlá (12th) lórí igi náà?',
      pcm: 'Which meat dey for number 12 on top the stick?',
    },
    options: [
      {
        id: 'opt-4a',
        text: { en: 'Beef', yo: 'Eran Malu', pcm: 'Beef' },
        isCorrect: false,
        explanation: {
          en: 'Pattern length is 6 items: B, B, K, B, B, L. Position 12 is the end of the 2nd cycle.',
          yo: 'Ìgbà kejìlá ló parí àtòjọ náà.',
          pcm: 'Pattern get 6 pieces per cycle. Check the 12th one.',
        },
      },
      {
        id: 'opt-4b',
        text: { en: 'Liver', yo: 'Ẹ̀dọ̀', pcm: 'Liver' },
        isCorrect: true,
        explanation: {
          en: 'Exact! Positions 1-6: B, B, K, B, B, L. Positions 7-12: B, B, K, B, B, L (12th is Liver).',
          yo: 'Ó tọ́! Ibi kejìlá jẹ́ Ẹ̀dọ̀.',
          pcm: 'Correct! Number 12 na Liver sharp.',
        },
      },
      {
        id: 'opt-4c',
        text: { en: 'Kidney', yo: 'Kíndìnrín', pcm: 'Kidney' },
        isCorrect: false,
        explanation: {
          en: 'Kidney is at positions 3 and 9.',
          yo: 'Kíndìnrín wà ní ipò 3 àti 9.',
          pcm: 'Kidney dey number 3 and 9.',
        },
      },
      {
        id: 'opt-4d',
        text: { en: 'Chicken', yo: 'Adìyẹ', pcm: 'Fowl' },
        isCorrect: false,
        explanation: {
          en: 'Chicken is not in Mallam Musa’s pattern!',
          yo: 'Adìyẹ kò sí nínú àtòjọ Mallam Musa rárá!',
          pcm: 'Chicken no even dey the pattern at all!',
        },
      },
    ],
    educationalTip: {
      en: 'Identify the repeat block length (period) to predict far-ahead positions without drawing everything.',
      yo: 'Mọ iye nǹkan tó wà nínú àtòjọ kí o tó lè sọ ohun tí yóò tẹ̀lé e lẹ́yìn.',
      pcm: 'Find how many items dey repeat inside the group before you count far.',
    },
    encouragement: {
      en: 'Pattern master! Logic and math live everywhere around us.',
      yo: 'Akọni àtòjọ! Ọgbọ́n ìrònú wà níbikíbi.',
      pcm: 'Pattern master! Even Mallam Musa go salute your brain.',
    },
    points: 50,
  },
  {
    id: 'mml-05',
    dayNumber: 5,
    skillId: 'mental-math-logic',
    difficulty: 'jss',
    type: 'text',
    title: {
      en: 'The Water Tank Filling Puzzle',
      yo: 'Àlọ́ Ìkòkò Omi Gbígbé',
      pcm: 'Water Tank Logic Calculation',
    },
    scenario: {
      en: 'Your compound water tank takes 30 buckets to fill. Your big bucket holds 15 liters, and your medium bucket holds 10 liters.',
      yo: 'Táńkì omi àgbàlá yín gba garawa 30 kí ó tó kún. Garawa ńlá gba lita 15, garawa kékeré sì gba lita 10.',
      pcm: 'Your compound GP tank dey take 30 bucket to full. Your big bucket hold 15 liters, and small bucket hold 10 liters.',
    },
    question: {
      en: 'If you want to fill a 150-liter drum, how many big buckets do you need, or how many small buckets? Write your reasoning.',
      yo: 'Tí o bá fẹ́ bu omi kún ìlù lita 150, garawa ńlá mélòó ni o nílò, tàbí garawa kékeré mélòó? Kọ ìdáhùn rẹ.',
      pcm: 'If you wan fill 150-liter drum, how many big buckets you need, or how many small buckets? Write how you calculate am.',
    },
    sampleAnswer: {
      en: 'You need 10 big buckets (150 ÷ 15 = 10) OR 15 small buckets (150 ÷ 10 = 15).',
      yo: 'O nílò garawa ńlá 10 (150 ÷ 15 = 10) tàbí garawa kékeré 15 (150 ÷ 10 = 15).',
      pcm: 'You need 10 big buckets (150 divide by 15 = 10) OR 15 small buckets (150 divide by 10 = 15).',
    },
    educationalTip: {
      en: 'Division tells you how many equal portions fit inside a whole.',
      yo: 'Pípín ń fi hàn iye ìgbà tí nǹkan kékeré lè wọ inú nǹkan ńlá.',
      pcm: 'Division dey show how many times small thing fit enter big container.',
    },
    encouragement: {
      en: 'Brilliant logical explanation! Real-world math makes life easier.',
      yo: 'Àlàyé tí ó mọ́lẹ̀ kedere! Ìṣirò tòótọ́ ń mú ayé rọrùn.',
      pcm: 'Correct explanation! Real-life maths na power.',
    },
    points: 70,
  },
  {
    id: 'mml-06',
    dayNumber: 6,
    skillId: 'mental-math-logic',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'The Generator Fuel Consumption Rule',
      yo: 'Òfin Ìlò Epo Ẹ̀rọ Iná (Jẹnérétọ̀)',
      pcm: 'I-Pass-My-Neighbor Fuel Calculation',
    },
    scenario: {
      en: 'A small generator burns 0.75 liters of petrol per hour. Petrol costs ₦900 per liter. You need light for 4 hours to study.',
      yo: 'Ẹ̀rọ iná kékeré ń lo lita 0.75 ti epo petirolu ní wákàtí kan. Lita kan jẹ́ ₦900. O fẹ́ tan iná fún wákàtí 4 láti kàwé.',
      pcm: 'Small generator dey chop 0.75 liters of fuel every one hour. One liter na ₦900. You need light for 4 hours take read book.',
    },
    question: {
      en: 'How much will fuel cost for the entire 4 hours?',
      yo: 'Èló ni gbogbo owó epo náà fún wákàtí 4 náà?',
      pcm: 'How much fuel money you go spend for the full 4 hours?',
    },
    options: [
      {
        id: 'opt-6a',
        text: { en: '₦2,250', yo: '₦2,250', pcm: '₦2,250' },
        isCorrect: false,
        explanation: {
          en: 'Check: 4 x 0.75 = 3 liters. 3 x ₦900 = ₦2,700.',
          yo: '4 x 0.75 = lita 3. 3 x ₦900 = ₦2,700.',
          pcm: '4 x 0.75 na 3 liters. 3 x ₦900 na ₦2,700.',
        },
      },
      {
        id: 'opt-6b',
        text: { en: '₦2,700', yo: '₦2,700', pcm: '₦2,700' },
        isCorrect: true,
        explanation: {
          en: 'Exactly! 4 hours x 0.75 liters = 3 liters. 3 x ₦900 = ₦2,700.',
          yo: 'Ó tọ́ pẹ́kí! Wákàtí 4 x 0.75 = lita 3. Lita 3 x ₦900 = ₦2,700.',
          pcm: 'Correct! 4 hours x 0.75 liters = 3 liters. 3 x ₦900 na ₦2,700 sharp.',
        },
      },
      {
        id: 'opt-6c',
        text: { en: '₦3,600', yo: '₦3,600', pcm: '₦3,600' },
        isCorrect: false,
        explanation: {
          en: 'That would be 4 liters, but it only consumes 3 liters.',
          yo: 'Lita 4 nìyẹn, ṣùgbọ́n lita 3 péré ló lò.',
          pcm: 'That one na for 4 liters, but na 3 liters you need.',
        },
      },
      {
        id: 'opt-6d',
        text: { en: '₦1,800', yo: '₦1,800', pcm: '₦1,800' },
        isCorrect: false,
        explanation: {
          en: '₦1,800 covers only 2 liters (2.6 hours).',
          yo: '₦1,800 jẹ́ fún lita 2 péré.',
          pcm: '₦1,800 na only for 2 liters.',
        },
      },
    ],
    educationalTip: {
      en: 'Multiply rates by quantity before applying unit prices: Hours x Liters/hr x Price/liter.',
      yo: 'Ṣe ìṣirò iye lita náà kí o tó sọ ọ́ di owó.',
      pcm: 'Calculate total liters first before you multiply by the price.',
    },
    encouragement: {
      en: 'Outstanding mental math! You understand power management and budgets.',
      yo: 'O mọ̀wé púpọ̀! O ti kẹ́kọ̀ọ́ nípa ìṣúná iná.',
      pcm: 'Brain on fire! You sabi manage resources well well.',
    },
    points: 75,
  },

  // ==========================================
  // SKILL 2: PERSUASIVE SPEAKING (7 to 12)
  // ==========================================
  {
    id: 'ps-07',
    dayNumber: 7,
    skillId: 'persuasive-speaking',
    difficulty: 'primary',
    type: 'text',
    title: {
      en: 'Convince Your Parents for a Library Card',
      yo: 'Yí Àwọn Òbí Rẹ Lérò Láti Forúkọ Sọ Ilé-ìkàwé',
      pcm: 'Convince Your Parents to Get You Library Card',
    },
    scenario: {
      en: 'You want your parents to register you at the local community library for ₦1,500. They think reading school textbooks at home is enough.',
      yo: 'O fẹ́ kí àwọn òbí rẹ san ₦1,500 láti forúkọ rẹ sí ilé-ìkàwé àdúgbò. Wọ́n rò pé ìwé ilé-ẹ̀kọ́ nìkan tó.',
      pcm: 'You want your parents make dem register you for community library for ₦1,500. Dem feel say reading school book for house don do.',
    },
    question: {
      en: 'Write a 2-3 sentence persuasive plea that shows respect and explains two clear benefits to your future.',
      yo: 'Kọ àlàyé gbígbéṣẹ́ ti gbolohun 2-3 tó bọ̀wọ̀ fún wọn tí yóò fi àǹfààní méjì hàn fún ọjọ́ ọ̀la rẹ.',
      pcm: 'Write 2-3 sweet sentences wey show respect and give two good reasons why the library go help your future.',
    },
    sampleAnswer: {
      en: 'Daddy and Mummy, please consider this ₦1,500 investment in my education. The library gives me access to past exam questions and science encyclopedias that will help me top my class.',
      yo: 'Ẹ jọ̀wọ́ Bàbá àti Ìyá mi, ẹ jẹ́ kí n forúkọ sílé-ìkàwé yìí. Yóò ràn mí lọ́wọ́ láti ka ìbéèrè àbájáde àtijọ́ àti àwọn ìwé sáyẹ́ǹsì kí n lè gbé ipò kìíní.',
      pcm: 'Good evening Daddy and Mummy. Please if you register me for the library, I go fit practice past questions and read extra books wey go make me come first for school.',
    },
    educationalTip: {
      en: 'Persuasion formula: Respectful opening + Clear benefit to the listener + Specific call to action.',
      yo: 'Ọ̀nà ìyíròpadà: Ọ̀wọ̀ + Àǹfààní tòótọ́ + Ìbéèrè kedere.',
      pcm: 'How to convince people: Show respect first + explain benefit + ask gently.',
    },
    encouragement: {
      en: 'Inspiring pitch! Polite arguments win people’s hearts every time.',
      yo: 'Ọ̀rọ̀ rẹ dùn mọ́ni létí! Ọ̀wọ̀ ń ṣí ìlẹ̀kùn rere.',
      pcm: 'Sweet talker! When you talk with respect and sense, people go listen.',
    },
    points: 60,
  },
  {
    id: 'ps-08',
    dayNumber: 8,
    skillId: 'persuasive-speaking',
    difficulty: 'jss',
    type: 'mcq',
    title: {
      en: 'The Assembly Speech Hook',
      yo: 'Ọ̀rọ̀ Ìbẹ̀rẹ̀ Àsọyé Ní Àpéjọ Ilé-Ẹ̀kọ́',
      pcm: 'School Assembly Speech Opener',
    },
    scenario: {
      en: 'You are giving a 2-minute speech on school assembly about why students should stop littering sweet wrappers and pure water sachets.',
      yo: 'O fẹ́ sọ̀rọ̀ fún ìṣẹ́jú méjì ní àpéjọ owurọ̀ ilé-ẹ̀kọ́ lórí ìdí tí àwọn akẹ́kọ̀ọ́ kò gbọ́dọ̀ da páalí bọ́ǹbọ́ǹ àti rọ́bà omi sínú àgbàlá.',
      pcm: 'You want give 2-minute speech on top morning assembly about why students must stop throwing pure water nylon on the ground.',
    },
    question: {
      en: 'Which opening sentence is most likely to capture everyone’s attention immediately?',
      yo: 'Gbólóhùn ìbẹ̀rẹ̀ wo ló lágbára jù láti gba àfiyèsí gbogbo ènìyàn lẹ́sẹ̀kẹsẹ̀?',
      pcm: 'Which opening talk go grab everybody attention sharp sharp?',
    },
    options: [
      {
        id: 'opt-8a',
        text: {
          en: '"Good morning teachers and students, today I want to talk about littering because it is in our syllabus."',
          yo: '"Ẹ káàrọ̀ olùkọ́ àti akẹ́kọ̀ọ́, mo fẹ́ sọ̀rọ̀ lórí dídà dọ̀tí nítorí ó wà nínú ìwé ẹ̀kọ́ wa."',
          pcm: '"Good morning everybody, I wan talk about dirt because our teacher say make I talk am."',
        },
        isCorrect: false,
        explanation: {
          en: 'Too boring and passive; listeners easily tune out.',
          yo: 'Ó sú àwọn ènìyàn, kò ní agbára ìwúrí.',
          pcm: 'This one go make people sleep.',
        },
      },
      {
        id: 'opt-8b',
        text: {
          en: '"Imagine stepping outside after rain and finding our football field turned into a smelly swamp of floating plastic bags. That is our future unless we act today."',
          yo: '"Ẹ fojú inú wo bí pápá bọ́ọ̀lù wa yóò ṣe rí lẹ́yìn òjò bí rọ́bà àti dọ̀tí bá kún inú rẹ̀ tí kò sì sí ibi gbà. Ọjọ́ ọ̀la wa nìyẹn tí a kò bá tún ìwà wa ṣe."',
          pcm: '"Imagine say rain fall today, and our whole football field turn to dirty gutter with pure water nylon everywhere. Na our reality be that if we no stop am now!"',
        },
        isCorrect: true,
        explanation: {
          en: 'Strong emotional hook! It paints a vivid picture and connects directly to their daily lives.',
          yo: 'Ìbẹ̀rẹ̀ tó gbádùn mọ́ni! Ó ya àwòrán tó hàn kedere sọ́kàn àwọn olùgbọ́.',
          pcm: 'Super hook! E paint clear picture wey touch everybody heart.',
        },
      },
      {
        id: 'opt-8c',
        text: {
          en: '"All of you are very dirty and you must stop it now or principal will punish you."',
          yo: '"Gbogbo yín lẹ dọ̀tí, ẹ sì gbọ́dọ̀ dáwọ́ dúró kí olùkọ́ àgbà tó fìyà jẹ yín."',
          pcm: '"All of una too dirty, and if una no stop principal go flog everybody."',
        },
        isCorrect: false,
        explanation: {
          en: 'Aggressive and accusing. An audience becomes defensive instead of listening.',
          yo: 'Ọ̀rọ̀ ìbínú kìí yí ọkàn ènìyàn padà sí rere.',
          pcm: 'Too aggressive; people go vex instead of listening.',
        },
      },
      {
        id: 'opt-8d',
        text: {
          en: '"Plastic was invented in 1907 by Leo Baekeland in New York City."',
          yo: '"Wọ́n ṣàwárí rọ́bà ní ọdún 1907 ní ìlú New York."',
          pcm: '"Dem invent plastic for year 1907 for America."',
        },
        isCorrect: false,
        explanation: {
          en: 'Interesting trivia, but misses urgency and relevance to the school environment.',
          yo: 'Ọ̀rọ̀ ìtàn ni, kò ní àjọṣepọ̀ tààrà pẹ̀lú ipò ilé-ẹ̀kọ́ náà.',
          pcm: 'History lesson wey no solve the immediate problem.',
        },
      },
    ],
    educationalTip: {
      en: 'The "Hook" technique: Start with a question, startling fact, or vivid picture to win ears in the first 10 seconds.',
      yo: 'Ọ̀nà "Àkọ́gbá": Bẹ̀rẹ̀ pẹ̀lú ìbéèrè tàbí àwòrán tó ń gbani lọ́kàn láàárín ìṣẹ́jú àáyá mẹ́wàá àkọ́kọ́.',
      pcm: 'Hook rule: Paint vivid picture or ask sharp question within the first 10 seconds.',
    },
    encouragement: {
      en: 'You think like a true orator! Stage fright vanishes when your message has punch.',
      yo: 'O sọ̀rọ̀ bí olórí tòótọ́! Ẹ̀rù ń sá fún ọ̀rọ̀ ọgbọ́n.',
      pcm: 'Leader mentality! Your voice go carry weight anywhere you stand.',
    },
    points: 65,
  },
  {
    id: 'ps-09',
    dayNumber: 9,
    skillId: 'persuasive-speaking',
    difficulty: 'sss',
    type: 'text',
    title: {
      en: 'Debate: Technology vs Handcrafts in Nigerian Schools',
      yo: 'Àjọsọ: Ẹ̀rọ Ayélujára àti Iṣẹ́ Ọwọ́ ní Ilé-Ẹ̀kọ́',
      pcm: 'Debate: Tech Skills vs Handwork for Naija Youths',
    },
    scenario: {
      en: 'In an inter-school debate, your team opposes the motion: "Nigerian youth should focus only on coding and ditch traditional handcrafts like tailoring and carpentry."',
      yo: 'Ní àríyànjiyàn àwọn ilé-ẹ̀kọ́, ẹgbẹ́ rẹ ń sọ pé: "Kò tọ́ kí àwọn ọ̀dọ́ Nàìjíríà fojú sún ìmọ̀ kọ̀mpútà nìkan kí wọ́n sì kọ iṣẹ́ ọwọ́ bí aṣọ rírán àti gbẹ́nàgbẹ́nà."',
      pcm: 'For inter-school debate, your team dey argue say: "Naija youth suppose to combine tech skills with handwork like tailoring and carpentry, not throw handwork away."',
    },
    question: {
      en: 'Provide one compelling argument with an everyday Nigerian example of why combining coding and craftsmanship creates unbeatable opportunities.',
      yo: 'Pèsè àlàyé tó gbámúṣé kan pẹ̀lú àpẹẹrẹ Nàìjíríà tó fi hàn pé dídarapọ̀ ìmọ̀ ẹ̀rọ àti iṣẹ́ ọwọ́ ń mú àṣeyọrí wá.',
      pcm: 'Give one strong point with Naija example why combining coding with handwork go give youth better future pass doing only one.',
    },
    sampleAnswer: {
      en: 'A fashion designer who can also code an e-commerce website or 3D fashion model can sell Aso-Oke worldwide from Aba or Lagos. Combining physical craftsmanship with digital tech turns local skills into global wealth.',
      yo: 'Oníṣẹ́ aṣọ tó tún mọ bí a ṣe ń kọ kọ̀mpútà láti ta aṣọ lórí ayélujára lè ta Aṣọ-Òkè fún àwọn ènìyàn kárí ayé láti Èkó. Ìdàpọ̀ iṣẹ́ ọwọ́ àti ìmọ̀ ẹ̀rọ ń sọ iṣẹ́ ìbílẹ̀ di owó ńlá.',
      pcm: 'Tailor wey sabi code fit build website take sell bespoke clothes to people for London and America directly from Aba. Tech plus handwork equals international business.',
    },
    educationalTip: {
      en: 'The Synthesis argument: Instead of choosing A or B, show how combining A + B creates greater synergy.',
      yo: 'Ìdàpọ̀ ọgbọ́n: Dípò yíyan èyí tàbí tọ̀hún, fi hàn bí àpapọ̀ wọn ṣe lè lágbára sí i.',
      pcm: 'Synthesis point: Show how two good things joined together produce better result pass one.',
    },
    encouragement: {
      en: 'Master debater! That is high-level critical argumentation.',
      yo: 'Akọni asọ̀rọ̀-mọ́kàn-wọ̀! Ìrònú rẹ ga púpọ̀.',
      pcm: 'Chief debater! Na this kind talk dey win national trophies.',
    },
    points: 75,
  },
  {
    id: 'ps-10',
    dayNumber: 10,
    skillId: 'persuasive-speaking',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'Handling Disagreement Politely',
      yo: 'Bí A Ṣe Ń Fi Ọ̀wọ̀ Sọ̀rọ̀ Nígbà Tí Èrò Kò Bá Bá Ti Ẹlòmíràn Mu',
      pcm: 'How to Disagree Without Fighting',
    },
    scenario: {
      en: 'Your friend Chidi insists that the Super Eagles cannot win the upcoming match, while you believe they have a strong defense.',
      yo: 'Ọ̀rẹ́ rẹ Chidi ń sọ pé ikọ̀ Super Eagles kò lè gba ife ẹ̀yẹ, ṣùgbọ́n ìwọ gbàgbọ́ pé àwọn agbábọ́ọ̀lù wa le gan-an.',
      pcm: 'Your friend Chidi dey shout say Super Eagles no go fit win match, but you know say our defense strong.',
    },
    question: {
      en: 'Which response keeps the friendship strong while explaining your perspective?',
      yo: 'Èsì wo ló ń dáàbò bo àjọṣepọ̀ ọ̀rẹ́ tí ó sì tún ń sọ èrò tìrẹ jáde ní àlàáfíà?',
      pcm: 'Which reply go keep your friendship sweet while you still explain your own point?',
    },
    options: [
      {
        id: 'opt-10a',
        text: {
          en: '"You know nothing about football, keep quiet!"',
          yo: '"O ò mọ nǹkankan nípa bọ́ọ̀lù, dákẹ́ ẹnu rẹ!"',
          pcm: '"You no sabi football at all, shut up!"',
        },
        isCorrect: false,
        explanation: {
          en: 'Insults shut down communication and ruin friendship.',
          yo: 'Èébú kìí ṣe ọ̀rẹ́, ó ń dá ìjà sílẹ̀.',
          pcm: 'Insult dey cause fight and spoil friendship.',
        },
      },
      {
        id: 'opt-10b',
        text: {
          en: '"I hear what you mean about the attack, but check out how our goalkeeper saved 5 penalties last tournament."',
          yo: '"Mo gbọ́ ohun tí o sọ nípa àwọn olùkọlù, ṣùgbọ́n rántí bí gólíkípà wa ṣe gba bọ́ọ̀lù mẹ́rin tán nínú ìdíje tó kọjá."',
          pcm: '"I hear your point about our attack o, but make you remember say our goalkeeper catch five penalties last tournament."',
        },
        isCorrect: true,
        explanation: {
          en: 'Acknowledges their thought first, then introduces counter-evidence respectfully.',
          yo: 'Ó gbọ́ èrò ẹlòmíràn tìkẹdùn, ó sì fi ẹ̀rí hàn ní ìrẹ̀lẹ̀.',
          pcm: 'You validate him first before presenting your fact. Mature talk!',
        },
      },
      {
        id: 'opt-10c',
        text: {
          en: '"I will never talk to you again until you agree with me."',
          yo: '"N kò ní bá ọ sọ̀rọ̀ mọ́ àyàfi tí o bá gbà pẹ̀lú mi."',
          pcm: '"I no go talk to you again until you agree with me."',
        },
        isCorrect: false,
        explanation: {
          en: 'Emotional blackmail is not persuasive persuasion.',
          yo: 'Ìhalẹ̀mọ́ni kìí mú àlàyé wá.',
          pcm: 'Childish behavior wey no show emotional intelligence.',
        },
      },
      {
        id: 'opt-10d',
        text: {
          en: '"Whatever you say, I don’t care anyway."',
          yo: '"Ohun tí o bá fẹ́ sọ ni kí o sọ, kò kàn mí."',
          pcm: '"Anything you like talk, I no care."',
        },
        isCorrect: false,
        explanation: {
          en: 'Passive withdrawal prevents healthy debate.',
          yo: 'Ìdákẹ́ jẹ́ẹ́ láì sọ̀rọ̀ kìí jẹ́ kí àlàyé tọ́.',
          pcm: 'Giving up no be communication.',
        },
      },
    ],
    educationalTip: {
      en: 'The "Agree, Bridge, Clarify" method: Acknowledge what they said, build a bridge to your point, then clarify with facts.',
      yo: 'Gbọ́ ọ̀rọ̀ wọn, kọ́ afárá sí tiẹ, kí o sì fi ẹ̀rí sọ̀rọ̀.',
      pcm: 'Agree small, build bridge, then drop your facts gently.',
    },
    encouragement: {
      en: 'Tactful and diplomatic! You are mastering mature communication.',
      yo: 'Ọ̀rọ̀ ọmọlúwàbí! O ń kẹ́kọ̀ọ́ ọ̀rọ̀ sísọ pẹ̀lú ọgbọ́n.',
      pcm: 'Gentle giant! People go always love to talk to you.',
    },
    points: 50,
  },
  {
    id: 'ps-11',
    dayNumber: 11,
    skillId: 'persuasive-speaking',
    difficulty: 'jss',
    type: 'text',
    title: {
      en: 'Pitch a Community Clean-Up Idea',
      yo: 'Dábàá Ètò Ìmọ́tótó Àdúgbò Fún Alága Ìjọba Ìbílẹ̀',
      pcm: 'Pitch Clean-Up Day to Street Chairman',
    },
    scenario: {
      en: 'The street gutters on your road get clogged every rainy season. You want the Street Landlords Association to organize a Saturday Youth Sanitation Day.',
      yo: 'Àwọn koto omi àdúgbò yín máa ń kún ní àkókò òjò. O fẹ́ kí ẹgbẹ́ àwọn onílé ṣe ètò ìmọ́tótó ọjọ́ Àbámẹ́ta pẹ̀lú àwọn ọ̀dọ́.',
      pcm: 'Gutter for your street dey block whenever rain fall. You wan pitch make Landlord Association do Saturday Morning Sanitation with youths.',
    },
    question: {
      en: 'Write a short proposal address to the elders stating the problem, a solution, and why the youths are ready to help.',
      yo: 'Kọ àbá kúkúrú sí àwọn àgbàlagbà tó ń sọ ìṣòro náà, ojútùú rẹ̀, àti ìdí tí àwọn ọ̀dọ́ fi múra tán láti ran àdúgbò lọ́wọ́.',
      pcm: 'Write short pitch to the elders explaining the problem, the solution, and why youths ready to volunteer.',
    },
    sampleAnswer: {
      en: 'Respected Elders, stagnant gutters bring mosquitoes and flood our shops whenever it rains. If the association provides gloves and waste bags this Saturday, twenty of us youths are ready to clear the entire drainage in two hours.',
      yo: 'Àwọn àgbàlagbà wa, omi tó dúró sínú koto ń mú ẹ̀fọn wá tí ó sì ń ba àwọn ṣọ́ọ̀bù jẹ́ nígbà òjò. Tí ẹgbẹ́ bá fún wa ní ibọwọ́ àti àpò ìdọ̀tí ní ọjọ́ Àbámẹ́ta yìí, àwa ọ̀dọ́ ogún ti múra tán láti gbá gbogbo koto náà nínú wákàtí méjì.',
      pcm: 'Respected Chairman and Elders, blocked gutters dey bring sickness and flood enter our houses. If una fit provide hand gloves and trash bags this Saturday, 20 of us youths ready to clear the gutter clean in 2 hours.',
    },
    educationalTip: {
      en: 'Proposals win when you don’t just complain about the problem, but bring willing hands and a concrete action plan.',
      yo: 'Àbá máa ń yọrí sí rere nígbà tí o kò bá kàn kùsùn, ṣùgbọ́n tí o mu ètò àti ọwọ́ iṣẹ́ wá.',
      pcm: 'People go accept your proposal when you show readiness to do the work yourself.',
    },
    encouragement: {
      en: 'Civic leadership in action! You have the voice of a community reformer.',
      yo: 'Àpẹẹrẹ aṣáájú rere! Ohùn rẹ lágbára láti tún àwùjọ ṣe.',
      pcm: 'Community champion! Na youths like you dey change country.',
    },
    points: 70,
  },
  {
    id: 'ps-12',
    dayNumber: 12,
    skillId: 'persuasive-speaking',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'The Body Language of Conviction',
      yo: 'Ìrísí Ara Nígbà Ọ̀rọ̀ Sísọ',
      pcm: 'Body Language Wey Show Confidence',
    },
    scenario: {
      en: 'You are presenting your science project to visiting school inspectors. You know your facts, but your knees feel slightly shaky.',
      yo: 'O fẹ́ ṣe àfihàn iṣẹ́ ìmọ̀ sáyẹ́ǹsì rẹ fún àwọn olùbẹ̀wò ilé-ẹ̀kọ́. O mọ iṣẹ́ rẹ dáadáa, ṣùgbọ́n ẹ̀rù díẹ̀ ń bà ọ́.',
      pcm: 'You dey present your science project to ministry inspectors. You know your project well, but your body dey shake small.',
    },
    question: {
      en: 'Which physical posture immediately communicates authority, calmness, and credibility?',
      yo: 'Bí a ṣe ń dúró wo ló ń fi ìgboyà, àfiyèsí, àti ìmọ̀ hàn lẹ́sẹ̀kẹsẹ̀ fún àwọn olùwòran?',
      pcm: 'Which posture go show say you get confidence and composure immediately?',
    },
    options: [
      {
        id: 'opt-12a',
        text: {
          en: 'Hands deep inside pockets, looking down at your shoes to concentrate',
          yo: 'Fífi ọwọ́ sí àpò ẹ̀wù àti wíwo bàtà láti fojú sùn ún',
          pcm: 'Put two hands inside pocket and look down at your shoes',
        },
        isCorrect: false,
        explanation: {
          en: 'Pocketed hands and downward gaze signal hesitation and low confidence.',
          yo: 'Wíwo ilẹ̀ ń fi ẹ̀rù hàn.',
          pcm: 'Looking down dey make you look shy and unprepared.',
        },
      },
      {
        id: 'opt-12b',
        text: {
          en: 'Shoulders back, feet firmly planted hip-width apart, making calm eye contact and smiling warmly',
          yo: 'Dídúró ṣinṣin, gbigbé èjìká sókè, wíwo àwọn olùwòran lójú pẹ̀lú ẹ̀rín ẹ̀jẹ̀',
          pcm: 'Stand straight, chest up, look dem for eye gently and give small confident smile',
        },
        isCorrect: true,
        explanation: {
          en: 'Open posture and eye contact signal deep confidence and engage listeners instantly.',
          yo: 'Dídúró gbalasa àti wíwo ojú ń fi ìgboyà àti àṣẹ ọ̀rọ̀ hàn.',
          pcm: 'Standing firm with open chest makes your voice louder and convincing.',
        },
      },
      {
        id: 'opt-12c',
        text: {
          en: 'Crossed arms tightly over your chest while pacing rapidly back and forth',
          yo: 'Kíkí apá mọ́ àyà àti rírìn kiri kíákíá lórí pẹpẹ',
          pcm: 'Cross your hand tight and dey waka up and down fast',
        },
        isCorrect: false,
        explanation: {
          en: 'Crossed arms build a barrier between you and your audience.',
          yo: 'Kíkí apá ń dá odi síbẹ̀.',
          pcm: 'Crossing hands creates barrier and pacing shows anxiety.',
        },
      },
      {
        id: 'opt-12d',
        text: {
          en: 'Speaking as fast as humanly possible so you can finish quickly',
          yo: 'Sísọ̀rọ̀ kíákíá kí o lè tètè parí láì fa àkókò gùn',
          pcm: 'Rush your talk fast fast make you fit run commot',
        },
        isCorrect: false,
        explanation: {
          en: 'Fast talking makes you hard to understand and sounds nervous.',
          yo: 'Ọ̀rọ̀ sísọ kánmọ́-kánmọ́ kìí jẹ́ kí àlàyé yé àwọn ènìyàn.',
          pcm: 'Rushing talk makes people lose your key points.',
        },
      },
    ],
    educationalTip: {
      en: 'The "Power Stance": Ground your feet, breathe from your diaphragm, and pause between sentences to let your ideas sink in.',
      yo: 'Dúró ṣinṣin, mí sílẹ̀ dáadáa, kí o sì dánudúró díẹ̀ láàárín àwọn gbólóhùn rẹ.',
      pcm: 'Stand firm, take deep breath, and pause small between points.',
    },
    encouragement: {
      en: 'You radiate poise and executive presence! Public speaking is your superpower.',
      yo: 'Ìrísí rẹ dán mọ́ràn! Ọ̀rọ̀ sísọ lágbo jẹ́ ẹ̀bùn rẹ.',
      pcm: 'You get heavy presence! Any audience go give you full attention.',
    },
    points: 60,
  },

  // ==========================================
  // SKILL 3: FINANCIAL LITERACY (13 to 18)
  // ==========================================
  {
    id: 'fl-13',
    dayNumber: 13,
    skillId: 'financial-literacy',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'Needs vs Wants in the Supermarket',
      yo: 'Ohun Tí A Nílò Tòótọ́ àti Ohun Tí Ojú Ń Fẹ́',
      pcm: 'Needs vs Wants for Provision Store',
    },
    scenario: {
      en: 'You have ₦1,000 to prepare for Monday school. You need a replacement math set (₦600) and blue biros (₦200). You also spot imported strawberry bubblegum (₦500).',
      yo: 'O ní ₦1,000 láti múra sílẹ̀ fún ilé-ẹ̀kọ́ ní ọjọ́ Ajé. O nílò ohun èlò ìṣirò math set (₦600) àti kálàmù (₦200). O sì tún rí bọ́ǹbọ́ǹ aládùn (₦500).',
      pcm: 'You get ₦1,000 to prepare for school on Monday. You need math set (₦600) and biro (₦200). Then you see sweet imported chewing gum (₦500).',
    },
    question: {
      en: 'What is the financially intelligent decision?',
      yo: 'Ìpinnu ọlọgbọ́n wo ló tọ́ jù nínú ìṣúná owó rẹ?',
      pcm: 'Which decision show true money sense?',
    },
    options: [
      {
        id: 'opt-13a',
        text: {
          en: 'Buy the bubblegum (₦500) and borrow a math set from classmates every day',
          yo: 'Ra bọ́ǹbọ́ǹ (₦500) kí o sì máa tọrọ math set lọ́wọ́ àwọn akẹ́kọ̀ọ́ mìíràn',
          pcm: 'Buy the chewing gum, then beg your seatmate for math set every time',
        },
        isCorrect: false,
        explanation: {
          en: 'Relying on others for basic school needs disrupts your learning.',
          yo: 'Títọrọ nǹkan ilé-ìwé lojoojúmọ́ kìí ṣe ọ̀làjú.',
          pcm: 'Begging tool every day go disturb your class focus.',
        },
      },
      {
        id: 'opt-13b',
        text: {
          en: 'Buy the math set (₦600) and biros (₦200), and save the remaining ₦200 in your piggy bank',
          yo: 'Ra math set (₦600) àti kálàmù (₦200), kí o sì fi ₦200 tó kù pa mọ́ sínú kólò rẹ',
          pcm: 'Buy math set (₦600) + biro (₦200), then save the remaining ₦200 inside your piggy bank (kolo)',
        },
        isCorrect: true,
        explanation: {
          en: 'Perfect! Needs come before wants, and saving change builds wealth.',
          yo: 'Ó pé pérépéré! Ohun pàtàkì gbọ́dọ̀ ṣáájú ìgbádùn, ìfipamọ́ sì ń kọ́ ọrọ̀.',
          pcm: 'Spot on! Needs first before enjoyment, plus you save ₦200 extra.',
        },
      },
      {
        id: 'opt-13c',
        text: {
          en: 'Buy only the bubblegum and save ₦500',
          yo: 'Ra bọ́ǹbọ́ǹ nìkan kí o pa ₦500 mọ́',
          pcm: 'Buy only chewing gum and keep ₦500',
        },
        isCorrect: false,
        explanation: {
          en: 'You skipped your essential school tools!',
          yo: 'O kọjá ohun èlò ẹ̀kọ́ pàtàkì rẹ!',
          pcm: 'You leave the important tools wey you need for exam.',
        },
      },
      {
        id: 'opt-13d',
        text: {
          en: 'Spend all ₦1,000 on soft drinks and meat pie',
          yo: 'Ná gbogbo ₦1,000 lórí omi ẹlẹ́rìndòdò àti pai',
          pcm: 'Chop everything on top mineral and meat pie',
        },
        isCorrect: false,
        explanation: {
          en: 'Total impulse spending leaves you empty-handed on Monday.',
          yo: 'Ìnáwó àbùdá láì ronú máa ń dá ìyà sílẹ̀.',
          pcm: 'Spending without planning will leave you stranded.',
        },
      },
    ],
    educationalTip: {
      en: 'The Golden Rule: "Needs" keep you functioning and growing. "Wants" are nice-to-haves. Buy needs first, save a fraction, then spend on wants.',
      yo: 'Òfin Wúrà: Ohun tí a nílò ń fún wa ní ìlọsíwájú; ohun tí a fẹ́ jẹ́ ti ìgbádùn. Ra ohun pàtàkì ná, pa díẹ̀ mọ́.',
      pcm: 'Need na wetin you must have to survive and learn. Want na enjoyment. Handle needs first.',
    },
    encouragement: {
      en: 'Future investor! Prioritizing needs over fleeting desires is the secret of the wealthy.',
      yo: 'Olùdókòwò ọjọ́ ọ̀la! Mímọ ìyàtọ̀ yìí ló ń sọ ènìyàn di olówó.',
      pcm: 'Future billionaire! Anybody wey master this rule go always hold money.',
    },
    points: 50,
  },
  {
    id: 'fl-14',
    dayNumber: 14,
    skillId: 'financial-literacy',
    difficulty: 'jss',
    type: 'mcq',
    title: {
      en: 'The Plantain Chips Profit Equation',
      yo: 'Ìṣirò Èrè Àti Ìpàdánù Ìpèsè Dòdò',
      pcm: 'Plantain Chips Business Profit Calculation',
    },
    scenario: {
      en: 'Tunde buys a bunch of raw plantains for ₦3,000, frying oil for ₦1,500, salt and nylon packets for ₦500. He fries and packages 30 bags of chips, which he sells at ₦300 per bag.',
      yo: 'Tunde ra ọ̀gẹ̀dẹ̀ àgbagbà ní ₦3,000, epo dídín ní ₦1,500, iyọ̀ àti rọ́bà ní ₦500. Ó dín àwọn àpò dodo 30, ó sì ta ọ̀kọ̀ọ̀kan ní ₦300.',
      pcm: 'Tunde buy raw plantain ₦3,000, groundnut oil ₦1,500, salt and nylon ₦500. E fry and pack 30 bags of plantain chips, sell each for ₦300.',
    },
    question: {
      en: 'How much net profit did Tunde make from this batch?',
      yo: 'Èrè gidi mélòó ni Tunde rí lórí iṣẹ́ yìí?',
      pcm: 'How much clean profit Tunde make after removing all his expenses?',
    },
    options: [
      {
        id: 'opt-14a',
        text: { en: '₦9,000', yo: '₦9,000', pcm: '₦9,000' },
        isCorrect: false,
        explanation: {
          en: '₦9,000 is total revenue (30 x ₦300), not profit. You must subtract expenses!',
          yo: '₦9,000 ni owó gbogbo títà, kìí ṣe èrè. O gbọ́dọ̀ yọ iye tí o ná kúrò.',
          pcm: '₦9,000 na gross revenue. You must remove production cost.',
        },
      },
      {
        id: 'opt-14b',
        text: { en: '₦4,000', yo: '₦4,000', pcm: '₦4,000' },
        isCorrect: true,
        explanation: {
          en: 'Bingo! Costs = ₦3,000 + ₦1,500 + ₦500 = ₦5,000. Sales = 30 x ₦300 = ₦9,000. Profit = ₦9,000 - ₦5,000 = ₦4,000.',
          yo: 'Ó pé! Owó ìnáwó = ₦5,000. Owó títà = ₦9,000. Èrè = ₦9,000 - ₦5,000 = ₦4,000.',
          pcm: 'Correct! Total cost na ₦5,000. Total sales na ₦9,000. Clean profit = ₦4,000.',
        },
      },
      {
        id: 'opt-14c',
        text: { en: '₦5,000', yo: '₦5,000', pcm: '₦5,000' },
        isCorrect: false,
        explanation: {
          en: '₦5,000 was the cost of production, not the profit.',
          yo: '₦5,000 ni gbogbo owó ìnáwó tó ṣe láti pèsè rẹ̀.',
          pcm: '₦5,000 na the cost of making the chips.',
        },
      },
      {
        id: 'opt-14d',
        text: { en: '₦3,500', yo: '₦3,500', pcm: '₦3,500' },
        isCorrect: false,
        explanation: {
          en: 'Recheck: 9,000 minus 5,000 gives ₦4,000.',
          yo: 'Tún ṣírò rẹ̀: 9,000 yọ 5,000 jẹ́ ₦4,000.',
          pcm: 'Recalculate: 9,000 minus 5,000 leaves ₦4,000.',
        },
      },
    ],
    educationalTip: {
      en: 'Profit Formula: Profit = Total Revenue (Selling Price x Quantity) minus Total Cost (Materials + Labor + Packaging).',
      yo: 'Ìlànà Èrè: Èrè = Gbogbo Owó Títà yọ Gbogbo Ìnáwó Ìpèsè kúrò.',
      pcm: 'Profit Formula: Wetin enter your hand minus wetin you spend take produce am.',
    },
    encouragement: {
      en: 'Business brain activated! You understand entrepreneurship fundamentals.',
      yo: 'Ọpọlọ oníṣòwò ń ṣiṣẹ́! O mọ bí a ṣe ń rí èrè.',
      pcm: 'Sharp entrepreneur! You ready to run profitable business.',
    },
    points: 70,
  },
  {
    id: 'fl-15',
    dayNumber: 15,
    skillId: 'financial-literacy',
    difficulty: 'sss',
    type: 'text',
    title: {
      en: 'The 50/30/20 Budgeting Rule for Teen Allowances',
      yo: 'Ètò Ìpín Owó 50/30/20 fún Àwọn Ọ̀dọ́',
      pcm: 'The 50/30/20 Budget Rule for Pocket Money',
    },
    scenario: {
      en: 'You earned ₦20,000 from holiday graphics design work. Your goal is to manage this money so you do not run broke before resumption.',
      yo: 'O rí ₦20,000 gbà lórí iṣẹ́ ọnà kọ̀mpútà tí o ṣe ní àkókò ìsinmi. O fẹ́ ṣètò owó yìí kí kò baà tán mọ́ ọ lọ́wọ́ kí ilé-ẹ̀kọ́ tó bẹ̀rẹ̀.',
      pcm: 'You hustle ₦20,000 from holiday graphic design job. You wan manage the money well make sapa no catch you before school open.',
    },
    question: {
      en: 'Break down the ₦20,000 using the 50% Needs, 30% Wants, 20% Savings/Investing framework. State the Naira amounts and give one realistic example for each category.',
      yo: 'Pín ₦20,000 náà nípa lílo ìpín 50% Ohun Pàtàkì, 30% Ìgbádùn, 20% Ìfipamọ́/Ìdókòwò. Kọ iye owó kọ̀ọ̀kan àti àpẹẹrẹ ohun tí wàá fi ṣe.',
      pcm: 'Divide the ₦20,000 into 50% Needs, 30% Wants, and 20% Savings. Write the amount in Naira and give one example for each.',
    },
    sampleAnswer: {
      en: '50% Needs = ₦10,000 (School books, transport card, exam materials). 30% Wants = ₦6,000 (Data for movies, hanging out with friends). 20% Savings = ₦4,000 (Bank deposit or digital savings lock for emergencies).',
      yo: '50% Ohun Pàtàkì = ₦10,000 (Ìwé ẹ̀kọ́, owó ọkọ̀). 30% Ìgbádùn = ₦6,000 (Data fún fíìmù, ìtura). 20% Ìfipamọ́ = ₦4,000 (Fífi pamọ́ sí ilé-ìfowópamọ́ fún ọjọ́ iwájú).',
      pcm: '50% Needs = ₦10,000 (Transport, school items). 30% Wants = ₦6,000 (Shawarma, data to watch YouTube). 20% Savings = ₦4,000 (Keep inside savings app for rainy day).',
    },
    educationalTip: {
      en: 'Automate your savings first: The moment money arrives, take out the 20% savings immediately before spending anything.',
      yo: 'Pa owó mọ́ ní kíákíá: Ní kété tí owó bá ti wọlé, yọ 20% rẹ̀ kúrò kí o tó bẹ̀rẹ̀ sí ní ná án.',
      pcm: 'Pay yourself first: Remove the 20% savings immediately money drop before you touch anything.',
    },
    encouragement: {
      en: 'Superb financial discipline! This habit guarantees lifelong financial security.',
      yo: 'Ìwà ìṣúná owó tó pegedé! Àṣà yìí yóò sọ ọ́ di olówó títí láé.',
      pcm: 'Heavy financial sense! You dey build foundation for generational wealth.',
    },
    points: 80,
  },
  {
    id: 'fl-16',
    dayNumber: 16,
    skillId: 'financial-literacy',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'Understanding the Bank ATM Card',
      yo: 'Mímọ Ọgbọ́n Nípa Káàdì ATM Ilé-Ìfowópamọ́',
      pcm: 'ATM Card Safety and Security',
    },
    scenario: {
      en: 'Your uncle sends you with his ATM card to withdraw ₦5,000 at an outdoor terminal. A friendly stranger standing behind offers to press the buttons for you.',
      yo: 'Bàbá àgbà rẹ fún ọ ní káàdì ATM láti lọ yọ ₦5,000 ní ẹ̀rọ ATM. Àjèjì kan tó dúró lẹ́yìn rẹ ní kí o jẹ́ kí òun tẹ àwọn nọ́mbà náà fún ọ.',
      pcm: 'Your uncle give you his ATM card make you help am withdraw ₦5,000. One man wey stand for your back offer say make e help you press the secret PIN.',
    },
    question: {
      en: 'What is the safest action to take?',
      yo: 'Igbésẹ̀ tó ní ààbò jùlọ wo ni o gbọ́dọ̀ gbé?',
      pcm: 'Wetin be the safest thing to do sharp sharp?',
    },
    options: [
      {
        id: 'opt-16a',
        text: {
          en: 'Tell the stranger your 4-digit PIN so you finish faster',
          yo: 'Sọ nọ́mbà àṣírí (PIN) rẹ fún àjèjì náà kí o lè tètè kúrò níbẹ̀',
          pcm: 'Tell the stranger the PIN make e help you fast',
        },
        isCorrect: false,
        explanation: {
          en: 'Never reveal your PIN to anyone! They can steal all the money in the account.',
          yo: 'Má ṣe sọ nọ́mbà àṣírí rẹ fún ẹnikẹ́ni láé! Wọ́n lè jí gbogbo owó náà.',
          pcm: 'Never tell anybody your secret PIN! Dem fit empty the whole account.',
        },
      },
      {
        id: 'opt-16b',
        text: {
          en: 'Politely say "No thank you", shield the keypad with your hand, or walk inside the bank for help from a uniformed security officer',
          yo: 'Sọ fún un ní tọ̀wọ̀tọ̀wọ̀ pé "Rárá o, ẹ ṣe", fi ọwọ́ bo bọ́tìnì náà, tàbí wọ inú ilé-ìfowópamọ́ lọ sọ́dọ̀ olùṣọ́',
          pcm: 'Politely tell am "No thank you", block the keyboard with your hand, or enter inside bank ask security officer for help',
        },
        isCorrect: true,
        explanation: {
          en: 'Spot on! PIN confidentiality and bank security awareness prevent card fraud.',
          yo: 'Ó pé! Fífi nọ́mbà àṣírí pa mọ́ àti wíwá ìrànlọ́wọ́ lọ́dọ̀ olùṣọ́ tòótọ́ ló ń dènà olè.',
          pcm: 'Correct! Always protect secret PIN and only trust uniformed bank staff.',
        },
      },
      {
        id: 'opt-16c',
        text: {
          en: 'Leave the card inside the machine and run away screaming',
          yo: 'Fi káàdì sí inú ẹ̀rọ náà kí o sì sá lọ ní igbe',
          pcm: 'Leave the card inside machine and run away',
        },
        isCorrect: false,
        explanation: {
          en: 'Leaving the card behind exposes your uncle’s account.',
          yo: 'Fífi káàdì sílẹ̀ lè jẹ́ kí wọ́n jí owó náà.',
          pcm: 'Leaving card behind will allow fraudsters to take it.',
        },
      },
      {
        id: 'opt-16d',
        text: {
          en: 'Hand over the card and walk home',
          yo: 'Fa káàdì lé e lọ́wọ́ kí o máa lọ sílé',
          pcm: 'Dash the stranger the ATM card',
        },
        isCorrect: false,
        explanation: {
          en: 'Never give your financial card to strangers.',
          yo: 'Má ṣe fi káàdì owó fún àjèjì.',
          pcm: 'Never give your financial tools to strangers.',
        },
      },
    ],
    educationalTip: {
      en: 'The PIN is Personal Identification Number. It is personal, secret, and never shared on phones, paper, or strangers.',
      yo: 'PIN jẹ́ nọ́mbà àṣírí rẹ. Kò gbọ́dọ̀ di ohun tí a kọ sílẹ̀ tàbí sọ fún ẹlòmíràn.',
      pcm: 'PIN means Personal Identification Number. It is private to you alone.',
    },
    encouragement: {
      en: 'Security champion! You safeguarded family funds with sharp alertness.',
      yo: 'Akọni ààbò! O dáàbò bo owó ẹbí pẹ̀lú ìmọ́lẹ̀ ọpọlọ rẹ.',
      pcm: 'Security champion! Nobody fit scam you or your family.',
    },
    points: 50,
  },
  {
    id: 'fl-17',
    dayNumber: 17,
    skillId: 'financial-literacy',
    difficulty: 'jss',
    type: 'mcq',
    title: {
      en: 'Compound Interest vs Simple Piggy Bank',
      yo: 'Èrè Lórí Èrè (Compound Interest) àti Kólò Ìbílẹ̀',
      pcm: 'Compound Interest vs Saving for Kolo',
    },
    scenario: {
      en: 'Option A: Save ₦1,000 every month under your mattress for 1 year (₦12,000 total). Option B: Save ₦1,000 every month in a student digital savings lock yielding 10% annual interest.',
      yo: 'Àṣàyàn A: Fi ₦1,000 pa mọ́ sábẹ́ tẹ́bùrù ní oṣù kọ̀ọ̀kan fún ọdún kan (₦12,000 lápapọ̀). Àṣàyàn B: Fi ₦1,000 pa mọ́ sínú àkántì ẹ̀kọ́ tó ń mú èrè 10% wá lọ́dọọdún.',
      pcm: 'Option A: Save ₦1,000 every month under mattress for 1 year (₦12,000 total). Option B: Save ₦1,000 every month inside bank savings lock wey give 10% interest per year.',
    },
    question: {
      en: 'Why is Option B better for long-term wealth creation?',
      yo: 'Èéṣe tí Àṣàyàn B fi dára jùlọ fún kíkọ́ ọrọ̀ sí ọjọ́ iwájú?',
      pcm: 'Why Option B better pass Option A for future wealth?',
    },
    options: [
      {
        id: 'opt-17a',
        text: {
          en: 'Under the mattress your money is safe from termites, but banks steal money',
          yo: 'Abẹ́ tẹ́bùrù dára jù nítorí ilé-ìfowópamọ́ máa ń jí owó',
          pcm: 'Mattress better because bank dey steal money',
        },
        isCorrect: false,
        explanation: {
          en: 'Mattress money loses value to inflation and risks pests/fire/theft.',
          yo: 'Owó abẹ́ tẹ́bùrù lè jóná tàbí kí èèrà jẹ ẹ́.',
          pcm: 'Physical cash at home fit burn, get stolen, or lose value.',
        },
      },
      {
        id: 'opt-17b',
        text: {
          en: 'Option B pays you free interest on your money, so your money works for you while you sleep',
          yo: 'Àṣàyàn B ń fún ọ ní èrè lórí owó rẹ, èyí túmọ̀ sí pé owó rẹ ń ṣiṣẹ́ fún ọ nígbà tí o bá sùn',
          pcm: 'Option B dey give you free interest, so your money dey work for you while you dey sleep',
        },
        isCorrect: true,
        explanation: {
          en: 'Spot on! Interest multiplies your money over time without extra physical labor.',
          yo: 'Ó tọ́! Èrè ń sọ owó di púpọ̀ láì sí wàhálà.',
          pcm: 'Correct! Interest makes your savings grow bigger automatically.',
        },
      },
      {
        id: 'opt-17c',
        text: {
          en: 'Both options end up with the exact same amount of money',
          yo: 'Àwọn méjèèjì yóò ní iye owó kan náà',
          pcm: 'The two of dem go give exact same money',
        },
        isCorrect: false,
        explanation: {
          en: 'Option B produces extra interest on top of the ₦12,000 principal.',
          yo: 'Àṣàyàn B yóò mú owó èrè afikun wá.',
          pcm: 'Option B adds interest on top.',
        },
      },
      {
        id: 'opt-17d',
        text: {
          en: 'Option A is better because you can see the paper money with your eyes',
          yo: 'Àṣàyàn A dára jù nítorí o lè fi ojú rẹ rí owó náà',
          pcm: 'Option A sweet pass because you dey see the paper note',
        },
        isCorrect: false,
        explanation: {
          en: 'Seeing paper money tempts you to spend it impulsively.',
          yo: 'Ríri owó ń gbé ẹ̀mí ìnáwó wá.',
          pcm: 'Seeing cash tempts you to spend it on snacks.',
        },
      },
    ],
    educationalTip: {
      en: 'Albert Einstein called compound interest the 8th wonder of the world: He who understands it earns it; he who does not pays it.',
      yo: 'Èrè lórí èrè jẹ́ ohun ìyebíye: Ẹni tó bá gbọ́ ọ yóò jèrè rẹ̀.',
      pcm: 'Compound interest na magic: Money wey you save go born children, and those children go born grandchildren.',
    },
    encouragement: {
      en: 'Wealth-building visionary! You are thinking like an experienced investor.',
      yo: 'Oníṣòwò ńlá! Ìrònú rẹ ti kọjá ti ọmọdé.',
      pcm: 'Investor mindset! You go soon buy shares and assets.',
    },
    points: 70,
  },
  {
    id: 'fl-18',
    dayNumber: 18,
    skillId: 'financial-literacy',
    difficulty: 'sss',
    type: 'text',
    title: {
      en: 'Evaluating a "Quick Doubler" Online Scheme',
      yo: 'Bí A Ṣe Ń Mọ Ẹ̀tàn "Owó Yára Pọ̀" (Ponzi Scheme)',
      pcm: 'How to Spot Online Money Doubling Scam',
    },
    scenario: {
      en: 'A WhatsApp contact sends a link: "Invest ₦5,000 now and get ₦25,000 credited to your account in 24 hours guaranteed! No risk! Join 10,000 winners today!"',
      yo: 'Ọ̀rẹ́ rẹ lórí WhatsApp fi ìkànnì ránṣẹ́ sí ọ: "Fi ₦5,000 dókòwò báyìí kí o gba ₦25,000 sínú àkántì rẹ láàárín wákàtí 24! Kò sí ewu kankan! Ẹgbẹẹgbẹ̀rún ènìyàn ló ti jèrè!"',
      pcm: 'Somebody send you WhatsApp link: "Invest ₦5,000 now and receive ₦25,000 inside your account in 24 hours guaranteed! Zero risk! Join 10,000 winners today!"',
    },
    question: {
      en: 'List two clear red flags in this message that prove it is a scam, and state what will actually happen to your ₦5,000 if you send it.',
      yo: 'Sọ àwọn àmì ewu méjì tí ó fi hàn kedere pé ẹ̀tàn ni, kí o sì sọ ohun tí yóò ṣẹlẹ̀ sí owó ₦5,000 rẹ tí o bá fi ránṣẹ́.',
      pcm: 'List two red flags in this message wey show say na scam, and write wetin go really happen to your ₦5,000 if you send am.',
    },
    sampleAnswer: {
      en: 'Red flag 1: Unrealistic 400% profit in 24 hours (no legitimate business generates such returns legally). Red flag 2: "Guaranteed / No risk" claim (every real investment carries calculated risk). If you send the money, the scammers will block your number and steal your ₦5,000.',
      yo: 'Àmì 1: Èrè 400% láàárín wákàtí 24 jẹ́ irọ́ tààrà; kò sí iṣẹ́ tòótọ́ tó ń mú irú owó bẹ́ẹ̀ wá. Àmì 2: Wọ́n sọ pé "Kò sí ewu kankan". Tí o bá fi owó náà ránṣẹ́, wọ́n yóò gba owó rẹ tí wọn yóò sì ti lẹ́yìn rẹ.',
      pcm: 'Red flag 1: 500% profit in 24 hours is impossible in real life. Red flag 2: Saying "zero risk" na lie because every business get risk. If you send the ₦5,000, dem go block you immediately and your money don go.',
    },
    educationalTip: {
      en: 'The Golden Scam Rule: If it sounds too good to be true, it is ALWAYS a scam. Legitimate wealth comes through value creation, skills, or patience.',
      yo: 'Tí nǹkan kan bá dùn jù láti jẹ́ òtítọ́, ẹ̀tàn ni! Ọrọ̀ gidi ń wá láti ọwọ́ iṣẹ́, ìmọ̀, àti sùúrù.',
      pcm: 'If e too sweet to be true, na 100% scam. True money dey come from work, skills, and patience.',
    },
    encouragement: {
      en: 'Scam-proof mindset! You just protected your hard-earned capital from internet fraudsters.',
      yo: 'Ọpọlọ tó láàbò! O ti gba owó rẹ lọ́wọ́ àwọn gbajúmọ̀ orí ayélujára.',
      pcm: 'Scam-proof brain! Yahoo boys no fit see your money chop.',
    },
    points: 80,
  },

  // ==========================================
  // SKILL 4: CREATIVE PROBLEM-SOLVING (19 to 24)
  // ==========================================
  {
    id: 'cps-19',
    dayNumber: 19,
    skillId: 'creative-problem-solving',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'The Power Outage Study Hack',
      yo: 'Ọgbọ́n Àtinúdá Kíkàwé Nígbà tí Iná Bá Kú',
      pcm: 'How to Study When NEPA Take Light',
    },
    scenario: {
      en: 'NEPA takes light just as you sit down to study for tomorrow’s spelling test. Your phone torch has only 12% battery left and its beam is narrow.',
      yo: 'Iná kú ní kété tí o jókòó láti kàwé fún ìdánwò ọ̀la. Bátìrì tọ́ọ̀ṣì fóònù rẹ kù 12% péré, ìmọ́lẹ̀ rẹ̀ sì tín-ín-rín.',
      pcm: 'NEPA strike just as you sit down to read for tomorrow spelling test. Your phone battery remain 12% and the torchlight beam dey small.',
    },
    question: {
      en: 'How can you creatively illuminate your entire room/desk with minimal battery?',
      yo: 'Báwo ni o ṣe lè lo ọgbọ́n àtinúdá láti mú kí ìmọ́lẹ̀ fóònù náà tàn káàkiri gbogbo yàrá?',
      pcm: 'How you fit use creative brain make that small phone torch light up the whole room?',
    },
    options: [
      {
        id: 'opt-19a',
        text: {
          en: 'Turn the phone brightness to 100% and hold it 2 centimeters from your eyes',
          yo: 'Mú kí ìmọ́lẹ̀ fóònù pọ̀ sí i kí o sì gbé e súnmọ́ ojú rẹ',
          pcm: 'Put brightness on max and hold phone close to your eye',
        },
        isCorrect: false,
        explanation: {
          en: 'This drains the battery in 3 minutes and hurts your eyes.',
          yo: 'Yóò pa bátìrì náà run kíákíá tí yóò sì ba ojú jẹ́.',
          pcm: 'This one go kill the battery fast and pain your eye.',
        },
      },
      {
        id: 'opt-19b',
        text: {
          en: 'Place the phone flashlight facing upward underneath a clear transparent plastic bottle of clean water',
          yo: 'Gbé tọ́ọ̀ṣì fóònù náà kọjú sí òkè sábẹ́ kọ́ọ̀bù tàbí rọ́bà omi tútù tó mọ́ kedere',
          pcm: 'Turn the torchlight face up and put transparent bottle of clean water on top am',
        },
        isCorrect: true,
        explanation: {
          en: 'Genius physics! Water refracts and diffuses light in all directions, turning a point beam into a soft 360-degree ambient lantern.',
          yo: 'Ọgbọ́n àrà! Omi yóò pín ìmọ́lẹ̀ náà káàkiri yàrá bí iná àbájọdé tòótọ́.',
          pcm: 'Correct physics hack! The water go spread the light everywhere like lantern.',
        },
      },
      {
        id: 'opt-19c',
        text: {
          en: 'Go to sleep and tell teacher that NEPA caused you to fail',
          yo: 'Lọ sùn kí o sì sọ fún olùkọ́ pé iná tó kú ló fà á',
          pcm: 'Go sleep and tell teacher say na NEPA fault',
        },
        isCorrect: false,
        explanation: {
          en: 'Excuses don’t build character or knowledge!',
          yo: 'Àwáwí kìí kọ́ ìmọ̀ tàbí ìwà rere.',
          pcm: 'Excuses no go pass exam for you.',
        },
      },
      {
        id: 'opt-19d',
        text: {
          en: 'Light three matchsticks at the same time and read as fast as you can before they burn out',
          yo: 'Tan ìṣáná mẹ́ta lẹ́ẹ̀kan náà kí o kàwé kíákíá kí wọ́n tó kú',
          pcm: 'Strike 3 matches together and rush read before e burn your finger',
        },
        isCorrect: false,
        explanation: {
          en: 'Extremely dangerous fire hazard that lasts only 10 seconds.',
          yo: 'Ewu iná ńlá nìyẹn tí kò sì ní pé rárá.',
          pcm: 'Dangerous fire risk wey go burn your fingers.',
        },
      },
    ],
    educationalTip: {
      en: 'Light diffusion: Transparent water bottles act as natural diffusers, scattering focused LED photons across a wide area.',
      yo: 'Ìtànkálẹ̀ ìmọ́lẹ̀: Omi tó mọ́ ń tú ìmọ́lẹ̀ káàkiri fún àǹfààní gbogbo yàrá.',
      pcm: 'Water acts like bulb diffuser, spreading sharp beam into wide lantern glow.',
    },
    encouragement: {
      en: 'MacGyver problem solver! You innovate with whatever resources you find.',
      yo: 'Ọlọgbọ́n àtinúdá! O ń lo ohun tí o ní láti ṣẹ́gun ìpèníjà.',
      pcm: 'Pure street inventor! You sabi solve problems with wetin dey around you.',
    },
    points: 55,
  },
  {
    id: 'cps-20',
    dayNumber: 20,
    skillId: 'creative-problem-solving',
    difficulty: 'jss',
    type: 'text',
    title: {
      en: 'The Upcycled Plastic Waste Enterprise',
      yo: 'Ìṣẹ̀dá Nǹkan Tuntun Láti Ara Àwọn Ṣílífà Rọ́bà (Upcycling)',
      pcm: 'Turn Trash Pure Water Nylon into Useful Products',
    },
    scenario: {
      en: 'Your school generates over 500 discarded pure water sachets every single day, littering flowerbeds and choking gutters.',
      yo: 'Ilé-ẹ̀kọ́ yín ń da àwọn rọ́bà omi (pure water sachets) tó lé ní 500 nù lojoojúmọ́, èyí sì ń ba àyíká jẹ́.',
      pcm: 'Your school dey throw away pass 500 pure water nylon every day, and e dey block gutters and dirty field.',
    },
    question: {
      en: 'Propose one creative, practical product you and your classmates could craft from washed and woven plastic sachets, and describe who would use it.',
      yo: 'Dábàá ohun èlò tó wúlò kan tí ìwọ àti àwọn akẹgbẹ́ rẹ lè fi àwọn rọ́bà fífọ̀ wọ̀nyí hun tàbí ṣe, kí o sì sọ ẹni tí yóò lò ó.',
      pcm: 'Suggest one creative, useful thing wey una fit make from washed and woven pure water nylon, and who go use am.',
    },
    sampleAnswer: {
      en: 'We can wash, dry, cut into strips, and weave the sachets into waterproof school schoolbags or durable doormats. Primary pupils whose bags tear during rains could use the waterproof backpacks for free or at very low cost.',
      yo: 'A lè fọ àwọn rọ́bà náà, gbẹ wọ́n, gé wọn sí wẹ́wẹ́, kí a sì fi wọ́n hun àpò ìwé tí omi kìí wọ̀ tàbí ẹní ìdọ̀tí ẹnu-ọ̀nà. Àwọn ọmọ ilé-ìwé kéékèèké lè lò ó nígbà òjò.',
      pcm: 'We fit wash the nylon, cut dem into strands, and weave dem into waterproof school bags or rain ponchos for junior students wey rain dey beat on their way to school.',
    },
    educationalTip: {
      en: 'Upcycling turns low-value waste into higher-value functional goods through creative redesign.',
      yo: 'Yíyí nǹkan dọ̀tí padà sí ohun ìní tó níye lórí ń dáàbò bo ayé wa tí ó sì ń dá iṣẹ́ sílẹ̀.',
      pcm: 'Upcycling: Turning wetin people think say na trash into valuable products.',
    },
    encouragement: {
      en: 'Green visionary! You turned an environmental nuisance into economic opportunity.',
      yo: 'Olùtọ́jú àyíká! O ti fi ọgbọ́n sọ dọ̀tí di ọrọ̀.',
      pcm: 'Eco-innovator! That idea fit turn to real green startup.',
    },
    points: 70,
  },
  {
    id: 'cps-21',
    dayNumber: 21,
    skillId: 'creative-problem-solving',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'The Flooded Market Stall Drainage Dilemma',
      yo: 'Ìpèníjà Omi Kíkún Ní Ṣọ́ọ̀bù Ọjà',
      pcm: 'Market Stall Flood Emergency Solution',
    },
    scenario: {
      en: 'Heavy rain causes flash flooding in your mother’s market shop where bags of rice and garri are stored on wooden pallets 10cm off the ground. The water is rising 3cm every 15 minutes.',
      yo: 'Òjò ńlá mú kí omi kún inú ṣọ́ọ̀bù ìyá rẹ níbi tí àwọn àpò ìrẹsì àti gáàrí wà lórí pákó tó ga ní 10cm. Omi náà sì ń gòkè ní 3cm ní gbogbo ìṣẹ́jú mẹ́ẹ̀ẹ́dógún (15 mins).',
      pcm: 'Heavy rain cause flood inside your mama shop where bags of rice and garri dey on top wooden pallet 10cm from floor. Water dey rise 3cm every 15 minutes.',
    },
    question: {
      en: 'You only have 30 minutes before water touches the bags. What is the most effective immediate triage action?',
      yo: 'O ní ìṣẹ́jú 30 péré kí omi tó kan àwọn àpò náà. Igbésẹ̀ wo ló yẹ kí o kọ́kọ́ gbé?',
      pcm: 'You get only 30 minutes before water touch the bags. Wetin be the sharpest action to take first?',
    },
    options: [
      {
        id: 'opt-21a',
        text: {
          en: 'Start sweeping the water outside with a small broom',
          yo: 'Bẹ̀rẹ̀ sí ní fi ìgbálẹ̀ kékeré gbá omi náà jáde',
          pcm: 'Use broom dey sweep water outside one by one',
        },
        isCorrect: false,
        explanation: {
          en: 'Sweeping rising water with a broom is far too slow against a torrential flash flood.',
          yo: 'Gbígbá omi pẹ̀lú ìgbálẹ̀ kò lè borí àkúnya omi òjò.',
          pcm: 'Broom cannot fight flood wey dey rise fast.',
        },
      },
      {
        id: 'opt-21b',
        text: {
          en: 'Stack the bottom rice and garri bags on top of the higher dry bags immediately to elevate them beyond water reach, then build an exterior sandbag barrier',
          yo: 'Gbé àwọn àpò tó wà nísàlẹ̀ gòkè lórí àwọn àpò tó ga lẹ́sẹ̀kẹsẹ̀ kí omi má baà kàn wọ́n, kí o sì lo àpò iyanrìn láti dènà omi lẹ́nu ọ̀nà',
          pcm: 'Stack the bottom bags on top the higher bags immediately to lift dem far from water, then put sandbags at shop door',
        },
        isCorrect: true,
        explanation: {
          en: 'Triage priority: Elevate vulnerable assets immediately first, then block the inflow!',
          yo: 'Igbésẹ̀ ọgbọ́n: Gbé ohun ìní rẹ sókè lẹ́sẹ̀kẹsẹ̀ kí o tó wá ọ̀nà láti ti ilẹ̀kùn fún omi.',
          pcm: 'First protect the food from touching water, then block entrance. Priority first!',
        },
      },
      {
        id: 'opt-21c',
        text: {
          en: 'Sit down and cry while waiting for the rain to stop',
          yo: 'Jókòó kí o sì máa sọkún títí òjò yóò fi dá',
          pcm: 'Sit down dey cry and wait make rain stop',
        },
        isCorrect: false,
        explanation: {
          en: 'Panicking wastes critical minutes.',
          yo: 'Ìbẹ̀rù kìí yanju ìṣòro.',
          pcm: 'Crying will destroy the merchandise.',
        },
      },
      {
        id: 'opt-21d',
        text: {
          en: 'Open all bags and start cooking as much as you can',
          yo: 'Ṣí gbogbo àpò kí o bẹ̀rẹ̀ sí ní se oúnjẹ',
          pcm: 'Open all the bags start to cook quick quick',
        },
        isCorrect: false,
        explanation: {
          en: 'Impractical and ruins the inventory completely.',
          yo: 'Èyí kò bọ́gbọ́n mu rárá.',
          pcm: 'Impractical idea.',
        },
      },
    ],
    educationalTip: {
      en: 'Triage principle in crises: Protect the most vulnerable high-value asset before attempting to fix the external environment.',
      yo: 'Ìlànà ìtọ́jú nínú ewu: Dáàbò bo ohun ìní tó níye lórí jù kí o tó wá ojútùú sí àyíká.',
      pcm: 'In emergency: Save the most valuable things first before trying to fix outside problem.',
    },
    encouragement: {
      en: 'Crisis commander! Decisive action under pressure saves livelihoods.',
      yo: 'Akọni àkókò ìpèníjà! Ìgboyà rẹ gba ọrọ̀ ẹbí là.',
      pcm: 'Crisis manager! You dey think fast when tension dey.',
    },
    points: 75,
  },
  {
    id: 'cps-22',
    dayNumber: 22,
    skillId: 'creative-problem-solving',
    difficulty: 'primary',
    type: 'text',
    title: {
      en: 'The Lost Key in the Narrow Gutter Crack',
      yo: 'Kọ́kọ́rọ́ Tó Bọ́ Sínú Koto Tó Há Púpọ̀',
      pcm: 'How to Fish Out Key From Narrow Drain',
    },
    scenario: {
      en: 'Your house padlock key fell through a narrow concrete grating into a dry gutter 1 meter deep. Your arm cannot fit through the slit.',
      yo: 'Kọ́kọ́rọ́ àgbelé kọjá láàárín irin koto tó fẹ́rẹ̀ẹ́ jin tó mítà kan. Ọwọ́ rẹ kò lè wọ inú rẹ̀.',
      pcm: 'Your room key drop inside narrow gutter grating 1 meter deep. The hole too small for your hand to enter.',
    },
    question: {
      en: 'Describe how you can retrieve the key using everyday household items (like a broomstick, chewing gum, magnet, or string) in 2 steps.',
      yo: 'Ṣàpèjúwe bí o ṣe lè lo àwọn ohun èlò ilé (bíi igi ìgbálẹ̀, bọ́ǹbọ́ǹ rírẹ́, kòkòrò òbìrìkì magnet, tàbí okùn) láti mú kọ́kọ́rọ́ náà jáde ní ìgbésẹ̀ méjì.',
      pcm: 'Describe how you fit bring the key out using common things like broomstick, chewing gum, magnet, or thread in 2 steps.',
    },
    sampleAnswer: {
      en: 'Step 1: Tie a strong fridge magnet or chewed sticky gum to the tip of a long broomstick or wire coat hanger. Step 2: Lower the stick gently through the grating until it contacts the metal key, stick to it, and pull it straight up.',
      yo: 'Ìgbésẹ̀ 1: So mágínẹ́ẹ̀tì tàbí bọ́ǹbọ́ǹ alálẹ̀ mọ́ orí igi ìgbálẹ̀ gígùn tàbí wáyà. Ìgbésẹ̀ 2: Rọra sọ ọ́ kalẹ̀ sínú koto títí yóò fi lẹ̀ mọ́ kọ́kọ́rọ́ náà, kí o sì fà á jáde ní pẹ̀lẹ́pẹ̀lẹ́.',
      pcm: 'Step 1: Tie magnet or chewed sticky gum to the tip of long broomstick. Step 2: Push am down gently through the hole until e touch the key, then pull am up carefully.',
    },
    educationalTip: {
      en: 'Lateral thinking: When your biological body cannot reach a target, extend your reach by combining sticky or magnetic tools.',
      yo: 'Ìrònú àtinúdá: Nígbà tí ọwọ́ kò bá ká, lo ohun èlò láti fa agbára rẹ gùn.',
      pcm: 'Lateral thinking: When hand no reach, make a fishing tool with everyday items.',
    },
    encouragement: {
      en: 'Clever inventive mind! You solve real problems without calling for expensive help.',
      yo: 'Ọpọlọ tó jí pépé! O mọ bí a ṣe ń yanju ìṣòro láì náwó.',
      pcm: 'Sharp brain! You be natural engineer.',
    },
    points: 55,
  },
  {
    id: 'cps-23',
    dayNumber: 23,
    skillId: 'creative-problem-solving',
    difficulty: 'jss',
    type: 'mcq',
    title: {
      en: 'The Overcrowded Homework Table',
      yo: 'Àyè Kíkàwé Tó Kún Nínú Yàrá Kékeré',
      pcm: 'Small Space Homework Organization',
    },
    scenario: {
      en: 'You and your two siblings share one small desk for evening studies. Books keep tumbling over, biros get mixed up, and arguments erupt every night.',
      yo: 'Ìwọ àti àwọn ẹ̀gbọ́n rẹ méjì ń lo tẹ́bùrù kékeré kan fún ẹ̀kọ́ alẹ́. Àwọn ìwé máa ń ṣubú, kálàmù ń dọ̀rọ̀, ìjà sì ń bẹ́ sílẹ̀ lálẹ́.',
      pcm: 'You and your two siblings dey share one small table to do assignment. Books dey fall, pen dey lost, and argument dey happen every night.',
    },
    question: {
      en: 'Which low-cost organizational innovation solves this peacefully?',
      yo: 'Ọ̀nà ìṣètò ọlọ́gbọ́n tó rọrùn wo ló lè mú àlàáfíà àti ìtòlẹ́sẹẹsẹ wá?',
      pcm: 'Which cheap organizing idea go solve this wahala once and for all?',
    },
    options: [
      {
        id: 'opt-23a',
        text: {
          en: 'Fight for the table and push your sibling’s books on the floor',
          yo: 'Bá wọn jà kí o sì ti àwọn ìwé wọn sílẹ̀',
          pcm: 'Fight your brother and push his books down',
        },
        isCorrect: false,
        explanation: {
          en: 'Violence creates chaos and invites parent discipline.',
          yo: 'Ìjà kìí mú ètò wá.',
          pcm: 'Fighting will only get everybody in trouble.',
        },
      },
      {
        id: 'opt-23b',
        text: {
          en: 'Repurpose cardboard noodle cartons into vertical desk dividers with personalized labelled book slots for each person',
          yo: 'Lo àwọn páalí indomie àtijọ́ láti ṣe àwọn pápá ìtòjọ ìwé tí a kọ orúkọ olúkálukú sí',
          pcm: 'Cut old indomie carton make vertical book shelves and label each person own with their name',
        },
        isCorrect: true,
        explanation: {
          en: 'Brilliant spatial design! Vertical storage multiplies usable desk space and clear ownership ends friction.',
          yo: 'Ọgbọ́n àrà! Fífi páalí tò nǹkan sí òkè ń fún gbogbo ènìyàn ní àyè púpọ̀.',
          pcm: 'Top design! Vertical storage frees up space and labels stop arguments.',
        },
      },
      {
        id: 'opt-23c',
        text: {
          en: 'Stop doing homework altogether until parents buy a bigger house',
          yo: 'Dáwọ́ iṣẹ́ ilé dúró títí àwọn òbí yóò fi ra ilé ńlá',
          pcm: 'Stop doing homework until parents buy bigger table',
        },
        isCorrect: false,
        explanation: {
          en: 'Harmful procrastination that hurts your academic future.',
          yo: 'Ìkọ̀sílẹ̀ ẹ̀kọ́ kò ní àǹfààní rárá.',
          pcm: 'Procrastination hurts your future.',
        },
      },
      {
        id: 'opt-23d',
        text: {
          en: 'Hide all the biros inside your socks so only you can write',
          yo: 'Fi gbogbo kálàmù pa mọ́ sínú ibọsẹ̀ rẹ kí ìwọ nìkan lè kọ̀wé',
          pcm: 'Hide all pens inside your socks so nobody go write',
        },
        isCorrect: false,
        explanation: {
          en: 'Selfishness exacerbates household conflict.',
          yo: 'Ìwà ìmọ̀-tara-ẹni-nìkan kò dára.',
          pcm: 'Selfishness only brings more quarrel.',
        },
      },
    ],
    educationalTip: {
      en: 'Think vertical: When floor or desk surface area is limited, build upwards using stacked boxes or wall organizers.',
      yo: 'Rò sí òkè: Nígbà tí ilẹ̀ bá kéré, gbé àwọn nǹkan rẹ sí òkè pẹ̀lú páalí.',
      pcm: 'When horizontal surface is small, go vertical! Use walls and stacked boxes.',
    },
    encouragement: {
      en: 'Space architect! Small innovations solve everyday home frustrations.',
      yo: 'Olùṣètò àyè! Ọgbọ́n rẹ ń mú àlàáfíà wá sí inú ilé.',
      pcm: 'Space architect! You sabi turn small space to organized hub.',
    },
    points: 60,
  },
  {
    id: 'cps-24',
    dayNumber: 24,
    skillId: 'creative-problem-solving',
    difficulty: 'sss',
    type: 'text',
    title: {
      en: 'Designing a Mosquito-Deterrent Natural Garden',
      yo: 'Gbígbbin Àwọn Ewéko Tí Ń Lé Ẹ̀fọn Dànù Ní Àyíká Ilé',
      pcm: 'Natural Mosquito Repellent Garden Strategy',
    },
    scenario: {
      en: 'Mosquito sprays are expensive, smell toxic, and run out quickly. You want a sustainable, affordable way to keep mosquitoes away from your bedroom window.',
      yo: 'Oògùn ẹ̀fọn tó ń fọn jáde ti wọ́n gidi, olóorùn líle ni, ó sì ń tètè tán. O fẹ́ ọ̀nà àdánidá láti lé ẹ̀fọn kúrò ní ojú fèrèsé rẹ.',
      pcm: 'Insecticide spray cost too much, smell bad, and finish quick. You need natural, cheap way to drive mosquitoes away from your room window.',
    },
    question: {
      en: 'Name two Nigerian plants or natural herbs (such as lemongrass, neem/dongoyaro, or basil/efinrin) and explain how you would deploy them at your window.',
      yo: 'Dárúkọ ewéko méjì bíi efinrin, kọ̀ọ́bọ̀, tàbí ewé dongoyaro, kí o sì ṣàlàyé bí wàá ṣe fi wọ́n sí ojú fèrèsé rẹ láti dènà ẹ̀fọn.',
      pcm: 'Name two local herbs (like lemongrass, efinrin/scent leaf, or neem/dongoyaro) and explain how you go position dem near your window.',
    },
    sampleAnswer: {
      en: '1. Plant Lemongrass in recycled plastic tins on the window ledge; its natural citronella oil repels mosquitoes. 2. Rub crushed scent leaves (Efinrin) on the window mesh in the evenings. The strong essential aroma keeps mosquitoes from entering.',
      yo: '1. Gbin koríko kọ́ọ̀bọ̀ (Lemongrass) sínú agolo tí a kò lò mọ́ ní etí fèrèsé; òróró àdánidá inú rẹ̀ ń lé ẹ̀fọn. 2. Pa ewé efinrin fífọ́ mọ́ àwọ̀n fèrèsé ní ìrọ̀lẹ́; olóorùn dídùn rẹ̀ kò gbọ́dọ̀ gba ẹ̀fọn láàyè.',
      pcm: '1. Plant lemongrass inside recycled paint buckets on window sill; the citronella oil drives mosquitoes away. 2. Crush scent leaf (efinrin) and rub the juice on the window net every evening to block insects.',
    },
    educationalTip: {
      en: 'Biomimicry and ethnobotany: Indigenous African plants have spent thousands of years developing chemical defenses against pests.',
      yo: 'Ọgbọ́n ewéko: Àwọn ewéko ilẹ̀ wa ní agbára àdánidá láti dáàbò bo ara wọn lọ́wọ́ kòkòrò.',
      pcm: 'Indigenous science: African plants get natural chemicals wey insects hate.',
    },
    encouragement: {
      en: 'Bio-innovator! Natural, sustainable solutions protect both family health and the wallet.',
      yo: 'Olùṣe àtinúdá ìmọ̀-ẹ̀dá! O dáàbò bo àlàáfíà àti àpò owó rẹ.',
      pcm: 'Green scientist! That is pure indigenous genius.',
    },
    points: 75,
  },

  // ==========================================
  // SKILL 5: EMOTIONAL INTELLIGENCE (25 to 30)
  // ==========================================
  {
    id: 'eq-25',
    dayNumber: 25,
    skillId: 'emotional-intelligence',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'Responding to Teasing with Poise',
      yo: 'Fífi Ọgbọ́n Dá Èrò Yíyọ̀ Lójú Lọ́wọ́ Àwọn Akẹ́kọ̀ọ́',
      pcm: 'How to Handle Teasing Without Losing Your Cool',
    },
    scenario: {
      en: 'During break time, a classmate laughs loudly at your shoes because the sole was mended with cobbler thread.',
      yo: 'Ní àkókò ìsinmi, akẹ́kọ̀ọ́ kan rẹ́rìn-ín èsín sí bàtà rẹ nítorí pé oníbàtà ti rán an pẹ̀lú owú.',
      pcm: 'During break, one boy laugh at your school shoes loudly because cobbler mend the sole with black thread.',
    },
    question: {
      en: 'Which response demonstrates high self-esteem and emotional maturity?',
      yo: 'Èsì wo ló ń fi ìgbéraga rere, ìwà ọmọlúwàbí, àti agbára ẹ̀mí hàn?',
      pcm: 'Which response show say you mature and get strong self-confidence?',
    },
    options: [
      {
        id: 'opt-25a',
        text: {
          en: 'Punch him in the face so that nobody ever laughs at you again',
          yo: 'Gbá a ní ẹ̀ṣẹ́ kí ẹnikẹ́ni má baà rẹ́rìn-ín sí ọ mọ́',
          pcm: 'Blow am for nose make nobody laugh at you again',
        },
        isCorrect: false,
        explanation: {
          en: 'Physical retaliation causes injury, suspensions, and gives the teaser power over your emotions.',
          yo: 'Ìjà ń fa ọ̀ràn, ó sì ń fi hàn pé ọ̀rọ̀ rẹ̀ bà ọ́ nínú jẹ́.',
          pcm: 'Violence will get you suspended and show say his talk hurt you.',
        },
      },
      {
        id: 'opt-25b',
        text: {
          en: 'Smile calmly and say: "Yes, my shoes are strong, well-cared for, and they help me run fast on the pitch."',
          yo: 'Ẹ̀rín pẹ̀lẹ́ kí o sì sọ pé: "Bẹ́ẹ̀ ni, bàtà mi lágbára, ó sì ń jẹ́ kí n sáré kíákíá lórí pápá."',
          pcm: 'Smile and say: "Yes, my shoes strong well, well-mended, and e dey help me run fast for football."',
        },
        isCorrect: true,
        explanation: {
          en: 'Supreme poise! When you own your reality with dignity, teasing loses 100% of its sting.',
          yo: 'Igboyà tòótọ́! Tí o bá gba ara rẹ pẹ̀lú ọlá, ẹ̀sín kò ní agbára kankan mọ́ lórí rẹ.',
          pcm: 'Confidence master! When you own your story with pride, teaser power vanishes.',
        },
      },
      {
        id: 'opt-25c',
        text: {
          en: 'Run behind the classroom and weep all afternoon',
          yo: 'Sá lọ sí ẹ̀yìn kíláàsì kí o sì sunkún títí di alẹ́',
          pcm: 'Run go back of class go cry till closing time',
        },
        isCorrect: false,
        explanation: {
          en: 'Your value does not depend on shoe threads; do not internalize cruel remarks.',
          yo: 'Iye rẹ kò sinmi lórí bàtà rẹ; má ṣe jẹ́ kí ọ̀rọ̀ wọn ba ọkàn rẹ jẹ́.',
          pcm: 'Your worth no dey inside shoes. Stand proud!',
        },
      },
      {
        id: 'opt-25d',
        text: {
          en: 'Steal your parent’s money to buy expensive designer sneakers tomorrow',
          yo: 'Jí owó àwọn òbí rẹ láti ra bàtà tuntun ní ọ̀la',
          pcm: 'Steal your mama money to buy expensive designer shoes tomorrow',
        },
        isCorrect: false,
        explanation: {
          en: 'Dishonesty destroys your integrity and future.',
          yo: 'Olè jíjí máa ń ba gbogbo ọjọ́ ọ̀la jẹ́.',
          pcm: 'Stealing is a crime that ruins your integrity.',
        },
      },
    ],
    educationalTip: {
      en: 'Emotional Teflon: Nobody can make you feel inferior without your consent (Eleanor Roosevelt). Disarm teasing with calm self-acceptance.',
      yo: 'Ààbò ọkàn: Ẹnikẹ́ni kò lè rẹ̀ ọ́ sílẹ̀ àyàfi tí o bá gba fún wọn. Gba ara rẹ pẹ̀lú ìfẹ́.',
      pcm: 'Nobody fit bring your spirit down unless you let dem. Own your reality with pride.',
    },
    encouragement: {
      en: 'Unshakable self-worth! True royalty comes from character, not expensive clothes.',
      yo: 'Ìwà ọmọlúwàbí gidi! Ọlá tòótọ́ ń bẹ nínú ìwà rere, kìí ṣe aṣọ olówó gọbọi.',
      pcm: 'Unshakable self-esteem! Character pass designer shoes any day.',
    },
    points: 50,
  },
  {
    id: 'eq-26',
    dayNumber: 26,
    skillId: 'emotional-intelligence',
    difficulty: 'jss',
    type: 'text',
    title: {
      en: 'The Empathetic Sibling Mediation',
      yo: 'Ìrẹ́pọ̀ àti Ìkẹ́kọ̀ọ́ Ẹ̀gbọ́n àti Àbúrò',
      pcm: 'How to Settle Sibling Quarrel with Empathy',
    },
    scenario: {
      en: 'Your younger brother accidentally spilled palm oil on your favorite white church shirt 15 minutes before departure. He is shivering in terror, expecting a beating.',
      yo: 'Àbúrò rẹ da epo pupa sí aṣọ funfun tí o fẹ́ wọ̀ lọ sí ṣọ́ọ̀ṣì ní ìṣẹ́jú 15 kí ẹ tó kúrò nílé. Ẹ̀rù ń bà á, ó sì ń bẹ̀rù pé wàá lù òun lábùkù.',
      pcm: 'Your younger brother mistakenly spill red palm oil on your best white shirt 15 minutes before church. E dey shake with fear say you go beat am.',
    },
    question: {
      en: 'Instead of exploding in anger, what would you say and do to calm him down, fix the immediate clothing problem, and teach him gently?',
      yo: 'Dípò kí o bínú jàràkì, kí ni wàá sọ tí wàá sì ṣe láti tù ú nínú, yanju ìṣòro aṣọ náà, kí o sì kọ́ ọ pẹ̀lú ìfẹ́?',
      pcm: 'Instead of vexing and shouting, wetin you go say and do to calm him down, fix the shirt problem, and teach am carefully?',
    },
    sampleAnswer: {
      en: 'I would take a deep breath, kneel to his eye level and say: "I know it was an accident, don’t cry. You are more important to me than this shirt." Then I will quickly change into my blue shirt, soak the stained shirt in detergent with salt immediately, and remind him to hold bottles with two hands next time.',
      yo: 'N ó mí sílẹ̀, n ó wo ojú rẹ̀ pẹ̀lú ẹ̀rọ̀, n ó sì sọ pé: "Mo mọ̀ pé kìí ṣe mọ̀ọ́mọ̀, má sunkún mọ́. Ìwọ ṣe pàtàkì sí mi ju aṣọ yìí lọ." N ó wọ aṣọ míràn kíákíá, n ó rẹ aṣọ náà sínú ọṣẹ, n ó sì kọ́ ọ láti máa fi ọwọ́ méjèèjì mú igo.',
      pcm: 'I go take deep breath and tell am: "Bros stop crying, na mistake. You dey more important to me pass ordinary shirt." Then I quickly wear my other shirt, soak the stained one with omo and salt, and tell am make e dey use two hands carry bottle next time.',
    },
    educationalTip: {
      en: 'People over objects: A shirt can be washed or replaced, but emotional trauma and broken trust with a sibling last years.',
      yo: 'Ènìyàn ṣe pàtàkì ju ohun ìní lọ: Aṣọ lè dọ̀tí kí a fọ̀ ọ́, ṣùgbọ́n ọgbẹ́ inú ọkàn máa ń pẹ́.',
      pcm: 'People pass material things: A shirt fit wash, but breaking your brother trust will hurt forever.',
    },
    encouragement: {
      en: 'True leader of the family! Practicing empathy in anger is the pinnacle of emotional mastery.',
      yo: 'Aṣáájú tòótọ́ nínú ẹbí! Dídáwọ́ ìbínú dúró jẹ́ àmì ọgbọ́n ńlá.',
      pcm: 'Big brother of life! That kind maturity na wetin make great leaders.',
    },
    points: 70,
  },
  {
    id: 'eq-27',
    dayNumber: 27,
    skillId: 'emotional-intelligence',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'Navigating Peer Pressure at a Party',
      yo: 'Kíkọ Ìfipamọ́ra Àwọn Ọ̀rẹ́ (Peer Pressure) Lóju Ìgbádùn',
      pcm: 'Saying No to Bad Gang Peer Pressure',
    },
    scenario: {
      en: 'At a secondary school valedictory party, popular seniors pour cough syrup codeine into cups and mock anyone who refuses to drink: "Guy you dey fear? Are you a baby?"',
      yo: 'Ní àpèjẹ ilé-ẹ̀kọ́, àwọn akẹ́kọ̀ọ́ àgbà ń da oògùn olóró sínú ife, wọ́n sì ń fi ẹni tó bá kọ̀ ṣẹlẹ́yà: "Ṣé ẹ̀rù ń bà ọ́ ni? Ṣé ọmọdé ni ẹ?"',
      pcm: 'For end of year party, some senior boys dey mix codeine into cup and dey mock whoever say no: "Guy you dey fear? You be small pikin?"',
    },
    question: {
      en: 'What is the most emotionally intelligent way to exit this dangerous trap with your dignity intact?',
      yo: 'Ọ̀nà ọlọ́gbọ́n wo ló dára jù láti bọ́ nínú ewu yìí pẹ̀lú ọlá àti ààbò rẹ?',
      pcm: 'Wetin be the smartest way to comot from this dangerous trap without losing your self-respect?',
    },
    options: [
      {
        id: 'opt-27a',
        text: {
          en: 'Drink it so that you feel accepted and popular among the senior students',
          yo: 'Mu ún kí o lè di olókìkí láàárín àwọn ẹ̀gbọ́n rẹ',
          pcm: 'Drink am make you look like big boy and belong to the squad',
        },
        isCorrect: false,
        explanation: {
          en: 'Substance abuse destroys youth health and can trigger addiction or poisoning.',
          yo: 'Oògùn olóró ń pa ọjọ́ ọ̀la run.',
          pcm: 'Drug abuse destroys your future and brain.',
        },
      },
      {
        id: 'opt-27b',
        text: {
          en: 'Look them directly in the eye, say firmly "I don’t do syrups, I’m good with my Chapman", and walk away to your real friends',
          yo: 'Wo ojú wọn tààrà, sọ pẹ̀lú ìdúróṣinṣin pé "N kìí mu irú nǹkan bẹ́ẹ̀, omi mi tó mi", kí o sì kúrò níbẹ̀ lọ sí ọ̀dọ̀ àwọn ọ̀rẹ́ tòótọ́',
          pcm: 'Look dem eye to eye, say with full chest "I no dey take that stuff, Chapman dey okay for me", then waka go meet your real friends',
        },
        isCorrect: true,
        explanation: {
          en: 'Clear boundaries without apologizing for your standards. Confidence commands unspoken respect.',
          yo: 'Ìpinnu tó dájú! Mímọ ohun tó tọ́ àti dídúró lórí rẹ̀ ń mú ọ̀wọ̀ wá.',
          pcm: 'Firm boundary! Standing on your principles shows true strength.',
        },
      },
      {
        id: 'opt-27c',
        text: {
          en: 'Pretend to drink it and secretly pour it into your pocket',
          yo: 'Ṣe bí ẹni pé o ń mu ún kí o sì da á sínú àpò rẹ',
          pcm: 'Pretend to drink am and pour am inside pocket',
        },
        isCorrect: false,
        explanation: {
          en: 'Silly and leaves you soaked in chemicals.',
          yo: 'Èyí kò bọ́gbọ́n mu tí yóò sì ba aṣọ rẹ jẹ́.',
          pcm: 'You go just soak your trousers for nothing.',
        },
      },
      {
        id: 'opt-27d',
        text: {
          en: 'Start preaching and yelling insults at everyone in the party',
          yo: 'Bẹ̀rẹ̀ sí ní bú gbogbo ènìyàn ní ibi àpèjẹ náà',
          pcm: 'Start to abuse everybody and scatter the party',
        },
        isCorrect: false,
        explanation: {
          en: 'Aggressive provocation in an intoxicated gathering endangers your physical safety.',
          yo: 'Ìbínú lágbo àwọn tí ọpọlọ wọn kò pé lè fa ìpalára sí ara rẹ.',
          pcm: 'Provoking people who are already intoxicated is risky.',
        },
      },
    ],
    educationalTip: {
      en: 'The Boundary Rule: "No" is a complete sentence. Real friends never pressure you to poison your body or violate your values.',
      yo: 'Òfin Ìpinnu: "Rárá" jẹ́ gbólóhùn tó pé. Ọ̀rẹ́ tòótọ́ kìí tì ọ́ sínú kòtò ewu.',
      pcm: 'Rule of Boundaries: "No" na complete sentence. Real friends go respect your choices.',
    },
    encouragement: {
      en: 'Iron will! Standing alone for what is right is the rarest form of courage.',
      yo: 'Agbára ẹ̀mí! Dídúró fún òtítọ́ nìkan jẹ́ àmì akin.',
      pcm: 'Iron backbone! Standing on your truth makes you a legend.',
    },
    points: 75,
  },
  {
    id: 'eq-28',
    dayNumber: 28,
    skillId: 'emotional-intelligence',
    difficulty: 'primary',
    type: 'mcq',
    title: {
      en: 'Recognizing When a Friend is Secretly Hurting',
      yo: 'Bí A Ṣe Ń Mọ Nígbà Tí Ọkàn Ọ̀rẹ́ Wa Kò Bá Lálàáfíà',
      pcm: 'How to Notice When Your Friend is Sad Inside',
    },
    scenario: {
      en: 'Your cheerful classmate Aisha suddenly sits alone at lunchtime, barely touches her jollof rice, and keeps her head down on the desk.',
      yo: 'Ọ̀rẹ́ rẹ Aisha tó máa ń dárìkọ́ fún ayọ̀ jókòó nìkan ní àkókò oúnjẹ, kò jẹ ìrẹsì rẹ̀, ó sì tẹríba mọ́ orí tẹ́bùrù.',
      pcm: 'Your friend Aisha wey dey always laugh suddenly dey sit down alone for break time, she no touch her jollof rice, and her head dey on top desk.',
    },
    question: {
      en: 'What is the kindest, most empathetic way to support her?',
      yo: 'Ọ̀nà ìkẹ́kọ̀ọ́ àti ìrẹ́pọ̀ wo ló dára jù láti tì í lẹ́yìn?',
      pcm: 'Wetin be the kindest way to show her love and care?',
    },
    options: [
      {
        id: 'opt-28a',
        text: {
          en: 'Eat her jollof rice since she is not eating it',
          yo: 'Jẹ oúnjẹ rẹ̀ nítorí pé kò jẹ ẹ́',
          pcm: 'Chop her food since she no dey eat am',
        },
        isCorrect: false,
        explanation: {
          en: 'Insensitive and selfish.',
          yo: 'Èyí kò ní ìfẹ́ kankan nínú.',
          pcm: 'Very selfish behavior.',
        },
      },
      {
        id: 'opt-28b',
        text: {
          en: 'Sit quietly beside her and say: "I noticed you seem quiet today Aisha. If you want to talk, I am here to listen. No pressure."',
          yo: 'Jókòó pẹ̀lú rẹ̀ jẹ́ẹ́ kí o sọ pé: "Aisha, mo kíyèsí pé ọkàn rẹ kò balẹ̀ lónìí. Tí o bá fẹ́ sọ̀rọ̀, mo wà níhìn-ín láti tẹ́tí sí ọ."',
          pcm: 'Sit down gently by her side and say: "Aisha I notice say you quiet today. If you wan talk, I dey here to listen. No pressure."',
        },
        isCorrect: true,
        explanation: {
          en: 'Spot on! Empathy does not judge or force; it offers gentle presence and a safe ear.',
          yo: 'Ó pé rẹ́tẹ́! Ìkẹ́ tòótọ́ kìí fi agbára wá ọ̀rọ̀; ó ń fúnni ní àyè pẹ̀lú ìfẹ́.',
          pcm: 'Golden empathy! Quiet presence and open ears heal troubled hearts.',
        },
      },
      {
        id: 'opt-28c',
        text: {
          en: 'Tell the whole class that Aisha is acting weird and laugh at her',
          yo: 'Sọ fún gbogbo kíláàsì pé Aisha ń ya aṣiwèrè kí ẹ sì rẹ́rìn-ín sí i',
          pcm: 'Tell whole class say Aisha dey act strange and laugh am',
        },
        isCorrect: false,
        explanation: {
          en: 'Cruel and ruins friendships.',
          yo: 'Ìwà ìkà nìyẹn tó ń pa ọ̀rẹ́ run.',
          pcm: 'Cruel behavior that causes deep pain.',
        },
      },
      {
        id: 'opt-28d',
        text: {
          en: 'Ignore her completely because her bad mood might spoil your day',
          yo: 'Kọ̀ ọ́ sílẹ̀ pátápátá kí ìbànújẹ́ rẹ̀ má baà ba ayọ̀ rẹ jẹ́',
          pcm: 'Ignore her totally make her mood no spoil your own day',
        },
        isCorrect: false,
        explanation: {
          en: 'True friends show up during tough days, not just on fun days.',
          yo: 'Ọ̀rẹ́ tòótọ́ ń wà nígbà ìṣòro, kìí ṣe nígbà ayọ̀ nìkan.',
          pcm: 'True friendship is tested in low moments.',
        },
      },
    ],
    educationalTip: {
      en: 'The Art of Active Listening: You don’t need to have all the answers. Often, simply being present and listening without judgment is the greatest gift.',
      yo: 'Ọgbọ́n Ìfetísílẹ̀: O kò nílò láti ní gbogbo ojútùú. Dídúró ti ọ̀rẹ́ nìkan tó láti fún un ní ìrètí.',
      pcm: 'Active listening: You no need to give advice immediately, just listen and care.',
    },
    encouragement: {
      en: 'Compassionate soul! Empathy is the glue of healthy human communities.',
      yo: 'Ọlọ́kàn rere! Ìkẹ́ni ló ń mú kí àwùjọ dára.',
      pcm: 'Heart of gold! You be the kind of friend everybody prays to have.',
    },
    points: 50,
  },
  {
    id: 'eq-29',
    dayNumber: 29,
    skillId: 'emotional-intelligence',
    difficulty: 'jss',
    type: 'text',
    title: {
      en: 'Turning Examination Failure into Future Victory',
      yo: 'Yíyí Ìkùnà Ìdánwò Padà Sí Ìṣẹ́gun Ọjọ́ Iwájú',
      pcm: 'How to Bounce Back After Failing Exam',
    },
    scenario: {
      en: 'You studied hard, but when your Mathematics report sheet arrived, you scored 42% (F9). You feel devastated, ashamed, and want to tear up the paper.',
      yo: 'O kàwé gan-an, ṣùgbọ́n nígbà tí àbájáde ìdánwò ìṣirò (Maths) dé, o gba 42% (F9). Ojú ń tì ọ́, inú rẹ bàjẹ́, o sì fẹ́ fa ìwé náà ya.',
      pcm: 'You read well, but when your Maths report card come out, you see 42% (F9). Shame catch you and you feel like tearing the paper.',
    },
    question: {
      en: 'Write a 3-step growth mindset action plan that transforms this disappointment into an "A" grade in the next term.',
      yo: 'Kọ ìlànà igbésẹ̀ 3 ti ọgbọ́n ìlọsíwájú tó lè yí ìbànújẹ́ yìí padà sí àmì "A" ní sáà tó ń bọ̀.',
      pcm: 'Write 3-step plan wey go turn this disappointment into "A" grade for next term.',
    },
    sampleAnswer: {
      en: 'Step 1: Allow myself to feel sad today, but remind myself: "Failing one test means my study method failed, not that I am a failure." Step 2: Review the exam script with my math teacher to pinpoint exact error topics (e.g. Fractions & Algebra). Step 3: Dedicate 30 minutes every day to practice 5 past questions on those weak topics with a study partner.',
      yo: 'Ìgbésẹ̀ 1: Gbà pé inú bí mi lónìí, ṣùgbọ́n mọ̀ pé ọgbọ́n kíkàwé mi ló kùnà, kìí ṣe ọpọlọ mi. Ìgbésẹ̀ 2: Fi ìwé ìdánwò náà han olùkọ́ kí a lè mọ àwọn orí-ọ̀rọ̀ tí mo kù sí. Ìgbésẹ̀ 3: Ya ìṣẹ́jú 30 sọ́tọ̀ lojoojúmọ́ láti ṣe ìbéèrè márùn-ún lórí àwọn ẹ̀kọ́ náà.',
      pcm: 'Step 1: Breathe and tell myself: "I fail test, but I no be failure. My method need change." Step 2: Take the exam paper go meet teacher make e show me where I miss marks. Step 3: Practice 5 past questions every day for 30 minutes until next term exam.',
    },
    educationalTip: {
      en: 'Growth Mindset: The word "YET". Instead of saying "I cannot do math", say "I have not mastered this math topic YET". Failure is data, not your identity.',
      yo: 'Ọgbọ́n Ìdàgbàsókè: Dípò sísọ pé "N kò mọ ìṣirò", sọ pé "N kò tíì mọ orí-ọ̀rọ̀ yìí DÁADÁA". Ìkùnà jẹ́ ẹ̀kọ́.',
      pcm: 'Growth mindset: Failure is just feedback. Add "YET" to your sentences: "I never understand am YET".',
    },
    encouragement: {
      en: 'Resilience warrior! Champions are defined by how many times they get back up.',
      yo: 'Akọni àìkùnà! Àwọn aṣẹ́gun ni àwọn tó ń dìde nígbà tí wọ́n bá ṣubú.',
      pcm: 'True champion! Fall seven times, stand up eight times.',
    },
    points: 70,
  },
  {
    id: 'eq-30',
    dayNumber: 30,
    skillId: 'emotional-intelligence',
    difficulty: 'sss',
    type: 'mcq',
    title: {
      en: 'The Apology That Restores Broken Trust',
      yo: 'Àforíjìn Tòótọ́ Tó Ń Mú Àjọṣepọ̀ Padà Bọ̀ Sípò',
      pcm: 'How to Apologize Sincerly When You Are Wrong',
    },
    scenario: {
      en: 'In a moment of anger, you spread a false rumor that your friend leaked test questions. You now discover she was completely innocent. The rumor caused her immense distress.',
      yo: 'Nígbà tí inú bí ọ, o sọ ọ̀rọ̀ irọ́ pé ọ̀rẹ́ rẹ tú àwọn ìbéèrè ìdánwò jáde. Ní báyìí o rí i pé kò mọ nǹkankan nípa rẹ̀. Ọ̀rọ̀ náà bà á nínú jẹ́ púpọ̀.',
      pcm: 'When you vex, you spread fake rumor say your friend leak exam questions. Now you find out say she be innocent. The rumor don make her cry well well.',
    },
    question: {
      en: 'Which response is a genuine, restorative apology that repairs the relationship?',
      yo: 'Èsì wo ni àforíjìn tòótọ́ tó lè tún àjọṣepọ̀ ṣe?',
      pcm: 'Which apology be the genuine one wey fit heal the pain and restore trust?',
    },
    options: [
      {
        id: 'opt-30a',
        text: {
          en: '"I’m sorry, but you shouldn’t have made me angry in the first place."',
          yo: '"Pẹ̀lẹ́ o, ṣùgbọ́n ìwọ ló kọ́kọ́ mú mi bínú."',
          pcm: '"I am sorry, but na you make me vex first."',
        },
        isCorrect: false,
        explanation: {
          en: 'A "fake apology" with a "but" shifts the blame back to the victim.',
          yo: 'Àforíjìn tó ní "ṣùgbọ́n" kìí ṣe àforíjìn tòótọ́, ẹ̀sùn ni.',
          pcm: 'Any apology wey get "but" na fake apology.',
        },
      },
      {
        id: 'opt-30b',
        text: {
          en: '"I was completely wrong to spread that lie. I took my anger out on you and hurt your reputation. I am going back to everyone I told to clear your name, and I ask for your forgiveness."',
          yo: '"Mo ṣìnà pátápátá láti sọ irọ́ náà. Mo fi ìbínú pa orúkọ rere rẹ jẹ́. Mo ń lọ sọ́dọ̀ gbogbo àwọn tí mo bá sọ̀rọ̀ láti tún orúkọ rẹ ṣe, mo sì bẹ̀ ọ́ fún àforíjìn."',
          pcm: '"I dey 100% wrong to spread that lie. I let anger push me to spoil your good name. I go meet everybody wey hear am tell dem say na lie, and I beg for your forgiveness."',
        },
        isCorrect: true,
        explanation: {
          en: 'The 4 components of true apology: 1. Own fault fully, 2. Acknowledge the specific pain caused, 3. Take active corrective action (clearing her name), 4. Ask for forgiveness without entitlement.',
          yo: 'Àwọn ohun mẹ́rin ti àforíjìn tòótọ́: Gbígba ẹ̀bi, mímọ ìrora ẹlòmíràn, títún iṣẹ́ ṣe, àti títọrọ àforíjìn pẹ̀lú ìrẹ̀lẹ̀.',
          pcm: 'Masterclass apology: Take full blame + acknowledge harm + take action to fix damage + ask for forgiveness gently.',
        },
      },
      {
        id: 'opt-30c',
        text: {
          en: 'Send her a laughing emoji on WhatsApp and say "It was just a prank bro"',
          yo: 'Fi àwòrán ẹ̀rín ránṣẹ́ lórí WhatsApp kí o sì sọ pé "Àwàdà ni mo ń ṣe"',
          pcm: 'Send laughing emoji on WhatsApp say "Na cruise I dey catch"',
        },
        isCorrect: false,
        explanation: {
          en: 'Calling cruel behavior "a prank" adds insult to injury.',
          yo: 'Pípè ìwà búburú ní "àwàdà" ń pọ̀ sí ìrora.',
          pcm: 'Calling betrayal "cruise" shows zero remorse.',
        },
      },
      {
        id: 'opt-30d',
        text: {
          en: 'Avoid her forever and pretend you never were friends',
          yo: 'Yẹra fún un títí láé kí o sì ṣe bí ẹni pé ẹ kìí ṣe ọ̀rẹ́ rí',
          pcm: 'Dodge her forever and act like you never know her',
        },
        isCorrect: false,
        explanation: {
          en: 'Cowardice prevents personal growth and leaves guilt festering.',
          yo: 'Ìwà ojo kìí mú ìdàgbàsókè wá.',
          pcm: 'Running away shows cowardice.',
        },
      },
    ],
    educationalTip: {
      en: 'The Anatomy of Restitution: Words alone cannot erase damage; you must actively labor to restore whatever reputation or property was harmed.',
      yo: 'Títún Nǹkan Ṣe: Ọ̀rọ̀ ẹnu kọ́ ló ń fọ orúkọ tó bàjẹ́; o gbọ́dọ̀ gbé igbésẹ̀ tòótọ́ láti tún un ṣe.',
      pcm: 'Restitution: Real apologies involve repairing the damage you caused.',
    },
    encouragement: {
      en: 'Character in its purest form! Humility and moral integrity define true greatness.',
      yo: 'Ìwà ọmọlúwàbí tó ga jùlọ! Ìrẹ̀lẹ̀ àti òtítọ́ ló ń sọ ènìyàn di ńlá.',
      pcm: 'Integrity champion! It takes supreme courage to admit wrong and make it right.',
    },
    points: 80,
  },
];

