import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "spring-boot-base-code-generator" is now active!');

	let disposable = vscode.commands.registerCommand(
		'spring-boot-base-code-generator.generateCode',
		() => {
			const entityCode = 'Entity code';
			if (vscode.workspace.workspaceFolders !== undefined) {

				const folderPath = vscode.workspace.workspaceFolders[0].uri
					.toString()
					.split(":")[1];

				fs.writeFile(path.join(folderPath, 'Clase.java'), entityCode, err => {
					if (err) {
						return vscode.window.showErrorMessage('Failed to create boilerplate file!');
					}
					vscode.window.showInformationMessage('Created boilerplate files');
				});
				vscode.window.showInformationMessage('Hello World from Spring boot base code generator!');
			} else {
				return vscode.window.showErrorMessage('No define workspace!');
			}
		});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
