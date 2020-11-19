import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getIServiceTemplate(
  entityName: string,
  packageIService: string,
  packageEntity: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
  sexEntity: string,
): string {

  const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
  return `package ${packageIService};
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import cl.uft.commons.model.ResultadoProc;
import ${packageEntity}.${entityName};

public interface I${entityName}Service {
${insertMethods(entityName, entityNameFirstLetterToLowerCase, typeVariableID, methods, sexEntity)}
}
`;
}

function insertMethods(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>, sexEntity: string) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(entityName, entityNameFirstLetterToLowerCase, typeVariableID, sexEntity);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(entityName, sexEntity);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(entityName, entityNameFirstLetterToLowerCase, sexEntity);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(entityName, entityNameFirstLetterToLowerCase, sexEntity);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(entityName, entityNameFirstLetterToLowerCase, sexEntity);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(entityName, entityNameFirstLetterToLowerCase, sexEntity);
          break;
      }
    }

  });
  return code;
}


function insertMethodFindById(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, sexEntity: string) {
  return `/**
  * Obtiene ${isFem(sexEntity) ? 'una' : 'un'} {@link ${entityName}} por su identificador
  * 
  * @param ${entityNameFirstLetterToLowerCase}Id Identificador ${isFem(sexEntity) ? 'de la' : 'del'} {@link ${entityName}}
  * @return {@link ${entityName}} coincidente con el identificador
  */
  ResultadoProc<${entityName}> findById(${typeVariableID} ${entityNameFirstLetterToLowerCase}Id);`;
}

function insertMethodfindAllPaginatedBySearch(entityName: string, sexEntity: string) {
  return `/**
  * Obtiene un {@link Page} de ${isFem(sexEntity) ? 'todas las' : 'todos los'} {@link ${entityName}} que coincidan con lo buscado
  * 
  * @param pageable {@link PageRequest} contiene los datos de la paginación
  * @param search   Texto a buscar dentro de los atributos ${isFem(sexEntity) ? 'de la' : 'del'} {@link ${entityName}}
  * @return {@link Page} ${isFem(sexEntity) ? 'de las' : 'de los'} {@link ${entityName}} coincidentes con lo buscado
  */
  ResultadoProc<Page<${entityName}>> findAllPaginatedBySearch(String search, PageRequest pageable);`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return `/**
	 * Registra ${isFem(sexEntity) ? 'una nueva' : 'un nuevo'} {@link ${entityName}}
	 * 
	 * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
	 * @return {@link ${entityName}} ${isFem(sexEntity) ? 'registrada' : 'registrado'}
	 */
  ResultadoProc<${entityName}> save(${entityName} ${entityNameFirstLetterToLowerCase});`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return `/**
  * Actualiza ${isFem(sexEntity) ? 'una nueva' : 'un nuevo'} {@link ${entityName}}
  * 
  * @param ${entityNameFirstLetterToLowerCase} {@link ${entityName}}
  * @return {@link ${entityName}} ${isFem(sexEntity) ? 'actualizada' : 'actualizado'}
  */
  ResultadoProc<${entityName}> update(${entityName} ${entityNameFirstLetterToLowerCase}Param);`;
}

function insertMethodChangeState(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return ``;
}

function insertMethodDelete(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return ``;
}

function isFem(sexEntity: string): boolean {
  return sexEntity === 'F';
}



