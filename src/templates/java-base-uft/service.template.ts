import * as changeCase from 'change-case';

import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getServiceTemplate(
  serviceName: string,
  packageService: string,
  packageIService: string,
  packageEntity: string,
  packageRepository: string,
  typeVariableID: string,
  methods: Array<Checkbox>
): string {

  const pascalCaseControllerName = changeCase.pascalCase(serviceName.toLowerCase());
  const snakeCaseControllerName = changeCase.snakeCase(serviceName.toLowerCase());
  return `package ${packageService};

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.PageRequest;
  import org.springframework.stereotype.Service;
  
  import lombok.extern.apachecommons.CommonsLog;
  
  import cl.uft.commons.model.ResultadoProc;
  import ${packageEntity}.${pascalCaseControllerName};
  import ${packageRepository}.${pascalCaseControllerName}Repository;
  import ${packageIService}.I${pascalCaseControllerName}Service;
  
  @Service
  @CommonsLog
  public class ${pascalCaseControllerName}Service implements I${pascalCaseControllerName}Service {
  
    @Autowired
    ${pascalCaseControllerName}Repository ${snakeCaseControllerName}Repository;
  ${insertMethods(pascalCaseControllerName, snakeCaseControllerName, typeVariableID, methods)}
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
          code += insertMethodfindAllPaginatedBySearch(pascalCaseControllerName, snakeCaseControllerName);
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
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> findById(final ${typeVariableID} ${snakeCaseControllerName}Id) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      final ${pascalCaseControllerName} ${snakeCaseControllerName} = ${snakeCaseControllerName}Repository.findById(${snakeCaseControllerName}Id).orElse(null);
      if (${snakeCaseControllerName} == null) {
        salida.fallo("No se ha encontrado el ${snakeCaseControllerName}");
      }
      salida.exitoso(${snakeCaseControllerName});
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar obtener el ${snakeCaseControllerName}");
    }
    return salida.build();
  }`;
}

function insertMethodfindAllPaginatedBySearch(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return `@Override
  public ResultadoProc<Page<${pascalCaseControllerName}>> findAllPaginatedBySearch(final PageRequest pageable, final String search) {
    final ResultadoProc.Builder<Page<${pascalCaseControllerName}>> salida = new ResultadoProc.Builder<Page<${pascalCaseControllerName}>>();
    try {
      salida.exitoso(${snakeCaseControllerName}Repository.findAllBySearch(search, pageable));
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar listar los ${snakeCaseControllerName}s");
    }
    return salida.build();
  }`;
}

function insertMethodSave(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> save(final ${pascalCaseControllerName} ${snakeCaseControllerName}) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      ${snakeCaseControllerName}Repository.save(${snakeCaseControllerName});
      salida.exitoso(${snakeCaseControllerName}, "${pascalCaseControllerName} registrado correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar registrar el ${snakeCaseControllerName}");
    }
    return salida.build();
  }`;
}

function insertMethodUpdate(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> update(final ${pascalCaseControllerName} ${snakeCaseControllerName}) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      ${snakeCaseControllerName}Repository.save(${snakeCaseControllerName});
      salida.exitoso(${snakeCaseControllerName}, "${pascalCaseControllerName} actualizado correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar actualizar el ${snakeCaseControllerName}");
    }
    return salida.build();
  }`;
}

function insertMethodChangeState(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return ``;
}

function insertMethodDelete(pascalCaseControllerName: string, snakeCaseControllerName: string) {
  return ``;
}



