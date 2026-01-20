-- Tabela para armazenar inscrições do sorteio
CREATE TABLE public.inscricoes_sorteio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.inscricoes_sorteio ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas (qualquer pessoa pode se inscrever)
CREATE POLICY "Qualquer pessoa pode se inscrever" 
ON public.inscricoes_sorteio 
FOR INSERT 
WITH CHECK (true);

-- Política para impedir leitura pública dos dados dos participantes
CREATE POLICY "Dados dos participantes são privados" 
ON public.inscricoes_sorteio 
FOR SELECT 
USING (false);

-- Criar índice único para evitar inscrições duplicadas pelo email
CREATE UNIQUE INDEX idx_inscricoes_email ON public.inscricoes_sorteio (email);