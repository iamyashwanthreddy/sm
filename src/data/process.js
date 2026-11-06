// The eight-stage Social Matters method. Speech bubbles and checklists for
// Discover / Research / Strategize / Create / Activate / Grow follow the
// client-supplied comic; Planning and Evaluation extend it.
import reading from '../assets/zeus/reading.webp';
import thinking from '../assets/zeus/thinking.webp';
import searching from '../assets/zeus/searching.webp';
import investigating from '../assets/zeus/investigating.webp';
import thinkingSeated from '../assets/zeus/thinking-seated.webp';
import pointing from '../assets/zeus/pointing.webp';
import coffee from '../assets/zeus/coffee.webp';
import whiteboard from '../assets/zeus/whiteboard.webp';
import designing from '../assets/zeus/designing.webp';
import creativeIdea from '../assets/zeus/creative-idea.webp';
import megaphone from '../assets/zeus/megaphone.webp';
import launching from '../assets/zeus/launching.webp';
import presenting from '../assets/zeus/presenting.webp';
import thumbsUp from '../assets/zeus/thumbs-up.webp';
import victory from '../assets/zeus/victory.webp';
import walking from '../assets/zeus/walking.webp';

export const MISSIONS = [
  {
    id: 'brand-study',
    num: '01',
    title: 'Brand Study',
    tag: 'Discover',
    bubble: ['Every great brand starts with a question:', '“What’s the story?”'],
    body: 'We start inside your business: the goals, the audience, the challenges and the opportunities nobody has written down yet.',
    listTitle: 'Brand deep dive',
    items: ['Business goals', 'Target audience', 'Challenges', 'Opportunities'],
    poses: [
      { src: reading, alt: 'Zeus sitting on a stack of books, reading' },
      { src: thinking, alt: 'Zeus standing with a hand on his helmet, thinking' },
    ],
    hotspots: [
      { label: 'Brand audit', text: 'We review what already exists: identity, tone of voice, channels and past campaigns.' },
      { label: 'Audience notes', text: 'Who buys today, who could buy tomorrow, and what each of them cares about.' },
    ],
    deliverables: ['Discovery workshop', 'Brand audit', 'Audience profile', 'Opportunity map'],
  },
  {
    id: 'market-research',
    num: '02',
    title: 'Market Research',
    tag: 'Research',
    bubble: ['Time to investigate.', 'Let’s see what’s really happening out there.'],
    body: 'We study the category, the competition and the conversations around it, so the plan rests on evidence rather than guesswork.',
    listTitle: 'Field notes',
    items: ['Market trends', 'Competitor analysis', 'Audience insights', 'Hidden opportunities'],
    poses: [
      { src: searching, alt: 'Zeus raising a magnifying glass' },
      { src: investigating, alt: 'Zeus crouching to inspect something through a magnifying glass' },
    ],
    hotspots: [
      { label: 'Competitor check', text: 'What others in your space are saying, where they say it and how often.' },
      { label: 'Trend signal', text: 'What is rising in your category, and whether it fits your brand.' },
      { label: 'Open space', text: 'The position nobody in your market owns yet. Often the most valuable find.' },
    ],
    deliverables: ['Competitor review', 'Trend report', 'Audience insights', 'Research summary'],
  },
  {
    id: 'strategy',
    num: '03',
    title: 'Strategy',
    tag: 'Strategize',
    bubble: ['Insights become a direction.', 'Now we create the game plan.'],
    body: 'Research turns into a position worth owning, a message people remember and a clear choice of channels and goals.',
    listTitle: 'The plan',
    items: ['Positioning', 'Messaging', 'Channels', 'Campaign goals'],
    poses: [
      { src: thinkingSeated, alt: 'Zeus seated, chin in hand, thinking' },
      { src: pointing, alt: 'Zeus pointing towards the plan' },
    ],
    hotspots: [
      { label: 'Positioning', text: 'The place your brand should own in the customer’s mind.' },
      { label: 'Messaging', text: 'What we say, and the tone we say it in.' },
      { label: 'Channels', text: 'Where your audience actually spends its time.' },
      { label: 'Campaign goals', text: 'What success looks like, agreed before any budget is spent.' },
    ],
    deliverables: ['Positioning statement', 'Messaging framework', 'Channel strategy', 'Goals & KPIs'],
  },
  {
    id: 'planning',
    num: '04',
    title: 'Planning',
    tag: 'Plan',
    bubble: ['Plan the mission,', 'then fly the plan.'],
    body: 'Strategy becomes a calendar of content themes, launch dates, budgets and approvals, so everyone knows what happens next.',
    listTitle: 'Mission schedule',
    items: ['Content calendar', 'Campaign timeline', 'Channel & budget mix', 'Approvals'],
    poses: [
      { src: coffee, alt: 'Zeus holding a coffee cup' },
      { src: whiteboard, alt: 'Zeus arranging sticky notes on a whiteboard' },
    ],
    hotspots: [
      { label: 'Content calendar', text: 'Every post, story and reel mapped by week, before production starts.' },
      { label: 'Launch window', text: 'Campaign dates set around your seasons, launches and offers.' },
    ],
    deliverables: ['Content calendar', 'Campaign roadmap', 'Media plan', 'Approval workflow'],
  },
  {
    id: 'building-campaigns',
    num: '05',
    title: 'Building Campaigns',
    tag: 'Create',
    bubble: ['Ideas turn', 'into experiences.'],
    body: 'Design, copy, video and web come together as one campaign system that looks and sounds like you everywhere.',
    listTitle: 'Campaign kit',
    items: ['Visual identity', 'Content creation', 'Website design', 'Campaign assets'],
    poses: [
      { src: designing, alt: 'Zeus sketching on a tablet' },
      { src: creativeIdea, alt: 'Zeus at a laptop holding up a glowing lightbulb' },
    ],
    hotspots: [
      { label: 'Key visual', text: 'The hero image that every other asset takes its cue from.' },
      { label: 'Social set', text: 'Posts, stories and reels cut for each platform.' },
      { label: 'Landing page', text: 'Where the campaign sends people, built to convert.' },
    ],
    deliverables: ['Key visuals', 'Social creatives', 'Video & reels', 'Landing pages'],
  },
  {
    id: 'marketing',
    num: '06',
    title: 'Marketing',
    tag: 'Activate',
    bubble: ['It’s go time!', 'Your brand meets the world.'],
    body: 'We launch on the channels that matter, manage campaigns day to day and keep the conversation moving.',
    listTitle: 'Launch channels',
    items: ['Social media', 'Digital advertising', 'Influencer marketing', 'Campaign execution'],
    poses: [
      { src: megaphone, alt: 'Zeus announcing through a megaphone' },
      { src: launching, alt: 'Zeus riding a black and gold rocket' },
    ],
    hotspots: [
      { label: 'Paid', text: 'Search and social ads aimed at the audiences we defined in research.' },
      { label: 'Organic', text: 'A steady rhythm of content and community management.' },
    ],
    deliverables: ['Campaign launch', 'Ad management', 'Community management', 'Influencer outreach'],
  },
  {
    id: 'evaluation',
    num: '07',
    title: 'Evaluation',
    tag: 'Measure',
    bubble: ['Let’s see what', 'the data is telling us.'],
    body: 'We track what is working, report it in plain language and keep real results apart from vanity metrics.',
    listTitle: 'Mission report',
    items: ['Reach', 'Engagement', 'Leads & sales', 'Learnings'],
    poses: [
      { src: presenting, alt: 'Zeus presenting a chart' },
      { src: thumbsUp, alt: 'Zeus giving a thumbs up' },
    ],
    hotspots: [
      { label: 'Trend line', text: 'Performance over time, so one good day never hides a slow month.' },
      { label: 'Channel split', text: 'Which platforms drive results, and which only drive noise.' },
    ],
    deliverables: ['Performance dashboard', 'Monthly report', 'Review meeting', 'Recommendations'],
  },
  {
    id: 'optimize',
    num: '08',
    title: 'Optimize & Repeat',
    tag: 'Grow',
    bubble: ['We track. We improve.', 'We keep your brand moving forward.'],
    body: 'What we learn feeds straight into the next cycle: sharper targeting, better creative and a stronger brand every time round.',
    listTitle: 'Next orbit',
    items: ['More visibility.', 'More engagement.', 'More growth.'],
    poses: [
      { src: victory, alt: 'Zeus planting a flag with a crown on a rock' },
      { src: walking, alt: 'Zeus striding forward to the next mission' },
    ],
    hotspots: [{ label: 'Loop', text: 'Every cycle starts from what the last one taught us.' }],
    deliverables: ['A/B tests', 'Creative refresh', 'Budget reallocation', 'Next-cycle plan'],
  },
];
