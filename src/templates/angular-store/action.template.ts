import Checkbox from '../../models/checkbox';
import { METHOD } from '../../models/method-actions';
import { removeWordModel, toLowerCaseFirstLetter } from '../../utils/utils';

export function getActionsTemplate(
  fileName: string,
  modelName: string,
  methods: Array<Checkbox>
): string {

  const typePrefix = fileName.toUpperCase().replace(new RegExp('-', 'g'), ' ');

  return `import { createAction, props } from '@ngrx/store';
import { SearchPagination } from 'src/app/commons/interfaces/search.pagination';
import { ${modelName} } from 'src/app/commons/models/${removeWordModel(fileName)}.model';
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
  return `export const buscar${removeWordModel(modelName)} = createAction(
    '[${typePrefix}] Buscar por ID',
    props<{ ${toLowerCaseFirstLetter(removeWordModel(modelName))}Id: number }>()
);
export const buscar${removeWordModel(modelName)}Success = createAction(
    '[${typePrefix}] Buscar por ID success',
    props<{ respuesta: ${modelName}, mensaje: string }>()
);
export const buscar${removeWordModel(modelName)}Fail = createAction(
    '[${typePrefix}] Buscar por ID fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodfindAllPaginatedBySearch(typePrefix: string, modelName: string) {
  return `export const listar${removeWordModel(modelName)}Paginado = createAction(
    '[${typePrefix}] Listar paginado',
    props<{ searchPagination: SearchPagination<string> }>()
);
export const listar${removeWordModel(modelName)}PaginadoSuccess = createAction(
    '[${typePrefix}] Listar paginado success',
    props<{ respuesta: IPaginacion<${modelName}> }>()
);
export const listar${removeWordModel(modelName)}PaginadoFail = createAction(
    '[${typePrefix}] Listar paginado fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodSave(typePrefix: string, modelName: string) {
  return `export const guardar${removeWordModel(modelName)} = createAction(
    '[${typePrefix}] Guardar ${removeWordModel(modelName)}',
    props<{ ${toLowerCaseFirstLetter(removeWordModel(modelName))}: ${modelName} }>()
);
export const guardar${removeWordModel(modelName)}Success = createAction(
    '[${typePrefix}] Guardar ${removeWordModel(modelName)} success',
    props<{ respuesta: ${modelName}, mensaje: string}>()
);
export const guardar${removeWordModel(modelName)}Fail = createAction(
    '[${typePrefix}] Guardar ${removeWordModel(modelName)} fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodUpdate(typePrefix: string, modelName: string) {
  return `export const actualizar${removeWordModel(modelName)} = createAction(
    '[${typePrefix}] Actualizar ${removeWordModel(modelName)}',
    props<{ ${toLowerCaseFirstLetter(removeWordModel(modelName))}: ${modelName} }>()
);
export const actualizar${removeWordModel(modelName)}Success = createAction(
    '[${typePrefix}] Actualizar ${removeWordModel(modelName)} success',
    props<{ respuesta: ${modelName}, mensaje: string }>()
);
export const actualizar${removeWordModel(modelName)}Fail = createAction(
    '[${typePrefix}] Actualizar ${removeWordModel(modelName)} fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodChangeState(typePrefix: string, modelName: string) {
  return `export const cambiarEstado${modelName} = createAction(
    '[${typePrefix}] Cambiar estado',
    props<{ ${toLowerCaseFirstLetter(removeWordModel(modelName))}Id: number }>()
);
export const cambiarEstado${modelName}Success = createAction(
    '[${typePrefix}] Cambiar estado success',
    props<{ respuesta: ${modelName} }>()
);
export const cambiarEstado${modelName}Fail = createAction(
    '[${typePrefix}] Cambiar estado fail',
    props<{ mensaje: string }>()
);`;
}

function insertMethodDelete(typePrefix: string, modelName: string) {
  return `export const eliminar${modelName} = createAction(
    '[${typePrefix}] Eliminar ${modelName}',
    props<{ ${toLowerCaseFirstLetter(removeWordModel(modelName))}Id: number }>()
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
