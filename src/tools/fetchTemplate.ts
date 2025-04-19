import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { isValidTemplateId, templatesDir } from './utils.js';
import { templates } from './constants.js';
import path from 'path';
import { promises as fs } from 'fs';

export async function fetchTemplate(obj: {
  documentType: string;
}): Promise<CallToolResult> {
  // Normalize template ID
  const templateId = obj.documentType.toLowerCase();

  if (!isValidTemplateId(templateId)) {
    const availableTemplates = Object.keys(templates).join(', ');
    return {
      content: [
        {
          type: 'text',
          text: `Template '${templateId}' not found. Available templates: ${availableTemplates}`,
        },
      ],
    };
  }

  try {
    const templatePath = path.join(
      templatesDir,
      templates[templateId].filename,
    );
    const templateContent = await fs.readFile(templatePath, 'utf-8');

    return {
      content: [
        {
          type: 'text',
          text: templateContent,
        },
      ],
    };
  } catch (error) {
    console.error(error);
    console.error(`Error fetching template: ${String(error)}`);
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching template '${templateId}': ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}
