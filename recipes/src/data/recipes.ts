export interface Recipe {
  id: string;
  title: string;
  description: string;
  // Paste the full YouTube Shorts URL here, e.g:
  // "https://youtube.com/shorts/fmdw761kTZc?si=abc123"
  // Regular YouTube URLs and bare video IDs also work.
  youtubeUrl: string;
  emoji: string;
  // Short prompt used to generate a cute AI cartoon thumbnail.
  // Keep it about the drink — a shared cartoon style is added automatically.
  imagePrompt: string;
}

// ── Paste your Shorts links below ───────────────────
export const recipes: Recipe[] = [
  
  {
    id: '1',
    title: 'Offc your Fav- Cold Coffee',
    description: 'Your office favourite — rich, creamy cold coffee blended to perfection for that daily pick-me-up.',
    youtubeUrl: 'https://www.youtube.com/shorts/J_AqfaGBevk?feature=share',
    emoji: '☕',
    imagePrompt: 'a tall glass of iced cold coffee with whipped cream, ice cubes and a straw',
  },
  {
    id: '2',
    title: 'Teddy Bear Chocolate Shake',
    description: 'An indulgent, velvety chocolate shake so cute and rich it feels like a warm teddy bear hug.',
    youtubeUrl: 'https://www.youtube.com/shorts/kyUgTYuTqHg?feature=share',
    emoji: '🧸',
    imagePrompt: 'a chocolate milkshake with a cute teddy bear made of cream on top, brown shake',
  },
  {
    id: '3',
    title: 'Dragon Fruit & Kiwi Smoothie',
    description: 'Vibrant dragon fruit meets zesty kiwi in this stunning, antioxidant-packed portable blend.',
    youtubeUrl: 'https://www.youtube.com/shorts/_knTfYSP99c?feature=share',
    emoji: '🐲',
    imagePrompt: 'a bright pink dragon fruit and green kiwi smoothie in a glass with fruit slices',
  },
  {
    id: '4',
    title: 'Fresh Orange Juice — Pure Happiness',
    description: 'Pure, freshly squeezed orange joy in every sip — simple, bright, and bursting with vitamin C.',
    youtubeUrl: 'https://www.youtube.com/shorts/PWbqMDy497s?feature=share',
    emoji: '🍊',
    imagePrompt: 'a glass of fresh orange juice with orange slices and a smiling sun',
  },
  {
    id: '5',
    title: 'Real Taste of Anar in Every Sip',
    description: 'Fresh pomegranate blended into a deep ruby drink — earthy, sweet, and packed with goodness.',
    youtubeUrl: 'https://youtu.be/hB8Y6FZ8L50',
    emoji: '🍷',
    imagePrompt: 'a glass of deep red pomegranate juice with fresh pomegranate seeds and fruit',
  },
  {
    id: '6',
    title: 'Healthy and Delicious',
    description: 'A nourishing blend that proves healthy can taste absolutely amazing — sip your way to wellness.',
    youtubeUrl: 'https://youtu.be/goQV6NQUork',
    emoji: '🥗',
    imagePrompt: 'a healthy green smoothie in a glass surrounded by fresh fruits and leaves',
  },
  {
    id: '7',
    title: 'Delicious Oreo Cookies Shake',
    description: 'Crushed Oreos blended into a thick, creamy shake — the ultimate cookies-and-cream indulgence.',
    youtubeUrl: 'https://youtube.com/shorts/fmdw761kTZc?si=2xTPZJqMIXB12-54',
    emoji: '🍪',
    imagePrompt: 'a creamy cookies and cream milkshake with chocolate cookie pieces and cream on top',
  },
  {
    id: '8',
    title: 'High Protein Banana & Oats Smoothie',
    description: 'Ripe bananas and hearty oats blended into a filling, high-protein smoothie to fuel your day.',
    youtubeUrl: 'https://youtu.be/3mFa3QE-Q_4',
    emoji: '🍌',
    imagePrompt: 'a glass of creamy banana and oats smoothie in a glass with banana slices and oats',
  },
];
