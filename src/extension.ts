import * as vscode from 'vscode';

import { generateCode } from './commands';


export function activate(_context: vscode.ExtensionContext) {
	vscode.commands.registerCommand("spring-boot-base-code-generator.generateCode", generateCode);
}

export function deactivate() { }


