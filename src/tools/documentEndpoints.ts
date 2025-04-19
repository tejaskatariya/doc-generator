import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getAPIPrompt } from './utils.js';

export function documentEndpoints({
  controllerPath,
  language,
}: {
  controllerPath: string;
  language: string;
}): CallToolResult {
  const apiPrompt = getAPIPrompt(language);

  return {
    content: [
      {
        type: 'text',
        text: apiPrompt.documentEndpoints(controllerPath),
      },
    ],
  };
}
