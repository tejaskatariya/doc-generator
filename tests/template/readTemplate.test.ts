import path from 'path';
import { readTemplate } from '../../src/template/readTemplate.js';

jest.mock('../../src/template/utils.js', () => {
  return {
    ...jest.requireActual<typeof import('../../src/template/utils.js')>(
      '../../src/template/utils.js',
    ),
    templatesDir: path.resolve(__dirname, '..', 'data', 'templates'),
    isValidTemplateId: jest
      .fn()
      .mockImplementation(id => ['api', 'no-file'].includes(id)),
  };
});

jest.mock('../../src/template/constants.js', () => ({
  templates: {
    api: {
      filename: 'api-documentation.md',
      mimeType: 'text/markdown',
      description: 'API documentation template',
    },
    'no-file': {
      filename: 'no-file.md',
      mimeType: 'text/markdown',
      description: 'No file template',
    },
  },
}));

describe('readTemplate', () => {
  it('should successfully read an existing template', async () => {
    const url = new URL('templates://templates/api');

    const result = await readTemplate(url);

    expect(result).toEqual({
      contents: [
        {
          uri: 'templates://api',
          mimeType: 'text/markdown',
          text: '# Test API Documentation Template',
        },
      ],
    });
  });

  it('should throw an error for an invalid template ID', async () => {
    const url = new URL('templates://templates/invalid');

    await expect(readTemplate(url)).rejects.toThrow(
      'Template not found: invalid',
    );
  });

  it('should throw an error if file reading fails', async () => {
    const url = new URL('templates://templates/no-file');

    await expect(readTemplate(url)).rejects.toThrow(
      'Failed to read template: no-file',
    );
  });
});
