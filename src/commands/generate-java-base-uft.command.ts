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
  createUtilResultadoProcIfNotExist,
  createUtilSearchPaginationIfNotExist,
} from '../utils/generate-code-java-uft.utils';
import { createDirectory, promptForTargetDirectory } from '../utils/utils';

export const generateCodeJavaBase = async (uri: Uri) => {

  let targetDirectory;
  if (lodash.isNil(lodash.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
    targetDirectory = await promptForTargetDirectory();
    if (lodash.isNil(targetDirectory)) {
      window.showErrorMessage("Seleccione un directorio válido");
      return;
    }
  } else {
    targetDirectory = uri.fsPath;
  }

  let entityName = await promptForEntityName();
  if (lodash.isNil(entityName) || entityName.trim() === "") {
    window.showErrorMessage("El nombre de la clase no debe estar vacía");
    return;
  }
  entityName = entityName[0].toUpperCase() + entityName.slice(1);

  let typeVariableID = await window.showQuickPick(['int', 'long', 'String', 'otro'], {
    placeHolder: 'Tipo de variable del identificador',
  });

  if (typeVariableID === 'otro' || typeVariableID === undefined) {
    typeVariableID = await promptForTypeVariable();
    if (lodash.isNil(typeVariableID) || typeVariableID.trim() === "") {
      window.showErrorMessage("El tipo de variable no es válido");
      return;
    }
  }

  const sexEntityOpt = await window.showQuickPick([`La ${entityName}`, `El ${entityName}`], {
    placeHolder: 'Sexo de la clase',
  });
  const sexEntity = sexEntityOpt === `La ${entityName}` ? 'F' : 'M';

  const metodosChecboxes: Array<Checkbox> = methods;

  await showQuickPickMethods(metodosChecboxes, entityName).then(methods => {
    metodosChecboxes.forEach(checkBox => {
      checkBox.checked = false;
    });
    methods?.forEach(methodQuickPick => {
      metodosChecboxes.forEach(methodCheckbox => {
        if (methodCheckbox.methodName.trim() === methodQuickPick.label.trim()) {
          methodCheckbox.checked = true;
        }
      });
    });
  }
  );

  const useUtilClassOpt = await window.showQuickPick([`Usar clases locales`, `Usar repositorio UFT`], {
    placeHolder: 'Importar clases de utilidad (ResultadoProc, SearchPagination, etc)',
  });
  const useUtilClass = useUtilClassOpt === `Usar clases locales`;

  try {
    await generateAllCode(entityName, targetDirectory, typeVariableID, metodosChecboxes, sexEntity, useUtilClass);
    window.showInformationMessage(
      `Exito! Código ${entityName} generado correctamente`
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

async function generateAllCode(entityName: string, targetDirectory: string, typeVariableID: string, methodsSelected: Array<Checkbox>, sexEntity: string, useUtilClass: boolean) {
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
  if (!existsSync(`${targetDirectory}/utils`) && useUtilClass) {
    await createDirectory(`${targetDirectory}/utils`);
  }

  const data: ParamMethodJava = new ParamMethodJava({
    entityName: entityName,
    targetDirectory: targetDirectory,
    typeVariableID: typeVariableID,
    methodsSelected: methodsSelected,
    sexEntity: sexEntity,
    useUtilClass: useUtilClass,
  });
  await Promise.all([
    createEntity(data),
    createIService(data),
    createService(data),
    createController(data),
    createRepository(data),
  ]);
  if (data.useUtilClass) {
    await Promise.all([
      createUtilResultadoProcIfNotExist(data),
      createUtilSearchPaginationIfNotExist(data),
    ]);
  }

}

const showQuickPickMethods = (checkboxes: Checkbox[], entityName: string) => {
  const pickItems: QuickPickItem[] = checkboxes.map(checkbox => {
    return {
      description: checkbox.description.replace('__ENTITY__', entityName),
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



