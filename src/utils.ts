import { workspace, TextDocument } from "vscode";

export function getWorkspaceRoot(document?: TextDocument) {
  if (!workspace.workspaceFolders || workspace.workspaceFolders.length === 0) {
    return;
  }
  if (!document || document.isUntitled) {
    return workspace.workspaceFolders[0].uri.fsPath;
  }
  const folder = workspace.getWorkspaceFolder(document.uri);
  if (!folder) return;
  
  return folder.uri.fsPath;
}
