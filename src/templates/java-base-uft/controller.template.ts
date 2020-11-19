import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { snakeCaseRequestMapping, toLowerCaseFirstLetter } from '../../utils/utils';

export function getControllerTemplate(
	controllerName: string,
	packageController: string,
	packageEntity: string,
	packageIService: string,
	typeVariableID: string,
	methods: Array<Checkbox>
): string {

	const controllerNameFirstLetterToLowerCase = toLowerCaseFirstLetter(controllerName);
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
import ${packageEntity}.${controllerName};
import ${packageIService}.I${controllerName}Service;

@RestController
@RequestMapping("/api/${snakeCaseRequestMapping(controllerName)}")
public class ${controllerName}RestController {

	@Autowired
	I${controllerName}Service ${controllerNameFirstLetterToLowerCase}Service;
${insertMethods(controllerName, controllerNameFirstLetterToLowerCase, typeVariableID, methods)}
}`;

	return template;
}

function insertMethods(controllerName: string, controllerNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>) {
	let code = '';
	methods.forEach(method => {
		if (method.checked) {
			switch (method.method) {
				case METHOD.findById:
					code += '\n\n\t';
					code += insertMethodFindById(controllerName, controllerNameFirstLetterToLowerCase, typeVariableID);
					break;
				case METHOD.findAllPaginatedBySearch:
					code += '\n\n\t';
					code += insertMethodfindAllPaginatedBySearch(controllerName, controllerNameFirstLetterToLowerCase);
					break;
				case METHOD.save:
					code += '\n\n\t';
					code += insertMethodSave(controllerName, controllerNameFirstLetterToLowerCase);
					break;
				case METHOD.update:
					code += '\n\n\t';
					code += insertMethodUpdate(controllerName, controllerNameFirstLetterToLowerCase);
					break;
				case METHOD.changeState:
					code += '\n\n\t';
					code += insertMethodChangeState(controllerName, controllerNameFirstLetterToLowerCase);
					break;
				case METHOD.delete:
					code += '\n\n\t';
					code += insertMethodDelete(controllerName, controllerNameFirstLetterToLowerCase);
					break;
			}
		}

	});
	return code;
}


function insertMethodFindById(controllerName: string, controllerNameFirstLetterToLowerCase: string, typeVariableID: string) {
	return `@GetMapping("/{id}")
	public ResponseEntity<ResultadoProc<${controllerName}>> findById(@PathVariable("id") ${typeVariableID} ${controllerNameFirstLetterToLowerCase}Id) {
		ResultadoProc<${controllerName}> salida = ${controllerNameFirstLetterToLowerCase}Service.findById(${controllerNameFirstLetterToLowerCase}Id);
		return new ResponseEntity<ResultadoProc<${controllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodfindAllPaginatedBySearch(controllerName: string, controllerNameFirstLetterToLowerCase: string) {
	return `@PostMapping("/page-all-by-search")
		public ResponseEntity<ResultadoProc<Page<${controllerName}>>> findAllPaginatedBySearch(
				@RequestBody SearchPagination<String> searchPagination) {
			PageRequest pageable = searchPagination.getPageRequest();
			String search = searchPagination.getSeek();
			ResultadoProc<Page<${controllerName}>> salida = ${controllerNameFirstLetterToLowerCase}Service.findAllPaginatedBySearch(pageable,
					search);
			return new ResponseEntity<ResultadoProc<Page<${controllerName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodSave(controllerName: string, controllerNameFirstLetterToLowerCase: string) {
	return `@PostMapping
	public ResponseEntity<ResultadoProc<${controllerName}>> save(@RequestBody ${controllerName} ${controllerNameFirstLetterToLowerCase}) {
		ResultadoProc<${controllerName}> salida = ${controllerNameFirstLetterToLowerCase}Service.save(${controllerNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${controllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodUpdate(controllerName: string, controllerNameFirstLetterToLowerCase: string) {
	return `@PutMapping
	public ResponseEntity<ResultadoProc<${controllerName}>> update(@RequestBody ${controllerName} ${controllerNameFirstLetterToLowerCase}) {
		ResultadoProc<${controllerName}> salida = ${controllerNameFirstLetterToLowerCase}Service.update(${controllerNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${controllerName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodChangeState(controllerName: string, controllerNameFirstLetterToLowerCase: string) {
	return ``;
}

function insertMethodDelete(controllerName: string, controllerNameFirstLetterToLowerCase: string) {
	return ``;
}