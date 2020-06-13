import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';



@Module({
  imports: [
    MongooseModule.forRoot(config.mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    AuthModule,
    UsersModule,
    ItemsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }