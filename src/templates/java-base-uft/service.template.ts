import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { toLowerCaseFirstLetter } from '../../utils/utils';

export function getServiceTemplate(
  entityName: string,
  packageService: string,
  packageIService: string,
  packageEntity: string,
  packageUtil: string,
  packageRepository: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
  useUtilClass: boolean,
  useResultProc: boolean,
): string {

  const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
  return `package ${packageService};

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
${useResultProc ? `\nimport ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}` : ''}
${useResultProc ? `import ${useUtilClass ? packageUtil + '.Util;' : 'cl.uft.commons.model.Util;'}` : ''}
import ${packageEntity}.${entityName};
${!useResultProc ? `import com.example.demo.exceptions.EntityNotFoundException;\nimport com.example.demo.exceptions.ErrorProcessingException;\nimport com.example.demo.exceptions.UnsavedEntityException;` : ''}
import ${packageRepository}.${entityName}Repository;
import ${packageIService}.I${entityName}Service;

@Service
public class ${entityName}Service implements I${entityName}Service {

  @Autowired
  ${entityName}Repository ${entityNameFirstLetterToLowerCase}Repository;
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
          code += insertMethodfindAll(entityName, entityNameFirstLetterToLowerCase, useResultProc);
          break;
        case METHOD.findAllActive:
          code += '\n\n\t';
          code += insertMethodfindAllActive(entityName, entityNameFirstLetterToLowerCase, useResultProc);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(entityName, entityNameFirstLetterToLowerCase, useResultProc);
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
  if (useResultProc) {
    return `@Override
  public ResultadoProc<${entityName}> findById(final ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      final ${entityName} ${entityNameFirstLetterToLowerCase} = this.${entityNameFirstLetterToLowerCase}Repository.findById(${entityNameFirstLetterToLowerCase}Id).orElse(null);
      if (${entityNameFirstLetterToLowerCase} == null) {
        salida.fallo("${entityName} no se encontrado");
      }
      salida.exitoso(${entityNameFirstLetterToLowerCase});
    } catch (final Exception e) {
      Util.printError("findById(" + ${entityNameFirstLetterToLowerCase}Id + ")", e);
      salida.fallo("Se produjo un error inesperado al intentar obtener ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
  }

  return `@Override
  public ${entityName} findById(final ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) throws ErrorProcessingException, EntityNotFoundException {
    try {
      return this.${entityNameFirstLetterToLowerCase}Repository.findById(${entityNameFirstLetterToLowerCase}Id).orElseThrow(() -> new EntityNotFoundException());
    } catch (final EntityNotFoundException e) {
      throw new EntityNotFoundException();
    } catch (final Exception e) {
      throw new ErrorProcessingException();
    }
  }`;

}

function insertMethodfindAll(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

  if (!useResultProc) {
    return `@Override
  public List<${entityName}> findAll() throws ErrorProcessingException {
    try {
      return this.${entityNameFirstLetterToLowerCase}Repository.findAll();
    } catch (final Exception e) {
      throw new ErrorProcessingException();
    }
  }`;
  }

  return `@Override
  public ResultadoProc<List<${entityName}>> findAll() {
    final ResultadoProc.Builder<List<${entityName}>> salida = new ResultadoProc.Builder<List<${entityName}>>();
    try {
      salida.exitoso(this.${entityNameFirstLetterToLowerCase}Repository.findAll());
    } catch (final Exception e) {
      Util.printError("findAll()", e);
      salida.fallo("Se produjo un error inesperado al intentar listar ${entityNameFirstLetterToLowerCase}s");
    }
    return salida.build();
  }`;
}

function insertMethodfindAllActive(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

  if (!useResultProc) {
    return `@Override
  public List<${entityName}> findAllActive() throws ErrorProcessingException {
    try {
      return this.${entityNameFirstLetterToLowerCase}Repository.findAllActive();
    } catch (final Exception e) {
      throw new ErrorProcessingException();
    }
  }`;
  }

  return `@Override
  public ResultadoProc<List<${entityName}>> findAllActive() {
    final ResultadoProc.Builder<List<${entityName}>> salida = new ResultadoProc.Builder<List<${entityName}>>();
    try {
      salida.exitoso(this.${entityNameFirstLetterToLowerCase}Repository.findAllActive());
    } catch (final Exception e) {
      Util.printError("findAllActive()", e);
      salida.fallo("Se produjo un error inesperado al intentar listar ${entityNameFirstLetterToLowerCase}s");
    }
    return salida.build();
  }`;
}

function insertMethodfindAllPaginatedBySearch(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

  if (!useResultProc) {
    return `@Override
    public Page<${entityName}> findAllPaginatedBySearch(final String search, final PageRequest pageable)
        throws ErrorProcessingException {
      try {
        return this.${entityNameFirstLetterToLowerCase}Repository.findAllBySearch(search, pageable);
      } catch (final Exception e) {
        throw new ErrorProcessingException();
      }
    }`;
  }

  return `@Override
  public ResultadoProc<Page<${entityName}>> findAllPaginatedBySearch(final String search, final PageRequest pageable) {
    final ResultadoProc.Builder<Page<${entityName}>> salida = new ResultadoProc.Builder<Page<${entityName}>>();
    try {
      salida.exitoso(this.${entityNameFirstLetterToLowerCase}Repository.findAllBySearch(search, pageable));
    } catch (final Exception e) {
      Util.printError("findAllPaginatedBySearch(" + search + ", " + pageable.toString() + ")", e);
      salida.fallo("Se produjo un error inesperado al intentar listar ${entityNameFirstLetterToLowerCase}s");
    }
    return salida.build();
  }`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

  if (!useResultProc) {
    return `@Override
  public ${entityName} save(final ${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException {
    try {
      return this.${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
    } catch (final Exception e) {
      throw new UnsavedEntityException();
    }
  }`;
  }

  return `@Override
  public ResultadoProc<${entityName}> save(final ${entityName} ${entityNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      this.${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
      salida.exitoso(${entityNameFirstLetterToLowerCase}, "${entityName}  correctamente");
    } catch (final Exception e) {
      Util.printError("save(" + ${entityNameFirstLetterToLowerCase}.toString() + ")", e);
      salida.fallo("Se produjo un error inesperado al intentar registrar ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

  if (!useResultProc) {
    return `@Override
  public ${entityName} update(final ${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException {
    try {
      return this.${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
    } catch (final Exception e) {
      throw new UnsavedEntityException();
    }
  }`;
  }

  return `@Override
  public ResultadoProc<${entityName}> update(final ${entityName} ${entityNameFirstLetterToLowerCase}) {
    final ResultadoProc.Builder<${entityName}> salida = new ResultadoProc.Builder<${entityName}>();
    try {
      this.${entityNameFirstLetterToLowerCase}Repository.save(${entityNameFirstLetterToLowerCase});
      salida.exitoso(${entityNameFirstLetterToLowerCase}, "${entityName}  correctamente");
    } catch (final Exception e) {
      Util.printError("update(" + ${entityNameFirstLetterToLowerCase}.toString() + ")", e);
      salida.fallo("Se produjo un error inesperado al intentar actualizar ${entityNameFirstLetterToLowerCase}");
    }
    return salida.build();
  }`;
}




