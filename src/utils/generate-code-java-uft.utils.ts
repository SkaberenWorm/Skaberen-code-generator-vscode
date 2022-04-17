import { existsSync, writeFile } from 'fs';

import ParamMethodJava from '../models/param-method-java';
import { getControllerExceptionHandlerTemplate } from '../templates/java-base-uft/controller-exception-handler';
import { getControllerTemplate } from '../templates/java-base-uft/controller.template';
import { getEntityTemplate } from '../templates/java-base-uft/entity.template';
import {
    getEntityNotFoundExceptionTemplate,
    getErrorProcessingExceptionTemplate,
    getUnsavedEntityExceptionTemplate,
} from '../templates/java-base-uft/exceptions';
import { getIServiceTemplate } from '../templates/java-base-uft/iservice.template';
import { getModelErrorMessageTemplate } from '../templates/java-base-uft/model-error-message';
import { getRepositoryTemplate } from '../templates/java-base-uft/repository.template';
import { getResultadoProcTemplate } from '../templates/java-base-uft/resultado-proc.template';
import { getSearchPaginationTemplate } from '../templates/java-base-uft/search-pagination.template';
import { getServiceTemplate } from '../templates/java-base-uft/service.template';
import { getUtilTemplate } from '../templates/java-base-uft/util.template';
import { generatedVersionUID } from './utils';


export function createEntity(param: ParamMethodJava): Promise<void> | undefined {

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

export function createRepository(param: ParamMethodJava): Promise<void> | undefined {

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

export function createIService(param: ParamMethodJava): Promise<void> | undefined {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/services/I${entityName}Service.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
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
                packageException,
                packageIService,
                packageEntity,
                packageUtil,
                param.typeVariableID,
                param.methodsSelected,
                param.useUtilClass,
                param.useResulProc,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createService(param: ParamMethodJava): Promise<void> | undefined {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/services/impl/${entityName}Service.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
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
                packageException,
                packageService,
                packageIService,
                packageEntity,
                packageUtil,
                packageRepository,
                param.typeVariableID,
                param.methodsSelected,
                param.useUtilClass,
                param.useResulProc,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


export function createController(param: ParamMethodJava): Promise<void> | undefined {

    const entityName = param.entityName;
    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/controllers/${entityName}RestController.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
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
                packageException,
                packageController,
                packageEntity,
                packageUtil,
                packageIService,
                param.typeVariableID,
                param.methodsSelected,
                param.useUtilClass,
                param.useResulProc,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


export function createUtilResultadoProcIfNotExist(param: ParamMethodJava): Promise<void> | undefined {
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

export function createUtilSearchPaginationIfNotExist(param: ParamMethodJava): Promise<void> | undefined {
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

export function createUtilUtilIfNotExist(param: ParamMethodJava): Promise<void> | undefined {
    const targetDirectory = param.targetDirectory;
    const targetPath = `${targetDirectory}/utils/Util.java`;
    const packageUtil = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.utils`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getUtilTemplate(packageUtil),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
}

export function createModelErrorMessage(param: ParamMethodJava): Promise<void> | undefined {

    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/models/ErrorMessage.java`;
    const packageModel = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.models`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`ErrorMessage.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getModelErrorMessageTemplate(
                packageModel,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


export function createControllerExceptionHandler(param: ParamMethodJava): Promise<void> | undefined {

    const targetDirectory = param.targetDirectory;

    const targetPath = `${targetDirectory}/configurations/ControllerExceptionHandler.java`;
    const packageControllerException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.configurations`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    const packageModel = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.models`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (existsSync(targetPath)) {
        throw Error(`ControllerExceptionHandler.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPath,
            getControllerExceptionHandlerTemplate(
                packageControllerException,
                packageException,
                packageModel,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createEntityNotFoundException(param: ParamMethodJava): Promise<void> | undefined {

    const targetDirectory = param.targetDirectory;

    const targetPathEntityNotFoundException = `${targetDirectory}/exceptions/EntityNotFoundException.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');

    if (existsSync(targetPathEntityNotFoundException)) {
        throw Error(`EntityNotFoundException.java ya existe`);
    }

    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPathEntityNotFoundException,
            getEntityNotFoundExceptionTemplate(
                packageException,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createErrorProcessingException(param: ParamMethodJava): Promise<void> | undefined {

    const targetDirectory = param.targetDirectory;

    const targetPathErrorProcessingException = `${targetDirectory}/exceptions/ErrorProcessingException.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');

    if (existsSync(targetPathErrorProcessingException)) {
        throw Error(`ErrorProcessingException.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPathErrorProcessingException,
            getErrorProcessingExceptionTemplate(
                packageException,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}

export function createUnsavedEntityException(param: ParamMethodJava): Promise<void> | undefined {

    const targetDirectory = param.targetDirectory;

    const targetPathUnsavedEntityException = `${targetDirectory}/exceptions/UnsavedEntityException.java`;
    const packageException = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.exceptions`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');

    if (existsSync(targetPathUnsavedEntityException)) {
        throw Error(`UnsavedEntityException.java ya existe`);
    }
    return new Promise(async (resolve, reject) => {
        writeFile(
            targetPathUnsavedEntityException,
            getUnsavedEntityExceptionTemplate(
                packageException,
            ),
            "utf8",
            (error) => {
                if (error) { reject(error); return; }
                resolve();
            }
        );
    });
}


