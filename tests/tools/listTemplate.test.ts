import { listTemplates } from '../../src/tools/listTemplate.js';

jest.mock('../../src/tools/constants.js', () => ({
  templates: {
    api: {
      filename: 'api-documentation.md',
      mimeType: 'text/markdown',
      description: 'API documentation template',
    },
    readme: {
      filename: 'readme.md',
      mimeType: 'text/markdown',
      description: 'README template',
    },
  },
}));

describe('listTemplates', () => {
  it('should return a formatted list of all templates', async () => {
    const result = await listTemplates();

    expect(result).toEqual({
      contents: [
        {
          uri: 'templates://list',
          mimeType: 'application/json',
          text: JSON.stringify(
            [
              {
                id: 'api',
                filename: 'api-documentation.md',
                mimeType: 'text/markdown',
                description: 'API documentation template',
              },
              {
                id: 'readme',
                filename: 'readme.md',
                mimeType: 'text/markdown',
                description: 'README template',
              },
            ],
            null,
            2,
          ),
        },
      ],
    });
  });
});
