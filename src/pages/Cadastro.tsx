import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import logoSmall from "@/assets/logo-pmse.png";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    matricula: "",
    posto: "",
    unidade: "",
    senha: "",
    confirmarSenha: ""
  });
  const navigate = useNavigate();

  const postos = [
    "Soldado",
    "Cabo",
    "3º Sargento",
    "2º Sargento",
    "1º Sargento",
    "Subtenente",
    "2º Tenente",
    "1º Tenente",
    "Capitão",
    "Major",
    "Tenente Coronel",
    "Coronel"
  ];

  const unidades = [
    "QCG - Quartel do Comando Geral",
    "CPMC - Comando do Policiamento da Capital",
    "CPMI - Comando do Policiamento do Interior",
    "CPME - Comando do Policiamento Especializado",
    "Unidades Administrativas"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome || !formData.email || !formData.cpf || !formData.matricula || 
        !formData.posto || !formData.unidade || !formData.senha || !formData.confirmarSenha) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (formData.senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    // Validação de CPF simples
    if (formData.cpf.replace(/\D/g, '').length !== 11) {
      toast.error("CPF deve ter 11 dígitos.");
      return;
    }

    toast.success("Cadastro realizado com sucesso! Aguarde aprovação do administrador.");
    navigate("/login");
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatTelefone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-primary/80">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <img src={logoSmall} alt="PMSE" className="h-16" />
        </div>
        
        <div className="bg-card rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-8">
          <h1 className="text-2xl font-bold text-card-foreground text-center mb-6">
            Cadastro de Usuário - PMSE
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-card-foreground">
                  Nome Completo *
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleInputChange("nome", e.target.value)}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@pm.se.gov.br"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-card-foreground">
                  CPF *
                </Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange("cpf", formatCPF(e.target.value))}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-card-foreground">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  type="text"
                  placeholder="(79) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", formatTelefone(e.target.value))}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricula" className="text-card-foreground">
                  Matrícula *
                </Label>
                <Input
                  id="matricula"
                  type="text"
                  placeholder="Digite sua matrícula"
                  value={formData.matricula}
                  onChange={(e) => handleInputChange("matricula", e.target.value)}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="posto" className="text-card-foreground">
                  Posto/Graduação *
                </Label>
                <Select value={formData.posto} onValueChange={(value) => handleInputChange("posto", value)}>
                  <SelectTrigger className="bg-background/10 border-input text-card-foreground">
                    <SelectValue placeholder="Selecione seu posto" />
                  </SelectTrigger>
                  <SelectContent>
                    {postos.map((posto) => (
                      <SelectItem key={posto} value={posto}>
                        {posto}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="unidade" className="text-card-foreground">
                  Unidade de Lotação *
                </Label>
                <Select value={formData.unidade} onValueChange={(value) => handleInputChange("unidade", value)}>
                  <SelectTrigger className="bg-background/10 border-input text-card-foreground">
                    <SelectValue placeholder="Selecione sua unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unidades.map((unidade) => (
                      <SelectItem key={unidade} value={unidade}>
                        {unidade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-card-foreground">
                  Senha *
                </Label>
                <Input
                  id="senha"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={(e) => handleInputChange("senha", e.target.value)}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmarSenha" className="text-card-foreground">
                  Confirmar Senha *
                </Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
                  className="bg-background/10 border-input text-card-foreground"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Cadastrar
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-card-foreground/70">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;