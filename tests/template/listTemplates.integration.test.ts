import { listTemplates } from '../../src/template/listTemplate.js';
import * as fs from 'fs/promises';
import * as path from 'path';

describe('templates', () => {
  it('should be available for the listTemplates tool', async () => {
    const templatesResult = await listTemplates();
    const templatesList = JSON.parse(
      templatesResult.contents[0].text as string,
    );

    for (const template of templatesList) {
      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        'public',
        'templates',
        template.filename,
      );
      const fileExists = await fs
        .access(templatePath)
        .then(() => true)
        .catch(() => false);

      expect(fileExists).toBe(true);
    }
  });
});
