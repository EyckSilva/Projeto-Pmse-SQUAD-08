import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoSmall from "@/assets/logo-pmse.png";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <img src={logoSmall} alt="PMSE" className="h-10 w-10 sm:h-12 sm:w-12" />
        </Link>
        
        {/* Menu Desktop */}
        <div className="hidden lg:flex items-center gap-6">
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
          {/* Avatar do usuário logado - Desktop */}
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

        {/* Menu Mobile - Botão hambúrguer */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Avatar Mobile */}
          <div className="relative">
            <img src="https://ui-avatars.com/api/?name=Usuário" alt="Avatar" className="h-8 w-8 rounded-full" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Menu Mobile - Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-sm border-t border-border/50">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link 
              to="/home"
              onClick={closeMobileMenu}
              className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-2 text-center ${
                isActive('/home') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:bg-white/10'
              }`}
            >
              HOME
            </Link>
            <Link 
              to="/relatorio"
              onClick={closeMobileMenu}
              className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-2 text-center ${
                isActive('/relatorio') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:bg-white/10'
              }`}
            >
              RELATÓRIO
            </Link>
            <Link 
              to="/unidades"
              onClick={closeMobileMenu}
              className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-2 text-center ${
                isActive('/unidades') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:bg-white/10'
              }`}
            >
              UNIDADES
            </Link>
            <Link 
              to="/contato"
              onClick={closeMobileMenu}
              className={`text-sm font-semibold tracking-wide transition-colors rounded px-3 py-2 text-center ${
                isActive('/contato') ? 'bg-white text-primary shadow' : 'text-foreground/80 hover:bg-white/10'
              }`}
            >
              CONTATO
            </Link>
            <button 
              className="text-sm font-semibold tracking-wide text-foreground/80 hover:bg-white/10 rounded px-3 py-2 transition-colors border-t border-border/30 mt-2 pt-4" 
              onClick={() => {
                closeMobileMenu();
                window.location.href = '/login';
              }}
            >
              SAIR
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
