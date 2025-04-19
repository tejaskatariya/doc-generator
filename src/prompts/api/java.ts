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

  documentEndpoints: (controllerPath: string): string => `
    You are an expert Java and Spring/Micronaut/Quarkus developer.

    Your task is to perform a detailed analysis of ${controllerPath}, provided via its path, and extract all relevant information about the API endpoints defined within it. You should leverage your knowledge of framework's annotations and patterns.

    Crucially, for any Java POJO identified as a Request Body Model (via @RequestBody) or a Response Type/Model (method return type), you must also provide a representative JSON structure for that POJO by analyzing its class definition reccursively.

    Your chain of thought should be:
    1. Read the complete code content of the Java controller file located at the provided path.
    2. Analyze the controller code to identify the class and all methods defining API endpoints (using annotations like @RequestMapping, @GetMapping, etc.). 
    3. Extract details such as paths, HTTP methods, consumes/produces, parameters (names, types, annotations, attributes), method return types, response status, etc.
    4. During analysis, identify the fully qualified names of any custom Java classes used as @RequestBody parameters or method return types. These are potential POJO models. Exclude primitive types, standard Java library classes (like String, List, Map, etc.).
    4. For each unique potential POJO model class name identified in step 3:
        - Infer the probable file path of its '.java' file within the repository (based on the fully qualified name, likely under src/main/java).
        - Use filesystem mcp to read the code content of this POJO file.
        - Analyze the POJO's code content to understand its structure (fields, their Java types, and potential nesting).
        - Generate a representative JSON structure or schema based on the POJO's analyzed structure. Represent basic types with placeholder values or their type name (e.g., "string", "integer"). For nested POJOs, indicate their class name or provide nested JSON structure.

    Finally, present the extracted API information for each identified endpoint in the following OpenAPI-like structured format, tailored for developer readability.
    `,
};
