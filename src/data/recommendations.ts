export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type Category = 'watch' | 'eat' | 'read' | 'listen';
export type FoodMoodTag = 'Healthy' | 'Indulge' | 'Comfort';

export interface WatchItem {
  title: string;
  channel: string;
  duration: string;
  tags: string[];
  language: string;
  timeWeights: TimeOfDay[];
  url: string;
}

export interface EatItem {
  name: string;
  cuisine: string;
  subCuisine: string;
  emoji: string;
  price: string;
  vegNonVeg: 'Veg' | 'Non-Veg' | 'Both';
  mood: FoodMoodTag[];
  tags: string[];
  timeWeights: TimeOfDay[];
}

export interface ReadItem {
  title: string;
  source: string;
  topic: string;
  emoji: string;
  readTime: string;
  language: string;
  tags: string[];
  timeWeights: TimeOfDay[];
  url: string;
}

export interface ListenItem {
  title: string;
  creator: string;
  duration: string;
  emoji: string;
  type: 'Podcast' | 'Music';
  language: string;
  tags: string[];
  timeWeights: TimeOfDay[];
  url: string;
}

// ===== WATCH DATA (43 items — all direct YouTube video links) =====
export const WATCH_DATA: WatchItem[] = [
  // English
  { title: "How Machines Learn", channel: "CGP Grey", duration: "9 min", tags: ["Tech", "Learning"], language: "English", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=R9OHn5ZF4Uo" },
  { title: "The Egg — A Short Story", channel: "Kurzgesagt", duration: "8 min", tags: ["Learning", "Chill/ASMR"], language: "English", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=h6fcK_fRYaI" },
  { title: "Why Gravity is NOT a Force", channel: "Veritasium", duration: "17 min", tags: ["Tech", "Learning"], language: "English", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=XRr1kaXKBsU" },
  { title: "Full Body HIIT — No Equipment", channel: "THENX", duration: "15 min", tags: ["Fitness"], language: "English", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=ml6cT4AZdqI" },
  { title: "The Most Illegal Things in Your Home", channel: "Half as Interesting", duration: "7 min", tags: ["Comedy", "Learning"], language: "English", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=9KZs6eLMxQE" },
  { title: "10 Hours of Relaxing Rain Sounds", channel: "Relaxing White Noise", duration: "10 hrs", tags: ["Chill/ASMR"], language: "English", timeWeights: ["night"], url: "https://www.youtube.com/watch?v=mPZkdNFkNps" },
  { title: "How to Build a Second Brain", channel: "Ali Abdaal", duration: "20 min", tags: ["Learning", "Tech"], language: "English", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=K-ssUVyfn5g" },
  { title: "Minecraft Hermitcraft S9 — Mega Base", channel: "Grian", duration: "25 min", tags: ["Gaming"], language: "English", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=T3VLXaiJpZg" },
  // Hindi
  { title: "गुरुत्वाकर्षण क्या है? — Gravity Explained", channel: "Physics Wallah", duration: "18 min", tags: ["Learning"], language: "Hindi", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=gIyJGz4VJIE" },
  { title: "Haq Se Single — Standup Comedy", channel: "Zakir Khan", duration: "58 min", tags: ["Comedy"], language: "Hindi", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=GuitHDjGMI8" },
  { title: "Life Changing Motivational Video", channel: "Sandeep Maheshwari", duration: "22 min", tags: ["Learning"], language: "Hindi", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=snAhsXyO3Ck" },
  { title: "Top 5 Gadgets Under ₹500", channel: "Technical Guruji", duration: "14 min", tags: ["Tech"], language: "Hindi", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=i84PRSwmOGI" },
  // Marathi
  { title: "भारत एक खोज — Discovery of India", channel: "Pravin Tarde Vlogs", duration: "18 min", tags: ["Learning"], language: "Marathi", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=8K4GRl2lMDU" },
  { title: "Marathi Standup — Office Life", channel: "Bhau Kadam Comedy", duration: "15 min", tags: ["Comedy"], language: "Marathi", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=0KZ2fTiU9Ys" },
  { title: "Maharashtrachi Kitchen — Special Recipes", channel: "MaharashtrachiKitchen", duration: "12 min", tags: ["Food"], language: "Marathi", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=J5xFHEhEJjA" },
  // Kannada
  { title: "Life Lessons with Raj B Shetty", channel: "BRO", duration: "45 min", tags: ["Learning"], language: "Kannada", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=Yh6lPCGkq3Y" },
  { title: "Kannada Standup — College Days", channel: "Danish Sait", duration: "12 min", tags: ["Comedy"], language: "Kannada", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=kpOh7MGXBIY" },
  { title: "Tech Reviews in Kannada", channel: "Tech in Kannada", duration: "10 min", tags: ["Tech"], language: "Kannada", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=TQ0nPvM7eYg" },
  // Tamil
  { title: "iPhone 15 Pro — Tamil Review", channel: "Tamil Tech", duration: "15 min", tags: ["Tech"], language: "Tamil", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=iYJBpTfSfOA" },
  { title: "Parithabangal — Comedy Sketch", channel: "Parithabangal", duration: "18 min", tags: ["Comedy"], language: "Tamil", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=NOziVXCCgaA" },
  { title: "Success Mindset — Tamil Motivation", channel: "Hisham.M", duration: "12 min", tags: ["Learning"], language: "Tamil", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=d1Mvy1gv0hQ" },
  // Telugu
  { title: "Coding for Beginners — Telugu", channel: "Telugu Tech Tuts", duration: "20 min", tags: ["Tech", "Learning"], language: "Telugu", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=pWqn7UcLbB0" },
  { title: "Jathi Ratnalu — Best Comedy Scenes", channel: "Sri Venkateswara Creations", duration: "22 min", tags: ["Comedy"], language: "Telugu", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=n4mMvJnBmJE" },
  { title: "Home Workout — Telugu Fitness", channel: "Telugu Fitness", duration: "15 min", tags: ["Fitness"], language: "Telugu", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=bxljvUqCiXk" },
  // Malayalam
  { title: "Tech News Malayalam — Weekly Roundup", channel: "Mashable Mojo", duration: "10 min", tags: ["Tech", "News"], language: "Malayalam", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=f9Zqr8q2gW4" },
  { title: "Comedy Stars — Best of 2024", channel: "Mazhavil Manorama", duration: "20 min", tags: ["Comedy"], language: "Malayalam", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=r_8cVBhpkaM" },
  { title: "Kerala Rain ASMR — 3 Hours", channel: "Kerala ASMR", duration: "3 hrs", tags: ["Chill/ASMR"], language: "Malayalam", timeWeights: ["night"], url: "https://www.youtube.com/watch?v=q76bMs-NwRk" },
  // Gujarati
  { title: "Dhirubhai Sarvaiya — Best Comedy", channel: "Studio Sangeeta", duration: "25 min", tags: ["Comedy"], language: "Gujarati", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=VWwY7d3wZfQ" },
  { title: "Gujarati Dal Dhokli Recipe", channel: "Hebbars Kitchen Gujarati", duration: "12 min", tags: ["Food"], language: "Gujarati", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=jZQQkE1BThE" },
  { title: "Business Motivation — Gujarati", channel: "Gujarati Motivational", duration: "15 min", tags: ["Learning"], language: "Gujarati", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=QI1bfGLhh3M" },
  // Punjabi
  { title: "Amritsar Food Vlog — Best Street Food", channel: "Foodies On Wheels", duration: "18 min", tags: ["Food", "Comedy"], language: "Punjabi", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=H3Kl2Xvhaz0" },
  { title: "Punjabi Comedy — Family Drama", channel: "Mr Mrs Narula", duration: "15 min", tags: ["Comedy"], language: "Punjabi", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=cA_mg6wCjn4" },
  { title: "Desi Workout at Home — Punjabi", channel: "Tarun Gill", duration: "12 min", tags: ["Fitness"], language: "Punjabi", timeWeights: ["morning"], url: "https://www.youtube.com/watch?v=RFiJc6iqSt4" },
  // Bengali
  { title: "Hoichoi Unlimited — Best Scenes", channel: "SVF", duration: "20 min", tags: ["Comedy"], language: "Bengali", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=aEn5305WQcA" },
  { title: "Bengali Fish Curry — Authentic Recipe", channel: "Bong Eats", duration: "14 min", tags: ["Food"], language: "Bengali", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=XBQTC2Ihnqg" },
  { title: "Bengali Literature — Rabindranath Tagore", channel: "Sonar Bangla", duration: "30 min", tags: ["Learning"], language: "Bengali", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=KjPqHfnN8bY" },
  // Kashmiri
  { title: "Dal Lake Morning — Kashmir Vlog", channel: "Kashmir Traveller", duration: "15 min", tags: ["Chill/ASMR"], language: "Kashmiri", timeWeights: ["morning", "evening"], url: "https://www.youtube.com/watch?v=Z5RDfijvBew" },
  { title: "Wazwan Cooking — Full Process", channel: "Kashmir Food Tales", duration: "20 min", tags: ["Food"], language: "Kashmiri", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=4GJW6RQ1bR8" },
  { title: "Kashmiri Sufi Music — Reshma", channel: "Coke Studio", duration: "8 min", tags: ["Chill/ASMR"], language: "Kashmiri", timeWeights: ["night"], url: "https://www.youtube.com/watch?v=hQ1LMJXpMG0" },
  // Oriya
  { title: "Odia Comedy — Pragyan Sketch", channel: "Tarang TV", duration: "18 min", tags: ["Comedy"], language: "Oriya", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=N8ksVcMqspc" },
  { title: "Odia Dalma Recipe — Traditional", channel: "Odia Kitchen", duration: "10 min", tags: ["Food"], language: "Oriya", timeWeights: ["afternoon"], url: "https://www.youtube.com/watch?v=KZ_6d7tPxLs" },
  { title: "Odia Tech News Weekly", channel: "Tech Odia", duration: "12 min", tags: ["Tech", "News"], language: "Oriya", timeWeights: ["morning", "afternoon"], url: "https://www.youtube.com/watch?v=cGk6FaRHv3E" },
  // Assamese
  { title: "Bihu Dance Tutorial — Learn Step by Step", channel: "Assamese Culture Hub", duration: "10 min", tags: ["Learning", "Fitness"], language: "Assamese", timeWeights: ["morning", "evening"], url: "https://www.youtube.com/watch?v=S6i2fvF3MRU" },
  { title: "Beharbari Outpost — Best Episodes", channel: "News18 Assam", duration: "22 min", tags: ["Comedy"], language: "Assamese", timeWeights: ["evening", "night"], url: "https://www.youtube.com/watch?v=Ft3s60K8FoE" },
  { title: "Masor Tenga — Assamese Fish Recipe", channel: "Assamese Kitchen", duration: "12 min", tags: ["Food"], language: "Assamese", timeWeights: ["afternoon", "evening"], url: "https://www.youtube.com/watch?v=5BL3TXh4JZM" },
];

// ===== EAT DATA (60 items) =====
export const EAT_DATA: EatItem[] = [
  // North Indian
  { name: "Butter Chicken", cuisine: "Indian", subCuisine: "North Indian", emoji: "🍗", price: "₹280", vegNonVeg: "Non-Veg", mood: ["Indulge", "Comfort"], tags: ["Non-Veg", "North Indian"], timeWeights: ["afternoon", "evening"] },
  { name: "Chole Bhature", cuisine: "Indian", subCuisine: "North Indian", emoji: "🫓", price: "₹130", vegNonVeg: "Veg", mood: ["Indulge", "Comfort"], tags: ["Veg", "North Indian"], timeWeights: ["morning", "afternoon"] },
  { name: "Paneer Tikka", cuisine: "Indian", subCuisine: "North Indian", emoji: "🧀", price: "₹220", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "North Indian"], timeWeights: ["evening"] },
  // South Indian
  { name: "Masala Dosa", cuisine: "Indian", subCuisine: "South Indian", emoji: "🥞", price: "₹120", vegNonVeg: "Veg", mood: ["Healthy", "Comfort"], tags: ["Veg", "South Indian"], timeWeights: ["morning"] },
  { name: "Idli Sambar", cuisine: "Indian", subCuisine: "South Indian", emoji: "🫕", price: "₹80", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "South Indian"], timeWeights: ["morning"] },
  { name: "Hyderabadi Biryani", cuisine: "Indian", subCuisine: "South Indian", emoji: "🍚", price: "₹280", vegNonVeg: "Non-Veg", mood: ["Indulge", "Comfort"], tags: ["Non-Veg", "South Indian"], timeWeights: ["afternoon", "evening"] },
  // Maharashtrian
  { name: "Vada Pav", cuisine: "Indian", subCuisine: "Maharashtrian", emoji: "🍔", price: "₹40", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Maharashtrian"], timeWeights: ["afternoon", "evening", "night"] },
  { name: "Misal Pav", cuisine: "Indian", subCuisine: "Maharashtrian", emoji: "🥘", price: "₹90", vegNonVeg: "Veg", mood: ["Comfort", "Healthy"], tags: ["Veg", "Maharashtrian"], timeWeights: ["morning", "afternoon"] },
  { name: "Puran Poli", cuisine: "Indian", subCuisine: "Maharashtrian", emoji: "🫓", price: "₹70", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Maharashtrian"], timeWeights: ["afternoon"] },
  // Gujarati
  { name: "Gujarati Thali", cuisine: "Indian", subCuisine: "Gujarati", emoji: "🍽️", price: "₹200", vegNonVeg: "Veg", mood: ["Comfort", "Healthy"], tags: ["Veg", "Gujarati"], timeWeights: ["afternoon", "evening"] },
  { name: "Dhokla", cuisine: "Indian", subCuisine: "Gujarati", emoji: "🟨", price: "₹60", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Gujarati"], timeWeights: ["morning", "afternoon"] },
  { name: "Undhiyu", cuisine: "Indian", subCuisine: "Gujarati", emoji: "🥗", price: "₹180", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Gujarati"], timeWeights: ["evening"] },
  // Rajasthani
  { name: "Dal Baati Churma", cuisine: "Indian", subCuisine: "Rajasthani", emoji: "🫙", price: "₹190", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Rajasthani"], timeWeights: ["afternoon", "evening"] },
  { name: "Laal Maas", cuisine: "Indian", subCuisine: "Rajasthani", emoji: "🌶️", price: "₹320", vegNonVeg: "Non-Veg", mood: ["Indulge"], tags: ["Non-Veg", "Rajasthani"], timeWeights: ["evening"] },
  { name: "Ker Sangri", cuisine: "Indian", subCuisine: "Rajasthani", emoji: "🥬", price: "₹150", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Rajasthani"], timeWeights: ["afternoon"] },
  // Punjabi
  { name: "Tandoori Chicken", cuisine: "Indian", subCuisine: "Punjabi", emoji: "🍖", price: "₹320", vegNonVeg: "Non-Veg", mood: ["Indulge"], tags: ["Non-Veg", "Punjabi"], timeWeights: ["evening"] },
  { name: "Sarson Da Saag", cuisine: "Indian", subCuisine: "Punjabi", emoji: "🥬", price: "₹160", vegNonVeg: "Veg", mood: ["Comfort", "Healthy"], tags: ["Veg", "Punjabi"], timeWeights: ["afternoon", "evening"] },
  { name: "Amritsari Kulcha", cuisine: "Indian", subCuisine: "Punjabi", emoji: "🫓", price: "₹120", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Punjabi"], timeWeights: ["morning", "afternoon"] },
  // Kashmiri
  { name: "Rogan Josh", cuisine: "Indian", subCuisine: "Kashmiri", emoji: "🍖", price: "₹350", vegNonVeg: "Non-Veg", mood: ["Comfort", "Indulge"], tags: ["Non-Veg", "Kashmiri"], timeWeights: ["evening"] },
  { name: "Dum Aloo Kashmiri", cuisine: "Indian", subCuisine: "Kashmiri", emoji: "🥔", price: "₹180", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Kashmiri"], timeWeights: ["afternoon", "evening"] },
  { name: "Kashmiri Kahwa", cuisine: "Indian", subCuisine: "Kashmiri", emoji: "🍵", price: "₹80", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Kashmiri"], timeWeights: ["morning", "night"] },
  // Bengali
  { name: "Macher Jhol", cuisine: "Indian", subCuisine: "Bengali", emoji: "🐟", price: "₹200", vegNonVeg: "Non-Veg", mood: ["Comfort"], tags: ["Non-Veg", "Bengali"], timeWeights: ["afternoon", "evening"] },
  { name: "Mishti Doi", cuisine: "Indian", subCuisine: "Bengali", emoji: "🍮", price: "₹60", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "Bengali"], timeWeights: ["afternoon", "night"] },
  { name: "Luchi Alur Dom", cuisine: "Indian", subCuisine: "Bengali", emoji: "🫓", price: "₹120", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Bengali"], timeWeights: ["morning"] },
  // Oriya
  { name: "Dalma", cuisine: "Indian", subCuisine: "Oriya", emoji: "🥘", price: "₹100", vegNonVeg: "Veg", mood: ["Healthy", "Comfort"], tags: ["Veg", "Oriya"], timeWeights: ["afternoon", "evening"] },
  { name: "Chhena Poda", cuisine: "Indian", subCuisine: "Oriya", emoji: "🍰", price: "₹80", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "Oriya"], timeWeights: ["afternoon", "night"] },
  // Assamese
  { name: "Masor Tenga", cuisine: "Indian", subCuisine: "Assamese", emoji: "🐟", price: "₹180", vegNonVeg: "Non-Veg", mood: ["Comfort", "Healthy"], tags: ["Non-Veg", "Assamese"], timeWeights: ["afternoon", "evening"] },
  { name: "Pitha (Rice Cake)", cuisine: "Indian", subCuisine: "Assamese", emoji: "🍘", price: "₹70", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Assamese"], timeWeights: ["morning", "afternoon"] },
  // American
  { name: "Smash Burger", cuisine: "International", subCuisine: "American", emoji: "🍔", price: "₹350", vegNonVeg: "Non-Veg", mood: ["Indulge"], tags: ["Non-Veg", "American"], timeWeights: ["afternoon", "evening", "night"] },
  { name: "Mac and Cheese", cuisine: "International", subCuisine: "American", emoji: "🧀", price: "₹280", vegNonVeg: "Veg", mood: ["Indulge", "Comfort"], tags: ["Veg", "American"], timeWeights: ["evening", "night"] },
  { name: "Caesar Salad", cuisine: "International", subCuisine: "American", emoji: "🥗", price: "₹220", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "American"], timeWeights: ["morning", "afternoon"] },
  // Spanish
  { name: "Spanish Churros", cuisine: "International", subCuisine: "Spanish", emoji: "🍩", price: "₹180", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "Spanish"], timeWeights: ["night", "evening"] },
  { name: "Patatas Bravas", cuisine: "International", subCuisine: "Spanish", emoji: "🥔", price: "₹200", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Spanish"], timeWeights: ["evening"] },
  // Continental
  { name: "Mushroom Risotto", cuisine: "International", subCuisine: "Continental", emoji: "🍄", price: "₹320", vegNonVeg: "Veg", mood: ["Comfort", "Indulge"], tags: ["Veg", "Continental"], timeWeights: ["evening"] },
  { name: "Grilled Chicken Steak", cuisine: "International", subCuisine: "Continental", emoji: "🥩", price: "₹400", vegNonVeg: "Non-Veg", mood: ["Indulge"], tags: ["Non-Veg", "Continental"], timeWeights: ["evening"] },
  // Mediterranean
  { name: "Mediterranean Mezze Platter", cuisine: "International", subCuisine: "Mediterranean", emoji: "🫒", price: "₹350", vegNonVeg: "Veg", mood: ["Healthy", "Indulge"], tags: ["Veg", "Mediterranean"], timeWeights: ["afternoon", "evening"] },
  { name: "Falafel Wrap", cuisine: "International", subCuisine: "Mediterranean", emoji: "🧆", price: "₹180", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Mediterranean"], timeWeights: ["afternoon"] },
  // Greek
  { name: "Greek Salad", cuisine: "International", subCuisine: "Greek", emoji: "🥗", price: "₹220", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Greek"], timeWeights: ["morning", "afternoon"] },
  { name: "Souvlaki", cuisine: "International", subCuisine: "Greek", emoji: "🍢", price: "₹280", vegNonVeg: "Non-Veg", mood: ["Comfort"], tags: ["Non-Veg", "Greek"], timeWeights: ["evening"] },
  // Chinese
  { name: "Hakka Noodles", cuisine: "International", subCuisine: "Chinese", emoji: "🍜", price: "₹180", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Chinese"], timeWeights: ["afternoon", "evening"] },
  { name: "Chilli Paneer", cuisine: "International", subCuisine: "Chinese", emoji: "🌶️", price: "₹200", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "Chinese"], timeWeights: ["evening"] },
  { name: "Dim Sum", cuisine: "International", subCuisine: "Chinese", emoji: "🥟", price: "₹250", vegNonVeg: "Both", mood: ["Comfort", "Healthy"], tags: ["Both", "Chinese"], timeWeights: ["afternoon", "evening"] },
  // Vietnamese
  { name: "Pho", cuisine: "International", subCuisine: "Vietnamese", emoji: "🍜", price: "₹280", vegNonVeg: "Both", mood: ["Healthy", "Comfort"], tags: ["Both", "Vietnamese"], timeWeights: ["morning", "evening"] },
  { name: "Banh Mi", cuisine: "International", subCuisine: "Vietnamese", emoji: "🥖", price: "₹200", vegNonVeg: "Non-Veg", mood: ["Comfort"], tags: ["Non-Veg", "Vietnamese"], timeWeights: ["afternoon"] },
  // Burmese
  { name: "Khao Suey", cuisine: "International", subCuisine: "Burmese", emoji: "🍲", price: "₹220", vegNonVeg: "Both", mood: ["Comfort"], tags: ["Both", "Burmese"], timeWeights: ["afternoon", "evening"] },
  { name: "Burmese Tea Leaf Salad", cuisine: "International", subCuisine: "Burmese", emoji: "🥗", price: "₹180", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Burmese"], timeWeights: ["afternoon"] },
  // Malay
  { name: "Nasi Lemak", cuisine: "International", subCuisine: "Malay", emoji: "🍚", price: "₹240", vegNonVeg: "Both", mood: ["Comfort", "Indulge"], tags: ["Both", "Malay"], timeWeights: ["afternoon", "evening"] },
  { name: "Satay Skewers", cuisine: "International", subCuisine: "Malay", emoji: "🍢", price: "₹200", vegNonVeg: "Non-Veg", mood: ["Indulge"], tags: ["Non-Veg", "Malay"], timeWeights: ["evening", "night"] },
  // Italian
  { name: "Margherita Pizza", cuisine: "International", subCuisine: "Italian", emoji: "🍕", price: "₹350", vegNonVeg: "Veg", mood: ["Indulge", "Comfort"], tags: ["Veg", "Italian"], timeWeights: ["evening", "night"] },
  { name: "Pasta Alfredo", cuisine: "International", subCuisine: "Italian", emoji: "🍝", price: "₹300", vegNonVeg: "Veg", mood: ["Indulge", "Comfort"], tags: ["Veg", "Italian"], timeWeights: ["afternoon", "evening"] },
  { name: "Bruschetta", cuisine: "International", subCuisine: "Italian", emoji: "🥖", price: "₹180", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Italian"], timeWeights: ["night"] },
  // Thai
  { name: "Pad Thai", cuisine: "International", subCuisine: "Thai", emoji: "🥢", price: "₹220", vegNonVeg: "Non-Veg", mood: ["Comfort"], tags: ["Non-Veg", "Thai"], timeWeights: ["afternoon", "evening"] },
  { name: "Green Curry", cuisine: "International", subCuisine: "Thai", emoji: "🥘", price: "₹260", vegNonVeg: "Non-Veg", mood: ["Indulge", "Comfort"], tags: ["Non-Veg", "Thai"], timeWeights: ["evening"] },
  { name: "Tom Yum Soup", cuisine: "International", subCuisine: "Thai", emoji: "🍲", price: "₹190", vegNonVeg: "Non-Veg", mood: ["Healthy"], tags: ["Non-Veg", "Thai"], timeWeights: ["night"] },
  // Additional items for coverage
  { name: "Poha", cuisine: "Indian", subCuisine: "Maharashtrian", emoji: "🥣", price: "₹60", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "Maharashtrian"], timeWeights: ["morning"] },
  { name: "Upma", cuisine: "Indian", subCuisine: "South Indian", emoji: "🫙", price: "₹70", vegNonVeg: "Veg", mood: ["Healthy"], tags: ["Veg", "South Indian"], timeWeights: ["morning"] },
  { name: "Egg Fried Rice", cuisine: "International", subCuisine: "Chinese", emoji: "🍳", price: "₹160", vegNonVeg: "Non-Veg", mood: ["Comfort"], tags: ["Non-Veg", "Chinese"], timeWeights: ["afternoon", "night"] },
  { name: "Spring Rolls", cuisine: "International", subCuisine: "Chinese", emoji: "🥟", price: "₹140", vegNonVeg: "Veg", mood: ["Comfort"], tags: ["Veg", "Chinese"], timeWeights: ["night", "evening"] },
  { name: "Garlic Bread", cuisine: "International", subCuisine: "Italian", emoji: "🧄", price: "₹150", vegNonVeg: "Veg", mood: ["Indulge"], tags: ["Veg", "Italian"], timeWeights: ["night"] },
  { name: "Momos", cuisine: "International", subCuisine: "Chinese", emoji: "🥟", price: "₹120", vegNonVeg: "Both", mood: ["Comfort"], tags: ["Both", "Chinese"], timeWeights: ["evening", "night"] },
];

// ===== READ DATA (40 items) =====
export const READ_DATA: ReadItem[] = [
  // English
  { title: "The AI Revolution: Our Immortality or Extinction", source: "Wait But Why", topic: "Technology", emoji: "🤖", readTime: "25 min read", language: "English", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://waitbutwhy.com/2015/01/artificial-intelligence-revolution-1.html" },
  { title: "The Tyranny of the Marginal User", source: "Nothing Human", topic: "Design", emoji: "🎨", readTime: "8 min read", language: "English", tags: ["Design", "Technology"], timeWeights: ["afternoon"], url: "https://nothinghuman.substack.com/p/the-tyranny-of-the-marginal-user" },
  { title: "How to Do What You Love", source: "Paul Graham", topic: "Self-improvement", emoji: "💡", readTime: "12 min read", language: "English", tags: ["Self-improvement"], timeWeights: ["morning"], url: "http://paulgraham.com/love.html" },
  { title: "The Absurdity of Existence", source: "Aeon", topic: "Philosophy", emoji: "🌀", readTime: "14 min read", language: "English", tags: ["Philosophy"], timeWeights: ["night"], url: "https://aeon.co/essays/the-absurdity-of-existence" },
  { title: "The Psychology of Money — Summary", source: "Farnam Street", topic: "Finance", emoji: "💰", readTime: "10 min read", language: "English", tags: ["Finance"], timeWeights: ["morning"], url: "https://fs.blog/psychology-of-money/" },
  { title: "The Library of Babel", source: "Jorge Luis Borges", topic: "Fiction/Stories", emoji: "📚", readTime: "15 min read", language: "English", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://libraryofbabel.info" },
  { title: "Deep Work in the Age of Distraction", source: "Cal Newport", topic: "Self-improvement", emoji: "🎯", readTime: "9 min read", language: "English", tags: ["Self-improvement"], timeWeights: ["morning"], url: "https://calnewport.com/deep-work" },
  { title: "How Figma Builds Figma", source: "Figma Blog", topic: "Design", emoji: "🖌️", readTime: "7 min read", language: "English", tags: ["Design", "Technology"], timeWeights: ["afternoon"], url: "https://www.figma.com/blog" },
  { title: "Sleep is Your Superpower", source: "TED Ideas", topic: "Science", emoji: "😴", readTime: "6 min read", language: "English", tags: ["Science", "Self-improvement"], timeWeights: ["night", "evening"], url: "https://www.ted.com/talks/matt_walker_sleep_is_your_superpower" },
  { title: "Atomic Habits: 1% Better Every Day", source: "James Clear", topic: "Self-improvement", emoji: "⚛️", readTime: "5 min read", language: "English", tags: ["Self-improvement"], timeWeights: ["morning"], url: "https://jamesclear.com/atomic-habits-summary" },
  // Hindi
  { title: "डिजिटल इंडिया का भविष्य", source: "Dainik Bhaskar", topic: "Technology", emoji: "📱", readTime: "8 min read", language: "Hindi", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=डिजिटल+इंडिया+भविष्य+Dainik+Bhaskar" },
  { title: "सेहत के लिए योग", source: "BBC Hindi", topic: "Science", emoji: "🧘", readTime: "6 min read", language: "Hindi", tags: ["Science", "Self-improvement"], timeWeights: ["morning"], url: "https://www.bbc.com/hindi/topics/c5qvpqj1dy4t" },
  { title: "पैसों की समझ — बचत कैसे करें", source: "The Lallantop", topic: "Finance", emoji: "💰", readTime: "10 min read", language: "Hindi", tags: ["Finance"], timeWeights: ["morning", "afternoon"], url: "https://www.google.com/search?q=पैसों+की+समझ+बचत+The+Lallantop" },
  // Kannada
  { title: "ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಭವಿಷ್ಯ", source: "Prajavani", topic: "Technology", emoji: "💻", readTime: "7 min read", language: "Kannada", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=ತಂತ್ರಜ್ಞಾನ+ಭವಿಷ್ಯ+Prajavani+Kannada" },
  { title: "ಕನ್ನಡ ಸಾಹಿತ್ಯ — ಹೊಸ ಕವಿತೆಗಳು", source: "Vijaya Karnataka", topic: "Culture", emoji: "📖", readTime: "10 min read", language: "Kannada", tags: ["Culture", "Fiction/Stories"], timeWeights: ["night", "evening"], url: "https://www.google.com/search?q=ಕನ್ನಡ+ಸಾಹಿತ್ಯ+ಹೊಸ+ಕವಿತೆಗಳು+Vijaya+Karnataka" },
  { title: "ಆರೋಗ್ಯ ಸಲಹೆಗಳು", source: "Prajavani Digital", topic: "Science", emoji: "🏥", readTime: "5 min read", language: "Kannada", tags: ["Science"], timeWeights: ["morning"], url: "https://www.google.com/search?q=ಆರೋಗ್ಯ+ಸಲಹೆಗಳು+Prajavani+Kannada" },
  // Tamil
  { title: "தொழில்நுட்பம் 2025", source: "The Hindu Tamil", topic: "Technology", emoji: "📡", readTime: "8 min read", language: "Tamil", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=தொழில்நுட்பம்+2025+The+Hindu+Tamil" },
  { title: "சுய முன்னேற்றம் — வெற்றி வழிகள்", source: "Vikatan", topic: "Self-improvement", emoji: "🌟", readTime: "7 min read", language: "Tamil", tags: ["Self-improvement"], timeWeights: ["morning"], url: "https://www.google.com/search?q=சுய+முன்னேற்றம்+வெற்றி+Vikatan+Tamil" },
  { title: "தமிழ் சிறுகதைகள்", source: "Vikatan", topic: "Fiction/Stories", emoji: "📝", readTime: "12 min read", language: "Tamil", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=தமிழ்+சிறுகதைகள்+Vikatan" },
  // Telugu
  { title: "టెక్నాలజీ ట్రెండ్స్ 2025", source: "Eenadu", topic: "Technology", emoji: "🔬", readTime: "7 min read", language: "Telugu", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=టెక్నాలజీ+ట్రెండ్స్+Eenadu+Telugu" },
  { title: "ఆరోగ్య సూచనలు", source: "Sakshi", topic: "Science", emoji: "🏋️", readTime: "6 min read", language: "Telugu", tags: ["Science"], timeWeights: ["morning"], url: "https://www.google.com/search?q=ఆరోగ్య+సూచనలు+Sakshi+Telugu" },
  { title: "తెలుగు కథలు — ఆధునిక రచనలు", source: "Sakshi", topic: "Fiction/Stories", emoji: "📖", readTime: "15 min read", language: "Telugu", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=తెలుగు+కథలు+ఆధునిక+Sakshi" },
  // Malayalam
  { title: "സാങ്കേതികവിദ്യ — ഭാവിയിലേക്ക്", source: "Mathrubhumi", topic: "Technology", emoji: "💡", readTime: "8 min read", language: "Malayalam", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=സാങ്കേതികവിദ്യ+ഭാവി+Mathrubhumi+Malayalam" },
  { title: "കേരള സംസ്കാരം", source: "Manorama Online", topic: "Culture", emoji: "🏝️", readTime: "10 min read", language: "Malayalam", tags: ["Culture"], timeWeights: ["evening"], url: "https://www.google.com/search?q=കേരള+സംസ്കാരം+Manorama+Online+Malayalam" },
  { title: "ആരോഗ്യ ടിപ്പുകൾ", source: "Mathrubhumi", topic: "Science", emoji: "🧬", readTime: "5 min read", language: "Malayalam", tags: ["Science"], timeWeights: ["morning"], url: "https://www.google.com/search?q=ആരോഗ്യ+ടിപ്പുകൾ+Mathrubhumi+Malayalam" },
  // Bengali
  { title: "প্রযুক্তি ও ভবিষ্যৎ", source: "Anandabazar Patrika", topic: "Technology", emoji: "🖥️", readTime: "8 min read", language: "Bengali", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=প্রযুক্তি+ভবিষ্যৎ+Anandabazar+Patrika" },
  { title: "বাংলা গল্প — আধুনিক সাহিত্য", source: "Anandabazar Patrika", topic: "Fiction/Stories", emoji: "📚", readTime: "14 min read", language: "Bengali", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=বাংলা+গল্প+আধুনিক+সাহিত্য+Anandabazar" },
  { title: "স্বাস্থ্য সচেতনতা", source: "Anandabazar Patrika", topic: "Science", emoji: "💊", readTime: "6 min read", language: "Bengali", tags: ["Science"], timeWeights: ["morning"], url: "https://www.google.com/search?q=স্বাস্থ্য+সচেতনতা+Anandabazar+Bengali" },
  // Gujarati
  { title: "ગુજરાતી ટેકનોલોજી સમાચાર", source: "Gujarat Samachar", topic: "Technology", emoji: "📱", readTime: "7 min read", language: "Gujarati", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=ગુજરાતી+ટેકનોલોજી+Gujarat+Samachar" },
  { title: "ગુજરાતી વાર્તાઓ", source: "Gujarat Samachar", topic: "Fiction/Stories", emoji: "📖", readTime: "12 min read", language: "Gujarati", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=ગુજરાતી+વાર્તાઓ+Gujarat+Samachar" },
  { title: "નાણાકીય આયોજન", source: "Gujarat Samachar", topic: "Finance", emoji: "💰", readTime: "8 min read", language: "Gujarati", tags: ["Finance"], timeWeights: ["morning"], url: "https://www.google.com/search?q=નાણાકીય+આયોજન+Gujarat+Samachar+Gujarati" },
  // Punjabi
  { title: "ਪੰਜਾਬੀ ਟੈਕਨਾਲੋਜੀ ਖ਼ਬਰਾਂ", source: "Ajit Jalandhar", topic: "Technology", emoji: "📡", readTime: "7 min read", language: "Punjabi", tags: ["Technology"], timeWeights: ["afternoon"], url: "https://www.google.com/search?q=ਪੰਜਾਬੀ+ਟੈਕਨਾਲੋਜੀ+Ajit+Jalandhar" },
  { title: "ਪੰਜਾਬੀ ਕਹਾਣੀਆਂ", source: "Ajit Jalandhar", topic: "Fiction/Stories", emoji: "📖", readTime: "10 min read", language: "Punjabi", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=ਪੰਜਾਬੀ+ਕਹਾਣੀਆਂ+Ajit+Jalandhar" },
  // Kashmiri
  { title: "Kashmir Cultural Heritage", source: "Greater Kashmir", topic: "Culture", emoji: "🏔️", readTime: "10 min read", language: "Kashmiri", tags: ["Culture"], timeWeights: ["evening"], url: "https://www.google.com/search?q=Kashmir+cultural+heritage+Greater+Kashmir" },
  { title: "Kashmiri Poetry — Modern Voices", source: "Greater Kashmir", topic: "Fiction/Stories", emoji: "🖋️", readTime: "8 min read", language: "Kashmiri", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=Kashmiri+poetry+modern+Greater+Kashmir" },
  { title: "Health Tips in Kashmiri", source: "Greater Kashmir", topic: "Science", emoji: "🏥", readTime: "5 min read", language: "Kashmiri", tags: ["Science"], timeWeights: ["morning"], url: "https://www.google.com/search?q=health+tips+Kashmiri+Greater+Kashmir" },
  // Oriya
  { title: "ଓଡ଼ିଆ ସାହିତ୍ୟ — ନୂତନ ଲେଖା", source: "Sambad", topic: "Fiction/Stories", emoji: "📖", readTime: "10 min read", language: "Oriya", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=ଓଡ଼ିଆ+ସାହିତ୍ୟ+Sambad+Oriya" },
  { title: "ଓଡ଼ିଆ ବ୍ୟବସାୟ ସମାଚାର", source: "Sambad", topic: "Finance", emoji: "📈", readTime: "6 min read", language: "Oriya", tags: ["Finance"], timeWeights: ["morning"], url: "https://www.google.com/search?q=ଓଡ଼ିଆ+ବ୍ୟବସାୟ+Sambad+Oriya" },
  // Assamese
  { title: "অসমীয়া সংস্কৃতি ও ঐতিহ্য", source: "Pratidin Time", topic: "Culture", emoji: "🎭", readTime: "8 min read", language: "Assamese", tags: ["Culture"], timeWeights: ["evening"], url: "https://www.google.com/search?q=অসমীয়া+সংস্কৃতি+Pratidin+Time+Assamese" },
  { title: "অসমীয়া কবিতা", source: "Pratidin Time", topic: "Fiction/Stories", emoji: "📝", readTime: "10 min read", language: "Assamese", tags: ["Fiction/Stories"], timeWeights: ["night"], url: "https://www.google.com/search?q=অসমীয়া+কবিতা+Pratidin+Time" },
];

// ===== LISTEN DATA (40 items) =====
export const LISTEN_DATA: ListenItem[] = [
  // English
  { title: "Serial: Season One", creator: "Sarah Koenig", duration: "45 min", emoji: "🔍", type: "Podcast", language: "English", tags: ["True Crime"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Serial+Season+One+Sarah+Koenig" },
  { title: "Lo-fi Beats to Study To", creator: "Lofi Girl", duration: "∞", emoji: "🎵", type: "Music", language: "English", tags: ["Focus/Lo-fi", "Chill Music"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/lofi+beats+to+study+to" },
  { title: "The Tim Ferriss Show: Naval Ravikant", creator: "Tim Ferriss", duration: "2 hrs", emoji: "🎙️", type: "Podcast", language: "English", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Tim+Ferriss+Naval+Ravikant" },
  { title: "Conan O'Brien Needs a Friend", creator: "Team Coco", duration: "1 hr", emoji: "😂", type: "Podcast", language: "English", tags: ["Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Conan+O'Brien+Needs+a+Friend" },
  { title: "The Daily — Today's Headlines", creator: "NYT", duration: "25 min", emoji: "📰", type: "Podcast", language: "English", tags: ["News Briefings"], timeWeights: ["morning"], url: "https://open.spotify.com/search/The+Daily+NYT" },
  { title: "Chill Jazz Piano", creator: "Various Artists", duration: "1 hr", emoji: "🎹", type: "Music", language: "English", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/chill+jazz+piano" },
  { title: "Atomic Habits — Audiobook", creator: "James Clear", duration: "5 hrs", emoji: "📖", type: "Podcast", language: "English", tags: ["Audiobooks", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Atomic+Habits+James+Clear+audiobook" },
  { title: "Crime Junkie", creator: "audiochuck", duration: "50 min", emoji: "🕵️", type: "Podcast", language: "English", tags: ["True Crime"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Crime+Junkie+audiochuck" },
  { title: "Focus Flow — Deep Work", creator: "Spotify", duration: "2 hrs", emoji: "🧠", type: "Music", language: "English", tags: ["Focus/Lo-fi"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/focus+flow+deep+work" },
  { title: "Huberman Lab: Optimize Sleep", creator: "Andrew Huberman", duration: "1.5 hrs", emoji: "🔬", type: "Podcast", language: "English", tags: ["Interviews", "Motivational"], timeWeights: ["morning"], url: "https://open.spotify.com/search/Huberman+Lab+Optimize+Sleep" },
  // Hindi
  { title: "Mann Ki Awaaz — Hindi Podcast", creator: "IVM Podcasts", duration: "30 min", emoji: "🎙️", type: "Podcast", language: "Hindi", tags: ["Motivational", "Interviews"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Mann+Ki+Awaaz+Hindi+podcast+IVM" },
  { title: "Chalte Chalte — Stories", creator: "Neelesh Misra", duration: "20 min", emoji: "📖", type: "Podcast", language: "Hindi", tags: ["Audiobooks", "Motivational"], timeWeights: ["night", "evening"], url: "https://open.spotify.com/search/Chalte+Chalte+Neelesh+Misra+Hindi" },
  { title: "Hindi Lo-fi Chill Mix", creator: "Various", duration: "1 hr", emoji: "🎵", type: "Music", language: "Hindi", tags: ["Chill Music", "Focus/Lo-fi"], timeWeights: ["night", "evening"], url: "https://open.spotify.com/search/Hindi+lofi+chill+mix" },
  { title: "Aaj Ki Khabar — Daily News", creator: "Hindi News Pod", duration: "15 min", emoji: "📰", type: "Podcast", language: "Hindi", tags: ["News Briefings"], timeWeights: ["morning"], url: "https://open.spotify.com/search/Hindi+daily+news+podcast" },
  // Kannada
  { title: "Kannada Podcast — Life Stories", creator: "Kannada Podcasters", duration: "25 min", emoji: "🎙️", type: "Podcast", language: "Kannada", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Kannada+podcast+life+stories" },
  { title: "Kannada Melody Hits", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Kannada", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Kannada+melody+hits" },
  { title: "Kannada Comedy Podcast", creator: "Kannada Fun", duration: "30 min", emoji: "😂", type: "Podcast", language: "Kannada", tags: ["Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Kannada+comedy+podcast" },
  // Tamil
  { title: "Tamil Podcast — Varalaru", creator: "Tamil Podcast Network", duration: "35 min", emoji: "🎙️", type: "Podcast", language: "Tamil", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Tamil+podcast+Varalaru+history" },
  { title: "Tamil Lo-fi Study Beats", creator: "Tamil Lofi", duration: "1 hr", emoji: "🎵", type: "Music", language: "Tamil", tags: ["Focus/Lo-fi"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Tamil+lofi+study+beats" },
  { title: "Tamil True Crime Stories", creator: "Tamil Crime Pod", duration: "40 min", emoji: "🔍", type: "Podcast", language: "Tamil", tags: ["True Crime"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Tamil+true+crime+stories+podcast" },
  // Telugu
  { title: "Telugu Motivation Podcast", creator: "Telugu Podcasters", duration: "25 min", emoji: "💪", type: "Podcast", language: "Telugu", tags: ["Motivational"], timeWeights: ["morning"], url: "https://open.spotify.com/search/Telugu+motivation+podcast" },
  { title: "Telugu Chill Playlist", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Telugu", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Telugu+chill+playlist" },
  { title: "Telugu Comedy Show", creator: "Telugu Fun Pod", duration: "30 min", emoji: "😂", type: "Podcast", language: "Telugu", tags: ["Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Telugu+comedy+show+podcast" },
  // Malayalam
  { title: "Malayalam Podcast — Katha", creator: "Malayalam Pod", duration: "25 min", emoji: "📖", type: "Podcast", language: "Malayalam", tags: ["Audiobooks"], timeWeights: ["night"], url: "https://open.spotify.com/search/Malayalam+podcast+Katha+stories" },
  { title: "Malayalam Film Songs — Chill", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Malayalam", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Malayalam+film+songs+chill" },
  { title: "Malayalam News Brief", creator: "Kerala News Pod", duration: "12 min", emoji: "📰", type: "Podcast", language: "Malayalam", tags: ["News Briefings"], timeWeights: ["morning"], url: "https://open.spotify.com/search/Malayalam+news+brief+podcast" },
  // Bengali
  { title: "Bengali Adda — Talk Show", creator: "Bengali Podcasters", duration: "40 min", emoji: "🎙️", type: "Podcast", language: "Bengali", tags: ["Interviews", "Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Bengali+Adda+talk+show+podcast" },
  { title: "Rabindra Sangeet Playlist", creator: "Various", duration: "1.5 hrs", emoji: "🎶", type: "Music", language: "Bengali", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Rabindra+Sangeet+playlist" },
  { title: "Bengali Audiobook — Feluda", creator: "Bengali Audio", duration: "2 hrs", emoji: "📖", type: "Podcast", language: "Bengali", tags: ["Audiobooks"], timeWeights: ["night"], url: "https://open.spotify.com/search/Feluda+audiobook+Bengali" },
  // Gujarati
  { title: "Gujarati Podcast — Business Talk", creator: "Gujarati Pod", duration: "30 min", emoji: "💼", type: "Podcast", language: "Gujarati", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Gujarati+business+talk+podcast" },
  { title: "Gujarati Garba Hits", creator: "Various", duration: "1 hr", emoji: "💃", type: "Music", language: "Gujarati", tags: ["Chill Music"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Gujarati+Garba+hits" },
  { title: "Gujarati Comedy — Hasya Rang", creator: "Gujarati Fun", duration: "25 min", emoji: "😂", type: "Podcast", language: "Gujarati", tags: ["Comedy Podcasts"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Gujarati+comedy+Hasya+Rang" },
  // Punjabi
  { title: "Punjabi Podcast — Virsa", creator: "Punjabi Podcasters", duration: "30 min", emoji: "🎙️", type: "Podcast", language: "Punjabi", tags: ["Interviews", "Motivational"], timeWeights: ["morning", "afternoon"], url: "https://open.spotify.com/search/Punjabi+podcast+Virsa" },
  { title: "Punjabi Chill Beats", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Punjabi", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Punjabi+chill+beats+playlist" },
  { title: "Punjabi Comedy Podcast", creator: "Punjabi Fun", duration: "35 min", emoji: "😂", type: "Podcast", language: "Punjabi", tags: ["Comedy Podcasts"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Punjabi+comedy+podcast" },
  // Kashmiri
  { title: "Kashmiri Sufi Music", creator: "Various", duration: "45 min", emoji: "🎵", type: "Music", language: "Kashmiri", tags: ["Chill Music"], timeWeights: ["night"], url: "https://open.spotify.com/search/Kashmiri+Sufi+music" },
  { title: "Kashmir Stories Podcast", creator: "Kashmir Pod", duration: "30 min", emoji: "🏔️", type: "Podcast", language: "Kashmiri", tags: ["Interviews"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Kashmir+stories+podcast" },
  { title: "Kashmiri Folk Songs", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Kashmiri", tags: ["Chill Music"], timeWeights: ["evening", "night"], url: "https://open.spotify.com/search/Kashmiri+folk+songs" },
  // Oriya & Assamese
  { title: "Odia Podcast — Katha O Kahani", creator: "Odia Podcasters", duration: "25 min", emoji: "📖", type: "Podcast", language: "Oriya", tags: ["Audiobooks"], timeWeights: ["night"], url: "https://open.spotify.com/search/Odia+podcast+Katha+Kahani" },
  { title: "Assamese Bihu Songs", creator: "Various", duration: "1 hr", emoji: "🎶", type: "Music", language: "Assamese", tags: ["Chill Music"], timeWeights: ["evening"], url: "https://open.spotify.com/search/Assamese+Bihu+songs" },
];

export function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

// Language-first filter for Watch/Read/Listen
function filterByLanguage<T extends { language: string }>(
  data: T[],
  userLanguages: string[]
): T[] {
  const filtered = data.filter(item => userLanguages.includes(item.language));
  // Fallback to English if < 3 items
  if (filtered.length < 3) {
    const english = data.filter(item => item.language === 'English');
    return [...new Set([...filtered, ...english])];
  }
  return filtered;
}

export function getRecommendation<T extends { tags: string[]; timeWeights: TimeOfDay[] }>(
  data: T[],
  userTags: string[],
  preferredTime: TimeOfDay
): T {
  const currentTime = getTimeOfDay();
  const timeToUse = preferredTime || currentTime;

  const timeMatches = data.filter(item => item.timeWeights.includes(timeToUse));
  const pool = timeMatches.length > 0 ? timeMatches : data;

  const scored = pool.map(item => ({
    item,
    score: item.tags.filter(tag => userTags.includes(tag)).length,
  }));

  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, Math.min(3, scored.length));
  return top3[Math.floor(Math.random() * top3.length)].item;
}

// Language-aware recommendation for Watch/Read/Listen
export function getLanguageAwareRecommendation<T extends { tags: string[]; timeWeights: TimeOfDay[]; language: string }>(
  data: T[],
  userTags: string[],
  preferredTime: TimeOfDay,
  userLanguages: string[]
): T {
  const langFiltered = filterByLanguage(data, userLanguages);
  return getRecommendation(langFiltered, userTags, preferredTime);
}

// Food recommendation with 3-layer filter
export function getFoodRecommendation(
  data: EatItem[],
  foodType: string,
  foodMood: string,
  cuisines: string[],
  preferredTime: TimeOfDay
): EatItem {
  // Layer 1: Veg/Non-Veg filter
  let pool = data.filter(item => {
    if (foodType === 'Both') return true;
    return item.vegNonVeg === foodType || item.vegNonVeg === 'Both';
  });

  // Layer 2: Mood filter
  const moodFiltered = pool.filter(item => item.mood.includes(foodMood as FoodMoodTag));
  if (moodFiltered.length >= 3) pool = moodFiltered;

  // Layer 3: Cuisine filter
  const cuisineFiltered = pool.filter(item => cuisines.includes(item.subCuisine));
  if (cuisineFiltered.length >= 3) pool = cuisineFiltered;

  // Time weighting
  const timeMatches = pool.filter(item => item.timeWeights.includes(preferredTime));
  const finalPool = timeMatches.length > 0 ? timeMatches : pool;

  // Pick from top 3
  if (finalPool.length === 0) {
    return data[Math.floor(Math.random() * data.length)];
  }

  const top3 = finalPool.slice(0, Math.min(3, finalPool.length));
  return top3[Math.floor(Math.random() * top3.length)];
}
