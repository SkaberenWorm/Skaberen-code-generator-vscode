import Checkbox from './checkbox';

export enum METHOD {
    empty,
    findById,
    findAll,
    findAllActive,
    save,
    update,
    findAllPaginatedBySearch,
    changeState,
    delete
}

export const methods: Array<Checkbox> = [
    { checked: true, method: METHOD.findById, methodName: 'findById', description: 'Retrieves an entity __ENTITY__ by its id.' },
    { checked: true, method: METHOD.findAll, methodName: 'findAll', description: 'Returns all instances of the type __ENTITY__.' },
    { checked: true, method: METHOD.findAllActive, methodName: 'findAllActive', description: 'Returns all active instances of the type __ENTITY__.' },
    { checked: true, method: METHOD.save, methodName: 'save', description: 'Saves a given entity __ENTITY__.' },
    { checked: true, method: METHOD.update, methodName: 'update', description: 'Updates a given entity __ENTITY__.' },
    { checked: true, method: METHOD.findAllPaginatedBySearch, methodName: 'findAllPaginatedBySearch', description: 'Returns all paged instances of the __ENTITY__ type that match the search.' },
    { checked: false, method: METHOD.changeState, methodName: 'changeState', description: 'changes the status of a __ENTITY__ entity' },
    { checked: false, method: METHOD.delete, methodName: 'delete', description: 'Deletes a given entity.' },
];


export function methodNameToMethodEnum(methodName: string) {
    switch (methodName) {
        case 'findById':
            return METHOD.findById;
        case 'findAll':
            return METHOD.findAll;
        case 'findAllActive':
            return METHOD.findAllActive;
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