import { existsSync, writeFile } from 'fs';

import ParamMethodJava from '../models/param-method-java';
import { getCustomAuthenticationFilter } from '../templates/spring-security/custom-authentication-filter';
import { getCustomAuthorizationFilter } from '../templates/spring-security/custom-authorization-filter';
import { getSecurityConfig } from '../templates/spring-security/security-config';


export function createFilesSpringSecurity(data: ParamMethodJava) {
    const targetDirectory = data.targetDirectory;
    createSecurityConfig(targetDirectory);
    createCustomAuthenticationFilter(targetDirectory);
    createCustomAuthorizationFilter(targetDirectory);

}

function createSecurityConfig(targetDirectory: string): Promise<void> | undefined {

    const targetPath = `${targetDirectory}/security/SecurityConfig.java`;
    const packageFile = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.security`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getSecurityConfig(packageFile),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
    return;
}

function createCustomAuthorizationFilter(targetDirectory: string): Promise<void> | undefined {

    const targetPath = `${targetDirectory}/security/CustomAuthorizationFilter.java`;
    const packageFile = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.security`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getCustomAuthorizationFilter(packageFile),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
    return;
}


function createCustomAuthenticationFilter(targetDirectory: string): Promise<void> | undefined {

    const targetPath = `${targetDirectory}/security/CustomAuthenticationFilter.java`;
    const packageFile = `${targetDirectory.substring(targetDirectory.indexOf("src/main/java/"), targetDirectory.length)}.security`.replace(new RegExp('/', 'g'), '.').replace('src.main.java.', '');
    if (!existsSync(targetPath)) {
        return new Promise(async (resolve, reject) => {
            writeFile(
                targetPath,
                getCustomAuthenticationFilter(packageFile),
                "utf8",
                (error) => {
                    if (error) { reject(error); return; }
                    resolve();
                }
            );
        });
    }
    return;
}