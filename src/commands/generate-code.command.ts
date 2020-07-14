import * as changeCase from 'change-case';
import { existsSync, lstatSync } from 'fs';
import * as lodash from 'lodash';
import { InputBoxOptions, Uri, window } from 'vscode';

import {
  createController,
  createEntity,
  createIService,
  createRepository,
  createService,
} from '../utils/generate-code-utils';
import { createDirectory, promptForTargetDirectory } from '../utils/utils';

export const generateCode = async (uri: Uri) => {
  console.log('generateCode');
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

  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  try {
    await generateAllCode(entityName, targetDirectory, typeVariableID);
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

async function generateAllCode(entityName: string, targetDirectory: string, typeVariableID: string) {
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

  await Promise.all([
    createEntity(entityName, targetDirectory, typeVariableID),
    createIService(entityName, targetDirectory, typeVariableID),
    createService(entityName, targetDirectory, typeVariableID),
    createController(entityName, targetDirectory, typeVariableID),
    createRepository(entityName, targetDirectory, typeVariableID),
  ]);
}




