import path from 'path';
import { TemplateId, templates } from './constants.js';
import { APIPrompt } from '../prompts/api/api.js';
import { javaAPIPrompts } from '../prompts/api/java.js';

export const templatesDir = path.join(
  // TODO: Fix the __dirname issue when running tests
  // Replace with __dirname when running tests
  import.meta.dirname,
  '..',
  '..',
  'public',
  'templates',
);

export type Template = {
  filename: string;
  mimeType: string;
  description: string;
};

export function isValidTemplateId(id: string): id is TemplateId {
  return id in templates;
}

export const getAPIPrompt = (language: string): APIPrompt => {
  switch (language) {
    case 'java':
      return javaAPIPrompts;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
