import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import configuration from '../../config/configuration';
import { User } from '../../entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

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
            return configService.get('database');
          },
          connectionFactory: async (options) => {
            const connection = await createConnection(options);
            return connection;
          },
        }),
        TypeOrmModule.forFeature([User]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
    await controller.create({
      address: '0xF7D9b6f01ebBbA24A6B3123C9C7ECf787E2DB46A',
    });
    await controller.update('1', {
      firstName: 'Nick',
      lastName: 'Jang',
    });
  });
});
