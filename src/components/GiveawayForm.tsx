import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Gift, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const GiveawayForm = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
  });

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
        email: formData.email.trim().toLowerCase(),
        data_nascimento: formData.dataNascimento,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "E-mail já cadastrado! 📧",
            description: "Este e-mail já está participando do sorteio.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      toast({
        title: "Participação confirmada! 🎉",
        description: "Boa sorte no sorteio de 1 ano grátis de burger!",
      });
    } catch (error) {
      console.error("Erro ao salvar inscrição:", error);
      toast({
        title: "Erro ao participar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
          <Check className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Você está participando!
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Aguarde o resultado do sorteio. Boa sorte, {formData.nome.split(" ")[0]}! 🍔
        </p>
      </div>
    );
  }

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
        <Label htmlFor="email" className="text-foreground/90">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={255}
          className="bg-input-bg border-input-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataNascimento" className="text-foreground/90">
          Data de nascimento
        </Label>
        <Input
          id="dataNascimento"
          name="dataNascimento"
          type="date"
          value={formData.dataNascimento}
          onChange={handleChange}
          required
          className="bg-input-bg border-input-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
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
