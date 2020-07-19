import Checkbox from './checkbox';

export default class ParamMethodJava {
    entityName: string = '';
    targetDirectory: string = '';
    typeVariableID: string = '';
    methodsSelected: Array<Checkbox> = [];

    constructor(fields?: {
        entityName: string;
        targetDirectory: string;
        typeVariableID: string;
        methodsSelected: Array<Checkbox>;
    }) {
        if (fields) { Object.assign(this, fields); }
    }

}
