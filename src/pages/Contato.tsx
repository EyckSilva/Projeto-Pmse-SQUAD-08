import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logoSmall from "@/assets/logo-pmse.png";

const Contato = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <main className="container mx-auto px-4 pt-28">
        <h1 className="text-3xl font-bold text-center text-foreground mb-12 tracking-wide">
          FALE CONOSCO
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-card/95 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Envie uma Mensagem
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-card-foreground">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-muted/20 border-input text-card-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-muted/20 border-input text-card-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-card-foreground">
                  Assunto
                </Label>
                <Input
                  id="subject"
                  placeholder="Assunto"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="bg-muted/20 border-input text-card-foreground"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-card-foreground">
                  Mensagem
                </Label>
                <Textarea
                  id="message"
                  placeholder="Mensagem"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-muted/20 border-input text-card-foreground min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-muted hover:bg-muted/90 text-foreground font-semibold"
              >
                Enviar Mensagem
              </Button>
            </form>
          </div>
          
          <div className="bg-card/95 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-start gap-3 mb-6">
              <img src={logoSmall} alt="PMSE" className="h-12 w-12" />
              <div>
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Informações para Contato
                </h2>
              </div>
            </div>
            
            <div className="space-y-4 text-card-foreground">
              <div>
                <p className="font-semibold mb-1">Endereço:</p>
                <p className="text-sm text-card-foreground/80">
                  Avenida João Ribeiro, 1144, Bloco A<br />
                  Bairro Industrial Aracaju - SE - 49065-000
                </p>
              </div>
              
              <div>
                <p className="font-semibold mb-1">Telefones:</p>
                <p className="text-sm text-card-foreground/80">
                  QCG<br />
                  (79) 3226-7100
                </p>
              </div>
              
              <div>
                <p className="font-semibold mb-1">E-mail:</p>
                <p className="text-sm text-card-foreground/80">
                  gab.cmt@pm.se.gov.br<br />
                  pm5@pm.se.gov.br
                </p>
              </div>
              
              <div className="mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62685.324474835295!2d-37.056385!3d-10.90031!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x71ab341fe5fff87%3A0x237241f5a2ee6ed3!2sAv.%20Jo%C3%A3o%20Ribeiro%2C%201144%20-%20a%20-%20Santo%20Ant%C3%B4nio%2C%20Aracaju%20-%20SE%2C%2049060-330!5e0!3m2!1spt-BR!2sbr!4v1762125181446!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: "0.75rem" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização PMSE"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contato;
