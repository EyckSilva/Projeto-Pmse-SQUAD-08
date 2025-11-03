import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventsStore } from "@/lib/eventsStore";
import { toast } from "sonner";
import logoLarge from "@/assets/logo-pmse-large.png";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FaTrash } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";

// Função auxiliar para obter URLs dos PDFs
const getPdfInfo = (reportId: number) => {
  const baseUrl = window.location.origin;
  
  switch (reportId) {
    case 1:
      return {
        url: `${baseUrl}/relatorio-forro-caju.pdf`,
        fileName: 'Relatório de Op. - Forró Caju.pdf',
        fallbackUrl: `/relatorio-forro-caju.pdf`
      };
    case 2:
      return {
        url: `${baseUrl}/relatorio-corrida-tiradentes.pdf`,
        fileName: 'Relatório de Evento – CORRIDA TIRADENTES.pdf',
        fallbackUrl: `/relatorio-corrida-tiradentes.pdf`
      };
    default:
      return null;
  }
};

// Função para verificar se um arquivo existe
const checkFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const Relatorio = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Relatório de Operação - Forró Caju",
      date: "15/06/2026",
      responsible: "Cap. Silva",
      status: "aprovado",
      showStatusMenu: false
    },
    {
      id: 2,
      title: "Relatório de Evento - Corrida Tiradentes",
      date: "21/04/2025",
      responsible: "Ten. Souza",
      status: "pendente",
      showStatusMenu: false
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newReport, setNewReport] = useState({
    title: "",
    date: "",
    responsible: "",
    status: "pendente"
  });

  const handleCreateReport = () => {
    setReports([...reports, { ...newReport, id: Date.now(), showStatusMenu: false }]);
    setIsDialogOpen(false);
    setNewReport({ title: "", date: "", responsible: "", status: "pendente" });
    toast.success("Relatório criado com sucesso!");
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="flex justify-center mb-8">
            <img src={logoLarge} alt="PMSE" className="h-32" />
          </div>
          <h1 className="text-4xl font-bold text-center text-foreground mb-8">
            Relatórios Operacionais
          </h1>
          <div className="max-w-5xl mx-auto mb-8 flex gap-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-accent/30 border border-border text-white font-semibold px-4 py-2 rounded h-12">+ Gerar Relatório</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gerar Novo Relatório</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 mt-4">
                  <Input
                    placeholder="Título do Relatório"
                    value={newReport.title}
                    onChange={e => setNewReport({ ...newReport, title: e.target.value })}
                  />
                  <Input
                    placeholder="Data"
                    type="date"
                    value={newReport.date}
                    onChange={e => setNewReport({ ...newReport, date: e.target.value })}
                  />
                  <Input
                    placeholder="Responsável"
                    value={newReport.responsible}
                    onChange={e => setNewReport({ ...newReport, responsible: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button className="bg-primary text-white" onClick={handleCreateReport}>Criar</Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Input
              placeholder="Buscar Relatório"
              className="bg-accent/30 border-border text-white placeholder:text-muted-foreground h-12 px-4 rounded w-full"
            />
          </div>
          <p className="text-center text-muted-foreground mb-8">
            Selecione um relatório para visualizar ou clique em Gerar Relatório para cadastrar um novo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {reports.map(report => (
              <div key={report.id} className="bg-card rounded-2xl p-8 shadow mb-4 flex flex-col gap-4 relative">
                <button
                  className="absolute top-4 right-4 text-xl"
                  style={{ color: '#041F3A' }}
                  title="Remover relatório"
                  onClick={() => {
                    setReports(reports.filter(r => r.id !== report.id));
                    toast.success("Relatório removido!");
                  }}
                >
                  <FaTrash size={18} />
                </button>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-card-foreground">{report.title}</h2>
                  <div className="relative flex items-center gap-2">
                    <Badge className={report.status === "aprovado" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}>
                      <span className={report.status === "aprovado" ? "text-white" : "text-white"}>
                        {report.status === "aprovado" ? "Aprovado" : "Pendente"}
                      </span>
                    </Badge>
                    <button
                      className="ml-2 text-card-foreground hover:text-primary focus:outline-none"
                      onClick={() => setReports(reports.map(r => r.id === report.id ? { ...r, showStatusMenu: !r.showStatusMenu } : { ...r, showStatusMenu: false }))}
                      title="Alterar status"
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M5.25 7.5L10 12.25L14.75 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    {report.showStatusMenu && (
                      <div className="absolute right-0 top-8 bg-white border border-[#041F3A] rounded shadow z-10 min-w-[80px] p-0 flex flex-col items-center">
                        {report.status === "aprovado" ? (
                          <button
                            className="w-full px-2 py-1 text-left text-yellow-600 font-semibold text-sm hover:bg-muted/30 rounded"
                            onClick={() => {
                              setReports(reports.map(r => r.id === report.id ? { ...r, status: "pendente", showStatusMenu: false } : r));
                              toast.success("Relatório marcado como pendente!");
                            }}
                          >Pendente</button>
                        ) : (
                          <button
                            className="w-full px-2 py-1 text-left text-green-600 font-semibold text-sm hover:bg-muted/30 rounded"
                            onClick={() => {
                              setReports(reports.map(r => r.id === report.id ? { ...r, status: "aprovado", showStatusMenu: false } : r));
                              toast.success("Relatório marcado como aprovado!");
                            }}
                          >Aprovado</button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-card-foreground/80 mb-2">Data: {report.date}</div>
                <div className="text-sm text-card-foreground/80 mb-4">Responsável: {report.responsible}</div>
                {/* Status dropdown substitui os botões Aprovar/Pendente */}
                <div className="flex gap-4">
                  <Button
                    className="w-full bg-muted hover:bg-muted/90 text-foreground font-semibold rounded"
                    onClick={async () => {
                      try {
                        const pdfInfo = getPdfInfo(report.id);
                        if (!pdfInfo) {
                          toast.error("Arquivo não disponível!");
                          return;
                        }

                        // Tenta a URL principal primeiro
                        let urlToUse = pdfInfo.url;
                        const fileExists = await checkFileExists(pdfInfo.url);
                        
                        if (!fileExists) {
                          // Se não encontrou, tenta a URL de fallback
                          urlToUse = pdfInfo.fallbackUrl;
                        }

                        window.open(urlToUse, '_blank');
                      } catch (error) {
                        console.error('Erro ao abrir PDF:', error);
                        toast.error("Erro ao abrir o arquivo!");
                      }
                    }}
                  >Visualizar</Button>
                  <Button
                    className="w-full bg-muted hover:bg-muted/90 text-foreground font-semibold rounded"
                    onClick={async () => {
                      try {
                        const pdfInfo = getPdfInfo(report.id);
                        if (!pdfInfo) {
                          toast.error("Arquivo não disponível!");
                          return;
                        }

                        // Tenta a URL principal primeiro
                        let urlToUse = pdfInfo.url;
                        const fileExists = await checkFileExists(pdfInfo.url);
                        
                        if (!fileExists) {
                          // Se não encontrou, tenta a URL de fallback
                          urlToUse = pdfInfo.fallbackUrl;
                        }

                        const response = await fetch(urlToUse);
                        if (!response.ok) {
                          throw new Error('Arquivo não encontrado');
                        }

                        const blob = await response.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = pdfInfo.fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(link.href);
                        toast.success("Download iniciado!");
                      } catch (error) {
                        console.error('Erro ao baixar PDF:', error);
                        toast.error("Erro ao baixar o arquivo. Tente novamente.");
                      }
                    }}
                  >Baixar</Button>
                </div>
              </div>
            ))}
            <div className="bg-muted/30 rounded-2xl p-8 flex items-center justify-center text-muted-foreground text-lg italic min-h-[180px]">
              Nenhum outro relatório cadastrado.
            </div>
        </div>
      </main>
    </div>
  );
};

export default Relatorio;