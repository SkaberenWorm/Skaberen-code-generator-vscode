import Checkbox from './checkbox';

export default class ParamMethodNgStore {
    fileName: string = '';
    modelName: string = '';
    targetDirectory: string = '';
    methodsSelected: Array<Checkbox> = [];

    constructor(fields?: {
        fileName: string;
        modelName: string;
        targetDirectory: string;
        methodsSelected: Array<Checkbox>;
    }) {
        if (fields) { Object.assign(this, fields); }
    }

}
