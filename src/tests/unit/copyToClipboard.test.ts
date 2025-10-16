import { expect } from '@jest/globals';
import { copyToClipboard } from '@/shared/helpers/copyToClipboardHelper';

describe('copyToClipboard', () => {
  it('Should call clipboard.writeText', () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValueOnce(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    copyToClipboard('Value to copy');

    expect(mockClipboard.writeText).toHaveBeenCalledWith('Value to copy');
  });
});
