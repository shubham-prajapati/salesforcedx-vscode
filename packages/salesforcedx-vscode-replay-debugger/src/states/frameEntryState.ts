/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { basename } from 'path';
import { Source, StackFrame } from 'vscode-debugadapter';
import Uri from 'vscode-uri';
import { ApexDebugStackFrameInfo, LogContext } from '../core/logContext';
import { DebugLogState } from './debugLogState';
import { FrameState } from './frameState';

export class FrameEntryState extends FrameState implements DebugLogState {
  constructor(fields: string[]) {
    super(fields);
  }

  public handle(logContext: LogContext): boolean {
    const sourceUri = logContext.getUriFromSignature(this._signature);
    const frame = new ApexDebugStackFrameInfo(logContext.getFrames().length);
    const id = logContext.getFrameHandler().create(frame);
    logContext
      .getFrames()
      .push(
        new StackFrame(
          id,
          this._frameName,
          sourceUri
            ? new Source(basename(sourceUri), Uri.parse(sourceUri).fsPath)
            : undefined,
          undefined
        )
      );
    return false;
  }
}
