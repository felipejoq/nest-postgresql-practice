import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DBHOST,
      port: +process.env.DBPORT,
      database: process.env.DBNAME,
      username: process.env.DBUSERNAME,
      password: process.env.DBPASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
