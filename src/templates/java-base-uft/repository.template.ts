import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getRepositoryTemplate(
  entityName: string,
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

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ${packageEntity}.${entityName};

@Repository
public interface ${entityName}Repository extends JpaRepository<${entityName}, ${ID}> {
  ${insertMethods(entityName, methods)}
}
`;
}

function insertMethods(entityName: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {

        case METHOD.findAllPaginatedBySearch:
          code += '\n\n\t';
          code += insertMethodfindAllPaginatedBySearch(entityName);
          break;
        case METHOD.findAllActive:
          code += '\n\n\t';
          code += insertMethodfindAllActive(entityName);
          break;
      }
    }

  });
  return code;
}

function insertMethodfindAllPaginatedBySearch(entityName: string) {
  return `/**
  * Returns a {@link Page} of the {@link ${entityName}} type that match the search.
  * 
  * @param pageable {@link Pageable}
  * @param search   Text to search within the attributes of the {@link ${entityName}} entity
  * @return {@link Page} of the {@link ${entityName}}
  */
  // @Query("select p from ${entityName} p where p._ATRIBUTO_ like %?1%")
  @Query("select p from ${entityName} p")
  Page<${entityName}> findAllBySearch(String search, Pageable pageable);`;
}

function insertMethodfindAllActive(entityName: string) {
  return `/**
  * Returns all active instances of the type {@link ${entityName}} 
  * 
  * @return all active entities {@link ${entityName}}
  */
  @Query("select p from ${entityName} p where p.activo = 1")
  List<${entityName}> findAllActive();`;
}




