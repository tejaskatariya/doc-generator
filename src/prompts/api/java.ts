import { APIPrompt } from './api.d.js';

export const javaAPIPrompts: APIPrompt = {
  listControllers: (repositoryPath: string): string => `
    You are an expert Java and Spring/Micronaut/Quarkus developer.

    Your task is to find all controller classes within the Spring application located at the ${repositoryPath}.

    To achieve this, you should:
    1.  Explore the directory structure of the repository starting from the given path. You can use other tools from filesystem mcp server to explore the repository. 
    2.  Focus your search within standard Spring Boot source directories, typically found under 'src/main/java'.
    3.  Identify files with the '.java' extension.
    4.  For each identified '.java' file, use 'filesystem mcp' to read its content.
    4.  Analyze the content of each file to determine if it contains a class annotated with '@Controller' or '@RestController'. These annotations indicate a controller class.

    Collect the full class names (including package) for all identified controller files or classes.

    After processing all relevant files, provide a single, clear list of the names of all identified controller classes.
`,
};
