import * as changeCase from 'change-case';

export function getIServiceTemplate(iServiceName: string, packageIService: string, packageEntity: string): string {
  const pascalCaseIServiceName = changeCase.pascalCase(iServiceName.toLowerCase());
  const snakeCaseIServiceName = changeCase.snakeCase(iServiceName.toLowerCase());
  return `package ${packageIService};
  
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import cl.uft.commons.model.ResultadoProc;
import ${packageEntity}.${pascalCaseIServiceName};

public interface I${pascalCaseIServiceName}Service {

  ResultadoProc<${pascalCaseIServiceName}> findById(String ${snakeCaseIServiceName}Id);

  ResultadoProc<${pascalCaseIServiceName}> save(${pascalCaseIServiceName} ${snakeCaseIServiceName});

  ResultadoProc<${pascalCaseIServiceName}> update(${pascalCaseIServiceName} ${snakeCaseIServiceName}Param);

  ResultadoProc<Page<${pascalCaseIServiceName}>> findAllPaginatedBySearch(PageRequest pageable, String search);

}

  
`;
}




