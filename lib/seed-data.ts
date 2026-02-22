import { Restaurant } from './types';

// Sample data for development and demo purposes
// These represent the kinds of restaurants Lazy Susan is built for
export const SEED_RESTAURANTS: Omit<Restaurant, 'id' | 'created_at'>[] = [
  {
    name: "Doña Carmen's Kitchen",
    neighborhood: 'Bushwick',
    borough: 'Brooklyn',
    cuisine_type: 'Dominican',
    address: '1247 Myrtle Ave, Brooklyn, NY 11221',
    description:
      "Doña Carmen has been cooking on this block since 1994. She came from Santiago with her mother's recipes and a dream of feeding people the way she grew up eating — big portions, bold flavors, and nothing from a can. The mangú is legendary. The pollo guisado tastes like someone's abuela made it, because she did. The lunch rush used to stretch down the block, but the neighborhood changed, the new residents walk right past, and now most days it's just the regulars. The food hasn't changed. The love hasn't changed. The tables are just emptier than they used to be.",
    why_support:
      "The block has changed around her and foot traffic has dropped by half. She's thinking about closing at the end of the year if things don't pick up.",
    submitted_by: 'Marcus T.',
    photo_urls: ['https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: 'Golden Phoenix',
    neighborhood: 'Sunset Park',
    borough: 'Brooklyn',
    cuisine_type: 'Chinese',
    address: '5411 8th Ave, Brooklyn, NY 11220',
    description:
      "Run by the Wong family for over 25 years, Golden Phoenix serves some of the most honest Cantonese food in the city. The wonton soup is the kind that makes you close your eyes. The roast duck hangs in the window like it has since 1999. Mr. Wong still comes in at 5am to prep, and his daughter runs the front. They don't have a website. They don't have an Instagram. They have a loyal base of regulars who are aging out, and a new generation that doesn't know they're here.",
    why_support:
      "Their regulars are getting older and the younger crowd in the neighborhood doesn't know about them. Revenue is down 40% from five years ago.",
    submitted_by: 'Jenny L.',
    photo_urls: ['https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: "Tía Lucy's Pupusería",
    neighborhood: 'Corona',
    borough: 'Queens',
    cuisine_type: 'Salvadoran',
    address: '104-12 Roosevelt Ave, Queens, NY 11368',
    description:
      "Lucy makes every pupusa by hand, the way her mother taught her in San Salvador. Revuelta, loroco, chicharrón — each one pressed and griddled to order. The curtido is sharp and perfect. The horchata is made fresh every morning. She opened this tiny storefront eight years ago with her savings and a prayer. The place seats twelve. The walls are covered in photos from home. On a good day, she sells out. On most days, she doesn't.",
    why_support:
      "She's competing with bigger restaurants on Roosevelt Ave and can't afford signage or advertising. Most people walk right past without noticing.",
    submitted_by: 'Carlos M.',
    photo_urls: ['https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: "Rani's Roti Shop",
    neighborhood: 'Richmond Hill',
    borough: 'Queens',
    cuisine_type: 'Guyanese',
    address: '118-15 Liberty Ave, Queens, NY 11419',
    description:
      "Rani's has been a Liberty Ave institution for 18 years. The roti is paper-thin and buttery, the curry goat falls off the bone, and the pepper sauce will make you see God. Rani runs the kitchen with her two daughters, and her husband handles the counter. It's the kind of place where they know your order before you say it. But if you're not from the neighborhood, you'd never find it — there's no sign out front, just a screen door and the smell of curry.",
    why_support:
      "They lost their signage in a storm two years ago and can't afford to replace it. Walk-in traffic from people outside the neighborhood is basically zero.",
    submitted_by: 'Priya D.',
    photo_urls: ['https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: 'Park Slope Pita',
    neighborhood: 'Park Slope',
    borough: 'Brooklyn',
    cuisine_type: 'Middle Eastern',
    address: '342 5th Ave, Brooklyn, NY 11215',
    description:
      "Ahmad and his wife Fatima have run this falafel spot for 12 years. The falafel is crispy on the outside, green and herbaceous on the inside. The hummus is made fresh every morning from dried chickpeas — never canned. The shawarma is carved to order. They raised three kids in the apartment above the shop. The rent keeps going up, the prices on the menu haven't changed in four years because Ahmad refuses to charge his neighbors more. 'They supported us,' he says. 'We can't turn around and charge them $18 for a sandwich.'",
    why_support:
      "Rising rent and their refusal to raise prices means margins are razor thin. They need more volume to survive, not higher prices.",
    submitted_by: 'Sarah K.',
    photo_urls: ['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: "Grandma Kim's",
    neighborhood: 'Flushing',
    borough: 'Queens',
    cuisine_type: 'Korean',
    address: '41-06 162nd St, Queens, NY 11358',
    description:
      "Mrs. Kim is 74 years old and still makes every batch of kimchi by hand in the basement. Her jjigae tastes like it should cost $30 in Manhattan, but she charges $11 because she says that's what a meal should cost. The restaurant is below street level — you walk down three steps into a warm, cramped room with eight tables, Korean dramas on the TV, and the best soondubu you'll ever have. Her son wants her to retire. She says she'll cook until she can't stand.",
    why_support:
      "The below-street-level location means almost no one finds her by accident. She relies entirely on regulars, and she's losing them as the neighborhood turns over.",
    submitted_by: 'David P.',
    photo_urls: ['https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&fit=crop&q=80'],
    needs_support: true,
    status: 'approved',
  },
  {
    name: "Big Mike's Soul Kitchen",
    neighborhood: 'Bed-Stuy',
    borough: 'Brooklyn',
    cuisine_type: 'Southern / Soul Food',
    address: '789 Nostrand Ave, Brooklyn, NY 11216',
    description:
      "Mike Robinson Sr. opened this spot in 2001 after retiring from the MTA. He said he spent 30 years underground and wanted to spend the next 30 feeding people. The mac and cheese is transcendent. The fried chicken takes 20 minutes because it's made to order. The collard greens are cooked low and slow with smoked turkey. Mike's son helps on weekends, and his granddaughter works the register after school. It's a family operation in every sense of the word.",
    why_support:
      "The block is now dominated by new cafes and wine bars. Mike's loyal customers are being priced out of the neighborhood and moving away. He needs new faces through the door.",
    submitted_by: 'Alicia J.',
    photo_urls: ['https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&fit=crop&q=80'],
    needs_support: false,
    status: 'approved',
  },
  {
    name: 'Himalayan Bites',
    neighborhood: 'Jackson Heights',
    borough: 'Queens',
    cuisine_type: 'Nepali',
    address: '72-20 Roosevelt Ave, Queens, NY 11372',
    description:
      "Deepak and his wife Sita opened Himalayan Bites five years ago after immigrating from Kathmandu. The momos are handmade — 200 a day, every day — and filled with a spiced lamb mixture that Sita learned from her grandmother. The thali set is the best deal in Jackson Heights: dal, rice, two curries, achar, and papadum for $10. The space is tiny but spotless, decorated with photos of the Himalayas and prayer flags. They're good people making incredible food in a competitive corridor.",
    why_support:
      "Jackson Heights has dozens of restaurants and they're one of the newest. Without any marketing or social media, they're struggling to stand out on a block full of established spots.",
    submitted_by: 'Amara S.',
    photo_urls: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&fit=crop&q=80'],
    needs_support: false,
    status: 'approved',
  },
];
