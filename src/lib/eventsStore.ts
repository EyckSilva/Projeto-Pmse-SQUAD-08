// Simulação de um store simples para gerenciar os eventos
let eventsStore: any[] = [
  {
    id: 1,
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    location: "Aracaju, Orla da Atalaia",
    image: "/src/assets/corridat.jpeg",
    status: "aprovado",
    participants: [],
    materials: [],
    recommendations: []
  },
  {
    id: 2,
    title: "Desfile Cívico",
    date: "07/09/2025",
    location: "Avenida Barão de Maruim, Aracaju",
    image: "/src/assets/desfile.avif",
    status: "aprovado",
    participants: [],
    materials: [],
    recommendations: []
  },
  {
    id: 3,
    title: "Natal Solidário",
    date: "20/12/2025",
    location: "Comunidades de Aracaju",
    image: "/src/assets/natalsolidario.jpg",
    status: "pendente",
    participants: [],
    materials: [],
    recommendations: []
  },
  {
    id: 4,
    title: "Dia do Soldado",
    date: "29/08/2026",
    location: "Quartel do Comando Geral",
    image: "/src/assets/diadosoldado.jpg",
    status: "aprovado",
    participants: [],
    materials: [],
    recommendations: []
  },
  {
    id: 5,
    title: "Operação Festejos Juninos",
    date: "15/06/2026",
    location: "Forró Caju",
    image: "/src/assets/festejooperacao.jpg",
    status: "pendente",
    participants: [],
    materials: [],
    recommendations: []
  },
  {
    id: 6,
    title: "Campanha do Maio Amarelo",
    date: "05/05/2026",
    location: "Aracaju",
    image: "/src/assets/maioamarelo.png",
    status: "aprovado",
    participants: [],
    materials: [],
    recommendations: []
  }
];

export const EventsStore = {
  removeEvent: (eventId: string | number) => {
    const index = eventsStore.findIndex(e => e.id === Number(eventId));
    if (index !== -1) {
      eventsStore.splice(index, 1);
    }
  },
  removeParticipant: (eventId: string | number, index: number) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.participants.splice(index, 1);
    }
  },

  removeMaterial: (eventId: string | number, index: number) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.materials.splice(index, 1);
    }
  },

  removeRecommendation: (eventId: string | number, index: number) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.recommendations.splice(index, 1);
    }
  },
  getAll: () => eventsStore,
  
  getById: (id: string | number) => {
    return eventsStore.find(event => event.id === Number(id));
  },
  
  add: (event: any) => {
    eventsStore.push(event);
  },
  
  update: (id: string | number, updatedEvent: any) => {
    const index = eventsStore.findIndex(event => event.id === Number(id));
    if (index !== -1) {
      eventsStore[index] = { ...eventsStore[index], ...updatedEvent };
    }
  },
  
  addParticipant: (eventId: string | number, participant: string) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event && participant.trim()) {
      event.participants.push(participant.trim());
    }
  },
  
  addMaterial: (eventId: string | number, material: string) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event && material.trim()) {
      event.materials.push(material.trim());
    }
  },
  
  addRecommendation: (eventId: string | number, recommendation: string) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event && recommendation.trim()) {
      event.recommendations.push(recommendation.trim());
    }
  },
  
  updateStatus: (eventId: string | number, status: 'pendente' | 'aprovado') => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.status = status;
    }
  }
};