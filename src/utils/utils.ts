import * as lodash from 'lodash';
import mkdirp = require('mkdirp');
import { OpenDialogOptions, window } from 'vscode';

export function generatedVersionUID(): string {
    let generatedVersionUID = Math.random().toString().replace(new RegExp('0.', 'g'), '');
    generatedVersionUID += Math.random().toString().replace(new RegExp('0.', 'g'), '');
    generatedVersionUID += Math.random().toString().replace(new RegExp('0.', 'g'), '');
    generatedVersionUID = generatedVersionUID.substring(0, 18) + 'L';
    console.log(generatedVersionUID);
    return generatedVersionUID;
}

export function createDirectory(targetDirectory: string): Promise<void> {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}

export async function promptForTargetDirectory(): Promise<string | undefined> {
    const options: OpenDialogOptions = {
        canSelectMany: false,
        openLabel: "Seleccione el package base del proyecto",
        canSelectFolders: true,
    };

    return window.showOpenDialog(options).then((uri) => {
        if (lodash.isNil(uri) || lodash.isEmpty(uri)) {
            return undefined;
        }
        return uri[0].fsPath;
    });
}