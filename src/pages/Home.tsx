import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import EventModal from "@/components/EventModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoLarge from "@/assets/logo-pmse-large.png";
import corridat from "@/assets/corridat.jpeg";
import desfile from "@/assets/desfile.avif";
import natalsolidario from "@/assets/natalsolidario.jpg";
import diadosoldado from "@/assets/diadosoldado.jpg";
import festejooperacao from "@/assets/festejooperacao.jpg";
import maioamarelo from "@/assets/maioamarelo.png";

const initialEvents = [
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

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState(initialEvents);
  
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEventCreate = (newEvent: any) => {
    setEvents(prev => [...prev, newEvent]);
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 sm:pt-32">
        <div className="flex justify-center mb-8 sm:mb-12">
          <img src={logoLarge} alt="PMSE" className="h-24 sm:h-32" />
        </div>
        
        <div className="max-w-5xl mx-auto mb-6 sm:mb-8 flex flex-col sm:flex-row gap-4">
          <EventModal onEventCreate={handleEventCreate} />
          <Input
            placeholder="Buscar Evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-accent/30 border-border text-foreground placeholder:text-muted-foreground h-12"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-card/95 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
            >
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-card-foreground/70 mb-4">
                  {event.date} – {event.location}
                </p>
                <Link to={`/evento/${event.id}`}>
                  <Button 
                    variant="secondary"
                    className="w-full bg-muted hover:bg-muted/90 text-foreground font-semibold text-sm sm:text-base h-10 sm:h-auto"
                  >
                    MAIS DETALHES
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
