import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { snakeCaseRequestMapping, toLowerCaseFirstLetter } from '../../utils/utils';

export function getControllerTemplate(
	entityName: string,
	packageController: string,
	packageEntity: string,
	packageUtil: string,
	packageIService: string,
	typeVariableID: string,
	methods: Array<Checkbox>,
	useUtilClass: boolean,
): string {

	const entityNameFirstLetterToLowerCase = toLowerCaseFirstLetter(entityName);
	let template = `package ${packageController};

import java.util.List;

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

import ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}
import ${useUtilClass ? packageUtil + '.SearchPagination;' : 'cl.uft.commons.model.SearchPagination;'}
import ${packageEntity}.${entityName};
import ${packageIService}.I${entityName}Service;

@RestController
@RequestMapping("/api/${snakeCaseRequestMapping(entityName)}")
public class ${entityName}RestController {

	@Autowired
	I${entityName}Service ${entityNameFirstLetterToLowerCase}Service;
${insertMethods(entityName, entityNameFirstLetterToLowerCase, typeVariableID, methods)}
}`;

	return template;
}

function insertMethods(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string, methods: Array<Checkbox>) {
	let code = '';
	methods.forEach(method => {
		if (method.checked) {
			switch (method.method) {
				case METHOD.findById:
					code += '\n\n\t';
					code += insertMethodFindById(entityName, entityNameFirstLetterToLowerCase, typeVariableID);
					break;
				case METHOD.findAll:
					code += '\n\n\t';
					code += insertMethodfindAll(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.findAllActive:
					code += '\n\n\t';
					code += insertMethodfindAllActive(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.findAllPaginatedBySearch:
					code += '\n\n\t';
					code += insertMethodfindAllPaginatedBySearch(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.save:
					code += '\n\n\t';
					code += insertMethodSave(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.update:
					code += '\n\n\t';
					code += insertMethodUpdate(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.changeState:
					code += '\n\n\t';
					code += insertMethodChangeState(entityName, entityNameFirstLetterToLowerCase);
					break;
				case METHOD.delete:
					code += '\n\n\t';
					code += insertMethodDelete(entityName, entityNameFirstLetterToLowerCase);
					break;
			}
		}

	});
	return code;
}


function insertMethodFindById(entityName: string, entityNameFirstLetterToLowerCase: string, typeVariableID: string) {
	return `@GetMapping("/{id}")
	public ResponseEntity<ResultadoProc<${entityName}>> findById(@PathVariable("id") ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.findById(${entityNameFirstLetterToLowerCase}Id);
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodfindAll(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return `@GetMapping("/page-all-by-search")
		public ResponseEntity<ResultadoProc<List<${entityName}>>> findAll() {
			ResultadoProc<List<${entityName}>> salida = ${entityNameFirstLetterToLowerCase}Service.findAll();
			return new ResponseEntity<ResultadoProc<List<${entityName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodfindAllActive(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return `@GetMapping("/page-all-by-search")
		public ResponseEntity<ResultadoProc<List<${entityName}>>> findAllActive() {
			ResultadoProc<List<${entityName}>> salida = ${entityNameFirstLetterToLowerCase}Service.findAllActive();
			return new ResponseEntity<ResultadoProc<List<${entityName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodfindAllPaginatedBySearch(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return `@PostMapping("/page-all-by-search")
		public ResponseEntity<ResultadoProc<Page<${entityName}>>> findAllPaginatedBySearch(
				@RequestBody SearchPagination<String> searchPagination) {
			PageRequest pageable = searchPagination.getPageRequest();
			String search = searchPagination.getSeek();
			ResultadoProc<Page<${entityName}>> salida = ${entityNameFirstLetterToLowerCase}Service.findAllPaginatedBySearch(search,
				pageable);
			return new ResponseEntity<ResultadoProc<Page<${entityName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return `@PostMapping
	public ResponseEntity<ResultadoProc<${entityName}>> save(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.save(${entityNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return `@PutMapping
	public ResponseEntity<ResultadoProc<${entityName}>> update(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.update(${entityNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodChangeState(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return ``;
}

function insertMethodDelete(entityName: string, entityNameFirstLetterToLowerCase: string) {
	return ``;
}