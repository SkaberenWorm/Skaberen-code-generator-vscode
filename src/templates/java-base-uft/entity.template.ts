import { snakeCaseForAnnotationTable } from '../../utils/utils';

export function getEntityTemplate(
  entityName: string,
  packageEntity: string,
  serialVersionUID: string,
  typeVariableID: string,
): string {

  const snakeCaseEntityName = snakeCaseForAnnotationTable(entityName);
  return `package ${packageEntity};

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "${snakeCaseEntityName}s")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ${entityName} implements Serializable {

	private static final long serialVersionUID = ${serialVersionUID};

	@Id
	private ${typeVariableID} id;

}
`;
}




