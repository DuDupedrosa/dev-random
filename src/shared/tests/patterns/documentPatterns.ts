// src/shared/tests/patterns/documentPatterns.ts
import { documentsEnum } from '@/shared/enums/documentsEnum';

export const documentPatterns: Record<number, RegExp> = {
  [documentsEnum.CPF]: /^\d{11}$/, // 11 dígitos
  [documentsEnum.CNH]: /^\d{11}$/, // CNH geralmente tem 11 dígitos
  [documentsEnum.RG]: /^\d{7,9}$/, // RG pode variar entre 7 e 9 dígitos
  [documentsEnum.CNS]: /^\d{15}$/, // 15 dígitos
  [documentsEnum.PIS]: /^\d{11}$/, // 11 dígitos
  [documentsEnum.TITULO_ELEITOR]: /^\d{12}$/, // 12 dígitos
  [documentsEnum.PASSAPORTE]: /^[A-Z]{2}\d{7}$/, // 2 letras + 7 números
  [documentsEnum.CERTIDAO_NASCIMENTO]: /^\d{32}$/, // 32 dígitos numéricos
  [documentsEnum.CNPJ]: /^\d{14}$/, // 14 dígitos numéricos
  [documentsEnum.CNPJ_ALFANUMERICO]: /^[A-Z0-9]{14}$/, // 14 caracteres alfanuméricos
  [documentsEnum.INSCRICAO_ESTADUAL]: /^\d{8,9}(-\d{1,2})?$/, // hífen opcional
  [documentsEnum.CERTIDAO_CASAMENTO]: /^\d{32}$/, // 32 dígitos
  [documentsEnum.CERTIDAO_OBITO]: /^\d{32}$/, // 32 dígitos
};
