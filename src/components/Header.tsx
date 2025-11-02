import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoSmall from "@/assets/logo-pmse.png";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border/50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/home" className="flex items-center">
          <img src={logoSmall} alt="PMSE" className="h-12 w-12" />
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/home" 
            className={`text-sm font-semibold tracking-wide transition-colors hover:text-white ${
              isActive('/home') ? 'text-white' : 'text-foreground/80'
            }`}
          >
            HOME
          </Link>
          <Link 
            to="/relatorio" 
            className={`text-sm font-semibold tracking-wide transition-colors hover:text-white ${
              isActive('/relatorio') ? 'text-white' : 'text-foreground/80'
            }`}
          >
            RELATÓRIO
          </Link>
          <Link 
            to="/unidades" 
            className={`text-sm font-semibold tracking-wide transition-colors hover:text-white ${
              isActive('/unidades') ? 'text-white' : 'text-foreground/80'
            }`}
          >
            UNIDADES
          </Link>
          <Link to="/contato">
            <Button 
              variant="outline" 
              size="sm"
              className="bg-card text-card-foreground hover:bg-card/90 font-semibold"
            >
              CONTATO
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
