import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logoSmall from "@/assets/logo-pmse.png";

const RedefinirSenha = () => {
  const [step, setStep] = useState(1); // 1: email, 2: código, 3: nova senha
  const [formData, setFormData] = useState({
    email: "",
    codigo: "",
    novaSenha: "",
    confirmarSenha: ""
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnviarCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast.error("Por favor, digite seu e-mail.");
      return;
    }

    // Validar se é um e-mail da PMSE
    if (!formData.email.includes("@pm.se.gov.br")) {
      toast.error("Utilize seu e-mail institucional (@pm.se.gov.br).");
      return;
    }

    toast.success("Código de verificação enviado para seu e-mail!");
    setStep(2);
  };

  const handleVerificarCodigo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.codigo) {
      toast.error("Por favor, digite o código de verificação.");
      return;
    }

    if (formData.codigo.length !== 6) {
      toast.error("O código deve ter 6 dígitos.");
      return;
    }

    // Simular verificação do código
    toast.success("Código verificado com sucesso!");
    setStep(3);
  };

  const handleRedefinirSenha = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.novaSenha || !formData.confirmarSenha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (formData.novaSenha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (formData.novaSenha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    toast.success("Senha redefinida com sucesso!");
    navigate("/login");
  };

  const renderStep1 = () => (
    <form onSubmit={handleEnviarCodigo} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-card-foreground">
          E-mail Institucional
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.email@pm.se.gov.br"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="bg-background/10 border-input text-card-foreground"
        />
        <p className="text-xs text-card-foreground/60">
          Digite seu e-mail institucional da PMSE
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Enviar Código de Verificação
      </Button>
    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={handleVerificarCodigo} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="codigo" className="text-card-foreground">
          Código de Verificação
        </Label>
        <Input
          id="codigo"
          type="text"
          placeholder="000000"
          maxLength={6}
          value={formData.codigo}
          onChange={(e) => handleInputChange("codigo", e.target.value.replace(/\D/g, ''))}
          className="bg-background/10 border-input text-card-foreground text-center text-2xl tracking-widest"
        />
        <p className="text-xs text-card-foreground/60">
          Digite o código de 6 dígitos enviado para {formData.email}
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Verificar Código
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-sm text-primary hover:underline"
        >
          Voltar
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => (
    <form onSubmit={handleRedefinirSenha} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="novaSenha" className="text-card-foreground">
          Nova Senha
        </Label>
        <Input
          id="novaSenha"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={formData.novaSenha}
          onChange={(e) => handleInputChange("novaSenha", e.target.value)}
          className="bg-background/10 border-input text-card-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha" className="text-card-foreground">
          Confirmar Nova Senha
        </Label>
        <Input
          id="confirmarSenha"
          type="password"
          placeholder="Confirme sua nova senha"
          value={formData.confirmarSenha}
          onChange={(e) => handleInputChange("confirmarSenha", e.target.value)}
          className="bg-background/10 border-input text-card-foreground"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Redefinir Senha
      </Button>
    </form>
  );

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Recuperar Senha";
      case 2: return "Verificação de Código";
      case 3: return "Nova Senha";
      default: return "Recuperar Senha";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1: return "Digite seu e-mail institucional para receber o código de verificação";
      case 2: return "Verifique sua caixa de entrada e digite o código recebido";
      case 3: return "Crie uma nova senha para sua conta";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary to-primary/80">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={logoSmall} alt="PMSE" className="h-16" />
        </div>
        
        <div className="bg-card rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-card-foreground mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-sm text-card-foreground/70">
              {getStepDescription()}
            </p>
          </div>

          {/* Indicador de passos */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepNumber ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          
          <div className="text-center mt-6">
            <p className="text-sm text-card-foreground/70">
              Lembrou da senha?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedefinirSenha;