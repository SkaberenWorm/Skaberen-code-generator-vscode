

export default class Checkbox {
    checked: boolean = false;
    methodName: string = '';
    description: string = '';
    method: number = 0;

    constructor(fields?: {
        checked: boolean;
        methodName: string;
        description: string;
        method: number;
    }) {
        if (fields) { Object.assign(this, fields); }
    }

}
