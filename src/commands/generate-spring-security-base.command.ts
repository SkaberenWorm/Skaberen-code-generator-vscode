import { existsSync, lstatSync } from 'fs';
import * as lodash from 'lodash';
import { InputBoxOptions, Uri, window } from 'vscode';

import ParamMethodJava from '../models/param-method-java';
import { createFilesSpringSecurity } from '../utils/generate-code-spring-security.utils';
import { createDirectory, promptForTargetDirectory } from '../utils/utils';

export const generateCodeSpringSecurity = async (uri: Uri) => {

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

  if (targetDirectory !== undefined && targetDirectory.indexOf('configurations') === -1) {
    window.showErrorMessage("Debe estar en la carpeta configurations");
    return;
  }


  try {
    await generateAllCode(targetDirectory);
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


async function generateAllCode(targetDirectory: string) {
  if (!existsSync(`${targetDirectory}/security`)) {
    await createDirectory(`${targetDirectory}/security`);
  }

  const data: ParamMethodJava = new ParamMethodJava({
    targetDirectory: targetDirectory
  });
  console.log("data", data);
  await Promise.all([
    createFilesSpringSecurity(data),
  ]);
}






