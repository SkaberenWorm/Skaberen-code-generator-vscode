import * as changeCase from 'change-case';
import { existsSync, writeFile } from 'fs';

import { getControllerTemplate } from '../templates/controller.template';
import { getEntityTemplate } from '../templates/entity.template';
import { getIServiceTemplate } from '../templates/iservice.template';
import { getRepositoryTemplate } from '../templates/repository.template';
import { getServiceTemplate } from '../templates/service.template';
import { generatedVersionUID } from './utils';


export function createEntity(entityName: string, targetDirectory: string, typeVariableID: string) {
    const pascalCaseEntityName = changeCase.pascalCase(entityName.toLowerCase());
    const targetPath = `${targetDirectory}/entities/${pascalCaseEntityName}.java`;
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${pascalCaseEntityName}.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getEntityTemplate(entityName, packageEntity, generatedVersionUID(), typeVariableID),
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

export function createRepository(entityName: string, targetDirectory: string, typeVariableID: string) {
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
            getRepositoryTemplate(entityName, packageRepository, packageEntity, typeVariableID),
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

export function createIService(entityName: string, targetDirectory: string, typeVariableID: string) {
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
            getIServiceTemplate(entityName, packageIService, packageEntity, typeVariableID),
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

export function createService(entityName: string, targetDirectory: string, typeVariableID: string) {
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
            getServiceTemplate(entityName, packageService, packageIService, packageEntity, packageRepository, typeVariableID),
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


export function createController(entityName: string, targetDirectory: string, typeVariableID: string) {
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
            getControllerTemplate(entityName, packageController, packageEntity, packageIService, typeVariableID),
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