import { Injectable, LoggerService } from '@nestjs/common';


@Injectable()
export class CommonLoggerService implements LoggerService {
    log (message: string) {
        console.log(message)
    }
    error (message: string, trace: string) {
        /* your implementation */
        console.log(message, trace);
    }
    warn (message: string) {
        /* your implementation */
        console.log(message)
    }
    debug (message: string) {
        /* your implementation */
        console.log(message)
    }
    verbose (message: string) {
        /* your implementation */
        console.log(message)
    }
}
