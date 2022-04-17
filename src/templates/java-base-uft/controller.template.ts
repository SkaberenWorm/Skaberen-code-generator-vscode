import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { snakeCaseRequestMapping, toLowerCaseFirstLetter } from '../../utils/utils';

export function getControllerTemplate(
	entityName: string,
	packageExceptions: string,
	packageController: string,
	packageEntity: string,
	packageUtil: string,
	packageIService: string,
	typeVariableID: string,
	methods: Array<Checkbox>,
	useUtilClass: boolean,
	useResultProc: boolean,
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

${useResultProc ? `import ${useUtilClass ? packageUtil + '.ResultadoProc;' : 'cl.uft.commons.model.ResultadoProc;'}` : ''}
import ${useUtilClass ? packageUtil + '.SearchPagination;' : 'cl.uft.commons.model.SearchPagination;'}
import ${packageEntity}.${entityName};
${!useResultProc ? `import ${packageExceptions}.EntityNotFoundException;\nimport ${packageExceptions}.ErrorProcessingException;\nimport ${packageExceptions}.UnsavedEntityException;` : ''}
import ${packageIService}.I${entityName}Service;

@RestController
@RequestMapping("/api/${snakeCaseRequestMapping(entityName)}")
public class ${entityName}RestController {

	@Autowired
	I${entityName}Service ${entityNameFirstLetterToLowerCase}Service;
${insertMethods(entityName, entityNameFirstLetterToLowerCase, typeVariableID, methods, useResultProc)}
}`;

	return template;
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
		return `@GetMapping("/{id}")
	public ResponseEntity<ResultadoProc<${entityName}>> findById(@PathVariable("id") ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.findById(${entityNameFirstLetterToLowerCase}Id);
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
	}
	return `@GetMapping("/{id}")
	public ResponseEntity<${entityName}> findById(@PathVariable("id") ${typeVariableID} ${entityNameFirstLetterToLowerCase}Id) throws ErrorProcessingException, EntityNotFoundException {
		${entityName} salida = ${entityNameFirstLetterToLowerCase}Service.findById(${entityNameFirstLetterToLowerCase}Id);
		return new ResponseEntity<${entityName}>(salida, HttpStatus.OK);
	}`;
}

function insertMethodfindAll(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

	if (!useResultProc) {
		return `@GetMapping("/find-all")
		public ResponseEntity<List<${entityName}>> findAll() throws ErrorProcessingException {
			List<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.findAll();
			return new ResponseEntity<List<${entityName}>>(salida, HttpStatus.OK);
		}`;
	}

	return `@GetMapping("/find-all")
		public ResponseEntity<ResultadoProc<List<${entityName}>>> findAll() {
			ResultadoProc<List<${entityName}>> salida = ${entityNameFirstLetterToLowerCase}Service.findAll();
			return new ResponseEntity<ResultadoProc<List<${entityName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodfindAllActive(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

	if (!useResultProc) {
		return `@GetMapping("/find-all-active")
		public ResponseEntity<List<${entityName}>> findAllActive() throws ErrorProcessingException {
			List<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.findAllActive();
			return new ResponseEntity<List<${entityName}>>(salida, HttpStatus.OK);
		}`;
	}

	return `@GetMapping("/find-all-active")
		public ResponseEntity<ResultadoProc<List<${entityName}>>> findAllActive() {
			ResultadoProc<List<${entityName}>> salida = ${entityNameFirstLetterToLowerCase}Service.findAllActive();
			return new ResponseEntity<ResultadoProc<List<${entityName}>>>(salida, HttpStatus.OK);
		}`;
}

function insertMethodfindAllPaginatedBySearch(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

	if (!useResultProc) {
		return `@PostMapping("/page-all-by-search")
		public ResponseEntity<Page<${entityName}>> findAllPaginatedBySearch(
				@RequestBody SearchPagination<String> searchPagination) throws ErrorProcessingException {
			PageRequest pageable = searchPagination.getPageRequest();
			String search = searchPagination.getSeek();
			Page<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.findAllPaginatedBySearch(search,
				pageable);
			return new ResponseEntity<Page<${entityName}>>(salida, HttpStatus.OK);
		}`;
	}

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

function insertMethodSave(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

	if (!useResultProc) {
		return `@PostMapping
		public ResponseEntity<${entityName}> save(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException {
			${entityName} salida = ${entityNameFirstLetterToLowerCase}Service.save(${entityNameFirstLetterToLowerCase});
			return new ResponseEntity<${entityName}>(salida, HttpStatus.OK);
		}`;
	}

	return `@PostMapping
	public ResponseEntity<ResultadoProc<${entityName}>> save(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.save(${entityNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
}

function insertMethodUpdate(entityName: string, entityNameFirstLetterToLowerCase: string, useResultProc: boolean) {

	if (!useResultProc) {
		return `@PutMapping
		public ResponseEntity<${entityName}> update(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) throws UnsavedEntityException {
			${entityName} salida = ${entityNameFirstLetterToLowerCase}Service.update(${entityNameFirstLetterToLowerCase});
			return new ResponseEntity<${entityName}>(salida, HttpStatus.OK);
		}`;
	}

	return `@PutMapping
	public ResponseEntity<ResultadoProc<${entityName}>> update(@RequestBody ${entityName} ${entityNameFirstLetterToLowerCase}) {
		ResultadoProc<${entityName}> salida = ${entityNameFirstLetterToLowerCase}Service.update(${entityNameFirstLetterToLowerCase});
		return new ResponseEntity<ResultadoProc<${entityName}>>(salida, HttpStatus.OK);
	}`;
}

