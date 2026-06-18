export type Genre = "Trap" | "Rap" | "Hip Hop" | "Afropop" | "Afrotrap";

export interface Video {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  thumbnail: string;
  videoUrl: string;
  price: number; // 0 for free
  isFree: boolean;
  duration: string;
  description: string;
}

export const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Trap King",
    artist: "K-Trap",
    genre: "Trap",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2280cc50-96cd-4d63-9427-e996b2ea2b88/trap-king---k-trap-12c95d25-1781817853923.webp",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 500,
    isFree: false,
    duration: "3:45",
    description: "Le nouveau banger Trap qui secoue les rues de Yaoundé. K-Trap impose son style avec des lyrics tranchants et une prod sombre.",
  },
  {
    id: "2",
    title: "City Lights",
    artist: "J-Flow",
    genre: "Rap",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2280cc50-96cd-4d63-9427-e996b2ea2b88/city-lights---j-flow-5068625a-1781817853930.webp",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: 0,
    isFree: true,
    duration: "4:12",
    description: "Une balade mélancolique à travers la ville. J-Flow raconte son parcours et ses espoirs dans ce clip visuellement époustouflant.",
  },
  {
    id: "3",
    title: "Old School Vibes",
    artist: "Big Mic",
    genre: "Hip Hop",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2280cc50-96cd-4d63-9427-e996b2ea2b88/old-school-vibes---big-mic-11ecd29f-1781817852902.webp",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 750,
    isFree: false,
    duration: "3:20",
    description: "Le retour du vrai Hip Hop. Big Mic ramène l'essence du boom-bap avec un flow technique et des rimes percutantes.",
  },
  {
    id: "4",
    title: "Island Breeze",
    artist: "AfroStar",
    genre: "Afropop",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2280cc50-96cd-4d63-9427-e996b2ea2b88/island-breeze---afrostar-a5b3a46f-1781817853923.webp",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: 0,
    isFree: true,
    duration: "3:55",
    description: "L'hymne de l'été. AfroStar nous transporte sur les plages ensoleillées avec un titre Afropop frais et dansant.",
  },
  {
    id: "5",
    title: "Street Heat",
    artist: "B-Afro",
    genre: "Afrotrap",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/2280cc50-96cd-4d63-9427-e996b2ea2b88/street-heat---b-afro-90fb0bc4-1781817853282.webp",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 1000,
    isFree: false,
    duration: "3:30",
    description: "L'énergie pure de l'Afrotrap. B-Afro mélange rythmes africains et sonorités trap pour un résultat explosif.",
  },
  {
    id: "6",
    title: "Urban Legend",
    artist: "Slim G",
    genre: "Trap",
    thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: 600,
    isFree: false,
    duration: "3:15",
    description: "Slim G revient avec un titre trap sombre et puissant.",
  },
  {
    id: "7",
    title: "Mama Africa",
    artist: "Queen T",
    genre: "Afropop",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 0,
    isFree: true,
    duration: "4:05",
    description: "Un hommage vibrant au continent africain par la reine de l'Afropop.",
  },
  {
    id: "8",
    title: "Douala Night",
    artist: "Sammy D",
    genre: "Afrotrap",
    thumbnail: "https://images.unsplash.com/photo-1514525253344-f8560024971f?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: 450,
    isFree: false,
    duration: "3:40",
    description: "Sammy D nous emmène dans les nuits électriques de Douala.",
  }
];
