import { commands, ExtensionContext } from 'vscode';

import { generateCodeJavaBase } from './commands';
import { generateCodeAngularStore } from './commands/generate-angular-store.command';

export function activate(_context: ExtensionContext) {
	commands.registerCommand("spring-boot-base-code-generator.generateCode", generateCodeJavaBase);
	commands.registerCommand("spring-boot-base-code-generator.generateCodeNgStore", generateCodeAngularStore);
}
export function deactivate() { }



