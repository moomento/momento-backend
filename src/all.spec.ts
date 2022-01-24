import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import configuration from './config/configuration';
import { CategoriesController } from './modules/categories/categories.controller';
import { CategoriesService } from './modules/categories/categories.service';
import { Category } from './modules/categories/entities/category.entity';
import { Event, EventStatus } from './modules/events/entities/event.entity';
import { EventsController } from './modules/events/events.controller';
import { EventsService } from './modules/events/events.service';
import { Region } from './modules/regions/entities/region.entity';
import { RegionsController } from './modules/regions/regions.controller';
import { RegionsService } from './modules/regions/regions.service';
import { Scope } from './modules/scopes/entities/scope.entity';
import { ScopesController } from './modules/scopes/scopes.controller';
import { ScopesService } from './modules/scopes/scopes.service';
import { Team } from './modules/teams/entities/team.entity';
import { TeamsController } from './modules/teams/teams.controller';
import { TeamsService } from './modules/teams/teams.service';
import { User } from './modules/users/entities/user.entity';
import { UsersController } from './modules/users/users.controller';
import { UsersService } from './modules/users/users.service';

describe('Controller', () => {
  let scopesController: ScopesController;
  let usersController: UsersController;
  let regionsController: RegionsController;
  let categoriesController: CategoriesController;
  let teamsController: TeamsController;
  let eventsController: EventsController;

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
        TypeOrmModule.forFeature([Scope, Region, Category, Team, Event, User]),
      ],
      controllers: [
        ScopesController,
        RegionsController,
        CategoriesController,
        UsersController,
        TeamsController,
        EventsController,
      ],
      providers: [
        ScopesService,
        RegionsService,
        CategoriesService,
        UsersService,
        TeamsService,
        EventsService,
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    scopesController = module.get<ScopesController>(ScopesController);
    regionsController = module.get<RegionsController>(RegionsController);
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    teamsController = module.get<TeamsController>(TeamsController);
    eventsController = module.get<EventsController>(EventsController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
    expect(scopesController).toBeDefined();
    expect(regionsController).toBeDefined();
    expect(categoriesController).toBeDefined();
    expect(teamsController).toBeDefined();
    expect(eventsController).toBeDefined();
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

  it('teams', async () => {
    await teamsController.create({
      name: 'Real Madrid FC',
      symbol: 'Real Madrid',
      categoryId: 1,
    });
    await teamsController.update('1', {
      content: 'Real Madrid FC(Football Club) is located in Madrid, Spain.',
    });

    await teamsController.create({
      name: 'FC Barcelona',
      symbol: 'Barcelona',
      categoryId: 1,
    });
  });

  it('events', async () => {
    await eventsController.create({
      name: 'Real Madrid vs Barcelona',
      homeTeamId: 1,
      awayTeamId: 2,
      categoryId: 1,
      startAt: new Date(),
      duration: 90,
      status: EventStatus.Scheduled,
    });
    await eventsController.update('1', {
      endAt: new Date(),
      status: EventStatus.Ended,
    });
  });

  it('users', async () => {
    await usersController.create({
      address: '0xF7D9b6f01ebBbA24A6B3123C9C7ECf787E2DB46A',
    });
    await usersController.update('1', {
      firstName: 'Nick',
      lastName: 'Jang',
    });
  });
});
