import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getIServiceTemplate(
  iServiceName: string,
  packageIService: string,
  packageEntity: string,
  typeVariableID: string,
  methods: Array<Checkbox>
): string {

  const iServiceNameFirstLetterToLowerCase = toLowerCaseFirstLetter(iServiceName);
  return `package ${packageIService};
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import cl.uft.commons.model.ResultadoProc;
import ${packageEntity}.${iServiceName};

public interface I${iServiceName}Service {
${insertMethods(iServiceName, iServiceNameFirstLetterToLowerCase, typeVariableID, methods)}
}
`;
}

function insertMethods(iServiceName: string, iServiceNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(iServiceName, iServiceNameFirstLetterToLowerCase, typeVariableID);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(iServiceName);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(iServiceName, iServiceNameFirstLetterToLowerCase);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(iServiceName, iServiceNameFirstLetterToLowerCase);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(iServiceName, iServiceNameFirstLetterToLowerCase);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(iServiceName, iServiceNameFirstLetterToLowerCase);
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





