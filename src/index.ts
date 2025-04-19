import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { fetchTemplate } from './template/fetchTemplate.js';
import { readTemplate } from './template/readTemplate.js';
import { listTemplates } from './template/listTemplate.js';

const server = new McpServer({
  name: 'doc-generator',
  version: '1.0.0',
});

server.resource(
  'list-templates',
  'templates://list',
  { mimeType: 'application/json' },
  listTemplates,
);

server.resource(
  'read-template',
  'templates://{templateId}',
  { mimeType: 'text/markdown' },
  readTemplate,
);

server.tool(
  'fetch_template',
  'Fetch template from the resources provided',
  {
    documentType: z.string(),
  },
  fetchTemplate,
);

try {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Server started and listening on stdio');
} catch (error) {
  console.error(
    'Failed to start server:',
    error instanceof Error ? error.message : String(error),
  );
  process.exit(1);
}
