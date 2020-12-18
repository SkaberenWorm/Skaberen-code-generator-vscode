import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getIServiceTemplate(
  entityName: string,
  packageIService: string,
  packageEntity: string,
  packageUtil: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
  useUtilClass: boolean,
): string {

  const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
  return `package ${packageIService};

import java.util.List;
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}
import ${packageEntity}.${entityName};

public interface I${entityName}Service {
${insertMethods(entityName, entityNameFirstLetterToLowerCase, typeVariableID, methods)}
}
`;
}

function insertMethods(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(entityName, entityNameFirstLetterToLowerCase, typeVariableID);
          break;
        case METHOD.findAll:
          code += '\n\n\t';
          code += insertMethodFindAll(entityName);
          break;
        case METHOD.findAllActive:
          code += '\n\n\t';
          code += insertMethodFindAllActive(entityName);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodFindAllPaginatedBySearch(entityName);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(entityName, entityNameFirstLetterToLowerCase);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(entityName, entityNameFirstLetterToLowerCase);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(entityName, entityNameFirstLetterToLowerCase);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(entityName, entityNameFirstLetterToLowerCase);
          break;
      }
    }

  });
  return code;
}

function insertMethodFindById(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string) {
  return `/**
  * Retrieves an entity {@link ${entityName}} by its identifier
  * 
  * @param ${entityNameFirstLetterToLowerCase}Id Identifier  {@link ${entityName}}
  * @return {@link ${entityName}} with the given id
  */
  ResultadoProc<${entityName}> findById(${typeVariableID} ${entityNameFirstLetterToLowerCase}Id);`;
}

function insertMethodFindAll(entityName: string) {
  return `/**
  * Returns all instances of the type {@link ${entityName}} 
  * 
  * @return all entities {@link ${entityName}}
  */
  ResultadoProc<List<${entityName}>> findAll();`;
}

function insertMethodFindAllActive(entityName: string) {
  return `/**
  * Returns all active instances of the type {@link ${entityName}} 
  * 
  * @return all active entities {@link ${entityName}}
  */
  ResultadoProc<List<${entityName}>> findAllActive();`;
}


function insertMethodFindAllPaginatedBySearch(entityName: string) {
  return `/**
  * Returns a {@link Page} of the {@link ${entityName}} type that match the search.
  * 
  * @param pageable {@link PageRequest}
  * @param search   Text to search within the attributes of the {@link ${entityName}} entity
  * @return {@link Page} of the {@link ${entityName}}
  */
  ResultadoProc<Page<${entityName}>> findAllPaginatedBySearch(String search, PageRequest pageable);`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string) {
  return `/**
	 * Saves a given entity {@link ${entityName}}
	 * 
	 * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
	 * @return the saved entity
	 */
  ResultadoProc<${entityName}> save(${entityName} ${entityNameFirstLetterToLowerCase});`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string) {
  return `/**
  * Updates a given entity {@link ${entityName}}
  * 
  * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
  * @return the updated entity
  */
  ResultadoProc<${entityName}> update(${entityName} ${entityNameFirstLetterToLowerCase}Param);`;
}

function insertMethodChangeState(entityName: string, entityNameFirstLetterToLowerCase: string) {
  return ``;
}

function insertMethodDelete(entityName: string, entityNameFirstLetterToLowerCase: string) {
  return ``;
}





