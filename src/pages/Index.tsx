import GiveawayForm from "@/components/GiveawayForm";
import { PartyPopper, Flame } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-60">🍔</div>
      <div className="absolute top-20 right-16 text-3xl animate-float-delayed opacity-60">🍟</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-float opacity-60">🎉</div>
      <div className="absolute bottom-32 right-10 text-4xl animate-float-delayed opacity-60">🥤</div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse-soft">
            <PartyPopper className="w-4 h-4" />
            Sorteio Especial
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="w-8 h-8 text-primary animate-flicker" />
            <span className="text-6xl font-black text-gradient">6</span>
            <Flame className="w-8 h-8 text-primary animate-flicker" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Anos de <span className="text-gradient">Bets Premium Burger</span>
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Ganhe <strong className="text-primary">1 ANO GRÁTIS</strong> de burger!
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-card-border rounded-2xl p-6 md:p-8 shadow-card backdrop-blur-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Preencha e participe! 🎁
            </h2>
            <p className="text-sm text-muted-foreground">
              Leva menos de 1 minuto
            </p>
          </div>
          
          <GiveawayForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Bets Premium Burger © 2024 • Sorteio válido até 28/02/2025
        </p>
      </div>
    </div>;
};
export default Index;