import { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { isValidTemplateId, templatesDir } from './utils.js';
import { templates } from './constants.js';
import path from 'path';
import { promises as fs } from 'fs';

export async function readTemplate(uri: URL): Promise<ReadResourceResult> {
  // Extract templateId from the URL pathname
  const pathParts = uri.pathname.split('/');
  const templateId = pathParts[pathParts.length - 1];

  if (!isValidTemplateId(templateId)) {
    console.error(`Template not found: ${templateId}`);
    throw new Error(`Template not found: ${templateId}`);
  }

  const templateFile = templates[templateId].filename;
  const templatePath = path.join(templatesDir, templateFile);

  try {
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    return {
      contents: [
        {
          uri: `templates://${templateId}`,
          mimeType: templates[templateId].mimeType,
          text: templateContent,
        },
      ],
    };
  } catch (error) {
    console.error(`Error reading template: ${String(error)}`);
    throw new Error(`Failed to read template: ${templateId}`);
  }
}
