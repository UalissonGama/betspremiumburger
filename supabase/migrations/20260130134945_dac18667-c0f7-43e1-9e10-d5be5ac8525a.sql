-- Adicionar coluna cupom_fiscal à tabela de inscrições (nullable para registros existentes)
ALTER TABLE public.inscricoes_sorteio 
ADD COLUMN IF NOT EXISTS cupom_fiscal TEXT;

-- Criar índice único no cupom_fiscal para evitar duplicatas (ignorando nulls)
CREATE UNIQUE INDEX IF NOT EXISTS inscricoes_sorteio_cupom_fiscal_key 
ON public.inscricoes_sorteio(cupom_fiscal) 
WHERE cupom_fiscal IS NOT NULL;