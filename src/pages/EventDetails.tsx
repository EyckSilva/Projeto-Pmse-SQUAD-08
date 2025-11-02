import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockEventDetails: Record<string, any> = {
  "1": {
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    location: "Aracaju, Orla da Atalaia",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
  },
  "2": {
    title: "Desfile Cívico",
    date: "07/09/2025",
    location: "Avenida Barão de Maruim, Aracaju",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
  },
  "3": {
    title: "Natal Solidário",
    date: "20/12/2025",
    location: "Comunidades de Aracaju",
    image: "https://images.unsplash.com/photo-1576856497337-52bde8c06ec5?w=1200&q=80"
  },
  "4": {
    title: "Dia do Soldado",
    date: "29/08/2026",
    location: "Quartel do Comando Geral",
    image: "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=1200&q=80"
  },
  "5": {
    title: "Operação Festejos Juninos",
    date: "15/06/2026",
    location: "Forró Caju",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80"
  },
  "6": {
    title: "Campanha do Maio Amarelo",
    date: "05/05/2026",
    location: "Aracaju",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80"
  }
};

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEventDetails[id || "1"];

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-foreground">Evento não encontrado</div>;
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full max-w-3xl mx-auto h-80 object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] mb-8"
          />
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {event.title}
            </h1>
            <p className="text-lg text-foreground/80">
              {event.date} – {event.location}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                PARTICIPANTES
              </h2>
              <Input
                placeholder="Buscar"
                className="mb-4 bg-muted/20 border-input text-card-foreground"
              />
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                + Adicionar
              </Button>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                MATERIAIS
              </h2>
              <Input
                placeholder="Buscar"
                className="mb-4 bg-muted/20 border-input text-card-foreground"
              />
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                + Adicionar
              </Button>
            </div>
            
            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                RECOMENDAÇÕES
              </h2>
              <Input
                placeholder="Buscar"
                className="mb-4 bg-muted/20 border-input text-card-foreground"
              />
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                + Adicionar
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
