import Checkbox from './checkbox';

export default class ParamMethodJava {
    entityName: string = '';
    targetDirectory: string = '';
    typeVariableID: string = '';
    methodsSelected: Array<Checkbox> = [];
    sexEntity: string = '';

    constructor(fields?: {
        entityName: string;
        targetDirectory: string;
        typeVariableID: string;
        methodsSelected: Array<Checkbox>;
        sexEntity: string;
    }) {
        if (fields) { Object.assign(this, fields); }
    }

}
