import path from 'path';
import { fetchTemplate } from '../../src/tools/fetchTemplate.js';

jest.mock('../../src/tools/utils.js', () => {
  return {
    ...jest.requireActual<typeof import('../../src/tools/utils.js')>(
      '../../src/tools/utils.js',
    ),
    templatesDir: path.resolve(__dirname, '..', 'data', 'templates'),
  };
});

jest.mock('../../src/tools/constants.js', () => ({
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

describe('fetchTemplate', () => {
  it('should return template content when a valid template ID is provided', async () => {
    const templateId = 'api';
    const mockContent = '# Test API Documentation Template';

    const result = await fetchTemplate({ documentType: templateId });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: mockContent,
        },
      ],
    });
  });

  it('should handle case-insensitive template IDs', async () => {
    const templateId = 'API';
    const mockContent = '# Test API Documentation Template';

    const result = await fetchTemplate({ documentType: templateId });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: mockContent,
        },
      ],
    });
  });

  it('should return an error message when template ID is invalid', async () => {
    const templateId = 'nonexistent';

    const result = await fetchTemplate({ documentType: templateId });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: "Template 'nonexistent' not found. Available templates: api, no-file",
        },
      ],
    });
  });

  it('should handle file read errors gracefully', async () => {
    const templateId = 'no-file';

    const result = await fetchTemplate({ documentType: templateId });

    expect(result.content[0].text).toContain(
      `Error fetching template 'no-file'`,
    );
  });
});
