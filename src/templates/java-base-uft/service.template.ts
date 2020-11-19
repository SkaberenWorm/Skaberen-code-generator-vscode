import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getServiceTemplate(
  serviceName: string,
  packageService: string,
  packageIService: string,
  packageEntity: string,
  packageRepository: string,
  typeVariableID: string,
  methods: Array<Checkbox>
): string {

  const serviceNameFirstLetterToLowerCase = toLowerCaseFirstLetter(serviceName);
  return `package ${packageService};

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.PageRequest;
  import org.springframework.stereotype.Service;
  
  import lombok.extern.apachecommons.CommonsLog;
  
  import cl.uft.commons.model.ResultadoProc;
  import ${packageEntity}.${serviceName};
  import ${packageRepository}.${serviceName}Repository;
  import ${packageIService}.I${serviceName}Service;
  
  @Service
  @CommonsLog
  public class ${serviceName}Service implements I${serviceName}Service {
  
    @Autowired
    ${serviceName}Repository ${serviceNameFirstLetterToLowerCase}Repository;
  ${insertMethods(serviceName, serviceNameFirstLetterToLowerCase, typeVariableID, methods)}
  }
  
`;
}


function insertMethods(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n\t';
          code += insertMethodFindById(pascalCaseControllerName, serviceNameFirstLetterToLowerCase, typeVariableID);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(pascalCaseControllerName, serviceNameFirstLetterToLowerCase);
          break;
        case METHOD.save:
          code += '\n\n\t';
          code += insertMethodSave(pascalCaseControllerName, serviceNameFirstLetterToLowerCase);
          break;
        case METHOD.update:
          code += '\n\n\t';
          code += insertMethodUpdate(pascalCaseControllerName, serviceNameFirstLetterToLowerCase);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(pascalCaseControllerName, serviceNameFirstLetterToLowerCase);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(pascalCaseControllerName, serviceNameFirstLetterToLowerCase);
          break;
      }
    }

  });
  return code;
}


function insertMethodFindById(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string, typeVariableID: string) {
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> findById(final ${typeVariableID} ${serviceNameFirstLetterToLowerCase}Id) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      final ${pascalCaseControllerName} ${serviceNameFirstLetterToLowerCase} = ${serviceNameFirstLetterToLowerCase}Repository.findById(${serviceNameFirstLetterToLowerCase}Id).orElse(null);
      if (${serviceNameFirstLetterToLowerCase} == null) {
        salida.fallo("No se ha encontrado el ${serviceNameFirstLetterToLowerCase}");
      }
      salida.exitoso(${serviceNameFirstLetterToLowerCase});
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar obtener el ${serviceNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodfindAllPaginatedBySearch(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string) {
  return `@Override
  public ResultadoProc<Page<${pascalCaseControllerName}>> findAllPaginatedBySearch(final PageRequest pageable, final String search) {
    final ResultadoProc.Builder<Page<${pascalCaseControllerName}>> salida = new ResultadoProc.Builder<Page<${pascalCaseControllerName}>>();
    try {
      salida.exitoso(${serviceNameFirstLetterToLowerCase}Repository.findAllBySearch(search, pageable));
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar listar los ${serviceNameFirstLetterToLowerCase}s");
    }
    return salida.build();
  }`;
}

function insertMethodSave(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string) {
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> save(final ${pascalCaseControllerName} ${serviceNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      ${serviceNameFirstLetterToLowerCase}Repository.save(${serviceNameFirstLetterToLowerCase});
      salida.exitoso(${serviceNameFirstLetterToLowerCase}, "${pascalCaseControllerName} registrado correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar registrar el ${serviceNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodUpdate(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string) {
  return `@Override
  public ResultadoProc<${pascalCaseControllerName}> update(final ${pascalCaseControllerName} ${serviceNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${pascalCaseControllerName}> salida = new ResultadoProc.Builder<${pascalCaseControllerName}>();
    try {
      ${serviceNameFirstLetterToLowerCase}Repository.save(${serviceNameFirstLetterToLowerCase});
      salida.exitoso(${serviceNameFirstLetterToLowerCase}, "${pascalCaseControllerName} actualizado correctamente");
    } catch (final Exception e) {
      log.error(e.getMessage(), e);
      salida.fallo("Se produjo un error inesperado al intentar actualizar el ${serviceNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodChangeState(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string) {
  return ``;
}

function insertMethodDelete(pascalCaseControllerName: string, serviceNameFirstLetterToLowerCase: string) {
  return ``;
}



