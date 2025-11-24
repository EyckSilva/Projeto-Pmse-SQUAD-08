import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EventsStore } from "@/lib/eventsStore";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [newParticipant, setNewParticipant] = useState("");
  const [newParticipantRole, setNewParticipantRole] = useState("");
  const [newMaterial, setNewMaterial] = useState("");
  const [newMaterialQty, setNewMaterialQty] = useState("");
  const [newRecommendation, setNewRecommendation] = useState("");

  useEffect(() => {
    if (id) {
      const eventData = EventsStore.getById(id);
      setEvent(eventData);
    }
  }, [id]);

  const handleAddParticipant = () => {
    if (newParticipant.trim() && id) {
      const participant = {
        name: newParticipant.trim(),
        role: newParticipantRole.trim() || undefined
      };
      EventsStore.addParticipant(id, participant);
      setEvent(EventsStore.getById(id));
      setNewParticipant("");
      setNewParticipantRole("");
      toast.success("Participante adicionado!");
    }
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim() && id) {
      const material = {
        name: newMaterial.trim(),
        quantity: newMaterialQty ? parseInt(newMaterialQty) : undefined
      };
      EventsStore.addMaterial(id, material);
      setEvent(EventsStore.getById(id));
      setNewMaterial("");
      setNewMaterialQty("");
      toast.success("Material adicionado!");
    }
  };

  const handleAddRecommendation = () => {
    if (newRecommendation.trim() && id) {
      EventsStore.addRecommendation(id, newRecommendation.trim());
      setEvent(EventsStore.getById(id));
      setNewRecommendation("");
      toast.success("Recomendação adicionada!");
    }
  };

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

  if (!event) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[80vh] text-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Evento não encontrado</h2>
            <Button onClick={() => navigate("/home")} className="bg-primary hover:bg-primary/90">
              Voltar para Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 sm:pt-28">
        <Button
          onClick={() => navigate("/home")}
          variant="outline"
          className="mb-6 flex items-center gap-2"
        >
          <IoReturnUpBackOutline size={20} />
          Voltar
        </Button>

        <div className="max-w-5xl mx-auto">
          {/* Imagem do Evento */}
          <div className="mb-8">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Informações Principais */}
          <div className="bg-card/95 rounded-2xl p-6 sm:p-8 shadow-xl mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-card-foreground">
                {event.title}
              </h1>
              <Badge 
                className={`text-sm font-semibold w-fit ${
                  event.status === 'aprovado' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-yellow-600 text-white'
                }`}
              >
                {event.status?.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-3 text-card-foreground/80">
              <p className="text-lg">
                <span className="font-semibold">Data:</span> {event.date}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Local:</span> {event.location}
              </p>
            </div>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Participantes */}
            <div className="bg-card/95 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-card-foreground mb-4 border-b border-border pb-2">
                Participantes
              </h2>
              <div className="space-y-2 mb-4">
                {event.participants && event.participants.length > 0 ? (
                  event.participants.map((participant: any, index: number) => (
                    <div key={index} className="p-3 rounded-lg flex items-start justify-between gap-2" style={{backgroundColor: '#041F3A'}}>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{participant.name || participant}</p>
                        {participant.role && (
                          <p className="text-xs text-gray-300">{participant.role}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveParticipant(index)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">Nenhum participante cadastrado</p>
                )}
              </div>
              <div className="space-y-2 border-t border-border/50 pt-4">
                <Input
                  placeholder="Nome do participante"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  className="bg-primary text-white placeholder:text-white/70"
                />
                <Input
                  placeholder="Função (opcional)"
                  value={newParticipantRole}
                  onChange={(e) => setNewParticipantRole(e.target.value)}
                  className="bg-primary text-white placeholder:text-white/70"
                />
                <Button
                  onClick={handleAddParticipant}
                  className="w-full"
                  disabled={!newParticipant.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Materiais */}
            <div className="bg-card/95 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-card-foreground mb-4 border-b border-border pb-2">
                Materiais
              </h2>
              <div className="space-y-2 mb-4">
                {event.materials && event.materials.length > 0 ? (
                  event.materials.map((material: any, index: number) => (
                    <div key={index} className="p-3 rounded-lg flex items-start justify-between gap-2" style={{backgroundColor: '#041F3A'}}>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-white">{material.name || material}</p>
                        {material.quantity && (
                          <p className="text-xs text-gray-300">Qtd: {material.quantity}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveMaterial(index)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">Nenhum material cadastrado</p>
                )}
              </div>
              <div className="space-y-2 border-t border-border/50 pt-4">
                <Input
                  placeholder="Nome do material"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="bg-primary text-white placeholder:text-white/70"
                />
                <Input
                  placeholder="Quantidade (opcional)"
                  type="number"
                  value={newMaterialQty}
                  onChange={(e) => setNewMaterialQty(e.target.value)}
                  className="bg-primary text-white placeholder:text-white/70"
                />
                <Button
                  onClick={handleAddMaterial}
                  className="w-full"
                  disabled={!newMaterial.trim()}
                >
                  Adicionar
                </Button>
              </div>
            </div>

            {/* Recomendações */}
            <div className="bg-card/95 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-card-foreground mb-4 border-b border-border pb-2">
                Recomendações
              </h2>
              <div className="space-y-2 mb-4">
                {event.recommendations && event.recommendations.length > 0 ? (
                  event.recommendations.map((recommendation: string, index: number) => (
                    <div key={index} className="p-3 rounded-lg flex items-start justify-between gap-2" style={{backgroundColor: '#041F3A'}}>
                      <p className="text-sm flex-1 text-white">{recommendation}</p>
                      <button
                        onClick={() => handleRemoveRecommendation(index)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">Nenhuma recomendação cadastrada</p>
                )}
              </div>
              <div className="space-y-2 border-t border-border/50 pt-4">
                <Input
                  placeholder="Nova recomendação"
                  value={newRecommendation}
                  onChange={(e) => setNewRecommendation(e.target.value)}
                  className="bg-primary text-white placeholder:text-white/70"
                />
                <Button
                  onClick={handleAddRecommendation}
                  className="w-full"
                  disabled={!newRecommendation.trim()}
                >
                  Adicionar
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
