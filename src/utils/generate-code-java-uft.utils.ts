import { existsSync, writeFile } from 'fs';

import ParamMethodJava from '../models/param-method-java';
import { getControllerTemplate } from '../templates/java-base-uft/controller.template';
import { getEntityTemplate } from '../templates/java-base-uft/entity.template';
import { getIServiceTemplate } from '../templates/java-base-uft/iservice.template';
import { getRepositoryTemplate } from '../templates/java-base-uft/repository.template';
import { getResultadoProcTemplate } from '../templates/java-base-uft/resultado-proc.template';
import { getSearchPaginationTemplate } from '../templates/java-base-uft/search-pagination.template';
import { getServiceTemplate } from '../templates/java-base-uft/service.template';
import { generatedVersionUID } from './utils';


export function createEntity(param: ParamMethodJava) {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/entities/${entityName}.java`;
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');

    if (existsSync(targetPath)) {
        throw Error(`${entityName}.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getEntityTemplate(
                entityName,
                packageEntity,
                generatedVersionUID(),
                param.typeVariableID,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createRepository(param: ParamMethodJava) {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/repositories/${entityName}Repository.java`;
    const packageRepository = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.repositories`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${entityName}Repository.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getRepositoryTemplate(
                entityName,
                packageRepository,
                packageEntity,
                param.typeVariableID,
                param.methodsSelected),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createIService(param: ParamMethodJava) {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/services/I${entityName}Service.java`;
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`I${entityName}Service.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getIServiceTemplate(
                entityName,
                packageIService,
                packageEntity,
                packageUtil,
                param.typeVariableID,
                param.methodsSelected,
                param.sexEntity,
                param.useUtilClass,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createService(param: ParamMethodJava) {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/services/impl/${entityName}Service.java`;
    const packageService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services/impl`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageRepository = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.repositories`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${entityName}Service.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getServiceTemplate(
                entityName,
                packageService,
                packageIService,
                packageEntity,
                packageUtil,
                packageRepository,
                param.typeVariableID,
                param.methodsSelected,
                param.sexEntity,
                param.useUtilClass),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


export function createController(param: ParamMethodJava) {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/controllers/${entityName}RestController.java`;
    const packageController = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.controllers`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageIService = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.services`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageEntity = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.entities`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`${entityName}RestController.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getControllerTemplate(
                entityName,
                packageController,
                packageEntity,
                packageUtil,
                packageIService,
                param.typeVariableID,
                param.methodsSelected,
                param.useUtilClass,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


export function createUtilResultadoProcIfNotExist(param: ParamMethodJava) {
    const targetDirectory = param.targetDirectory;
    const targetPath = `${targetDirectory}/utils/ResultadoProc.java`;
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getResultadoProcTemplate(
                    packageUtil,
                    generatedVersionUID()
                ),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
}

export function createUtilSearchPaginationIfNotExist(param: ParamMethodJava) {
    const targetDirectory = param.targetDirectory;
    const targetPath = `${targetDirectory}/utils/SearchPagination.java`;
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getSearchPaginationTemplate(
                    packageUtil,
                    generatedVersionUID()
                ),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
}

