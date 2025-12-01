import { useState, useRef } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventsStore } from "@/lib/eventsStore";
import { toast } from "sonner";
import logoLarge from "@/assets/logo-pmse-large.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import brasaoPmse from "@/assets/brasao-pmse.png";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Interface para eventos
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  status: string;
  participants: any[];
  materials: any[];
  recommendations: any[];
}

// Função para converter data dd/mm/yyyy para objeto Date
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Função para formatar data para dd/mm/yyyy
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Relatorio = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Buscar eventos do store
  const allEvents = EventsStore.getAll ? EventsStore.getAll() : [];

  const handleGenerateReport = async () => {
    try {
      // Baixar o PDF da pasta public
      const link = document.createElement('a');
      link.href = '/Diario Oficial.pdf';
      link.download = 'Diario Oficial.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Diário Oficial baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao baixar o relatório!");
      console.error(error);
    }
  };

  const generateOfficialDiaryPDF = async (events: Event[], periodText: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Carregar e adicionar brasão
    const img = new Image();
    img.src = brasaoPmse;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    // Adicionar brasão centralizado (proporção correta - mais quadrado)
    doc.addImage(img, 'PNG', pageWidth / 2 - 18, yPosition, 36, 36);
    yPosition += 43;

    // Cabeçalho oficial
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("POLÍCIA MILITAR DO ESTADO DE SERGIPE", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;

    doc.setFontSize(14);
    doc.text("DIÁRIO OFICIAL DE EVENTOS", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // Período do relatório
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Período: ${periodText}`, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;

    // Data de publicação
    doc.setFont("helvetica", "italic");
    const publicationDate = getTodayDate();
    doc.text(`Publicado em: ${publicationDate}`, pageWidth / 2, yPosition, { align: "center" });
    yPosition += 10;

    // Linha separadora
    doc.setDrawColor(0, 51, 102);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Adicionar cada evento
    events.forEach((event, index) => {
      // Verificar se precisa de nova página
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = 20;
      }

      // Número do evento
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 51, 102);
      doc.text(`EVENTO #${index + 1}`, 20, yPosition);
      yPosition += 8;

      // Título do evento
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(event.title.toUpperCase(), 20, yPosition);
      yPosition += 8;

      // Status
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const statusColor = event.status === "Aprovado" ? [34, 197, 94] : 
                         event.status === "Pendente" ? [234, 179, 8] : [239, 68, 68];
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(`Status: ${event.status}`, 20, yPosition);
      yPosition += 6;

      // Informações do evento
      doc.setTextColor(0, 0, 0);
      doc.text(`Data: ${event.date}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Local: ${event.location}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Participantes: ${event.participants.length} efetivo(s)`, 20, yPosition);
      yPosition += 5;
      doc.text(`Materiais: ${event.materials.length} item(ns)`, 20, yPosition);
      yPosition += 5;

      // Espaço entre eventos
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 8;
    });

    // Rodapé final
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = 20;
    }

    yPosition = pageHeight - 30;
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("_________________________________________", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 5;
    doc.text("Assinatura do Responsável", pageWidth / 2, yPosition, { align: "center" });
    yPosition += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Documento gerado em ${publicationDate}`, pageWidth / 2, yPosition, { align: "center" });

    // Salvar PDF
    doc.save("Diario Oficial.pdf");
  };

  const getTodayDate = () => {
    const today = new Date();
    return formatDate(today);
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <main className="container mx-auto px-4 pt-24 sm:pt-28">
        {/* Seção de seleção de período - Sempre visível */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-center mb-6">
            <img src={logoLarge} alt="PMSE" className="h-24 sm:h-32" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground mt-10 mb-14">
            Diário Oficial de Eventos
          </h1>
          
          

          {/* Formulário de seleção de data */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-primary font-semibold text-base">
                  Data Inicial
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-gray-100 border-2 border-gray-300 focus:border-primary h-12 text-base text-black"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-primary font-semibold text-base">
                  Data Final
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-gray-100 border-2 border-gray-300 focus:border-primary h-12 text-base text-black"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerateReport}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 text-base"
            >
              Gerar Relatório Oficial
            </Button>
          </div>
        </div>

        {/* Card de informação */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-muted/30 rounded-2xl p-6 sm:p-8 border-2 border-primary/20">
            <p className="text-muted-foreground text-sm sm:text-base text-center">
              Selecione o período desejado nos campos acima e clique em <span className="font-semibold text-green-400">"Gerar Relatório Oficial"</span> para criar o Diário Oficial de Eventos em formato PDF com todos os eventos registrados no sistema.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Relatorio;