import * as changeCase from 'change-case';
import { existsSync, lstatSync } from 'fs';
import * as lodash from 'lodash';
import { InputBoxOptions, QuickPickItem, Uri, window } from 'vscode';

import Checkbox from '../models/checkbox';
import { methods } from '../models/method-actions';
import ParamMethodJava from '../models/param-method-java';
import {
  createController,
  createEntity,
  createIService,
  createRepository,
  createService,
} from '../utils/generate-code-java-uft.utils';
import { createDirectory, promptForTargetDirectory } from '../utils/utils';

export const generateCodeJavaBase = async (uri: Uri) => {

  let targetDirectory;
  if (lodash.isNil(lodash.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      window.showErrorMessage("Por favor seleccione un directorio válido");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  const entityName = await promptForEntityName();
  if (lodash.isNil(entityName) || entityName.trim() === "") {
    window.showErrorMessage("El nombre de la clase no debe estar vacía");
    return;
  }

  let typeVariableID = await window.showQuickPick(['int', 'long', 'String', 'otro'], {
    placeHolder: 'Tipo de variable del identificador',
    // onDidSelectItem: item => window.showInformationMessage(`Focus ${++i}: ${item}`)
  });

  if (typeVariableID === 'otro' || typeVariableID === undefined) {
    typeVariableID = await promptForTypeVariable();
    if (lodash.isNil(typeVariableID) || typeVariableID.trim() === "") {
      window.showErrorMessage("El tipo de variable no es válido");
      return;
    }
  }

  // let methodsSelected: Array<Checkbox> = [];
  const allCheckboxes: Array<Checkbox> = methods;
  const snakeCaseEntityName = changeCase.snakeCase(entityName.toLowerCase());

  await showQuickPickMethods(allCheckboxes, snakeCaseEntityName).then(methods => {
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

  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  try {
    await generateAllCode(entityName, targetDirectory, typeVariableID, allCheckboxes);
    window.showInformationMessage(
      `Exito! Código ${pascalCaseEntityName} generado correctamente`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

function promptForEntityName(): Thenable<string | undefined> {
  const entityNamePromptOptions: InputBoxOptions = {
    prompt: "Nombre Entidad",
    placeHolder: "Ej: Usuario",
  };
  return window.showInputBox(entityNamePromptOptions);
}

function promptForTypeVariable(): Thenable<string | undefined> {
  const entityNamePromptOptions: InputBoxOptions = {
    prompt: "Tipo de variable del identificador",
    placeHolder: "Ej: long",
  };
  return window.showInputBox(entityNamePromptOptions);
}

async function generateAllCode(entityName: string, targetDirectory: string, typeVariableID: string, methodsSelected: Array<Checkbox>) {
  if (!existsSync(`${targetDirectory}/entities`)) {
    await createDirectory(`${targetDirectory}/entities`);
  }
  if (!existsSync(`${targetDirectory}/controllers`)) {
    await createDirectory(`${targetDirectory}/controllers`);
  }
  if (!existsSync(`${targetDirectory}/repositories`)) {
    await createDirectory(`${targetDirectory}/repositories`);
  }
  if (!existsSync(`${targetDirectory}/services`)) {
    await createDirectory(`${targetDirectory}/services`);
  }
  if (!existsSync(`${targetDirectory}/services/impl`)) {
    await createDirectory(`${targetDirectory}/services/impl`);
  }

  const data: ParamMethodJava = new ParamMethodJava({
    entityName: entityName,
    targetDirectory: targetDirectory,
    typeVariableID: typeVariableID,
    methodsSelected: methodsSelected,
  });
  await Promise.all([
    createEntity(data),
    createIService(data),
    createService(data),
    createController(data),
    createRepository(data),
  ]);
}



const showQuickPickMethods = (checkboxes: Checkbox[], snakeCaseEntityName: string) => {
  const pickItems: QuickPickItem[] = checkboxes.map(checkbox => {
    return {
      description: checkbox.description.replace('__ENTITY__', snakeCaseEntityName),
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



