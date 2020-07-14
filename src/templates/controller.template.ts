import * as changeCase from 'change-case';

export function getControllerTemplate(controllerName: string, packageController: string, packageEntity: string, packageIService: string): string {
  const pascalCaseControllerName = changeCase.pascalCase(controllerName.toLowerCase());
  const snakeCaseControllerName = changeCase.snakeCase(controllerName.toLowerCase());
  return `package ${packageController};

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cl.uft.commons.model.ResultadoProc;
import cl.uft.commons.model.SearchPagination;
import ${packageEntity}.${pascalCaseControllerName};
import ${packageIService}.I${pascalCaseControllerName}Service;

@RestController
@RequestMapping("/api/${snakeCaseControllerName}")
public class ${pascalCaseControllerName}RestController {

  @Autowired
  I${pascalCaseControllerName}Service ${snakeCaseControllerName}Service;
  
  @GetMapping("/{id}")
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> findById(@PathVariable("id") String ${snakeCaseControllerName}Id) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.findById(${snakeCaseControllerName}Id);
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}

	@PostMapping("/page-all-by-search")
	public ResponseEntity<ResultadoProc<Page<${pascalCaseControllerName}>>> findAllPaginatedBySearch(
			@RequestBody SearchPagination<String> searchPagination) {
		PageRequest pageable = searchPagination.getPageRequest();
		String search = searchPagination.getSeek();
		ResultadoProc<Page<${pascalCaseControllerName}>> salida = ${snakeCaseControllerName}Service.findAllPaginatedBySearch(pageable,
				search);
		return new ResponseEntity<ResultadoProc<Page<${pascalCaseControllerName}>>>(salida, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> save(@RequestBody ${pascalCaseControllerName} ${snakeCaseControllerName}) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.save(${snakeCaseControllerName});
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}

	@PutMapping
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> update(@RequestBody ${pascalCaseControllerName} ${snakeCaseControllerName}) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.update(${snakeCaseControllerName});
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}

}
`;
}




