import { documentsEnum } from '../enums/documentsEnum';

export const documentsOptionsList = [
  {
    label: 'CPF',
    value: documentsEnum.CPF,
    canBeGenerateWithMask: true,
  },
  {
    label: 'CNH',
    value: documentsEnum.CNH,
    canBeGenerateWithMask: false,
  },
  {
    label: 'RG',
    value: documentsEnum.RG,
    canBeGenerateWithMask: true,
  },
  {
    label: 'CNS',
    value: documentsEnum.CNS,
    canBeGenerateWithMask: true,
  },
  {
    label: 'PIS',
    value: documentsEnum.PIS,
    canBeGenerateWithMask: true,
  },
  {
    label: 'Título de Eleitor',
    value: documentsEnum.TITULO_ELEITOR,
    canBeGenerateWithMask: true,
  },
  {
    label: 'Passaporte',
    value: documentsEnum.PASSAPORTE,
    canBeGenerateWithMask: false,
  },
  {
    label: 'Certidão de nascimento',
    value: documentsEnum.CERTIDAO_NASCIMENTO,
    canBeGenerateWithMask: true,
  },
  {
    label: 'Certidão de casamento',
    value: documentsEnum.CERTIDAO_CASAMENTO,
    canBeGenerateWithMask: true,
  },
  {
    label: 'Certidão de óbito',
    value: documentsEnum.CERTIDAO_OBITO,
    canBeGenerateWithMask: true,
  },
  {
    label: 'CNPJ',
    value: documentsEnum.CNPJ,
    canBeGenerateWithMask: true,
  },
  {
    label: 'CNPJ Alfanumérico',
    value: documentsEnum.CNPJ_ALFANUMERICO,
    canBeGenerateWithMask: true,
  },
  {
    label: 'Inscrição Estadual',
    value: documentsEnum.INSCRICAO_ESTADUAL,
    canBeGenerateWithMask: false,
  },
];
