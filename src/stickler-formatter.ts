import {
  CancellationToken,
  DocumentFormattingEditProvider,
  FormattingOptions,
  ProviderResult,
  TextDocument,
  TextEdit,
  window,
  workspace,
  Range
} from "vscode";
// @ts-ignore
import { formatCode } from "@mapbox/stickler/lib/api";

import { getWorkspaceRoot } from "./utils";

export class SticklerFormatter implements DocumentFormattingEditProvider {
  provideDocumentFormattingEdits(
    document: TextDocument,
    _options: FormattingOptions,
    _token: CancellationToken
  ): ProviderResult<TextEdit[]> {
    console.log(getWorkspaceRoot());
    return this.format(document);
  }

  private format(document: TextDocument): ProviderResult<TextEdit[]> {
    const text = document.getText();
    const cwd = getWorkspaceRoot(document);
    return formatCode({
      cwd,
      filename: document.fileName,
      code: text
    })
      .then((formatted: string) => [
        TextEdit.replace(
          new Range(document.positionAt(0), document.positionAt(text.length)),
          formatted
        )
      ])
      .catch((e: Error) => {
        console.error(e);
        window.showErrorMessage(e.message);
        return undefined;
      });
  }
}
