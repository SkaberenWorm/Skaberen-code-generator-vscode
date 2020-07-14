import Checkbox from './checkbox';

export enum METHOD {
    empty,
    findById,
    save,
    update,
    findAllPaginatedBySearch,
    changeState,
    delete
}

export const methods: Array<Checkbox> = [
    { checked: true, method: METHOD.findById, methodName: 'findById', description: 'Busca un(a) __ENTITY__ por su identificador' },
    { checked: true, method: METHOD.save, methodName: 'save', description: 'Guarda un(a) __ENTITY__' },
    { checked: true, method: METHOD.update, methodName: 'update', description: 'Actualiza un(a) __ENTITY__' },
    { checked: true, method: METHOD.findAllPaginatedBySearch, methodName: 'findAllPaginatedBySearch', description: 'Lista una página de __ENTITY__s que coincidan con el texto buscado' },
    { checked: false, method: METHOD.changeState, methodName: 'changeState', description: 'Cambia el estado de un(a) __ENTITY__s' },
    { checked: false, method: METHOD.delete, methodName: 'delete', description: 'Elimina un(a) __ENTITY__ permanentemente' },
];


export function methodNameToMethodEnum(methodName: string) {
    switch (methodName) {
        case 'findById':
            return METHOD.findById;
        case 'save':
            return METHOD.save;
        case 'update':
            return METHOD.update;
        case 'findAllPaginatedBySearch':
            return METHOD.findAllPaginatedBySearch;
        case 'changeState':
            return METHOD.changeState;
        case 'delete':
            return METHOD.delete;
        default:
            return METHOD.empty;
    }
}