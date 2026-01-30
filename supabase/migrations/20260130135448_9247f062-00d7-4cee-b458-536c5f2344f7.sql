-- Remover índice único do telefone para permitir múltiplas inscrições
DROP INDEX IF EXISTS inscricoes_sorteio_telefone_key;