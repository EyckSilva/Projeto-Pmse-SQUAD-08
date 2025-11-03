import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaTrash } from "react-icons/fa";
import { EventsStore } from "@/lib/eventsStore";
import { toast } from "sonner";
import corridat from "@/assets/corridat.jpeg";
import desfile from "@/assets/desfile.avif";
import natalsolidario from "@/assets/natalsolidario.jpg";
import diadosoldado from "@/assets/diadosoldado.jpg";
import festejooperacao from "@/assets/festejooperacao.jpg";
import maioamarelo from "@/assets/maioamarelo.png";
import { IoReturnUpBackOutline } from "react-icons/io5";

const mockEventDetails: Record<string, any> = {
  "1": {
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    location: "Aracaju, Orla da Atalaia",
    image: corridat
  },
  "2": {
    title: "Desfile Cívico",
    date: "07/09/2025",
    location: "Avenida Barão de Maruim, Aracaju",
    image: desfile
  },
  "3": {
    title: "Natal Solidário",
    date: "20/12/2025",
    location: "Comunidades de Aracaju",
    image: natalsolidario
  },
  "4": {
    title: "Dia do Soldado",
    date: "29/08/2026",
    location: "Quartel do Comando Geral",
    image: diadosoldado
  },
  "5": {
    title: "Operação Festejos Juninos",
    date: "15/06/2026",
    location: "Forró Caju",
    image: festejooperacao
  },
  "6": {
    title: "Campanha do Maio Amarelo",
    date: "05/05/2026",
    location: "Aracaju",
    image: maioamarelo
  }
};

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [newParticipant, setNewParticipant] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newRecommendation, setNewRecommendation] = useState("");

  useEffect(() => {
    if (id) {
      const eventData = EventsStore.getById(id);
      setEvent(eventData);
    }
  }, [id]);

  const handleRemoveEvent = () => {
    if (id) {
      EventsStore.removeEvent(id);
      toast.success("Evento removido!");
      navigate("/home");
    }
  };

  // Funções para remover itens
  const handleRemoveParticipant = (index: number) => {
    if (id) {
      EventsStore.removeParticipant(id, index);
      setEvent(EventsStore.getById(id));
      toast.success("Participante removido!");
    }
  };

  const handleRemoveMaterial = (index: number) => {
    if (id) {
      EventsStore.removeMaterial(id, index);
      setEvent(EventsStore.getById(id));
      toast.success("Material removido!");
    }
  };

  const handleRemoveRecommendation = (index: number) => {
    if (id) {
      EventsStore.removeRecommendation(id, index);
      setEvent(EventsStore.getById(id));
      toast.success("Recomendação removida!");
    }
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim() && id) {
      EventsStore.addParticipant(id, newParticipant);
      setEvent(EventsStore.getById(id));
      setNewParticipant("");
      toast.success("Participante adicionado com sucesso!");
    }
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() && id) {
      EventsStore.addMaterial(id, newMaterial);
      setEvent(EventsStore.getById(id));
      setNewMaterial("");
      toast.success("Material adicionado com sucesso!");
    }
  };

  const handleAddRecommendation = () => {
    if (newRecommendation.trim() && id) {
      EventsStore.addRecommendation(id, newRecommendation);
      setEvent(EventsStore.getById(id));
      setNewRecommendation("");
      toast.success("Recomendação adicionada com sucesso!");
    }
  };

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center text-foreground">Evento não encontrado</div>;
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <button
        className="mb-6 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded ml-4 mt-4 bg-transparent border-none shadow-none"
        onClick={() => navigate(-1)}
      >
        <IoReturnUpBackOutline size={22} />
        <span className="hidden sm:inline">Voltar</span>
      </button>
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full max-w-3xl mx-auto h-80 object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] mb-8"
          />
          
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-foreground">
                {event.title}
              </h1>
              <Badge 
                variant={event.status === 'aprovado' ? 'default' : 'secondary'}
                className={`text-sm font-semibold ${
                  event.status === 'aprovado' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {event.status?.toUpperCase()}
              </Badge>
              <Button
                className="flex items-center gap-2 text-white font-semibold px-4 py-2 rounded ml-2 bg-transparent border-none shadow-none"
                onClick={handleRemoveEvent}
              >
                Remover Evento
                <FaTrash color="#fff" />
              </Button>
            </div>
            <p className="text-lg text-foreground/80">
              {event.date} – {event.location}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                PARTICIPANTES
              </h2>
              <div className="space-y-2 mb-4">
                {event.participants?.map((participant: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm flex items-center justify-between">
                    <span>{participant}</span>
                    <button
                      className="ml-2 text-lg"
                      title="Remover"
                      onClick={() => handleRemoveParticipant(index)}
                    >
                      <FaTrash color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar participante"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  className="bg-muted border-0 text-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                />
                <Button 
                  onClick={handleAddParticipant}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap"
                >
                  + Adicionar
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                MATERIAIS
              </h2>
              <div className="space-y-2 mb-4">
                {event.materials?.map((material: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm flex items-center justify-between">
                    <span>{material}</span>
                    <button
                      className="ml-2 text-lg"
                      title="Remover"
                      onClick={() => handleRemoveMaterial(index)}
                    >
                      <FaTrash color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="bg-muted border-0 text-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
                />
                <Button 
                  onClick={handleAddMaterial}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap"
                >
                  + Adicionar
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-xl font-bold text-card-foreground mb-4">
                RECOMENDAÇÕES
              </h2>
              <div className="space-y-2 mb-4">
                {event.recommendations?.map((recommendation: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-sm flex items-center justify-between">
                    <span>{recommendation}</span>
                    <button
                      className="ml-2 text-lg"
                      title="Remover"
                      onClick={() => handleRemoveRecommendation(index)}
                    >
                      <FaTrash color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar recomendação"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  className="bg-muted border-0 text-foreground"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRecommendation()}
                />
                <Button 
                  onClick={handleAddRecommendation}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap"
                >
                  + Adicionar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
