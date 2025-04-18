import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolResult,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import * as path from "path";
import * as fs from "fs/promises";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// Templates directory path (relative to project root)
const templatesDir = path.join(__dirname, "..", "templates");

// Define template type for type safety
type TemplateType = {
  filename: string;
  mimeType: string;
  description: string;
};

// Template definitions with type safety
const templates: Record<string, TemplateType> = {
  api: {
    filename: "api-documentation.md",
    mimeType: "text/markdown",
    description:
      "API documentation template with endpoints, parameters, and examples",
  },
  readme: {
    filename: "readme.md",
    mimeType: "text/markdown",
    description:
      "Project README template with sections for installation, usage, and contributing",
  },
  license: {
    filename: "license.md",
    mimeType: "text/markdown",
    description: "MIT License template",
  },
};

// Valid template IDs for type checking
type TemplateId = keyof typeof templates;

// Type guard to check if a template ID is valid
function isValidTemplateId(id: string): id is TemplateId {
  return id in templates;
}

// List all available templates
server.resource(
  "list-templates",
  "templates://list",
  { mimeType: "application/json" },
  async (): Promise<ReadResourceResult> => {
    const templatesList = Object.entries(templates).map(([key, template]) => ({
      id: key,
      filename: template.filename,
      description: template.description,
      mimeType: template.mimeType,
    }));

    return {
      contents: [
        {
          uri: "templates://list",
          mimeType: "application/json",
          text: JSON.stringify(templatesList, null, 2),
        },
      ],
    };
  }
);

// Read specific template
server.resource(
  "read-template",
  "templates://{templateId}",
  { mimeType: "text/markdown" },
  async (uri): Promise<ReadResourceResult> => {
    // Extract templateId from the URL pathname
    const pathParts = uri.pathname.split("/");
    const templateId = pathParts[pathParts.length - 1];

    if (!isValidTemplateId(templateId)) {
      throw new Error(`Template not found: ${templateId}`);
    }

    const templateFile = templates[templateId].filename;
    const templatePath = path.join(templatesDir, templateFile);
    let templateContent;

    try {
      templateContent = await fs.readFile(templatePath, "utf-8");
    } catch (error) {
      console.error(`Error reading template: ${String(error)}`);
      throw new Error(`Failed to read template: ${templateId}`);
    }

    return {
      contents: [
        {
          uri: `templates://${templateId}`,
          mimeType: templates[templateId].mimeType,
          text: templateContent,
        },
      ],
    };
  }
);

// Fetch template tool
server.tool(
  "fetch_template",
  "Fetch template from the resources provided",
  {
    documentType: z.string(),
  },
  async ({ documentType }): Promise<CallToolResult> => {
    // Normalize template ID
    const templateId = documentType.toLowerCase();

    if (!isValidTemplateId(templateId)) {
      const availableTemplates = Object.keys(templates).join(", ");
      return {
        content: [
          {
            type: "text",
            text: `Template '${templateId}' not found. Available templates: ${availableTemplates}`,
          },
        ],
      };
    }

    try {
      const templatePath = path.join(
        templatesDir,
        templates[templateId].filename
      );
      const templateContent = await fs.readFile(templatePath, "utf-8");

      return {
        content: [
          {
            type: "text",
            text: templateContent,
          },
        ],
      };
    } catch (error) {
      console.error(`Error fetching template: ${String(error)}`);
      return {
        content: [
          {
            type: "text",
            text: `Error fetching template '${templateId}': ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    }
  }
);

// Start the server with stdio transport
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Server started and listening on stdio");
  } catch (error) {
    console.error(
      "Failed to start server:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

main();
