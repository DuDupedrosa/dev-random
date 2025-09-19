export const documentsEnum = {
  CPF: 1,
  CNH: 2,
  RG: 3,
  CNS: 4,
  PIS: 5,
  TITULO_ELEITOR: 6,
  PASSAPORTE: 7,
  CERTIDAO_NASCIMENTO: 8,
  CNPJ: 9,
  CNPJ_ALFANUMERICO: 10,
  INSCRICAO_ESTADUAL: 11,
  CERTIDAO_CASAMENTO: 12,
  CERTIDAO_OBITO: 13,
} as const;
export type DocumentsEnum = (typeof documentsEnum)[keyof typeof documentsEnum];
