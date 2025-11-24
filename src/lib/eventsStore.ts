// Imports das imagens
import corridat from "@/assets/corridat.jpeg";
import desfile from "@/assets/desfile.avif";
import natalsolidario from "@/assets/natalsolidario.jpg";
import diadosoldado from "@/assets/diadosoldado.jpg";
import festejooperacao from "@/assets/festejooperacao.jpg";
import maioamarelo from "@/assets/maioamarelo.png";

// Simulação de um store simples para gerenciar os eventos
let eventsStore: any[] = [
  {
    id: 1,
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    location: "Aracaju, Orla da Atalaia",
    image: corridat,
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
    image: desfile,
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
    image: natalsolidario,
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
    image: diadosoldado,
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
    image: festejooperacao,
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
    image: maioamarelo,
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
  
  addParticipant: (eventId: string | number, participant: any) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.participants.push(participant);
    }
  },
  
  addMaterial: (eventId: string | number, material: any) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.materials.push(material);
    }
  },
  
  addRecommendation: (eventId: string | number, recommendation: string) => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.recommendations.push(recommendation);
    }
  },
  
  updateStatus: (eventId: string | number, status: 'pendente' | 'aprovado') => {
    const event = eventsStore.find(e => e.id === Number(eventId));
    if (event) {
      event.status = status;
    }
  }
};