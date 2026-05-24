import { Candidate } from "./types";

export const INITIAL_CANDIDATES: Candidate[] = [
  // Head Boy Candidates
  {
    id: "hb-leo",
    name: "Leo Sterling",
    role: "Head boy",
    symbol: "🦁",
    tagline: "Bold Vision",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhv5OfXVhGmsm9d-P60kh0JKf56lizTc0fNQp-kHGVg75BlYZ46nLvWYzW62sJaMPU-YGz9NeCE47KjlRQooebJMN5zBF4trIE7IcPnYTpo-ux49nu72IWZzLQJEw85_mproW_3w5qWQW-qzmDnpXK7uPNturMcGDenS1zlvBbGMPBipzP1qtBa4DESrwCmYKXcBHU9GR9ASYsR65PgZArqy5Sq8L2T-q4vLOobT412zXPU0mXC78XlpDY-sqVaqfIqbuT9p50V53m",
    votes: 5246
  },
  {
    id: "hb-caleb",
    name: "Caleb Wolf",
    role: "Head boy",
    symbol: "🐺",
    tagline: "Pack Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC08c2OQLYPHc__VQOVUGnSWQls7p0ERLMS-bHsod8ws-mgFSjYgI_UNVnA051Vv5Bfu5jdo4AZcnH-odW0Celpw8tgXfoiWqB9iYHC_-IpHabzlXY-qESMcXs7tmv4VBu4Ff-fn0eAEEdeF1jKylNavVgklAeZJKboi5YPJ5q-MS9OozsG-_oauI9LLhgsbZCNTdWNuSh-BBuBsjVHKM0wDHm8NG308vM15T-zmmT-_NPdSKV7g-tHvBybp8bvfZPdpzsKDVZPJ-hm",
    votes: 3824
  },
  // Head Girl Candidates
  {
    id: "hg-elena",
    name: "Elena Nova",
    role: "Head girl",
    symbol: "🚀",
    tagline: "Future Ready",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQIY83kC3x-YTTSULQLxZFekiTLo9qwn9EVE8BUr3GMxDC4SotqHnH6zuQMKnqiiKqJCWQjPhKYGycpb284auJSQZ4HXdyITlCy6gM0GYDUGJqF_5jggWZ-NRBNEF68LxihmqXGeOF106560OszMQnj1FUtav-j2dKY7DBau01olaqXkC-pu6c-ndSSPjRO4q388rWB2Rj8z1unyIKC6mWxhd6UXrRDzQcV7KtseYzejLK7gltivLPJzT7N4N6jrp7SPRrwgC8kbsT",
    votes: 4920
  },
  {
    id: "hg-sarah",
    name: "Sarah Bloom",
    role: "Head girl",
    symbol: "🦋",
    tagline: "Growth Focus",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    votes: 3120
  },
  // Sports Captain Candidates
  {
    id: "sc-marcus",
    name: "Marcus Stone",
    role: "Sports captain",
    symbol: "💎",
    tagline: "Pure Value",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    votes: 4210
  },
  {
    id: "sc-jax",
    name: "Jax Thunder",
    role: "Sports captain",
    symbol: "⚡",
    tagline: "High Energy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    votes: 2150
  },
  {
    id: "sc-riley",
    name: "Riley Aim",
    role: "Sports captain",
    symbol: "🎯",
    tagline: "Precision",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    votes: 1890
  },
  // Event Manager Candidates
  {
    id: "em-alex",
    name: "Alex Volt",
    role: "Event manager",
    symbol: "✨",
    tagline: "Epic Vibes",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    votes: 3670
  },
  {
    id: "em-chloe",
    name: "Chloe Connect",
    role: "Event manager",
    symbol: "🎨",
    tagline: "Creative Bond",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    votes: 2890
  },
  // Green House Captain Candidates
  {
    id: "gh-flora",
    name: "Flora Root",
    role: "Green house captain",
    symbol: "🌱",
    tagline: "Earth First",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    votes: 1950
  },
  // Yellow House Candidates
  {
    id: "yh-aurora",
    name: "Aurora Sunny",
    role: "Yellow house captain",
    symbol: "☀️",
    tagline: "Shine Brighter",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    votes: 890
  },
  {
    id: "yh-solis",
    name: "Solis Bright",
    role: "Yellow house vice captain",
    symbol: "⚡",
    tagline: "Bright Ideas",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    votes: 410
  },
  // Green House Vice Captain
  {
    id: "gh-clover",
    name: "Clover Leaf",
    role: "Green house vice captain",
    symbol: "🍀",
    tagline: "Lucky Future",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    votes: 340
  },
  // Red House Candidates
  {
    id: "rh-blaze",
    name: "Blaze Parker",
    role: "Red house captain",
    symbol: "🔥",
    tagline: "Fired Up",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    votes: 1120
  },
  {
    id: "rh-amber",
    name: "Amber Flame",
    role: "Red house vice captain",
    symbol: "💥",
    tagline: "Ignite Magic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    votes: 520
  },
  // Blue House Candidates
  {
    id: "bh-ocean",
    name: "Ocean Skipper",
    role: "Blue house captain",
    symbol: "🌊",
    tagline: "Wave of Leadership",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    votes: 1350
  },
  {
    id: "bh-sky",
    name: "Skye Mariner",
    role: "Blue house vice captain",
    symbol: "⚓",
    tagline: "Anchor in Storms",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    votes: 620
  }
];

export const CATEGORIES = [
  "Head Boy",
  "Head Girl",
  "Sports Captain",
  "Event Manager",
  "Sports Vice Captain",
  "Yellow House Captain",
  "Yellow House Vice Captain",
  "Green House Captain",
  "Green House Vice Captain",
  "Red House Captain",
  "Red House Vice Captain",
  "Blue House Captain",
  "Blue House Vice Captain"
];

export const ROLE_OPTIONS = [
  "Head boy",
  "Head girl",
  "Sports captain",
  "Event manager",
  "Sports vice captain",
  "Yellow house captain",
  "Yellow house vice captain",
  "Green house captain",
  "Green house vice captain",
  "Red house captain",
  "Red house vice captain",
  "Blue house captain",
  "Blue house vice captain"
];

export const EMOJI_OPTIONS = [
  // --- Smileys & Emotions ---
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🫣", "🤭", "🫢", "🤫", "🫠", "🤥", "😶", "😐", "😑", "😬", "🫨", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾",
  // --- Hands & Body Parts ---
  "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "💋", "🩸",
  // --- Hearts & Love ---
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝",
  // --- Animals & Creatures ---
  "🦁", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🐶", "🐕", "🐩", "🦮", "🐕‍🦺", "🐯", "🐅", "🐆", "🐴", "🫏", "🐎", "🦄", "🫎", "🦌", "🦬", "🐮", "🦛", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨", "🐼", "🦥", "🦦", "🦨", "🦡", "🐸", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🦑", "🪼", "🦐", "🦞", "🦀",
  // --- Bugs & Insects ---
  "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷️", "🕸️", "🦂",
  // --- Nature, Plants & Flowers ---
  "💐", "🌸", "💮", "🪻", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂", "🍃", "🍄", "🌰", "🪨", "🪵", "🌊", "🌬️", "🌀", "⭐", "🌟", "✨", "⚡", "🔥", "🌈", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "❄️", "⛄", "☄️", "🌌", "🌍", "🌎", "🌏", "🪐", "🌙", "🌘", "🌗", "🌖", "🌕",
  // --- Food & Drink ---
  "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🧅", "🧄", "🫘", "🥬", "🥦", "🥜", "🥐", "🍞", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥗", "🍿", "🧈", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🥛", "☕", "🫖", "🍵", "🧉", "🥤", "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🍾", "🧊",
  // --- Activity, Sports & Games ---
  "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🏋️", "🤺", "🤼", "🤸", "⛹️", "🤾", "🧗", "🚴", "🚵", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎫", "🎟️", "🎭", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩",
  // --- Objects, Tools & Tech ---
  "💎", "💡", "🚀", "⚡", "🔥", "✨", "🎯", "🌟", "💻", "📱", "⌚", "⌨️", "🖱️", "🕹️", "🔌", "🔋", "💾", "💿", "📷", "📸", "📹", "🎥", "📺", "📻", "🎙️", "⏱️", "⏰", "🧲", "🔨", "🪓", "⛏️", "⚒️", "🛠️", "🗡️", "⚔️", "🛡️", "🔧", "🪛", "⚙️", "🧱", "🔮", "🧬", "🧪", "🧫", "🔬", "🔭", "📡", "🩺", "💉", "💊", "🩹", "🧹", "🧺", "🧼", "🧽", "🪣", "🔑", "🗝️", "🔒", "🔓", "🔐", "🔔", "🔕", "📣", "📢", "🔈", "🔊", "📯", "✉️", "📦", "📁", "📂", "🗂️", "📅", "📆", "🗒️", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "🖇️", "📐", "📏", "📔", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🧷", "🔗", "✏️", "✒️", "🖋️", "🖊️", "🖌️", "🖍️", "📝", "💼", "🎒", "🔪", "🧢", "🎩", "👑", "🎓", "🪖", "👕", "👔", "👗", "👟", "🥾", "👓", "🕶️", "🏁", "🚩", "🏳️‍🌈", "🏴‍☠️", "🎈", "🎉", "🎊", "🎁", "🎀", "🌠", "💥", "🚗", "🚕", "🚙", "🚌", "🚒", "🚓", "🚴", "🛸", "🚁", "✈️", "⛵", "⚓", "⚠️", "🛑", "☢️", "☣️", "☯️", "☮️", "💯", "🛟"
];
