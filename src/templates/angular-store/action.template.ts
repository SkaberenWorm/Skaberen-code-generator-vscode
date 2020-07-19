import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';

export function getActionsTemplate(
  fileName: string,
  modelName: string,
  methods: Array<Checkbox>
): string {

  const typePrefix = fileName.toUpperCase().replace(new RegExp('-', 'g'), ' ');

  return `import { createAction, props } from '@ngrx/store';
//import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
${insertMethods(typePrefix, modelName, methods)}
  `;
}


function insertMethods(typePrefix: string, modelName: string, methods: Array<Checkbox>) {
  let code = '';
  methods.forEach(method => {
    if (method.checked) {
      switch (method.method) {
        case METHOD.findById:
          code += '\n\n';
          code += insertMethodFindById(typePrefix, modelName);
          break;
        case METHOD.findAllPaginatedBySearch:
          code += '\n\n';
          code += insertMethodfindAllPaginatedBySearch(typePrefix, modelName);
          break;
        case METHOD.save:
          code += '\n\n';
          code += insertMethodSave(typePrefix, modelName);
          break;
        case METHOD.update:
          code += '\n\n';
          code += insertMethodUpdate(typePrefix, modelName);
          break;
        case METHOD.changeState:
          code += '\n\n';
          code += insertMethodChangeState(typePrefix, modelName);
          break;
        case METHOD.delete:
          code += '\n\n';
          code += insertMethodDelete(typePrefix, modelName);
          break;
      }
    }

  });
  return code;
}


function insertMethodFindById(typePrefix: string, modelName: string) {
  return `export const busar${modelName} = createAction(
    '[${typePrefix}] busar por ID',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const busar${modelName}Success = createAction(
    '[${typePrefix}] busar por ID success',
    props<{ respuesta: ${modelName} }>()
);
export const busar${modelName}Fail = createAction(
    '[${typePrefix}] busar por ID fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodfindAllPaginatedBySearch(typePrefix: string, modelName: string) {
  return `export const listar${modelName}Paginado = createAction(
    '[${typePrefix}] listar paginado',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const listar${modelName}PaginadoSuccess = createAction(
    '[${typePrefix}] listar paginado success',
    props<{ respuesta: IPaginacion<${modelName}> }>()
);
export const listar${modelName}PaginadoFail = createAction(
    '[${typePrefix}] listar paginado fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodSave(typePrefix: string, modelName: string) {
  return `export const guardar${modelName} = createAction(
    '[${typePrefix}] guardar ${modelName}',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const guardar${modelName}Success = createAction(
    '[${typePrefix}] guardar ${modelName} success',
    props<{ respuesta: ${modelName} }>()
);
export const guardar${modelName}Fail = createAction(
    '[${typePrefix}] guardar ${modelName} fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodUpdate(typePrefix: string, modelName: string) {
  return `export const actualizar${modelName} = createAction(
    '[${typePrefix}] Actualizar ${modelName}',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const actualizar${modelName}Success = createAction(
    '[${typePrefix}] Actualizar ${modelName} success',
    props<{ respuesta: ${modelName} }>()
);
export const actualizar${modelName}Fail = createAction(
    '[${typePrefix}] Actualizar ${modelName} fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodChangeState(typePrefix: string, modelName: string) {
  return `export const cambiarEstado${modelName} = createAction(
    '[${typePrefix}] cambiar estado',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const cambiarEstado${modelName}Success = createAction(
    '[${typePrefix}] cambiar estado success',
    props<{ respuesta: ${modelName} }>()
);
export const cambiarEstado${modelName}Fail = createAction(
    '[${typePrefix}] cambiar estado fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodDelete(typePrefix: string, modelName: string) {
  return `export const eliminar${modelName} = createAction(
    '[${typePrefix}] Eliminar ${modelName}',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const eliminar${modelName}Success = createAction(
    '[${typePrefix}] Eliminar ${modelName} success',
    props<{ respuesta: boolean }>()
);
export const eliminar${modelName}Fail = createAction(
    '[${typePrefix}] Eliminar ${modelName} fail',
    props<{ mensaje: string }>()
);`;
}
