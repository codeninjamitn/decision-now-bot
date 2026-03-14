export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type Category = 'watch' | 'eat' | 'read' | 'listen';

export interface WatchItem {
  title: string;
  channel: string;
  duration: string;
  tags: string[];
  timeWeights: TimeOfDay[];
  url: string;
}

export interface EatItem {
  name: string;
  cuisine: string;
  emoji: string;
  price: string;
  tags: string[];
  timeWeights: TimeOfDay[];
}

export interface ReadItem {
  title: string;
  source: string;
  topic: string;
  emoji: string;
  readTime: string;
  tags: string[];
  timeWeights: TimeOfDay[];
  url: string;
}

export interface ListenItem {
  title: string;
  creator: string;
  duration: string;
  emoji: string;
  tags: string[];
  timeWeights: TimeOfDay[];
  url: string;
}

export const WATCH_DATA: WatchItem[] = [
  { title: "How Machines Learn", channel: "CGP Grey", duration: "9 min", tags: ["Tech", "Learning"], timeWeights: ["morning", "afternoon"], url: "https://youtube.com/watch?v=R9OHn5ZF4Uo" },
  { title: "The Egg — A Short Story", channel: "Kurzgesagt", duration: "8 min", tags: ["Learning", "Chill/ASMR"], timeWeights: ["evening", "night"], url: "https://youtube.com/watch?v=h6fcK_fRYaI" },
  { title: "Why Gravity is NOT a Force", channel: "Veritasium", duration: "17 min", tags: ["Tech", "Learning"], timeWeights: ["morning", "afternoon"], url: "https://youtube.com/watch?v=XRr1kaXKBsU" },
  { title: "World's Best Street Food", channel: "Best Ever Food Review Show", duration: "22 min", tags: ["Food", "Comedy"], timeWeights: ["afternoon", "evening"], url: "https://youtube.com/watch?v=example1" },
  { title: "Sleep Sounds — Rain on Window", channel: "Relaxing White Noise", duration: "3 hrs", tags: ["Chill/ASMR"], timeWeights: ["night"], url: "https://youtube.com/watch?v=example2" },
  { title: "Stand-Up: Corporate Life", channel: "Biswa Kalyan Rath", duration: "12 min", tags: ["Comedy"], timeWeights: ["evening", "night"], url: "https://youtube.com/watch?v=example3" },
  { title: "Full Body HIIT — No Equipment", channel: "THENX", duration: "15 min", tags: ["Fitness"], timeWeights: ["morning"], url: "https://youtube.com/watch?v=example4" },
  { title: "How to Build a Second Brain", channel: "Ali Abdaal", duration: "20 min", tags: ["Learning", "Tech"], timeWeights: ["morning", "afternoon"], url: "https://youtube.com/watch?v=example5" },
  { title: "Minecraft but I Can't Stop Building", channel: "Grian", duration: "25 min", tags: ["Gaming"], timeWeights: ["evening", "night"], url: "https://youtube.com/watch?v=example6" },
  { title: "Breaking Down Today's Headlines", channel: "TLDR News", duration: "10 min", tags: ["News"], timeWeights: ["morning", "afternoon"], url: "https://youtube.com/watch?v=example7" },
  { title: "Cozy Coffee Shop Ambience", channel: "Calmed By Nature", duration: "2 hrs", tags: ["Chill/ASMR"], timeWeights: ["night", "evening"], url: "https://youtube.com/watch?v=example8" },
  { title: "The Science of Cooking Steak", channel: "Adam Ragusea", duration: "14 min", tags: ["Food", "Learning"], timeWeights: ["afternoon", "evening"], url: "https://youtube.com/watch?v=example9" },
  { title: "Why You're Always Tired", channel: "Thomas Frank", duration: "11 min", tags: ["Learning"], timeWeights: ["morning"], url: "https://youtube.com/watch?v=example10" },
  { title: "Try Not to Laugh Challenge", channel: "JuicyReacts", duration: "18 min", tags: ["Comedy"], timeWeights: ["evening", "night"], url: "https://youtube.com/watch?v=example11" },
  { title: "10 Minute Morning Yoga", channel: "Yoga With Adriene", duration: "10 min", tags: ["Fitness", "Chill/ASMR"], timeWeights: ["morning"], url: "https://youtube.com/watch?v=example12" },
  { title: "How The Economic Machine Works", channel: "Ray Dalio", duration: "31 min", tags: ["Learning", "News"], timeWeights: ["morning", "afternoon"], url: "https://youtube.com/watch?v=example13" },
  { title: "I Built a PC for $1", channel: "Linus Tech Tips", duration: "19 min", tags: ["Tech", "Comedy"], timeWeights: ["afternoon", "evening"], url: "https://youtube.com/watch?v=example14" },
  { title: "Satisfying Factory Machines", channel: "Hydraulic Press Channel", duration: "12 min", tags: ["Chill/ASMR"], timeWeights: ["night"], url: "https://youtube.com/watch?v=example15" },
  { title: "What If Earth Lost Gravity?", channel: "Ridddle", duration: "9 min", tags: ["Learning"], timeWeights: ["afternoon", "evening"], url: "https://youtube.com/watch?v=example16" },
  { title: "Indian Street Food Marathon", channel: "Strictly Dumpling", duration: "28 min", tags: ["Food"], timeWeights: ["afternoon", "evening"], url: "https://youtube.com/watch?v=example17" },
];

export const EAT_DATA: EatItem[] = [
  { name: "Masala Dosa", cuisine: "Indian", emoji: "🥞", price: "₹120", tags: ["Veg", "Indian"], timeWeights: ["morning"] },
  { name: "Butter Chicken", cuisine: "Indian", emoji: "🍗", price: "₹280", tags: ["Non-Veg", "Indian"], timeWeights: ["afternoon", "evening"] },
  { name: "Hakka Noodles", cuisine: "Chinese", emoji: "🍜", price: "₹180", tags: ["Veg", "Chinese"], timeWeights: ["afternoon", "evening"] },
  { name: "Margherita Pizza", cuisine: "Italian", emoji: "🍕", price: "₹350", tags: ["Veg", "Italian"], timeWeights: ["evening", "night"] },
  { name: "Chicken Biryani", cuisine: "Indian", emoji: "🍚", price: "₹250", tags: ["Non-Veg", "Indian"], timeWeights: ["afternoon", "evening"] },
  { name: "Pad Thai", cuisine: "Thai", emoji: "🥢", price: "₹220", tags: ["Non-Veg", "Thai"], timeWeights: ["afternoon", "evening"] },
  { name: "Idli Sambar", cuisine: "Indian", emoji: "🫕", price: "₹80", tags: ["Veg", "Indian"], timeWeights: ["morning"] },
  { name: "Chilli Paneer", cuisine: "Chinese", emoji: "🌶️", price: "₹200", tags: ["Veg", "Chinese"], timeWeights: ["evening"] },
  { name: "Pasta Alfredo", cuisine: "Italian", emoji: "🍝", price: "₹300", tags: ["Veg", "Italian"], timeWeights: ["afternoon", "evening"] },
  { name: "Tom Yum Soup", cuisine: "Thai", emoji: "🍲", price: "₹190", tags: ["Non-Veg", "Thai"], timeWeights: ["night"] },
  { name: "Poha", cuisine: "Indian", emoji: "🥣", price: "₹60", tags: ["Veg", "Indian"], timeWeights: ["morning"] },
  { name: "Egg Fried Rice", cuisine: "Chinese", emoji: "🍳", price: "₹160", tags: ["Non-Veg", "Chinese"], timeWeights: ["afternoon", "night"] },
  { name: "Garlic Bread", cuisine: "Italian", emoji: "🧄", price: "₹150", tags: ["Veg", "Italian"], timeWeights: ["night"] },
  { name: "Tandoori Chicken", cuisine: "Indian", emoji: "🍖", price: "₹320", tags: ["Non-Veg", "Indian"], timeWeights: ["evening"] },
  { name: "Spring Rolls", cuisine: "Chinese", emoji: "🥟", price: "₹140", tags: ["Veg", "Chinese"], timeWeights: ["night", "evening"] },
  { name: "Green Curry", cuisine: "Thai", emoji: "🥘", price: "₹260", tags: ["Non-Veg", "Thai"], timeWeights: ["evening"] },
  { name: "Upma", cuisine: "Indian", emoji: "🫙", price: "₹70", tags: ["Veg", "Indian"], timeWeights: ["morning"] },
  { name: "Bruschetta", cuisine: "Italian", emoji: "🥖", price: "₹180", tags: ["Veg", "Italian"], timeWeights: ["night"] },
  { name: "Momos", cuisine: "Chinese", emoji: "🥟", price: "₹120", tags: ["Both", "Chinese"], timeWeights: ["evening", "night"] },
  { name: "Chole Bhature", cuisine: "Indian", emoji: "🫓", price: "₹130", tags: ["Veg", "Indian"], timeWeights: ["morning", "afternoon"] },
];

export const READ_DATA: ReadItem[] = [
  { title: "The AI Revolution: Our Immortality or Extinction", source: "Wait But Why", topic: "Technology", emoji: "🤖", readTime: "25 min read", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html" },
  { title: "The Tyranny of the Marginal User", source: "Hacker News", topic: "Design", emoji: "🎨", readTime: "8 min read", tags: ["Design", "Technology"], timeWeights: ["afternoon"], url: "https://nothinghuman.substack.com/p/the-tyranny-of-the-marginal-user" },
  { title: "How to Do What You Love", source: "Paul Graham", topic: "Self-improvement", emoji: "💡", readTime: "12 min read", tags: ["Self-improvement"], timeWeights: ["morning"], url: "http://paulgraham.com/love.html" },
  { title: "The Absurdity of Existence", source: "Aeon", topic: "Philosophy", emoji: "🌀", readTime: "14 min read", tags: ["Philosophy"], timeWeights: ["night"], url: "https://aeon.co/essays/the-absurdity-of-existence" },
  { title: "What Happens When You Stop Eating Sugar", source: "Healthline", topic: "Science", emoji: "🧬", readTime: "6 min read", tags: ["Science"], timeWeights: ["morning"], url: "https://healthline.com/nutrition/stop-eating-sugar" },
  { title: "The Psychology of Money — Summary", source: "Farnam Street", topic: "Finance", emoji: "💰", readTime: "10 min read", tags: ["Finance"], timeWeights: ["morning"], url: "https://fs.blog/psychology-of-money/" },
  { title: "Why Japanese Design is Superior", source: "Medium", topic: "Design", emoji: "⛩️", readTime: "7 min read", tags: ["Design", "Culture"], timeWeights: ["afternoon"], url: "https://medium.com/design/japanese-design" },
  { title: "The Library of Babel", source: "Jorge Luis Borges", topic: "Fiction/Stories", emoji: "📚", readTime: "15 min read", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://libraryofbabel.info" },
  { title: "Deep Work in the Age of Distraction", source: "Cal Newport Blog", topic: "Self-improvement", emoji: "🎯", readTime: "9 min read", tags: ["Self-improvement"], timeWeights: ["morning"], url: "https://calnewport.com/deep-work" },
  { title: "The Last Question", source: "Isaac Asimov", topic: "Fiction/Stories", emoji: "✨", readTime: "20 min read", tags: ["Fiction/Stories", "Science"], timeWeights: ["night"], url: "https://www.multivax.com/last_question.html" },
  { title: "How India's UPI Changed Digital Payments", source: "Rest of World", topic: "Technology", emoji: "📱", readTime: "8 min read", tags: ["Technology", "Finance"], timeWeights: ["afternoon"], url: "https://restofworld.org/upi-india" },
  { title: "The Art of Doing Nothing", source: "Psyche", topic: "Philosophy", emoji: "🧘", readTime: "11 min read", tags: ["Philosophy", "Culture"], timeWeights: ["night", "evening"], url: "https://psyche.co/guides/doing-nothing" },
  { title: "Atomic Habits: 1% Better Every Day", source: "James Clear", topic: "Self-improvement", emoji: "⚛️", readTime: "5 min read", tags: ["Self-improvement"], timeWeights: ["morning"], url: "https://jamesclear.com/atomic-habits-summary" },
  { title: "The Hidden Patterns of Great Cities", source: "Bloomberg CityLab", topic: "Culture", emoji: "🏙️", readTime: "12 min read", tags: ["Culture", "Design"], timeWeights: ["afternoon", "evening"], url: "https://bloomberg.com/citylab" },
  { title: "Why Time Feels Like It Speeds Up", source: "Nautilus", topic: "Science", emoji: "⏳", readTime: "9 min read", tags: ["Science", "Philosophy"], timeWeights: ["night"], url: "https://nautil.us/time-perception" },
  { title: "The Complete Guide to Investing in 2025", source: "Zerodha Varsity", topic: "Finance", emoji: "📈", readTime: "15 min read", tags: ["Finance"], timeWeights: ["morning", "afternoon"], url: "https://zerodha.com/varsity" },
  { title: "How Figma Builds Figma", source: "Figma Blog", topic: "Design", emoji: "🖌️", readTime: "7 min read", tags: ["Design", "Technology"], timeWeights: ["afternoon"], url: "https://figma.com/blog" },
  { title: "The Ones Who Walk Away from Omelas", source: "Ursula K. Le Guin", topic: "Fiction/Stories", emoji: "🚶", readTime: "10 min read", tags: ["Fiction/Stories", "Philosophy"], timeWeights: ["night"], url: "https://example.com/omelas" },
  { title: "Sleep is Your Superpower", source: "TED Ideas", topic: "Science", emoji: "😴", readTime: "6 min read", tags: ["Science", "Self-improvement"], timeWeights: ["night", "evening"], url: "https://ted.com/sleep-superpower" },
  { title: "The Wabi-Sabi of Software", source: "Robin Rendle", topic: "Design", emoji: "🍂", readTime: "5 min read", tags: ["Design", "Culture"], timeWeights: ["afternoon", "evening"], url: "https://robinrendle.com/essays/wabi-sabi" },
];

export const LISTEN_DATA: ListenItem[] = [
  { title: "Serial: Season One", creator: "Sarah Koenig", duration: "45 min", emoji: "🔍", tags: ["True Crime"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/show/serial" },
  { title: "Lo-fi Beats to Study To", creator: "Lofi Girl", duration: "∞", emoji: "🎵", tags: ["Focus/Lo-fi", "Chill Music"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/playlist/lofi" },
  { title: "The Tim Ferriss Show: Naval Ravikant", creator: "Tim Ferriss", duration: "2 hrs", emoji: "🎙️", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/episode/naval" },
  { title: "Conan O'Brien Needs a Friend", creator: "Team Coco", duration: "1 hr", emoji: "😂", tags: ["Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/show/conan" },
  { title: "The Daily — Today's Headlines", creator: "NYT", duration: "25 min", emoji: "📰", tags: ["News Briefings"], timeWeights: ["morning"], url: "https://open.spotify.com/show/the-daily" },
  { title: "Chill Jazz Piano", creator: "Various Artists", duration: "1 hr", emoji: "🎹", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/playlist/jazz" },
  { title: "Atomic Habits — Full Audiobook", creator: "James Clear", duration: "5 hrs", emoji: "📖", tags: ["Audiobooks", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/audiobook/atomic-habits" },
  { title: "Crime Junkie: MURDERED — Shanann Watts", creator: "audiochuck", duration: "50 min", emoji: "🕵️", tags: ["True Crime"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/episode/crime-junkie" },
  { title: "Focus Flow — Deep Work Playlist", creator: "Spotify", duration: "2 hrs", emoji: "🧠", tags: ["Focus/Lo-fi"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/playlist/focus-flow" },
  { title: "Huberman Lab: Optimize Sleep", creator: "Andrew Huberman", duration: "1.5 hrs", emoji: "🔬", tags: ["Interviews", "Motivational"], timeWeights: ["morning"], url: "https://open.spotify.com/episode/huberman-sleep" },
  { title: "SmartLess: Will Ferrell", creator: "SmartLess Media", duration: "55 min", emoji: "🤣", tags: ["Comedy Podcasts", "Interviews"], timeWeights: ["evening"], url: "https://open.spotify.com/episode/smartless" },
  { title: "Up First — Morning Briefing", creator: "NPR", duration: "12 min", emoji: "☀️", tags: ["News Briefings"], timeWeights: ["morning"], url: "https://open.spotify.com/show/up-first" },
  { title: "Ambient Worlds — Rainy Day", creator: "Ambient Worlds", duration: "3 hrs", emoji: "🌧️", tags: ["Chill Music"], timeWeights: ["night"], url: "https://open.spotify.com/playlist/rainy-day" },
  { title: "The Moth: True Stories", creator: "The Moth", duration: "20 min", emoji: "🦋", tags: ["Motivational", "Interviews"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/show/the-moth" },
  { title: "Sapiens — Audiobook Highlights", creator: "Yuval Noah Harari", duration: "4 hrs", emoji: "🌍", tags: ["Audiobooks"], timeWeights: ["afternoon"], url: "https://open.spotify.com/audiobook/sapiens" },
  { title: "Casefile: The Silk Road", creator: "Casefile", duration: "1 hr", emoji: "💊", tags: ["True Crime"], timeWeights: ["night"], url: "https://open.spotify.com/episode/casefile-silk-road" },
  { title: "Deep Focus — Classical Piano", creator: "Various", duration: "2 hrs", emoji: "🎼", tags: ["Focus/Lo-fi"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/playlist/classical-focus" },
  { title: "How I Built This: Airbnb", creator: "Guy Raz / NPR", duration: "45 min", emoji: "🏠", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/episode/hibt-airbnb" },
  { title: "My Favorite Murder", creator: "Karen & Georgia", duration: "1 hr", emoji: "🔪", tags: ["True Crime", "Comedy Podcasts"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/show/mfm" },
  { title: "Meditation & Sleep Sounds", creator: "Calm", duration: "30 min", emoji: "🧘", tags: ["Chill Music"], timeWeights: ["night"], url: "https://open.spotify.com/playlist/calm-sleep" },
];

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export function getRecommendation<T extends { tags: string[]; timeWeights: TimeOfDay[] }>(
  data: T[],
  userTags: string[],
  preferredTime: TimeOfDay
): T {
  const currentTime = getTimeOfDay();
  const timeToUse = preferredTime || currentTime;

  // Filter by time weight match
  const timeMatches = data.filter(item => item.timeWeights.includes(timeToUse));
  
  // Score by tag overlap
  const scored = (timeMatches.length > 0 ? timeMatches : data).map(item => ({
    item,
    score: item.tags.filter(tag => userTags.includes(tag)).length,
  }));

  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, Math.min(3, scored.length));
  return top3[Math.floor(Math.random() * top3.length)].item;
}
