import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

interface EventModalProps {
  onEventCreate: (event: any) => void;
}

const EventModal = ({ onEventCreate }: EventModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criar URL da imagem se houver arquivo
    const imageUrl = formData.image ? URL.createObjectURL(formData.image) : "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80";

    const newEvent = {
      id: Date.now(),
      title: formData.title,
      date: formData.date,
      location: formData.location,
      description: formData.description,
      image: imageUrl,
      status: "pendente",
      participants: [],
      materials: [],
      recommendations: []
    };

    onEventCreate(newEvent);
    toast.success("Evento cadastrado com sucesso!");
    
    // Reset form
    setFormData({
      title: "",
      date: "",
      location: "",
      description: "",
      image: null
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold border-2 border-white/20 text-sm sm:text-base h-10 sm:h-12"
        >
          <span className="hidden sm:inline">+ Cadastrar Novo Evento</span>
          <span className="sm:hidden">+ Novo Evento</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4 w-[calc(100vw-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">
            Cadastrar Novo Evento
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground text-sm sm:text-base">
                Título do Evento *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Ex: Corrida Tiradentes"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="bg-background border-input text-foreground text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground text-sm sm:text-base">
                Data do Evento *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="bg-background border-input text-foreground text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location" className="text-foreground text-sm sm:text-base">
                Local do Evento *
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="Ex: Aracaju, Orla da Atalaia"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-background border-input text-foreground text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-foreground text-sm sm:text-base">
                Descrição do Evento
              </Label>
              <Textarea
                id="description"
                placeholder="Descreva os detalhes do evento..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="bg-background border-input text-foreground min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image" className="text-foreground text-sm sm:text-base">
                Imagem do Evento
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="bg-background border-input text-foreground text-sm sm:text-base"
              />
              <p className="text-xs text-muted-foreground">
                Formatos aceitos: JPG, PNG, GIF (máximo 5MB)
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 text-sm sm:text-base h-10 sm:h-auto"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm sm:text-base h-10 sm:h-auto"
            >
              Cadastrar Evento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;