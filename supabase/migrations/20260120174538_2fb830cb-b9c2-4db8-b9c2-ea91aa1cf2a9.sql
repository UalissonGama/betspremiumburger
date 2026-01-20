-- Tornar email e data_nascimento opcionais
ALTER TABLE public.inscricoes_sorteio 
ALTER COLUMN email DROP NOT NULL,
ALTER COLUMN data_nascimento DROP NOT NULL;

-- Remover índice único do email se existir
DROP INDEX IF EXISTS inscricoes_sorteio_email_key;

-- Criar índice único no telefone para evitar duplicatas
CREATE UNIQUE INDEX IF NOT EXISTS inscricoes_sorteio_telefone_key ON public.inscricoes_sorteio(telefone);