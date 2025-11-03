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
      
      <main className="container mx-auto px-4 pt-32">
        <div className="flex justify-center mb-16">
          <img src={logoLarge} alt="PMSE" className="h-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Primeira linha: 3 cards */}
          {units.slice(0, 3).map((unit) => (
            <div 
              key={unit.id}
              className="p-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={unit.logo} 
                  alt={unit.name}
                  className="h-24 w-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">
                {unit.name}
              </h3>
              {unit.fullName && (
                <p className="text-sm text-white">
                  {unit.fullName}
                </p>
              )}
            </div>
          ))}
          {/* Última linha: CPMI e CPME lado a lado, esticados */}
          <div className="col-span-3 flex gap-8 justify-center">
            {units.slice(3).map((unit) => (
              <div 
                key={unit.id}
                className="flex-1 p-12 text-center flex flex-col items-center"
              >
                <div className="flex justify-center mb-6">
                  <img 
                    src={unit.logo} 
                    alt={unit.name}
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {unit.name}
                </h3>
                {unit.fullName && (
                  <p className="text-base text-white">
                    {unit.fullName}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Adiciona um placeholder vazio para centralizar os dois cards da última linha */}
          <div className="hidden lg:block"></div>
        </div>
      </main>
    </div>
  );
};

export default Unidades;
