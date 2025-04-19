import { Template } from './utils.js';

export const templates = {
  api: {
    filename: 'api-documentation.md',
    mimeType: 'text/markdown',
    description:
      'API documentation template with endpoints, parameters, and examples',
  },
  readme: {
    filename: 'readme.md',
    mimeType: 'text/markdown',
    description:
      'Project README template with sections for installation, usage, and contributing',
  },
  license: {
    filename: 'license.md',
    mimeType: 'text/markdown',
    description: 'MIT License template',
  },
} satisfies Record<string, Template>;

export type TemplateId = keyof typeof templates;
