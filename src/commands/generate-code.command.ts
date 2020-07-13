import * as changeCase from 'change-case';
import { existsSync, lstatSync, writeFile } from 'fs';
import * as _ from 'lodash';
import * as mkdirp from 'mkdirp';
import { InputBoxOptions, OpenDialogOptions, Uri, window } from 'vscode';

import { getEntityTemplate } from '../templates/entity.template';

export const generateCode = async (uri: Uri) => {
  console.log('generateCode');
  const entityName = await promptForEntityName();
  if (_.isNil(entityName) || entityName.trim() === "") {
    window.showErrorMessage("El nombre de la clase no debe estar vacía");
    return;
  }

  let targetDirectory;
  if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (_.isNil(targetDirectory)) {
      window.showErrorMessage("Por favor seleccione un directorio valido");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  console.log(targetDirectory);

  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  try {
    await generateAllCode(entityName, targetDirectory);
    window.showInformationMessage(
      `Exito Código ${pascalCaseEntityName} generado correctamente`
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
    placeHolder: "Usuario",
  };
  return window.showInputBox(entityNamePromptOptions);
}

async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: "Seleccione el package base del proyecto",
    canSelectFolders: true,
  };

  return window.showOpenDialog(options).then((uri) => {
    if (_.isNil(uri) || _.isEmpty(uri)) {
      return undefined;
    }
    return uri[0].fsPath;
  });
}

async function generateAllCode(
  entityName: string,
  targetDirectory: string
) {
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
    createEntityTemplate(entityName, targetDirectory),
  ]);
}

function createDirectory(targetDirectory: string): Promise<void> {
  return new Promise((resolve, reject) => {
    mkdirp(targetDirectory, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function createEntityTemplate(
  entityName: string,
  targetDirectory: string
) {
  const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
  const targetPath = `${targetDirectory}/entities/${pascalCaseEntityName}.java`;
  if (existsSync(targetPath)) {
    throw Error(`${pascalCaseEntityName}.java ya existe`);
  }
  return new Promise(async (resolve, reject) => {
    writeFile(
      targetPath,
      getEntityTemplate(entityName),
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
