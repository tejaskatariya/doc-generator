import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { javaAPIPrompts } from '../prompts/api/java.js';
import { APIPrompt } from '../prompts/api/api.js';

const getAPIPrompt = (language: string): APIPrompt => {
  switch (language) {
    case 'java':
      return javaAPIPrompts;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};

export const listControllers = async ({
  repositoryPath,
  language,
}: {
  repositoryPath: string;
  language: string;
}): Promise<CallToolResult> => {
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
