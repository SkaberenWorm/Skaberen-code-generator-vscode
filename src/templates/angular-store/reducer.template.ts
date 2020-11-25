import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { removeWordModel } from '../../utils/utils';

export function getReducersTemplate(
  fileName: string,
  modelName: string,
  methods: Array<Checkbox>
): string {

  const typePrefix = fileName.toUpperCase().replace(new RegExp('-', 'g'), ' ');

  const modelNameVar = removeWordModel(modelName.substring(0, 1).toLowerCase() + modelName.substring(1, modelName.length));

  return `import { Action, createReducer, on } from '@ngrx/store';
import { ${modelName} } from 'src/app/commons/models/${removeWordModel(fileName)}.model';

import * as fromActions from '../actions/${removeWordModel(fileName)}.actions';
  
${insertInterfaceState(modelName, modelNameVar)}
  ${insertMethods(typePrefix, modelName, modelNameVar, methods)}`;
}


function insertMethods(typePrefix: string, modelName: string, modelNameVar: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n';
          code += insertMethodFindById(modelName, modelNameVar);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n';
          code += insertMethodfindAllPaginatedBySearch(modelName);
          break;
        case METHOD.save:
          code += '\n\n';
          code += insertMethodSave(modelName, modelNameVar);
          break;
        case METHOD.update:
          code += '\n\n';
          code += insertMethodUpdate(modelName, modelNameVar);
          break;
        case METHOD.changeState:
          code += '\n\n';
          code += insertMethodChangeState(modelName, modelNameVar);
          break;
        case METHOD.delete:
          code += '\n\n';
          code += insertMethodDelete(modelName);
          break;
      }
    }

  });
  code += `
);

export function ${modelNameVar}Reucer(state: ${removeWordModel(modelName)}State | undefined, action: Action) {
  return _${modelNameVar}Reducer(state, action);
}`;
  return code;
}

function insertInterfaceState(modelName: string, modelNameVar: string) {
  return `export interface ${removeWordModel(modelName)}State {
  loading: boolean;
  listado${removeWordModel(modelName)}: IPaginacion<${modelName}>;
  ${modelNameVar}: ${modelName};
  success: string;
  error: string;
  saving: boolean;
  saved: boolean;
  deleted: boolean;
}

const initState: ${removeWordModel(modelName)}State = {
  loading: false,
  listado${removeWordModel(modelName)}: null,
  ${modelNameVar}: null,
  success: null,
  error: null,
  saving: false,
  saved: false,
  deleted: false,
};

const _${modelNameVar}Reducer = createReducer(initState,`;
}


function insertMethodFindById(modelName: string, modelNameVal: string) {
  return `  on(fromActions.buscar${removeWordModel(modelName)}, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    deleted: false,
  })),
  on(fromActions.buscar${removeWordModel(modelName)}Success, (state, { respuesta, mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
  })),
  on(fromActions.buscar${removeWordModel(modelName)}Fail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}

function insertMethodfindAllPaginatedBySearch(modelName: string,) {
  return `  on(fromActions.listar${removeWordModel(modelName)}Paginado, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: true,
    error: null,
    success: null,
    saved: false,
    deleted: false,
    listado${removeWordModel(modelName)}: null,
  })),
  on(fromActions.listar${removeWordModel(modelName)}PaginadoSuccess, (state, { respuesta }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    listado${removeWordModel(modelName)}: respuesta,
  })),
  on(fromActions.listar${removeWordModel(modelName)}PaginadoFail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}

function insertMethodSave(modelName: string, modelNameVal: string) {
  return `  on(fromActions.guardar${removeWordModel(modelName)}, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.guardar${removeWordModel(modelName)}Success, (state, { respuesta, mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.guardar${removeWordModel(modelName)}Fail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodUpdate(modelName: string, modelNameVal: string) {
  return `  on(fromActions.actualizar${removeWordModel(modelName)}, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.actualizar${removeWordModel(modelName)}Success, (state, { respuesta, mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.actualizar${removeWordModel(modelName)}Fail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodChangeState(modelName: string, modelNameVal: string) {
  return `  on(fromActions.cambiarEstado${removeWordModel(modelName)}, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.cambiarEstado${removeWordModel(modelName)}Success, (state, { respuesta, mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.cambiarEstado${removeWordModel(modelName)}Fail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodDelete(modelName: string) {
  return `  on(fromActions.eliminar${removeWordModel(modelName)}, (state): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: true,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.eliminar${removeWordModel(modelName)}Success, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    success: mensaje,
    deleted: true,
  })),
  on(fromActions.eliminar${removeWordModel(modelName)}Fail, (state, { mensaje }): ${removeWordModel(modelName)}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}


