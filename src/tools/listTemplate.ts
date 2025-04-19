import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { templates } from './constants.js';

export async function listTemplates(): Promise<ReadResourceResult> {
  const templatesList = Object.entries(templates).map(([key, template]) => ({
    id: key,
    ...template,
  }));

  return {
    contents: [
      {
        uri: 'templates://list',
        mimeType: 'application/json',
        text: JSON.stringify(templatesList, null, 2),
      },
    ],
  };
}
