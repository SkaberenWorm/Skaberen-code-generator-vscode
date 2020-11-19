import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getRepositoryTemplate(
  repositoryName: string,
  packageRepository: string,
  packageEntity: string,
  typeVariableID: string,
  methods: Array<Checkbox>,
): string {

  let ID = 'NO_DEFINED';
  switch (typeVariableID) {
    case 'int':
      ID = 'Integer';
      break;
    case 'long':
      ID = 'Long';
      break;
    case 'double':
      ID = 'Double';
      break;
    default:
      ID = typeVariableID;
      break;
  }
  return `package ${packageRepository};

  import org.springframework.data.domain.Page;
  import org.springframework.data.domain.Pageable;
  import org.springframework.data.jpa.repository.JpaRepository;
  import org.springframework.data.jpa.repository.Query;
  import org.springframework.stereotype.Repository;
  
  import ${packageEntity}.${repositoryName};
  
  @Repository
  public interface ${repositoryName}Repository extends JpaRepository<${repositoryName}, ${ID}> {
  ${insertMethods(repositoryName, methods)}
  }
`;
}

function insertMethods(pascalCaseControllerName: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {

        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(pascalCaseControllerName);
          break;
        case METHOD.changeState:
          code += '\n\n\t';
          code += insertMethodChangeState(pascalCaseControllerName);
          break;
        case METHOD.delete:
          code += '\n\n\t';
          code += insertMethodDelete(pascalCaseControllerName);
          break;
      }
    }

  });
  return code;
}



function insertMethodfindAllPaginatedBySearch(pascalCaseControllerName: string) {
  return `// @Query("select p from ${pascalCaseControllerName} p where p._ATRIBUTO_ like %1%")
  @Query("select p from ${pascalCaseControllerName} p")
  Page<${pascalCaseControllerName}> findAllBySearch(String search, Pageable pageable);`;
}

function insertMethodChangeState(pascalCaseControllerName: string) {
  return ``;
}

function insertMethodDelete(pascalCaseControllerName: string) {
  return ``;
}




