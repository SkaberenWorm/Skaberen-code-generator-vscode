import { existsSync, lstatSync } from 'fs';
import * as lodash from 'lodash';
import { InputBoxOptions, QuickPickItem, Uri, window } from 'vscode';

import Checkbox from '../models/checkbox';
import { methods } from '../models/method-actions';
import ParamMethodNgStore from '../models/param-method-ng-store';
import { createAction, createEffect, createReducer } from '../utils/generate-code-ng-store.utils';
import { createDirectory, promptForTargetDirectory } from '../utils/utils';

export const generateCodeAngularStore = async (uri: Uri) => {

  let targetDirectory: string | undefined;
  if (lodash.isNil(lodash.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      window.showErrorMessage("Por favor seleccione un directorio válido");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  if (targetDirectory !== undefined && targetDirectory.indexOf('store') === -1) {
    window.showErrorMessage("Debe estar en la carpeta store");
    return;
  }
  let modelName = await promptForFileName();
  if (lodash.isNil(modelName) || modelName.trim() === "") {
    window.showErrorMessage("El nombre del modelo no debe estar vacío");
    return;
  }

  const allCheckboxes: Array<Checkbox> = methods;

  await showQuickPickMethods(allCheckboxes, modelName).then(methods => {
    allCheckboxes.forEach(checkBox => {
      checkBox.checked = false;
    });
    methods?.forEach(methodQuickPick => {
      allCheckboxes.forEach(methodCheckbox => {
        if (methodCheckbox.methodName.trim() === methodQuickPick.label.trim()) {
          methodCheckbox.checked = true;
        }
      });
    });
  }
  );

  try {
    let fileName = '';
    let i = 0;
    let character = '';
    while (i <= modelName.length) {
      character = modelName.charAt(i);
      if (character === character.toUpperCase()) {
        if (i === 0 || i === modelName.length) {
          fileName += character.toLowerCase();
        } else {
          fileName += '-' + character.toLowerCase();
        }
      } else {
        fileName += character.toLowerCase();
      }
      i++;
    }

    await generateAllCode(modelName, fileName, targetDirectory, allCheckboxes);
    window.showInformationMessage(
      `Exito! Código generado correctamente`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForFileName(): Thenable<string | undefined> {
  const fileNamePromptOptions: InputBoxOptions = {
    prompt: "Nombre del modelo",
    placeHolder: "Ej: UsuarioModel",
  };
  return window.showInputBox(fileNamePromptOptions);
}


async function generateAllCode(modelName: string, fileName: string, targetDirectory: string, methodsSelected: Array<Checkbox>) {
  if (!existsSync(`${targetDirectory}/actions`)) {
    await createDirectory(`${targetDirectory}/actions`);
  }
  if (!existsSync(`${targetDirectory}/effects`)) {
    await createDirectory(`${targetDirectory}/effects`);
  }
  if (!existsSync(`${targetDirectory}/reducers`)) {
    await createDirectory(`${targetDirectory}/reducers`);
  }
  const data: ParamMethodNgStore = new ParamMethodNgStore({
    fileName: fileName,
    modelName: modelName,
    targetDirectory: targetDirectory,
    methodsSelected: methodsSelected,
  });
  console.log("data", data);
  await Promise.all([
    createAction(data),
    createEffect(data),
    createReducer(data)
  ]);
}



const showQuickPickMethods = (checkboxes: Checkbox[], fileName: string) => {
  const pickItems: QuickPickItem[] = checkboxes.map(checkbox => {
    return {
      description: checkbox.description.replace('__ENTITY__', fileName.replace('/-/', ' ').replace('/_/', ' ')),
      picked: checkbox.checked,
      label: checkbox.methodName.trim(),
    } as QuickPickItem;
  }
  );

  return window.showQuickPick(
    pickItems,
    {
      placeHolder: 'Seleccione métodos',
      ignoreFocusOut: false,
      matchOnDescription: true,
      canPickMany: true,
    }
  );
};



