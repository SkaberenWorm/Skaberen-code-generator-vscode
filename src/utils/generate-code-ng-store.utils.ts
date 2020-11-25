import { existsSync, writeFile } from 'fs';

import ParamMethodNgStore from '../models/param-method-ng-store';
import { getActionsTemplate } from '../templates/angular-store/action.template';
import { getEffectsTemplate } from '../templates/angular-store/effect.template';
import { getReducersTemplate } from '../templates/angular-store/reducer.template';
import { removeWordModel } from './utils';


export function createAction(data: ParamMethodNgStore) {

    const targetDirectory = data.targetDirectory;

    const targetPath = `${targetDirectory}/actions/${removeWordModel(data.fileName)}.actions.ts`;

    if (existsSync(targetPath)) {
        throw Error(`${removeWordModel(data.fileName)}.actions.ts ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getActionsTemplate(
                data.fileName,
                data.modelName,
                data.methodsSelected
            ),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

export function createReducer(data: ParamMethodNgStore) {

    const targetDirectory = data.targetDirectory;

    const targetPath = `${targetDirectory}/reducers/${removeWordModel(data.fileName)}.reducers.ts`;

    if (existsSync(targetPath)) {
        throw Error(`${removeWordModel(data.fileName)}.reducers.ts ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getReducersTemplate(
                data.fileName,
                data.modelName,
                data.methodsSelected
            ),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}

export function createEffect(data: ParamMethodNgStore) {

    const targetDirectory = data.targetDirectory;

    const targetPath = `${targetDirectory}/effects/${removeWordModel(data.fileName)}.effects.ts`;

    if (existsSync(targetPath)) {
        throw Error(`${removeWordModel(data.fileName)}.effects.ts ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getEffectsTemplate(
                data.fileName,
                data.modelName,
                data.methodsSelected
            ),
            "utf8",
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            }
        );
    });
}
