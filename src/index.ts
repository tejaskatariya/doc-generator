import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { fetchTemplate } from './tools/fetchTemplate.js';
import { readTemplate } from './tools/readTemplate.js';
import { listTemplates } from './tools/listTemplate.js';
import { generateDocs } from './tools/generateDocs.js';
import { listControllers } from './tools/listControllers.js';

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

server.tool(
  'generate_docs',
  'Return the recipie/instructions for llm to generate documentation for the given repository',
  {
    repositoryPath: z.string(),
  },
  generateDocs,
);

server.tool(
  'list_controllers',
  'Provide context to help llm identify all the controllers present in the repository',
  { repositoryPath: z.string() },
  listControllers,
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
