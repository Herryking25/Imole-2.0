import type { SkillId } from '../types/skills';
import { SubmissionService } from './submissionService';
import { ChallengeService } from './challengeService';
import { ProfileService } from './profileService';

export interface SkillResponseItem {
  id: string;
  challengeId: string;
  title: string;
  skillId: SkillId;
  difficulty: 'primary' | 'jss' | 'sss';
  difficultyLabel: 'Easy' | 'Medium' | 'Hard';
  difficultyStars: number;
  date: string;
  question: string;
  childAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  learningTip: string;
  actionNote: string;
  actionType: 'warning' | 'retry' | 'success';
}

export interface SkillSummaryStats {
  total: number;
  correct: number;
  wrong: number;
  scorePercentage: number;
}

const DEFAULT_BREAKDOWN_DATA: Record<SkillId, SkillResponseItem[]> = {
  'mental-math-logic': [
    {
      id: 'mml-res-1',
      challengeId: 'mml-01',
      title: 'Quick Change',
      skillId: 'mental-math-logic',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 15, 2026',
      question:
        'You buy 3 biscuits at ₦150 each. You pay ₦500. What is your change and what percentage of your money did you spend?',
      childAnswer: '₦50 change, 85% spent',
      correctAnswer: '₦50 change, 90% spent',
      isCorrect: false,
      learningTip:
        'Always calculate the total cost first: 3 × ₦150 = ₦450. Then subtract from ₦500 = ₦50 change. Percentage: ₦450/₦500 = 90%.',
      actionNote: 'Wrong - Review the percentage calculation together',
      actionType: 'warning',
    },
    {
      id: 'mml-res-2',
      challengeId: 'mml-02',
      title: 'Danfo Bus Capacity',
      skillId: 'mental-math-logic',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 14, 2026',
      question:
        'A Danfo bus starts with 14 passengers. 5 get off and 8 get on. At Ojota, half get off. Excluding driver and conductor, how many passengers remain?',
      childAnswer: '8 passengers remain in the bus',
      correctAnswer: '8 passengers remain in the bus',
      isCorrect: true,
      learningTip:
        'Solve multi-step problems in stages: 14 - 5 = 9, 9 + 8 = 17. Half of 17 rounded for seated passengers gives 8.',
      actionNote: 'Correct! Step-by-step logic applied perfectly!',
      actionType: 'success',
    },
    {
      id: 'mml-res-3',
      challengeId: 'mml-03',
      title: 'Budget Planning',
      skillId: 'mental-math-logic',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 13, 2026',
      question:
        'If you have ₦1,200 for lunch and drinks across 4 school days, how much can you spend each day?',
      childAnswer: '₦300 per day',
      correctAnswer: '₦300 per day',
      isCorrect: true,
      learningTip: '₦1,200 ÷ 4 days = ₦300/day. Exact budget allocation mastered!',
      actionNote: 'Correct! Accurate division!',
      actionType: 'success',
    },
    {
      id: 'mml-res-4',
      challengeId: 'mml-04',
      title: 'Calculate Change',
      skillId: 'mental-math-logic',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 12, 2026',
      question:
        'You buy a loaf of bread for ₦650 and give the cashier a ₦1,000 note. How much change do you receive?',
      childAnswer: '₦450 change',
      correctAnswer: '₦350 change',
      isCorrect: false,
      learningTip:
        '₦1,000 - ₦600 = ₦400, then subtract ₦50 = ₦350. Watch out for mental borrowing!',
      actionNote: 'Wrong - Practice mental subtraction with ₦50 units',
      actionType: 'retry',
    },
    {
      id: 'mml-res-5',
      challengeId: 'mml-05',
      title: 'Fruit Market Ratio',
      skillId: 'mental-math-logic',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 11, 2026',
      question:
        'A bag contains 6 oranges and 12 bananas. What is the simplified ratio of oranges to bananas in the bag?',
      childAnswer: '1 to 2 ratio',
      correctAnswer: '1 to 2 ratio',
      isCorrect: true,
      learningTip: 'Divide both sides by their highest common factor (6): 6÷6 = 1 and 12÷6 = 2.',
      actionNote: 'Correct! Solid grasp of simplifying ratios!',
      actionType: 'success',
    },
    {
      id: 'mml-res-6',
      challengeId: 'mml-06',
      title: 'Market Yam Bulk Discount',
      skillId: 'mental-math-logic',
      difficulty: 'sss',
      difficultyLabel: 'Hard',
      difficultyStars: 3,
      date: 'June 10, 2026',
      question:
        '5 tubers of yam cost ₦12,500. If the seller offers a 10% discount for buying in bulk, what is the final price?',
      childAnswer: '₦11,500 total',
      correctAnswer: '₦11,250 total',
      isCorrect: false,
      learningTip:
        '10% of ₦12,500 = ₦1,250. Subtract ₦1,250 from ₦12,500 to get ₦11,250. Check the subtraction!',
      actionNote: 'Wrong - Review multi-digit subtraction from thousands',
      actionType: 'warning',
    },
  ],
  'financial-literacy': [
    {
      id: 'fl-res-1',
      challengeId: 'fl-01',
      title: 'Save ₦15,000',
      skillId: 'financial-literacy',
      difficulty: 'sss',
      difficultyLabel: 'Hard',
      difficultyStars: 3,
      date: 'June 14, 2026',
      question:
        'You earn ₦2,000 weekly pocket money. Plan how to save ₦15,000 in 8 weeks.',
      childAnswer: 'Save ₦1,875 per week for 8 weeks',
      correctAnswer: 'Save ₦1,875 per week for 8 weeks',
      isCorrect: true,
      learningTip:
        'Divide ₦15,000 by 8 weeks = ₦1,875 per week. Good planning and discipline!',
      actionNote: 'Correct! Great financial math logic!',
      actionType: 'success',
    },
    {
      id: 'fl-res-2',
      challengeId: 'fl-02',
      title: 'Budget Planning',
      skillId: 'financial-literacy',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 13, 2026',
      question:
        'If you have ₦1,200 for lunch and drinks across 4 school days, how much can you spend each day?',
      childAnswer: '₦300 per day',
      correctAnswer: '₦300 per day',
      isCorrect: true,
      learningTip: '₦1,200 ÷ 4 days = ₦300/day. Exact budget allocation mastered!',
      actionNote: 'Correct! Accurate division!',
      actionType: 'success',
    },
    {
      id: 'fl-res-3',
      challengeId: 'fl-03',
      title: 'Needs vs. Wants',
      skillId: 'financial-literacy',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 12, 2026',
      question:
        'You received ₦5,000 for your birthday. You need a math geometry set (₦2,000) and want a video game card (₦4,000). What is the smartest move?',
      childAnswer: 'Buy the game card first and borrow geometry set',
      correctAnswer: 'Buy the geometry set for ₦2,000 and save the remaining ₦3,000',
      isCorrect: false,
      learningTip:
        'Needs always take precedence over wants. Secure your learning tools before spending on leisure.',
      actionNote: 'Wrong - Discuss prioritizing essential tools before entertainment',
      actionType: 'warning',
    },
    {
      id: 'fl-res-4',
      challengeId: 'fl-04',
      title: 'Emergency Fund Wisdom',
      skillId: 'financial-literacy',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 09, 2026',
      question:
        'Why is it important to set aside at least 10% of every gift or earnings into a secret piggy bank?',
      childAnswer: 'To handle unexpected expenses and emergencies calmly',
      correctAnswer: 'To handle unexpected expenses and emergencies calmly',
      isCorrect: true,
      learningTip:
        'Emergency reserves ensure you never go into crisis when sudden opportunities or needs arise.',
      actionNote: 'Correct! Outstanding understanding of rainy-day savings!',
      actionType: 'success',
    },
    {
      id: 'fl-res-5',
      challengeId: 'fl-05',
      title: 'Comparing Unit Prices',
      skillId: 'financial-literacy',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 07, 2026',
      question:
        'Store A sells 1 pack of juice for ₦400. Store B sells a bundle of 3 packs for ₦1,050. Which is more cost-effective per pack?',
      childAnswer: 'Store A because ₦400 is a smaller single bill',
      correctAnswer: 'Store B because ₦1,050 ÷ 3 = ₦350 per pack (saves ₦50 each)',
      isCorrect: false,
      learningTip:
        'Always calculate unit cost: ₦1,050 ÷ 3 = ₦350. Bulk purchases often offer significant discounts.',
      actionNote: 'Wrong - Practice comparing unit pricing in supermarkets',
      actionType: 'retry',
    },
    {
      id: 'fl-res-6',
      challengeId: 'fl-06',
      title: 'Profit & Loss Concept',
      skillId: 'financial-literacy',
      difficulty: 'sss',
      difficultyLabel: 'Hard',
      difficultyStars: 3,
      date: 'June 05, 2026',
      question:
        'You bought beads for ₦3,000 and made 5 bracelets sold at ₦1,000 each. What is your net profit?',
      childAnswer: '₦2,000 net profit',
      correctAnswer: '₦2,000 net profit',
      isCorrect: true,
      learningTip:
        'Total revenue (5 × ₦1,000 = ₦5,000) minus production cost (₦3,000) = ₦2,000 profit.',
      actionNote: 'Correct! Entrepreneurial arithmetic mastered!',
      actionType: 'success',
    },
  ],
  'persuasive-speaking': [
    {
      id: 'ps-res-1',
      challengeId: 'ps-01',
      title: 'The School Debate Hook',
      skillId: 'persuasive-speaking',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 15, 2026',
      question:
        'You are arguing that school libraries should stay open on Saturdays. What is the most compelling opening hook?',
      childAnswer: 'Start by yelling so everyone becomes quiet',
      correctAnswer: 'Share a brief powerful story about a student needing a quiet place to study',
      isCorrect: false,
      learningTip:
        'Emotion and relatable storytelling capture attention far better than loud volume.',
      actionNote: 'Wrong - Encourage storytelling and empathy hooks in presentations',
      actionType: 'warning',
    },
    {
      id: 'ps-res-2',
      challengeId: 'ps-02',
      title: 'Convincing Your Group Partner',
      skillId: 'persuasive-speaking',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 13, 2026',
      question:
        'Your project partner wants to rush and submit messy slides. How do you convince them politely to polish the work?',
      childAnswer: 'Show them how 15 more minutes will increase both our grades to an A',
      correctAnswer: 'Show them how 15 more minutes will increase both our grades to an A',
      isCorrect: true,
      learningTip:
        'Frame your request around shared benefits rather than criticism.',
      actionNote: 'Correct! Diplomatic and persuasive teamwork!',
      actionType: 'success',
    },
    {
      id: 'ps-res-3',
      challengeId: 'ps-03',
      title: 'Elevator Pitch for Clean Energy',
      skillId: 'persuasive-speaking',
      difficulty: 'sss',
      difficultyLabel: 'Hard',
      difficultyStars: 3,
      date: 'June 11, 2026',
      question:
        'You have 45 seconds to pitch solar lights for your classroom to the PTA. What is the three-part structure to use?',
      childAnswer: 'Problem statement, Clear solution, Call to action',
      correctAnswer: 'Problem statement, Clear solution, Call to action',
      isCorrect: true,
      learningTip:
        'The classic Problem-Solution-Action framework is the gold standard of quick persuasive pitches.',
      actionNote: 'Correct! Impeccable pitch structure!',
      actionType: 'success',
    },
    {
      id: 'ps-res-4',
      challengeId: 'ps-04',
      title: 'Body Language in Speeches',
      skillId: 'persuasive-speaking',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 08, 2026',
      question:
        'When speaking on stage, where should your eyes and posture be focused?',
      childAnswer: 'Look at your shoes so you do not get nervous',
      correctAnswer: 'Stand tall with shoulders back and make steady eye contact across the room',
      isCorrect: false,
      learningTip:
        'Upright posture and warm eye contact project confidence and make listeners trust your words.',
      actionNote: 'Wrong - Practice mirror posture and room eye contact drills',
      actionType: 'retry',
    },
  ],
  'creative-problem-solving': [
    {
      id: 'cps-res-1',
      challengeId: 'cps-01',
      title: 'The Broken Science Model',
      skillId: 'creative-problem-solving',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 15, 2026',
      question:
        'An hour before the science fair, your cardboard volcano splits in half. How do you fix it with available classroom items?',
      childAnswer: 'Use paper mache paste with newspaper and acrylic paint to reinforce the seam',
      correctAnswer: 'Use paper mache paste with newspaper and acrylic paint to reinforce the seam',
      isCorrect: true,
      learningTip:
        'Resourcefulness means using immediate everyday items to create durable quick fixes.',
      actionNote: 'Correct! Incredible quick thinking and adaptability!',
      actionType: 'success',
    },
    {
      id: 'cps-res-2',
      challengeId: 'cps-02',
      title: 'Heavy Rain Water Drainage',
      skillId: 'creative-problem-solving',
      difficulty: 'sss',
      difficultyLabel: 'Hard',
      difficultyStars: 3,
      date: 'June 12, 2026',
      question:
        'Water is pooling by the front doorstep during heavy Lagos rain. What sustainable DIY channel can you design?',
      childAnswer: 'Dig a small gravel trench redirecting water toward the flower garden',
      correctAnswer: 'Dig a small gravel trench redirecting water toward the flower garden',
      isCorrect: true,
      learningTip:
        'Redirecting run-off toward vegetation solves flooding while hydrating plants sustainably.',
      actionNote: 'Correct! Brilliant environmental engineering idea!',
      actionType: 'success',
    },
    {
      id: 'cps-res-3',
      challengeId: 'cps-03',
      title: 'Power Outage Study Lamp',
      skillId: 'creative-problem-solving',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 09, 2026',
      question:
        'The lights went out while studying at 8 PM. How can you amplify the beam of a single phone flashlight across the desk?',
      childAnswer: 'Place the phone flashlight facing under a clear plastic bottle filled with clean water',
      correctAnswer: 'Place the phone flashlight facing under a clear plastic bottle filled with clean water',
      isCorrect: true,
      learningTip:
        'Water acts as a diffuser, scattering direct flashlight rays into ambient room-filling light.',
      actionNote: 'Correct! Superb physics and everyday life hack!',
      actionType: 'success',
    },
    {
      id: 'cps-res-4',
      challengeId: 'cps-04',
      title: 'Sharing Limited Art Supplies',
      skillId: 'creative-problem-solving',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 06, 2026',
      question:
        'Your group has only 1 red marker and 1 blue marker, but needs purple for a poster. What do you do?',
      childAnswer: 'Fight for who keeps the red marker first',
      correctAnswer: 'Layer light red shading over blue to blend a vibrant purple hue',
      isCorrect: false,
      learningTip:
        'Primary color blending allows you to create secondary tones without needing extra markers.',
      actionNote: 'Wrong - Explore color blending techniques together',
      actionType: 'retry',
    },
  ],
  'emotional-intelligence': [
    {
      id: 'ei-res-1',
      challengeId: 'ei-01',
      title: 'Resolving a Football Dispute',
      skillId: 'emotional-intelligence',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 15, 2026',
      question:
        'Your friend was called offside in football and is shouting angrily. How do you de-escalate the tension?',
      childAnswer: 'Calmly step between, acknowledge their frustration, and suggest a fair replay check',
      correctAnswer: 'Calmly step between, acknowledge their frustration, and suggest a fair replay check',
      isCorrect: true,
      learningTip:
        'Acknowledging strong feelings first helps the emotional brain reset before solving the conflict.',
      actionNote: 'Correct! Mature conflict mediator mindset!',
      actionType: 'success',
    },
    {
      id: 'ei-res-2',
      challengeId: 'ei-02',
      title: 'Handling a Poor Exam Score',
      skillId: 'emotional-intelligence',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 13, 2026',
      question:
        'You prepared hard for a spelling test but scored 6/10. What is the healthiest self-talk to practice?',
      childAnswer: 'I am not smart at all, I should stop studying',
      correctAnswer: 'Mistakes show me exactly what words to practice next; I will improve with revision',
      isCorrect: false,
      learningTip:
        'Growth mindset turns setbacks into clear revision maps instead of self-judgment.',
      actionNote: 'Wrong - Reinforce growth mindset affirmations at home',
      actionType: 'warning',
    },
    {
      id: 'ei-res-3',
      challengeId: 'ei-03',
      title: 'Comforting a Sad Classmate',
      skillId: 'emotional-intelligence',
      difficulty: 'primary',
      difficultyLabel: 'Easy',
      difficultyStars: 1,
      date: 'June 10, 2026',
      question:
        'A classmate is sitting alone at break because their lunchbox spilled. How can you demonstrate empathy?',
      childAnswer: 'Walk over, sit with them, and share half of your sandwich and biscuits',
      correctAnswer: 'Walk over, sit with them, and share half of your sandwich and biscuits',
      isCorrect: true,
      learningTip:
        'Empathy is caring in action. Sharing food turns an embarrassing moment into deep friendship.',
      actionNote: 'Correct! True Ọmọlúwàbí character demonstrated!',
      actionType: 'success',
    },
    {
      id: 'ei-res-4',
      challengeId: 'ei-04',
      title: 'Grace in Winning',
      skillId: 'emotional-intelligence',
      difficulty: 'jss',
      difficultyLabel: 'Medium',
      difficultyStars: 2,
      date: 'June 07, 2026',
      question:
        'You defeated your best friend in chess after a 40-minute match. How do you celebrate honorably?',
      childAnswer: 'Laugh at them and tell everyone they lost easily',
      correctAnswer: 'Shake hands sincerely, thank them for a tough game, and praise their best moves',
      isCorrect: false,
      learningTip:
        'Sportsmanship and humility strengthen friendships and make victories truly respectable.',
      actionNote: 'Wrong - Practice respectful post-match celebrations',
      actionType: 'retry',
    },
  ],
};

export class SkillBreakdownService {
  /**
   * Get all response items for a specific skill, combining any real submissions with curated items
   */
  static getSkillResponses(skillId: SkillId): SkillResponseItem[] {
    const defaultItems = DEFAULT_BREAKDOWN_DATA[skillId] || [];
    const realSubmissions = SubmissionService.getSubmissionsByChild(
      ProfileService.getProfile()?.id || 'guest'
    ).filter((s) => s.skillId === skillId);

    if (!realSubmissions.length) {
      return defaultItems;
    }

    const allChallenges = ChallengeService.getAllChallenges();

    // Map real submissions to SkillResponseItem
    const mappedReal: SkillResponseItem[] = realSubmissions.map((sub) => {
      const challenge = allChallenges.find((c) => c.id === sub.challengeId);
      const diffStars =
        challenge?.difficulty === 'sss'
          ? 3
          : challenge?.difficulty === 'jss'
          ? 2
          : 1;
      const diffLabel =
        challenge?.difficulty === 'sss'
          ? 'Hard'
          : challenge?.difficulty === 'jss'
          ? 'Medium'
          : 'Easy';

      let correctAnswerText = challenge?.educationalTip.en || 'Excellence in problem solving';
      if (challenge?.type === 'mcq' && challenge.options) {
        const correctOpt = challenge.options.find((o) => o.isCorrect);
        if (correctOpt) {
          correctAnswerText = correctOpt.text.en;
        }
      }

      return {
        id: sub.id,
        challengeId: sub.challengeId,
        title: challenge ? challenge.title.en : 'Skill Practice Challenge',
        skillId: sub.skillId,
        difficulty: challenge?.difficulty || 'jss',
        difficultyLabel: diffLabel,
        difficultyStars: diffStars,
        date: sub.date,
        question: challenge ? challenge.question.en : 'Challenge Question',
        childAnswer: sub.response,
        correctAnswer: correctAnswerText,
        isCorrect: sub.isCorrect,
        learningTip: challenge
          ? challenge.educationalTip.en
          : 'Break down complex challenges into manageable steps.',
        actionNote: sub.isCorrect
          ? 'Correct! Demonstrated strong conceptual mastery!'
          : 'Wrong - Review and practice this concept together',
        actionType: sub.isCorrect ? 'success' : 'warning',
      };
    });

    // Merge real items at the top and ensure no duplicates
    const seenTitles = new Set<string>();
    const result: SkillResponseItem[] = [];

    mappedReal.forEach((item) => {
      if (!seenTitles.has(item.title)) {
        seenTitles.add(item.title);
        result.push(item);
      }
    });

    defaultItems.forEach((item) => {
      if (!seenTitles.has(item.title)) {
        seenTitles.add(item.title);
        result.push(item);
      }
    });

    return result;
  }

  /**
   * Get aggregated stats for a skill
   */
  static getSkillStats(skillId: SkillId): SkillSummaryStats {
    const responses = this.getSkillResponses(skillId);
    const total = responses.length;
    const correct = responses.filter((r) => r.isCorrect).length;
    const wrong = total - correct;
    const scorePercentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      total,
      correct,
      wrong,
      scorePercentage,
    };
  }

  /**
   * Get total stats across all skills
   */
  static getAllSkillsStats(): SkillSummaryStats {
    const allSkills: SkillId[] = [
      'mental-math-logic',
      'financial-literacy',
      'persuasive-speaking',
      'creative-problem-solving',
      'emotional-intelligence',
    ];

    let total = 0;
    let correct = 0;

    allSkills.forEach((s) => {
      const items = this.getSkillResponses(s);
      total += items.length;
      correct += items.filter((i) => i.isCorrect).length;
    });

    const wrong = total - correct;
    const scorePercentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      total,
      correct,
      wrong,
      scorePercentage,
    };
  }
}
