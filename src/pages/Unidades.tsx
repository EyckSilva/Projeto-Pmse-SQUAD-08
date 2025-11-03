import Header from "@/components/Header";
import logoLarge from "@/assets/logo-pmse-large.png";
import brasaoPMSE from "@/assets/brasao-pmse.png";
import logoCPMI from "@/assets/logo-cpmi.png";
import logoCPME from "@/assets/logo-cpme.png";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const units = [
  {
    id: 1,
    name: "QCG",
    fullName: "Quartel do Comando Geral",
    logo: brasaoPMSE
  },
  {
    id: 2,
    name: "Unidades Administrativas",
    fullName: "",
    logo: brasaoPMSE
  },
  {
    id: 3,
    name: "CPMC",
    fullName: "Comando do Policiamento da Capital",
    logo: brasaoPMSE
  },
  {
    id: 4,
    name: "CPMI",
    fullName: "Comando do Policiamento do Interior",
    logo: logoCPMI
  },
  {
    id: 5,
    name: "CPME",
    fullName: "Comando do Policiamento Especializado",
    logo: logoCPME
  }
];

const Unidades = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 sm:pt-32">
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <img src={logoLarge} alt="PMSE" className="h-24 sm:h-32" />
        </div>
        
        {/* Layout responsivo: 1 coluna em mobile, 2 em tablet, 3 em desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Primeira linha: QCG, Unidades Administrativas, CPMC */}
          {units.slice(0, 3).map((unit) => (
            <div 
              key={unit.id}
              className="p-6 sm:p-8 text-center bg-card/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-card/20 transition-all"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={unit.logo} 
                  alt={unit.name}
                  className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-contain"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {unit.name}
              </h3>
              {unit.fullName && (
                <p className="text-xs sm:text-sm text-white/80">
                  {unit.fullName}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Segunda seção: CPMI e CPME - layout especial */}
        <div className="mt-6 sm:mt-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {units.slice(3).map((unit) => (
              <div 
                key={unit.id}
                className="p-8 sm:p-12 text-center bg-card/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-card/20 transition-all"
              >
                <div className="flex justify-center mb-4 sm:mb-6">
                  <img 
                    src={unit.logo} 
                    alt={unit.name}
                    className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 object-contain"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {unit.name}
                </h3>
                {unit.fullName && (
                  <p className="text-sm sm:text-base text-white/80">
                    {unit.fullName}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Unidades;
