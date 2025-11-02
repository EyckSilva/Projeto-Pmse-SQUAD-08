import Header from "@/components/Header";
import logoLarge from "@/assets/logo-pmse-large.png";
import brasaoPMSE from "@/assets/brasao-pmse.png";
import logoCPMI from "@/assets/logo-cpmi.png";
import logoCPME from "@/assets/logo-cpme.png";

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
  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="container mx-auto px-4 pt-32">
        <div className="flex justify-center mb-16">
          <img src={logoLarge} alt="PMSE" className="h-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {units.map((unit) => (
            <div 
              key={unit.id}
              className="bg-card/95 rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all text-center"
            >
              <div className="flex justify-center mb-4">
                <img 
                  src={unit.logo} 
                  alt={unit.name}
                  className="h-24 w-24 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-1">
                {unit.name}
              </h3>
              {unit.fullName && (
                <p className="text-sm text-card-foreground/70">
                  {unit.fullName}
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Unidades;
