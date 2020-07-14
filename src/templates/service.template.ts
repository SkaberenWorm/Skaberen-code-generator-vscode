import * as changeCase from 'change-case';

export function getServiceTemplate(
  serviceName: string,
  packageService: string,
  packageIService: string,
  packageEntity: string,
  packageRepository: string,
  typeVariableID: string,
): string {

  const pascalCaseServiceName = changeCase.pascalCase(serviceName.toLowerCase());
  const snakeCaseServiceName = changeCase.snakeCase(serviceName.toLowerCase());
  return `package ${packageService};

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.PageRequest;
  import org.springframework.stereotype.Service;
  
  import lombok.extern.apachecommons.CommonsLog;
  
  import cl.uft.commons.model.ResultadoProc;
  import ${packageEntity}.${pascalCaseServiceName};
  import ${packageRepository}.${pascalCaseServiceName}Repository;
  import ${packageIService}.I${pascalCaseServiceName}Service;
  
  @Service
  @CommonsLog
  public class ${pascalCaseServiceName}Service implements I${pascalCaseServiceName}Service {
  
    @Autowired
    ${pascalCaseServiceName}Repository ${snakeCaseServiceName}Repository;
  
    @Override
    public ResultadoProc<${pascalCaseServiceName}> findById(final ${typeVariableID} ${snakeCaseServiceName}Id) {
      final ResultadoProc.Builder<${pascalCaseServiceName}> salida = new ResultadoProc.Builder<${pascalCaseServiceName}>();
      try {
        final ${pascalCaseServiceName} ${snakeCaseServiceName} = ${snakeCaseServiceName}Repository.findById(${snakeCaseServiceName}Id).orElse(null);
        if (${snakeCaseServiceName} == null) {
          salida.fallo("No se ha encontrado el ${snakeCaseServiceName}");
        }
        salida.exitoso(${snakeCaseServiceName});
      } catch (final Exception e) {
        log.error(e.getMessage(), e);
        salida.fallo("Se produjo un error inesperado al intentar obtener el ${snakeCaseServiceName}");
      }
      return salida.build();
    }
  
    @Override
    public ResultadoProc<${pascalCaseServiceName}> save(final ${pascalCaseServiceName} ${snakeCaseServiceName}) {
      final ResultadoProc.Builder<${pascalCaseServiceName}> salida = new ResultadoProc.Builder<${pascalCaseServiceName}>();
      try {
        ${snakeCaseServiceName}Repository.save(${snakeCaseServiceName});
        salida.exitoso(${snakeCaseServiceName}, "${pascalCaseServiceName} registrado correctamente");
      } catch (final Exception e) {
        log.error(e.getMessage(), e);
        salida.fallo("Se produjo un error inesperado al intentar registrar el ${snakeCaseServiceName}");
      }
      return salida.build();
    }
  
    @Override
    public ResultadoProc<${pascalCaseServiceName}> update(final ${pascalCaseServiceName} ${snakeCaseServiceName}) {
      final ResultadoProc.Builder<${pascalCaseServiceName}> salida = new ResultadoProc.Builder<${pascalCaseServiceName}>();
      try {
        ${snakeCaseServiceName}Repository.save(${snakeCaseServiceName});
        salida.exitoso(${snakeCaseServiceName}, "${pascalCaseServiceName} actualizado correctamente");
      } catch (final Exception e) {
        log.error(e.getMessage(), e);
        salida.fallo("Se produjo un error inesperado al intentar actualizar el ${snakeCaseServiceName}");
      }
      return salida.build();
    }
  
    @Override
    public ResultadoProc<Page<${pascalCaseServiceName}>> findAllPaginatedBySearch(final PageRequest pageable, final String search) {
      final ResultadoProc.Builder<Page<${pascalCaseServiceName}>> salida = new ResultadoProc.Builder<Page<${pascalCaseServiceName}>>();
      try {
        salida.exitoso(${snakeCaseServiceName}Repository.findAllBySearch(search, pageable));
      } catch (final Exception e) {
        log.error(e.getMessage(), e);
        salida.fallo("Se produjo un error inesperado al intentar listar los ${snakeCaseServiceName}s");
      }
      return salida.build();
    }
  }
  
`;
}




