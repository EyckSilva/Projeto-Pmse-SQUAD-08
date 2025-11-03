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
  const [imageError, setImageError] = useState(false);
  const [newParticipant, setNewParticipant] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newRecommendation, setNewRecommendation] = useState("");

  // Função para obter a imagem correta
  const getEventImage = (eventData: any) => {
    if (imageError) {
      return mockEventDetails[id]?.image || natalsolidario; // fallback
    }
    return eventData.image || mockEventDetails[id]?.image || natalsolidario;
  };

  useEffect(() => {
    if (id) {
      const eventData = EventsStore.getById(id);
      if (eventData) {
        setEvent(eventData);
      } else {
        // Fallback para eventos mock se não encontrar no store
        const mockEvent = mockEventDetails[id];
        if (mockEvent) {
          setEvent(mockEvent);
        }
      }
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
        className="mb-4 sm:mb-6 flex items-center gap-2 text-white font-semibold px-4 py-2 rounded ml-4 mt-4 bg-transparent border-none shadow-none"
        onClick={() => navigate(-1)}
      >
        <IoReturnUpBackOutline size={20} className="sm:w-[22px] sm:h-[22px]" />
        <span className="hidden sm:inline">Voltar</span>
      </button>
      <main className="container mx-auto px-4 pt-20 sm:pt-24">
        <div className="max-w-6xl mx-auto">
          <img 
            src={getEventImage(event)} 
            alt={event.title}
            className="w-full max-w-3xl mx-auto h-48 sm:h-64 lg:h-80 object-cover rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] mb-6 sm:mb-8"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
          
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {event.title}
              </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <Badge 
                  variant={event.status === 'aprovado' ? 'default' : 'secondary'}
                  className={`text-xs sm:text-sm font-semibold ${
                    event.status === 'aprovado' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-yellow-600 text-white'
                  }`}
                >
                  {event.status?.toUpperCase()}
                </Badge>
                <Button
                  className="flex items-center gap-2 text-white font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm bg-transparent border-none shadow-none"
                  onClick={handleRemoveEvent}
                >
                  <span className="hidden sm:inline">Remover Evento</span>
                  <span className="sm:hidden">Remover</span>
                  <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" color="#fff" />
                </Button>
              </div>
            </div>
            <p className="text-base sm:text-lg text-foreground/80 px-4">
              {event.date} – {event.location}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">
                PARTICIPANTES
              </h2>
              <div className="space-y-2 mb-4">
                {event.participants?.map((participant: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-xs sm:text-sm flex items-center justify-between">
                    <span>{participant}</span>
                    <button
                      className="ml-2 text-base sm:text-lg"
                      title="Remover"
                      onClick={() => handleRemoveParticipant(index)}
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Adicionar participante"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  className="bg-muted border-0 text-foreground text-xs sm:text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddParticipant()}
                />
                <Button 
                  onClick={handleAddParticipant}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap text-xs sm:text-sm h-9 sm:h-10"
                >
                  + Adicionar
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">
                MATERIAIS
              </h2>
              <div className="space-y-2 mb-4">
                {event.materials?.map((material: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-xs sm:text-sm flex items-center justify-between">
                    <span>{material}</span>
                    <button
                      className="ml-2 text-base sm:text-lg"
                      title="Remover"
                      onClick={() => handleRemoveMaterial(index)}
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Adicionar material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="bg-muted border-0 text-foreground text-xs sm:text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddMaterial()}
                />
                <Button 
                  onClick={handleAddMaterial}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap text-xs sm:text-sm h-9 sm:h-10"
                >
                  + Adicionar
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <h2 className="text-lg sm:text-xl font-bold text-card-foreground mb-4">
                RECOMENDAÇÕES
              </h2>
              <div className="space-y-2 mb-4">
                {event.recommendations?.map((recommendation: string, index: number) => (
                  <div key={index} className="p-2 bg-muted rounded text-xs sm:text-sm flex items-center justify-between">
                    <span>{recommendation}</span>
                    <button
                      className="ml-2 text-base sm:text-lg"
                      title="Remover"
                      onClick={() => handleRemoveRecommendation(index)}
                    >
                      <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Adicionar recomendação"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  className="bg-muted border-0 text-foreground text-xs sm:text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRecommendation()}
                />
                <Button 
                  onClick={handleAddRecommendation}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold whitespace-nowrap text-xs sm:text-sm h-9 sm:h-10"
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
