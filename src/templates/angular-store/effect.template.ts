import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { removeWordModel, toLowerCaseFirstLetter } from '../../utils/utils';

export function getEffectsTemplate(
	fileName: string,
	modelName: string,
	methods: Array<Checkbox>
): string {

	return `import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ${removeWordModel(modelName)}Service } from 'src/app/commons/services/${removeWordModel(fileName)}.service';

import * as ${removeWordModel(fileName)}Actions from '../actions/${removeWordModel(fileName)}.actions';

@Injectable()
export class ${removeWordModel(modelName)}Effects {
    constructor(
        private actions$: Actions,
        private ${removeWordModel(fileName)}Service: ${removeWordModel(modelName)}Service,
        private toastr: ToastrService,
    ) { }
${insertMethods(modelName, methods)}

}`;
}


function insertMethods(modelName: string, methods: Array<Checkbox>) {
	let code = '';
	methods.forEach(method => {
		if (method.checked) {
			switch (method.method) {
				case METHOD.findById:
					code += '\n\n';
					code += insertMethodFindById(modelName);
					break;
				case METHOD.findAllPaginatedBySearch:
					code += '\n\n';
					code += insertMethodfindAllPaginatedBySearch(modelName);
					break;
				case METHOD.save:
					code += '\n\n';
					code += insertMethodSave(modelName);
					break;
				case METHOD.update:
					code += '\n\n';
					code += insertMethodUpdate(modelName);
					break;
				case METHOD.changeState:
					code += '\n\n';
					code += insertMethodChangeState(modelName);
					break;
				case METHOD.delete:
					code += '\n\n';
					code += insertMethodDelete(modelName);
					break;
			}
		}

	});
	return code;
}


function insertMethodFindById(modelName: string) {
	const modelNameSinModel = removeWordModel(modelName);
	return `
    buscar${modelNameSinModel}$ = createEffect(() =>
        this.actions$.pipe(
            ofType(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.buscar${modelNameSinModel}),
            exhaustMap(action =>
                this.${toLowerCaseFirstLetter(modelNameSinModel)}Service.findById(action.${toLowerCaseFirstLetter(modelNameSinModel)}Id).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.buscar${modelNameSinModel}Fail({ mensaje: resul.mensaje });
                        } else {
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.buscar${modelNameSinModel}Success({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('${modelNameSinModel}: Se produjo un error inesperado al intentar buscar');
                        return of(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.buscar${modelNameSinModel}Fail({ mensaje: error }));
                    })
                )
            )
        )
    );`;
}

function insertMethodfindAllPaginatedBySearch(modelName: string) {
	const modelNameSinModel = removeWordModel(modelName);
	return `
    listar${modelNameSinModel}Paginado$ = createEffect(() =>
        this.actions$.pipe(
            ofType(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.listar${modelNameSinModel}Paginado),
            exhaustMap(action =>
                this.${toLowerCaseFirstLetter(modelNameSinModel)}Service.findAllPaginatedWithSearch(action.searchPagination).pipe(
                    map(resul => {
                        if (resul['error']) {
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.listar${modelNameSinModel}PaginadoFail({ mensaje: resul.mensaje });
                        } else {
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.listar${modelNameSinModel}PaginadoSuccess({ respuesta: resul.resultado });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('${modelNameSinModel}: Se produjo un error inesperado al intentar listar');
                        return of(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.listar${modelNameSinModel}PaginadoFail({ mensaje: error }));
                    })
                )
            )
        )
    );`;
}

function insertMethodSave(modelName: string) {
	const modelNameSinModel = removeWordModel(modelName);
	return `
    guardar${modelNameSinModel}$ = createEffect(() =>
        this.actions$.pipe(
            ofType(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.guardar${modelNameSinModel}),
            exhaustMap(action =>
                this.${toLowerCaseFirstLetter(modelNameSinModel)}Service.save(action.${toLowerCaseFirstLetter(modelNameSinModel)}).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.guardar${modelNameSinModel}Fail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.guardar${modelNameSinModel}Success({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('${modelNameSinModel}: Se produjo un error inesperado al intentar registrar');
                        return of(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.guardar${modelNameSinModel}Fail({ mensaje: error }));
                    })
                )
            )
        )
    );`;
}

function insertMethodUpdate(modelName: string) {
	const modelNameSinModel = removeWordModel(modelName);
	return `
    actualizar${modelNameSinModel}$ = createEffect(() =>
        this.actions$.pipe(
            ofType(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.actualizar${modelNameSinModel}),
            exhaustMap(action =>
                this.${toLowerCaseFirstLetter(modelNameSinModel)}Service.update(action.${toLowerCaseFirstLetter(modelNameSinModel)}).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.actualizar${modelNameSinModel}Fail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.actualizar${modelNameSinModel}Success({ respuesta: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('${modelNameSinModel}: Se produjo un error inesperado al intentar actualizar');
                        return of(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.actualizar${modelNameSinModel}Fail({ mensaje: error }));
                    })
                )
            )
        )
    );`;
}

function insertMethodChangeState(modelName: string) {
	const modelNameSinModel = removeWordModel(modelName);
	return `
    cambiarEstado${modelNameSinModel}$ = createEffect(() =>
        this.actions$.pipe(
            ofType(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.cambiarEstado${modelNameSinModel}),
            exhaustMap(action =>
                this.${toLowerCaseFirstLetter(modelNameSinModel)}Service.changeState(action.${toLowerCaseFirstLetter(modelNameSinModel)}Id).pipe(
                    map(resul => {
                        if (resul['error']) {
                            this.toastr.error(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.cambiarEstado${modelNameSinModel}Fail({ mensaje: resul.mensaje });
                        } else {
                            this.toastr.success(resul.mensaje);
                            return ${toLowerCaseFirstLetter(modelNameSinModel)}Actions.cambiarEstado${modelNameSinModel}Success({ ${toLowerCaseFirstLetter(modelNameSinModel)}: resul.resultado, mensaje: resul.mensaje });
                        }
                    }),
                    catchError(error => {
                        this.toastr.error('${modelNameSinModel}: Se produjo un error inesperado al intentar cambiar el estado');
                        return of(${toLowerCaseFirstLetter(modelNameSinModel)}Actions.cambiarEstado${modelNameSinModel}Fail({ mensaje: error }));
                    })
                )
            )
        )
    );`;
}

function insertMethodDelete(modelName: string) {
	return ``;
}


