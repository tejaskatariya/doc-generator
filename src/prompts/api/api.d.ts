export type APIPrompt = {
  listControllers: (repositoryPath: string) => string;
  documentEndpoints: (controllerPath: string) => string;
};
