import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GiveawayForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    cupom_fiscal: "",
  });

  const isCupomValido = /^\d{9}$/.test(formData.cupom_fiscal);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("inscricoes_sorteio").insert({
        nome: formData.nome.trim(),
        telefone: formData.telefone.trim(),
        cupom_fiscal: formData.cupom_fiscal.trim(),
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Telefone já cadastrado! 📱",
            description: "Este telefone já está participando do sorteio.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setIsLoading(false);
        return;
      }

      // Redireciona para a página de parabéns com o nome
      navigate(`/parabens?nome=${encodeURIComponent(formData.nome.trim())}`);
    } catch (error) {
      console.error("Erro ao salvar inscrição:", error);
      toast({
        title: "Erro ao participar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-foreground/90">
          Nome completo
        </Label>
        <Input
          id="nome"
          name="nome"
          placeholder="Seu nome completo"
          value={formData.nome}
          onChange={handleChange}
          required
          maxLength={100}
          className="bg-input-bg border-input-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone" className="text-foreground/90">
          WhatsApp
        </Label>
        <Input
          id="telefone"
          name="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleChange}
          required
          maxLength={20}
          className="bg-input-bg border-input-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cupom_fiscal" className="text-foreground/90">
          Cupom Fiscal
        </Label>
        <Input
          id="cupom_fiscal"
          name="cupom_fiscal"
          type="text"
          inputMode="numeric"
          placeholder="000000000"
          value={formData.cupom_fiscal}
          onChange={(e) => {
            // Permitir apenas números e limitar a 9 dígitos
            const value = e.target.value.replace(/\D/g, '').slice(0, 9);
            setFormData((prev) => ({ ...prev, cupom_fiscal: value }));
          }}
          required
          maxLength={9}
          className="bg-input-bg border-input-border focus:border-primary focus:ring-primary/20 tracking-widest text-center font-mono text-lg"
        />
        <p className="text-xs text-muted-foreground">
          Insira os 9 números do seu cupom fiscal ({formData.cupom_fiscal.length}/9)
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !isCupomValido}
        className="w-full h-12 text-lg font-semibold mt-6 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">🍔</span> Enviando...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Quero Participar!
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center pt-2">
        Ao participar, você concorda em receber novidades da Bets Premium Burger.
      </p>
    </form>
  );
};

export default GiveawayForm;
