import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import logoLarge from "@/assets/logo-pmse-large.png";

const mockReports = [
  {
    id: 1,
    type: "Relatório de Op.",
    title: "Forró Caju",
    date: "15/06/2026",
    responsible: "Cap. Silva",
    status: "Aprovado"
  },
  {
    id: 2,
    type: "Relatório de Evento",
    title: "Corrida Tiradentes",
    date: "21/04/2025",
    responsible: "Ten. Souza",
    status: "Pendente"
  }
];

const Relatorio = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-32">
        <div className="flex justify-center mb-8">
          <img src={logoLarge} alt="PMSE" className="h-24" />
        </div>
        
        <h1 className="text-4xl font-bold text-center text-foreground mb-8">
          Relatórios Operacionais
        </h1>
        
        <div className="max-w-5xl mx-auto mb-8 flex gap-4">
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold border-2 border-white/20"
          >
            + Gerar Relatório
          </Button>
          <Input
            placeholder="Buscar Relatório"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-accent/30 border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        
        <p className="text-center text-foreground/80 mb-8 max-w-3xl mx-auto">
          Selecione um relatório para visualizar ou clique em <strong>Gerar Relatório</strong> para cadastrar um novo.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredReports.map((report) => (
            <div 
              key={report.id}
              className="bg-card/95 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-card-foreground">
                  {report.type} - {report.title}
                </h3>
                <Badge 
                  className={report.status === "Aprovado" 
                    ? "bg-[hsl(142,76%,36%)] text-white" 
                    : "bg-[hsl(45,93%,47%)] text-black"}
                >
                  {report.status}
                </Badge>
              </div>
              
              <div className="space-y-1 mb-4">
                <p className="text-sm text-card-foreground/70">
                  Data: {report.date}
                </p>
                <p className="text-sm text-card-foreground/70">
                  Responsável: {report.responsible}
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="secondary"
                  className="flex-1 bg-muted hover:bg-muted/90 text-foreground font-semibold"
                >
                  Visualizar
                </Button>
                <Button 
                  variant="secondary"
                  className="flex-1 bg-muted hover:bg-muted/90 text-foreground font-semibold"
                >
                  Baixar
                </Button>
              </div>
            </div>
          ))}
          
          <div className="bg-card/50 rounded-2xl p-6 flex items-center justify-center min-h-[200px] border-2 border-dashed border-border">
            <p className="text-card-foreground/60 italic">
              Nenhum outro relatório cadastrado.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Relatorio;
