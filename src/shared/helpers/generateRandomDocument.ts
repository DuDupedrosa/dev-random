import {
  cpf,
  cnh,
  rg,
  cns,
  pis,
  tituloEleitor,
  passaporte,
  cnpj,
  cnpjAlfanumerico,
  inscricaoEstadual,
  certidao,
} from "gerador-br";

import { documentsEnum, DocumentsEnum } from "../enums/documentsEnum";

export const generateRandomDocument = (
  value: DocumentsEnum,
  withFormat: boolean
): string | null => {
  const generators = {
    [documentsEnum.CPF]: () => cpf(withFormat),
    [documentsEnum.CNH]: () => cnh(),
    [documentsEnum.RG]: () => rg(withFormat),
    [documentsEnum.CNS]: () => cns(withFormat),
    [documentsEnum.PIS]: () => pis(withFormat),
    [documentsEnum.TITULO_ELEITOR]: () => tituloEleitor(withFormat),
    [documentsEnum.PASSAPORTE]: () => passaporte(),
    [documentsEnum.CNPJ]: () => cnpj(withFormat),
    [documentsEnum.CNPJ_ALFANUMERICO]: () => cnpjAlfanumerico(withFormat),
    [documentsEnum.INSCRICAO_ESTADUAL]: () => inscricaoEstadual(),
    [documentsEnum.CERTIDAO_NASCIMENTO]: () => certidao.nascimento(withFormat),
    [documentsEnum.CERTIDAO_CASAMENTO]: () => certidao.casamento(withFormat),
    [documentsEnum.CERTIDAO_OBITO]: () => certidao.obito(withFormat),
  };

  return generators[value]?.() ?? null;
};
