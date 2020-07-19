import * as changeCase from 'change-case';

import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getControllerTemplate(
	controllerName: string,
	packageController: string,
	packageEntity: string,
	packageIService: string,
	typeVariableID: string,
	methods: Array<Checkbox>
): string {

	const pascalCaseControllerName = changeCase.pascalCase(controllerName.toLowerCase());
	const snakeCaseControllerName = changeCase.snakeCase(controllerName.toLowerCase());
	let template = `package ${packageController};

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
${insertMethods(pascalCaseControllerName, snakeCaseControllerName, typeVariableID, methods)}
}`;

	return template;
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
	return `@GetMapping("/{id}")
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> findById(@PathVariable("id") ${typeVariableID} ${snakeCaseControllerName}Id) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.findById(${snakeCaseControllerName}Id);
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodfindAllPaginatedBySearch(pascalCaseControllerName: string, snakeCaseControllerName: string) {
	return `@PostMapping("/page-all-by-search")
		public ResponseEntity<ResultadoProc<Page<${pascalCaseControllerName}>>> findAllPaginatedBySearch(
				@RequestBody SearchPagination<String> searchPagination) {
			PageRequest pageable = searchPagination.getPageRequest();
			String search = searchPagination.getSeek();
			ResultadoProc<Page<${pascalCaseControllerName}>> salida = ${snakeCaseControllerName}Service.findAllPaginatedBySearch(pageable,
					search);
			return new ResponseEntity<ResultadoProc<Page<${pascalCaseControllerName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodSave(pascalCaseControllerName: string, snakeCaseControllerName: string) {
	return `@PostMapping
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> save(@RequestBody ${pascalCaseControllerName} ${snakeCaseControllerName}) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.save(${snakeCaseControllerName});
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodUpdate(pascalCaseControllerName: string, snakeCaseControllerName: string) {
	return `@PutMapping
	public ResponseEntity<ResultadoProc<${pascalCaseControllerName}>> update(@RequestBody ${pascalCaseControllerName} ${snakeCaseControllerName}) {
		ResultadoProc<${pascalCaseControllerName}> salida = ${snakeCaseControllerName}Service.update(${snakeCaseControllerName});
		return new ResponseEntity<ResultadoProc<${pascalCaseControllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodChangeState(pascalCaseControllerName: string, snakeCaseControllerName: string) {
	return ``;
}

function insertMethodDelete(pascalCaseControllerName: string, snakeCaseControllerName: string) {
	return ``;
}