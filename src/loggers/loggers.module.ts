import { Module } from '@nestjs/common';
import { CommonLoggerService } from './common.logger.service';


@Module({
    imports: [
        LoggersModule
    ],
    exports: [CommonLoggerService],
    providers: [CommonLoggerService],
})
export class LoggersModule { }
