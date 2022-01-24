import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import configuration from './config/configuration';
import { CategoriesController } from './modules/categories/categories.controller';
import { CategoriesService } from './modules/categories/categories.service';
import { Category } from './modules/categories/entities/category.entity';
import { Region } from './modules/regions/entities/region.entity';
import { RegionsController } from './modules/regions/regions.controller';
import { RegionsService } from './modules/regions/regions.service';
import { Scope } from './modules/scopes/entities/scope.entity';
import { ScopesController } from './modules/scopes/scopes.controller';
import { ScopesService } from './modules/scopes/scopes.service';
import { Team } from './modules/teams/entities/team.entity';
import { User } from './modules/users/entities/user.entity';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';

describe('Controller', () => {
  let scopesController: ScopesController;
  let usersController: UsersController;
  let regionsController: RegionsController;
  let categoriesController: CategoriesController;

  beforeAll(async () => {
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
        TypeOrmModule.forFeature([Scope, Region, Category, Team, User]),
      ],
      controllers: [
        ScopesController,
        RegionsController,
        CategoriesController,
        UsersController,
      ],
      providers: [
        ScopesService,
        RegionsService,
        CategoriesService,
        UsersService,
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    scopesController = module.get<ScopesController>(ScopesController);
    regionsController = module.get<RegionsController>(RegionsController);
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
    expect(scopesController).toBeDefined();
    expect(regionsController).toBeDefined();
    expect(categoriesController).toBeDefined();
  });

  it('scopes', async () => {
    await scopesController.create({
      name: 'Sports',
    });
    await scopesController.update('1', {
      content: 'Sports is playing with body',
    });
  });

  it('regions', async () => {
    await regionsController.create({
      name: 'Spain',
    });
    await regionsController.update('1', {
      content: 'Spain is located in south-west Europe.',
    });
  });

  it('categories', async () => {
    await categoriesController.create({
      name: 'Soccer',
      scopeId: 1,
    });
    await categoriesController.update('1', {
      regionId: 1,
    });
  });

  it('users', async () => {
    // User
    await usersController.create({
      address: '0xF7D9b6f01ebBbA24A6B3123C9C7ECf787E2DB46A',
    });
    await usersController.update('1', {
      firstName: 'Nick',
      lastName: 'Jang',
    });
  });
});
