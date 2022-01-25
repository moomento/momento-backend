import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import configuration from '../../config/configuration';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            console.log(configService.get('database'));
            return configService.get('database');
          },
          connectionFactory: async (options) => {
            const connection = await createConnection(options);
            return connection;
          },
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
});
