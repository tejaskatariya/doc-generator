import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { getAPIPrompt } from './utils.js';

export const listControllers = ({
  repositoryPath,
  language,
}: {
  repositoryPath: string;
  language: string;
}): CallToolResult => {
  const apiPrompt = getAPIPrompt(language);

  return {
    content: [
      {
        type: 'text',
        text: apiPrompt.listControllers(repositoryPath),
      },
    ],
  };
};
