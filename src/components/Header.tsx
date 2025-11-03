import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoSmall from "@/assets/logo-pmse.png";

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const isActive = (path: string) => location.pathname === path;

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // Delay de 300ms antes de fechar
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="flex items-center">
          <img src={logoSmall} alt="PMSE" className="h-12 w-12" />
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/home"
            className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-1 ${
              isActive('/home') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:text-white'
            }`}
          >
            HOME
          </Link>
          <Link 
            to="/relatorio"
            className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-1 ${
              isActive('/relatorio') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:text-white'
            }`}
          >
            RELATÓRIO
          </Link>
          <Link 
            to="/unidades"
            className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-1 ${
              isActive('/unidades') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:text-white'
            }`}
          >
            UNIDADES
          </Link>
          <Link to="/contato">
            <span
              className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-1 ${
                isActive('/contato') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:text-white'
              }`}
            >
              CONTATO
            </span>
          </Link>
          {/* Avatar do usuário logado */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-2 bg-card rounded-full px-2 py-1 shadow hover:bg-card/80 transition">
              <img src="https://ui-avatars.com/api/?name=Usuário" alt="Avatar" className="h-8 w-8 rounded-full" />
              <span className="hidden md:inline text-sm font-semibold text-card-foreground">Usuário</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-card rounded shadow-lg py-2 z-50 border border-border">
                <button 
                  className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-muted transition-colors" 
                  onClick={() => window.location.href = '/login'}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
