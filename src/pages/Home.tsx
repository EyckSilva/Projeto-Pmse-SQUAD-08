import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoLarge from "@/assets/logo-pmse-large.png";

const mockEvents = [
  {
    id: 1,
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    location: "Aracaju, Orla da Atalaia",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80"
  },
  {
    id: 2,
    title: "Desfile Cívico",
    date: "07/09/2025",
    location: "Avenida Barão de Maruim, Aracaju",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80"
  },
  {
    id: 3,
    title: "Natal Solidário",
    date: "20/12/2025",
    location: "Comunidades de Aracaju",
    image: "https://images.unsplash.com/photo-1576856497337-52bde8c06ec5?w=800&q=80"
  },
  {
    id: 4,
    title: "Dia do Soldado",
    date: "29/08/2026",
    location: "Quartel do Comando Geral",
    image: "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=800&q=80"
  },
  {
    id: 5,
    title: "Operação Festejos Juninos",
    date: "15/06/2026",
    location: "Forró Caju",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
  },
  {
    id: 6,
    title: "Campanha do Maio Amarelo",
    date: "05/05/2026",
    location: "Aracaju",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
  }
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEvents = mockEvents.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-32">
        <div className="flex justify-center mb-12">
          <img src={logoLarge} alt="PMSE" className="h-32" />
        </div>
        
        <div className="max-w-5xl mx-auto mb-8 flex gap-4">
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold border-2 border-white/20"
          >
            + Cadastrar Novo Evento
          </Button>
          <Input
            placeholder="Buscar Evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-accent/30 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-card/95 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
            >
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-card-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-card-foreground/70 mb-4">
                  {event.date} – {event.location}
                </p>
                <Link to={`/evento/${event.id}`}>
                  <Button 
                    variant="secondary"
                    className="w-full bg-muted hover:bg-muted/90 text-foreground font-semibold"
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
