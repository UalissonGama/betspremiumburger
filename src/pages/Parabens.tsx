import { useSearchParams } from "react-router-dom";
import { PartyPopper, Gift, Check, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Parabens = () => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome") || "Participante";
  const primeiroNome = nome.split(" ")[0];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      
      {/* Floating celebration elements */}
      <div className="absolute top-10 left-10 text-4xl animate-float opacity-60">🎉</div>
      <div className="absolute top-20 right-16 text-3xl animate-float-delayed opacity-60">🍔</div>
      <div className="absolute bottom-20 left-20 text-3xl animate-float opacity-60">🎊</div>
      <div className="absolute bottom-32 right-10 text-4xl animate-float-delayed opacity-60">🏆</div>
      <div className="absolute top-1/3 left-8 text-2xl animate-float-delayed opacity-50">✨</div>
      <div className="absolute top-1/2 right-8 text-2xl animate-float opacity-50">🎁</div>

      <div className="w-full max-w-md relative z-10 text-center">
        {/* Success Icon */}
        <div className="mb-8 animate-fade-in">
          <div className="w-24 h-24 mx-auto rounded-full bg-success/20 flex items-center justify-center mb-6 shadow-glow-success">
            <Check className="w-12 h-12 text-success" />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-card border border-card-border rounded-2xl p-8 md:p-10 shadow-card backdrop-blur-sm animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <PartyPopper className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold">Inscrição Confirmada!</span>
            <PartyPopper className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Parabéns, <span className="text-gradient">{primeiroNome}!</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-6">
            Você já está participando do Sorteio de{" "}
            <strong className="text-primary">1 Ano Grátis</strong> no Bets Premium Burger! 🍔
          </p>

          <div className="bg-secondary/50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Gift className="w-5 h-5 text-primary" />
              <span className="font-medium">Aniversário de 6 Anos</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Aguarde o resultado do sorteio. Boa sorte!
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Fique de olho no seu WhatsApp para novidades!
            </p>
            
            <a href="https://www.instagram.com/betspremiumburgers/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mt-4 gap-2">
                <Instagram className="w-4 h-4" />
                Siga no Instagram
              </Button>
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-muted-foreground mt-6">
          Bets Premium Burger © 2024 • Sorteio válido até 28/02/2025
        </p>
      </div>
    </div>
  );
};

export default Parabens;
