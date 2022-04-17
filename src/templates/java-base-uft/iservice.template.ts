import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getIServiceTemplate(
  entityName: string,
  packageExceptions: string,
  packageIService: string,
  packageEntity: string,
  packageUtil: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
  useUtilClass: boolean,
  useResultProc: boolean,
): string {

  const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
  return `package ${packageIService};

import java.util.List;
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

${useResultProc ? `import ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}` : ''}
import ${packageEntity}.${entityName};
${!useResultProc ? `import ${packageExceptions}.EntityNotFoundException;\nimport ${packageExceptions}.ErrorProcessingException;\nimport ${packageExceptions}.UnsavedEntityException;\n` : ''}
public interface I${entityName}Service {
${insertMethods(entityName, entityNameFirstLetterToLowerCase, typeVariableID, methods, useResultProc)}
}
`;
}

function insertMethods(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>, useResultProc: boolean) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(entityName, entityNameFirstLetterToLowerCase, typeVariableID, useResultProc);
          break;
        case METHOD.findAll:
          code += '\n\n\t';
          code += insertMethodFindAll(entityName, useResultProc);
          break;
        case METHOD.findAllActive:
          code += '\n\n\t';
          code += insertMethodFindAllActive(entityName, useResultProc);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodFindAllPaginatedBySearch(entityName, useResultProc);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(entityName, entityNameFirstLetterToLowerCase, useResultProc);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(entityName, entityNameFirstLetterToLowerCase, useResultProc);
          break;
      }
    }

  });
  return code;
}

function insertMethodFindById(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, useResultProc: boolean) {
  return `/**
  * Retrieves an entity {@link ${entityName}} by its identifier
  * 
  * @param ${entityNameFirstLetterToLowerCase}Id Identifier  {@link ${entityName}}
  * @return {@link ${entityName}} with the given id
  */
  ${useResultProc ?
      `ResultadoProc<${entityName}> findById(${typeVariableID} ${entityNameFirstLetterToLowerCase}Id);` :
      `${entityName} findById(${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) throws ErrorProcessingException, EntityNotFoundException;`
    }`;
}

function insertMethodFindAll(entityName: string, useResultProc: boolean) {
  return `/**
  * Returns all instances of the type {@link ${entityName}} 
  * 
  * @return all entities {@link ${entityName}}
  */
  ${useResultProc ?
      `ResultadoProc<List<${entityName}>> findAll();` :
      `List<${entityName}> findAll() throws ErrorProcessingException;`
    }`;
}

function insertMethodFindAllActive(entityName: string, useResultProc: boolean) {
  return `/**
  * Returns all active instances of the type {@link ${entityName}} 
  * 
  * @return all active entities {@link ${entityName}}
  */
  ${useResultProc ?
      `ResultadoProc<List<${entityName}>> findAllActive();` :
      `List<${entityName}> findAllActive() throws ErrorProcessingException;`
    }`;
}


function insertMethodFindAllPaginatedBySearch(entityName: string, useResultProc: boolean) {
  return `/**
  * Returns a {@link Page} of the {@link ${entityName}} type that match the search.
  * 
  * @param pageable {@link PageRequest}
  * @param search   Text to search within the attributes of the {@link ${entityName}} entity
  * @return {@link Page} of the {@link ${entityName}}
  */
  ${useResultProc ?
      `ResultadoProc<Page<${entityName}>> findAllPaginatedBySearch(String search, PageRequest pageable);` :
      `Page<${entityName}> findAllPaginatedBySearch(String search, PageRequest pageable) throws ErrorProcessingException;`
    }`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {
  return `/**
	 * Saves a given entity {@link ${entityName}}
	 * 
	 * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
	 * @return the saved entity
	 */
  ${useResultProc ?
      `ResultadoProc<${entityName}> save(${entityName} ${entityNameFirstLetterToLowerCase});` :
      `${entityName} save(${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException;`
    }`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {
  return `/**
  * Updates a given entity {@link ${entityName}}
  * 
  * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
  * @return the updated entity
  */
  ${useResultProc ?
      `ResultadoProc<${entityName}> update(${entityName} ${entityNameFirstLetterToLowerCase});` :
      `${entityName} update(${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException;`
    }`;
}






