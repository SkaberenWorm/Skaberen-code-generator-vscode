import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getReducersTemplate(
  fileName: string,
  modelName: string,
  methods: Array<Checkbox>
): string {

  const typePrefix = fileName.toUpperCase().replace(new RegExp('-', 'g'), ' ');

  const modelNameVar = modelName.substring(0, 1).toLowerCase() + modelName.substring(1, modelName.length);

  return `import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/${fileName}.actions';
  
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
  return code;
}

function insertInterfaceState(modelName: string, modelNameVar: string) {
  return `export interface ${modelName}State {
    loading: boolean;
    listado${modelName}: Array<${modelName}Model>;
    ${modelNameVar}: ${modelName}Model;
    success: string;
    error: string;
    saving: boolean;
    saved: boolean;
    deleted: boolean;
  }
  
  const initState: ${modelName}State = {
    loading: false,
    listado${modelName}: null,
    ${modelNameVar}: null,
    success: null,
    error: null,
    saving: false,
    saved: false,
    deleted: false,
  };`;
}


function insertMethodFindById(modelName: string, modelNameVal: string) {
  return `on(fromActions.buscar${modelName}, (state): ${modelName}State => ({
    ...state,
    loading: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    deleted: false,
  })),
  on(fromActions.buscar${modelName}Success, (state, { respuesta, mensaje }): ${modelName}State => ({
    ...state,
    loading: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
  })),
  on(fromActions.buscar${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}

function insertMethodfindAllPaginatedBySearch(modelName: string,) {
  return `on(fromActions.listar${modelName}, (state): ${modelName}State => ({
    ...state,
    loading: true,
    error: null,
    success: null,
    saved: false,
    deleted: false,
    listado${modelName}: null,
  })),
  on(fromActions.listar${modelName}Success, (state, { respuesta }): ${modelName}State => ({
    ...state,
    loading: false,
    listado${modelName}: respuesta,
  })),
  on(fromActions.listar${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}

function insertMethodSave(modelName: string, modelNameVal: string) {
  return `on(fromActions.guardar${modelName}, (state): ${modelName}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.guardar${modelName}Success, (state, { respuesta, mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.guardar${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodUpdate(modelName: string, modelNameVal: string) {
  return `on(fromActions.actualizar${modelName}, (state): ${modelName}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.actualizar${modelName}Success, (state, { respuesta, mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.actualizar${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodChangeState(modelName: string, modelNameVal: string) {
  return `on(fromActions.cambiarEstado${modelName}, (state): ${modelName}State => ({
    ...state,
    saving: true,
    ${modelNameVal}: null,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.cambiarEstado${modelName}Success, (state, { respuesta, mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    ${modelNameVal}: respuesta,
    success: mensaje,
    saved: true,
  })),
  on(fromActions.cambiarEstado${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    saving: false,
    error: mensaje
  })),`;
}

function insertMethodDelete(modelName: string) {
  return `
  on(fromActions.eliminar${modelName}, (state): ${modelName}State => ({
    ...state,
    loading: true,
    error: null,
    success: null,
    saved: false,
    deleted: false,
  })),
  on(fromActions.eliminar${modelName}Success, (state, { mensaje }): ${modelName}State => ({
    ...state,
    loading: false,
    success: mensaje,
    deleted: true,
  })),
  on(fromActions.eliminar${modelName}Fail, (state, { mensaje }): ${modelName}State => ({
    ...state,
    loading: false,
    error: mensaje
  })),`;
}


