import { documentsEnum } from '@/shared/enums/documentsEnum';
import { generateRandomDocument } from '@/shared/helpers/generateRandomDocumentHelper';

describe('generateRandomDocument', () => {
  const documentTypes = Object.values(documentsEnum);

  documentTypes.forEach((docType) => {
    it(`Should return a valid document type: ${docType} (string)`, () => {
      const documentNumber = generateRandomDocument(docType, false);
      expect(typeof documentNumber).toBe('string');
      expect(documentNumber).not.toBeNull();
      expect(documentNumber).not.toBe('');
    });
  });

  it('Should be return null to a invalid document', () => {
    // @ts-expect-error — testando cenário com documento inválido
    const documentNumber = generateRandomDocument(20, false);
    expect(documentNumber).toBeNull();
  });
});
