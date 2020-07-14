import * as changeCase from 'change-case';

export function getEntityTemplate(entityName: string, packageEntity: string, serialVersionUID: string): string {
  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  const snakeCaseEntityName = changeCase.snakeCase(entityName.toLowerCase());
  return `package ${packageEntity};

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "${snakeCaseEntityName}s")
@Data
@NoArgsConstructor
public class ${pascalCaseEntityName} implements Serializable {

	private static final long serialVersionUID = ${serialVersionUID};

	@Id
	private String id;

}
`;
}




