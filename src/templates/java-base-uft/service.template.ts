import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { isFem, toLowerCaseFirstLetter } from '../../utils/utils';

export function getServiceTemplate(
  entityName: string,
  packageService: string,
  packageIService: string,
  packageEntity: string,
  packageUtil: string,
  packageRepository: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
  sexEntity: string,
  useUtilClass: boolean,
): string {

  const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
  return `package ${packageService};

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.PageRequest;
  import org.springframework.stereotype.Service;
  
  import lombok.extern.apachecommons.CommonsLog;
  
  import ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}
  import ${packageEntity}.${entityName};
  import ${packageRepository}.${entityName}Repository;
  import ${packageIService}.I${entityName}Service;
  
  @Service
  @CommonsLog
  public class ${entityName}Service implements I${entityName}Service {
  
    @Autowired
    ${entityName}Repository ${entityNameFirstLetterToLowerCase}Repository;
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
          code += insertMethodfindAllPaginatedBySearch(entityName, entityNameFirstLetterToLowerCase, sexEntity);
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
  return `@Override
  public ResultadoProc<${entityName}> findById(final ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      final ${entityName} ${entityNameFirstLetterToLowerCase} = ${entityNameFirstLetterToLowerCase}Repository.findById(${entityNameFirstLetterToLowerCase}Id).orElse(null);
      if (${entityNameFirstLetterToLowerCase} == null) {
        salida.fallo("No se ha encontrado ${isFem(sexEntity) ? 'la' : 'el'} ${entityNameFirstLetterToLowerCase}");
      }
      salida.exitoso(${entityNameFirstLetterToLowerCase});
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar obtener ${isFem(sexEntity) ? 'la' : 'el'} ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodfindAllPaginatedBySearch(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return `@Override
  public ResultadoProc<Page<${entityName}>> findAllPaginatedBySearch(final String search, final PageRequest pageable) {
    final ResultadoProc.Builder<Page<${entityName}>> salida = new ResultadoProc.Builder<Page<${entityName}>>();
    try {
      salida.exitoso(${entityNameFirstLetterToLowerCase}Repository.findAllBySearch(search, pageable));
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar listar ${isFem(sexEntity) ? 'las' : 'los'} ${entityNameFirstLetterToLowerCase}s");
    }
    return salida.build();
  }`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return `@Override
  public ResultadoProc<${entityName}> save(final ${entityName} ${entityNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      ${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
      salida.exitoso(${entityNameFirstLetterToLowerCase}, "${entityName} ${isFem(sexEntity) ? 'registrada' : 'registrado'} correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar registrar ${isFem(sexEntity) ? 'la' : 'el'} ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return `@Override
  public ResultadoProc<${entityName}> update(final ${entityName} ${entityNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      ${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
      salida.exitoso(${entityNameFirstLetterToLowerCase}, "${entityName} ${isFem(sexEntity) ? 'actualizada' : 'actualizado'} correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar actualizar ${isFem(sexEntity) ? 'la' : 'el'} ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodChangeState(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return ``;
}

function insertMethodDelete(entityName: string, entityNameFirstLetterToLowerCase: string, sexEntity: string) {
  return ``;
}



