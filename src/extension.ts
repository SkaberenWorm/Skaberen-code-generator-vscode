import { commands, ExtensionContext } from 'vscode';

import { generateCode } from './commands';

export function activate(_context: ExtensionContext) {
	commands.registerCommand("spring-boot-base-code-generator.generateCode", generateCode);

}
export function deactivate() { }



