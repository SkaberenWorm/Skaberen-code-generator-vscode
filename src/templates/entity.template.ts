import * as changeCase from 'change-case';

export function getEntityTemplate(entityName: string): string {
  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  const snakeCaseEntityName = changeCase.snakeCase(entityName.toLowerCase());
  return `ENTITY CODE GENERATE
PATH CLASS '${snakeCaseEntityName}.java';
class ${pascalCaseEntityName}
`;
}

