
-- Create a validation trigger function for inscricoes_sorteio
CREATE OR REPLACE FUNCTION public.validate_inscricao()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate nome: not empty, max 100 chars
  IF LENGTH(TRIM(NEW.nome)) = 0 THEN
    RAISE EXCEPTION 'Nome é obrigatório' USING ERRCODE = 'check_violation';
  END IF;
  IF LENGTH(NEW.nome) > 100 THEN
    RAISE EXCEPTION 'Nome deve ter no máximo 100 caracteres' USING ERRCODE = 'check_violation';
  END IF;

  -- Validate telefone: not empty, max 20 chars
  IF LENGTH(TRIM(NEW.telefone)) = 0 THEN
    RAISE EXCEPTION 'Telefone é obrigatório' USING ERRCODE = 'check_violation';
  END IF;
  IF LENGTH(NEW.telefone) > 20 THEN
    RAISE EXCEPTION 'Telefone deve ter no máximo 20 caracteres' USING ERRCODE = 'check_violation';
  END IF;

  -- Validate cupom_fiscal: must be exactly 9 digits if provided
  IF NEW.cupom_fiscal IS NOT NULL AND NEW.cupom_fiscal != '' THEN
    IF NEW.cupom_fiscal !~ '^\d{9}$' THEN
      RAISE EXCEPTION 'ID do Pedido deve conter exatamente 9 dígitos numéricos' USING ERRCODE = 'check_violation';
    END IF;
  END IF;

  -- Trim whitespace
  NEW.nome := TRIM(NEW.nome);
  NEW.telefone := TRIM(NEW.telefone);
  IF NEW.cupom_fiscal IS NOT NULL THEN
    NEW.cupom_fiscal := TRIM(NEW.cupom_fiscal);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create the trigger
CREATE TRIGGER validate_inscricao_before_insert
  BEFORE INSERT ON public.inscricoes_sorteio
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_inscricao();
