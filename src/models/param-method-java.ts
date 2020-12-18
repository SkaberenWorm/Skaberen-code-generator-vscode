import Checkbox from './checkbox';

export default class ParamMethodJava {
    entityName: string = '';
    targetDirectory: string = '';
    typeVariableID: string = '';
    methodsSelected: Array<Checkbox> = [];
    useUtilClass: boolean = true;

    constructor(fields?: {
        entityName: string;
        targetDirectory: string;
        typeVariableID: string;
        methodsSelected: Array<Checkbox>;
        useUtilClass: boolean;
    }) {
        if (fields) { Object.assign(this, fields); }
    }

}
