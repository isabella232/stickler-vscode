"use strict";
import * as vscode from "vscode";
import { SticklerFormatter } from "./stickler-formatter";

export function activate(context: vscode.ExtensionContext) {
  console.log('"Stickler" is now active!');

  const formatter = new SticklerFormatter();

  let t = vscode.languages.registerDocumentFormattingEditProvider(
    [
      { language: "javascript", scheme: "file" },
      { language: "json", scheme: "file" },
      { language: "markdown", scheme: "file" }
    ],
    formatter
  );

  context.subscriptions.push(t);
}

// this method is called when your extension is deactivated
export function deactivate() {}
