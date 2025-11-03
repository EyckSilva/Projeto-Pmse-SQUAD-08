import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logoSmall from "@/assets/logo-pmse.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username && password) {
      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } else {
      toast.error("Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img src={logoSmall} alt="PMSE" className="h-26" />
        </div>
        
        <div className="bg-card rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-8">
          <h1 className="text-2xl font-bold text-card-foreground text-center mb-6">
            Acesso ao Sistema
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-card-foreground">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/10 border-input text-card-foreground"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-card-foreground">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/10 border-input text-card-foreground"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Entrar
            </Button>
            
            <div className="text-center mt-4 space-y-2">
              <p className="text-sm text-card-foreground/70">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="text-primary hover:underline">
                  Cadastre-se
                </Link>
              </p>
              <p className="text-sm text-card-foreground/70">
                <Link to="/redefinir-senha" className="text-primary hover:underline">
                  Esqueceu sua senha?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
