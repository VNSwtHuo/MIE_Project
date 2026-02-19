// Image dataset with labels indicating whether each image is AI-generated
export interface ImageData {
  id: string;
  url: string;
  isAIGenerated: boolean;
}

export const imageDataset: ImageData[] = [
  {
    id: "img001",
    url: "https://images.unsplash.com/photo-1618886850494-c79fd48305b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBob3RvZ3JhcGh5JTIwcGVyc29ufGVufDF8fHx8MTc3MDM2MDc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img002",
    url: "https://images.unsplash.com/photo-1616386573884-22531fd226e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBuYXR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NzAzODQ4ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img003",
    url: "https://images.unsplash.com/photo-1695067438561-75492f7b6a9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzAzMjA1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img004",
    url: "https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MDQwNTc2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img005",
    url: "https://images.unsplash.com/photo-1513563326940-e76e4641069e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG5pZ2h0fGVufDF8fHx8MTc3MDM4MDE4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img006",
    url: "https://images.unsplash.com/photo-1698309627162-8ce7442ab855?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHklMjBtZWFsfGVufDF8fHx8MTc3MDM3OTAwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img007",
    url: "https://images.unsplash.com/photo-1651707265633-6043d4606339?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjB3aWxkbGlmZSUyMG5hdHVyZXxlbnwxfHx8fDE3NzAzMDA2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img008",
    url: "https://images.unsplash.com/photo-1569832724830-0b4ab7b52ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGJlYWNoJTIwd2F2ZXN8ZW58MXx8fHwxNzcwMzA2MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img009",
    url: "https://images.unsplash.com/photo-1692997364986-29a017d99013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB0cmVlcyUyMHN1bmxpZ2h0fGVufDF8fHx8MTc3MDM5MTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img010",
    url: "https://images.unsplash.com/photo-1598087216773-d02ad98034f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3MDI5OTEyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img011",
    url: "https://images.unsplash.com/photo-1588587614134-16dd30800244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBtYWNybyUyMGNsb3NldXB8ZW58MXx8fHwxNzcwNDA1NzY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img012",
    url: "https://images.unsplash.com/photo-1718258759235-82402337d478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx2aW50YWdlJTIwY2FyJTIwYXV0b21vYmlsZXxlbnwxfHx8fDE3NzAzOTg2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img013",
    url: "https://images.unsplash.com/photo-1669024513552-56127b2d0d85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxkZXNlcnQlMjBzYW5kJTIwZHVuZXN8ZW58MXx8fHwxNzcwMjg2OTE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img014",
    url: "https://images.unsplash.com/photo-1719961152775-99b8a57b09f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjb2ZmZWUlMjBtb3JuaW5nJTIwYnJlYWtmYXN0fGVufDF8fHx8MTc3MDM1Njk3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img015",
    url: "https://images.unsplash.com/photo-1623679072629-3aaa0192a391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDMwNDk5OHww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img016",
    url: "https://images.unsplash.com/photo-1661362758906-3a85700516c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdW5zZXQlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzcwMzY3OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img017",
    url: "https://images.unsplash.com/photo-1606388701602-2e3727da5b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3aW50ZXIlMjBzbm93JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MDMyMTAzMnww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img018",
    url: "https://images.unsplash.com/photo-1642316655095-6349aa377ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0ZWNobm9sb2d5JTIwY29tcHV0ZXIlMjBkaWdpdGFsfGVufDF8fHx8MTc3MDQwNTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  },
  {
    id: "img019",
    url: "https://images.unsplash.com/photo-1696245843980-79b69e076ffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGluc3RydW1lbnRzJTIwZ3VpdGFyfGVufDF8fHx8MTc3MDQwNTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: false
  },
  {
    id: "img020",
    url: "https://images.unsplash.com/photo-1704048001164-9e454dd611e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBwbGFudHMlMjBmbG93ZXJzfGVufDF8fHx8MTc3MDMwOTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    isAIGenerated: true
  }
];

// Function to get a random selection of images
export function getRandomImages(count: number): ImageData[] {
  const shuffled = [...imageDataset].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
