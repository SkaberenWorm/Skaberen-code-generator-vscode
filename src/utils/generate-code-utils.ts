import * as changeCase from 'change-case';
import { existsSync, writeFile } from 'fs';

import Data from '../models/data';
import { getControllerTemplate } from '../templates/java-base-uft/controller.template';
import { getEntityTemplate } from '../templates/java-base-uft/entity.template';
import { getIServiceTemplate } from '../templates/java-base-uft/iservice.template';
import { getRepositoryTemplate } from '../templates/java-base-uft/repository.template';
import { getServiceTemplate } from '../templates/java-base-uft/service.template';
import { generatedVersionUID } from './utils';


export function createEntity(data: Data) {

    const entityName = data.entityName;
    const targetDirectory = data.targetDirectory;

    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/entities/${pascalCaseEntityName}.java`;
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');

    if (existsSync(targetPath)) {
        throw Error(`${pascalCaseEntityName}.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getEntityTemplate(
                entityName,
                packageEntity,
                generatedVersionUID(),
                data.typeVariableID,
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

export function createRepository(data: Data) {

    const entityName = data.entityName;
    const targetDirectory = data.targetDirectory;

    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/repositories/${pascalCaseEntityName}Repository.java`;
    const packageRepository = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.repositories`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${pascalCaseEntityName}Repository.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getRepositoryTemplate(
                entityName,
                packageRepository,
                packageEntity,
                data.typeVariableID,
                data.methodsSelected),
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

export function createIService(data: Data) {

    const entityName = data.entityName;
    const targetDirectory = data.targetDirectory;

    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/services/I${pascalCaseEntityName}Service.java`;
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`I${pascalCaseEntityName}Service.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getIServiceTemplate(
                entityName,
                packageIService,
                packageEntity,
                data.typeVariableID,
                data.methodsSelected),
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

export function createService(data: Data) {

    const entityName = data.entityName;
    const targetDirectory = data.targetDirectory;

    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/services/impl/${pascalCaseEntityName}Service.java`;
    const packageService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services/impl`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageRepository = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.repositories`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${pascalCaseEntityName}Service.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getServiceTemplate(
                entityName,
                packageService,
                packageIService,
                packageEntity,
                packageRepository,
                data.typeVariableID,
                data.methodsSelected),
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


export function createController(data: Data) {

    const entityName = data.entityName;
    const targetDirectory = data.targetDirectory;

    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/controllers/${pascalCaseEntityName}RestController.java`;
    const packageController = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.controllers`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${pascalCaseEntityName}RestController.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getControllerTemplate(
                entityName,
                packageController,
                packageEntity,
                packageIService,
                data.typeVariableID,
                data.methodsSelected,
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