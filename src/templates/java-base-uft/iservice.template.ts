import * as changeCase from 'change-case';

import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getIServiceTemplate(
  iServiceName: string,
  packageIService: string,
  packageEntity: string,
  typeVariableID: string,
  methods: Array<Checkbox>
): string {

  const pascalCaseIServiceName = changeCase.pascalCase(iServiceName.toLowerCase());
  const snakeCaseIServiceName = changeCase.snakeCase(iServiceName.toLowerCase());
  return `package ${packageIService};
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import cl.uft.commons.model.ResultadoProc;
import ${packageEntity}.${pascalCaseIServiceName};

public interface I${pascalCaseIServiceName}Service {
${insertMethods(pascalCaseIServiceName, snakeCaseIServiceName, typeVariableID, methods)}
}
`;
}

function insertMethods(pascalCaseControllerName: string, snakeCaseControllerName: string, typeVariableID: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(pascalCaseControllerName, snakeCaseControllerName, typeVariableID);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(pascalCaseControllerName);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(pascalCaseControllerName, snakeCaseControllerName);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(pascalCaseControllerName, snakeCaseControllerName);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(pascalCaseControllerName, snakeCaseControllerName);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(pascalCaseControllerName, snakeCaseControllerName);
          break;
      }
    }

  });
  return code;
}


function insertMethodFindById(pascalCaseControllerName: string, snakeCaseControllerName: string, typeVariableID: string) {
  return `ResultadoProc<${pascalCaseControllerName}> findById(${typeVariableID} ${snakeCaseControllerName}Id);`;
}

function insertMethodfindAllPaginatedBySearch(pascalCaseControllerName: string) {
  return `ResultadoProc<Page<${pascalCaseControllerName}>> findAllPaginatedBySearch(PageRequest pageable, String search);`;
}

function insertMethodSave(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return `ResultadoProc<${pascalCaseControllerName}> save(${pascalCaseControllerName} ${snakeCaseControllerName});`;
}

function insertMethodUpdate(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return `ResultadoProc<${pascalCaseControllerName}> update(${pascalCaseControllerName} ${snakeCaseControllerName}Param);`;
}

function insertMethodChangeState(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return ``;
}

function insertMethodDelete(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return ``;
}





