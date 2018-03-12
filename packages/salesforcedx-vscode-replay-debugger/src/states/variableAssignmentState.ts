/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { ApexVariable } from '../adapter/apexReplayDebug';
import { LogContext } from '../core/logContext';
import { DebugLogState } from './debugLogState';

export class VariableAssignmentState implements DebugLogState {
  private fields: string[];

  constructor(fields: string[]) {
    this.fields = fields;
  }
  public handle(logContext: LogContext): boolean {
    const currFrame = logContext.getTopFrame();
    if (currFrame) {
      const id = currFrame.id;
      const frameInfo = logContext.getFrameHandler().get(id);
      const name = this.fields[3];
      const value = this.fields[4];
      if (frameInfo.statics.has(name)) {
        const frameStatics = frameInfo.statics.get(name) as ApexVariable;
        frameStatics.value = value;
      } else if (frameInfo.locals.has(name)) {
        const frameLocals = frameInfo.locals.get(name) as ApexVariable;
        frameLocals.value = value;
      }
    }

    return false;
  }
}
