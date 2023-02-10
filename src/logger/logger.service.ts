import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  error(message: any, _stack?: string, context?: string): void {
    console.log('CustomLogger.error() called');
    super.error(message, undefined, context);
  }
}
