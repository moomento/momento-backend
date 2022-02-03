import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { EventStatusEnum, ItemAttributeDisplayEnum } from './constants/enums';
import { AdminsController } from './modules/admins/admins.controller';
import { AuthAdminsController } from './modules/auth/auth-admins.controller';
import { BidsController } from './modules/bids/bids.controller';
import { CategoriesController } from './modules/categories/categories.controller';
import { CollectionsController } from './modules/collections/collections.controller';
import { EventsController } from './modules/events/events.controller';
import { ItemsController } from './modules/items/items.controller';
import { OffersController } from './modules/offers/offers.controller';
import { RegionsController } from './modules/regions/regions.controller';
import { ScopesController } from './modules/scopes/scopes.controller';
import { TeamsController } from './modules/teams/teams.controller';
import { UsersController } from './modules/users/users.controller';

describe('Controller', () => {
  let scopesController: ScopesController;
  let usersController: UsersController;
  let regionsController: RegionsController;
  let categoriesController: CategoriesController;
  let teamsController: TeamsController;
  let eventsController: EventsController;
  let collectionsController: CollectionsController;
  let itemsController: ItemsController;
  let offersController: OffersController;
  let bidsController: BidsController;
  let adminsController: AdminsController;
  let authAdminsController: AuthAdminsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    scopesController = module.get<ScopesController>(ScopesController);
    regionsController = module.get<RegionsController>(RegionsController);
    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    teamsController = module.get<TeamsController>(TeamsController);
    eventsController = module.get<EventsController>(EventsController);
    collectionsController = module.get<CollectionsController>(
      CollectionsController,
    );
    itemsController = module.get<ItemsController>(ItemsController);
    offersController = module.get<OffersController>(OffersController);
    bidsController = module.get<BidsController>(BidsController);
    adminsController = module.get<AdminsController>(AdminsController);
    authAdminsController =
      module.get<AuthAdminsController>(AuthAdminsController);
  });

  it('should be defined', async () => {
    expect(usersController).toBeDefined();
    expect(scopesController).toBeDefined();
    expect(regionsController).toBeDefined();
    expect(categoriesController).toBeDefined();
    expect(teamsController).toBeDefined();
    expect(eventsController).toBeDefined();
    expect(collectionsController).toBeDefined();
    expect(itemsController).toBeDefined();
    expect(offersController).toBeDefined();
    expect(bidsController).toBeDefined();
    expect(adminsController).toBeDefined();
    expect(authAdminsController).toBeDefined();
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
      status: EventStatusEnum.Scheduled,
    });
    await eventsController.update('1', {
      endAt: new Date(),
      status: EventStatusEnum.Ended,
    });
  });

  it('collections', async () => {
    await collectionsController.create({
      name: 'Shoes',
    });
    await collectionsController.create({
      name: 'Clothes',
    });
    await collectionsController.create({
      name: 'Equipments',
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

  it('items', async () => {
    await itemsController.create({
      name: 'Ronaldo`s shoes',
      description: 'Cristiano Ronaldo`s shoes',
      image: 'https://localhost/shoes-ronaldo.jpg',
      eventId: 1,
      collectionIds: [1, 2],
      creatorId: 1,
      ownerId: 1,
      attributes: [
        {
          displayType: ItemAttributeDisplayEnum.Number,
          traitType: 'speed',
          value: '100',
        },
        {
          displayType: ItemAttributeDisplayEnum.Number,
          traitType: 'strength',
          value: '100',
        },
        {
          traitType: 'eye',
          value: 'smile',
        },
      ],
    });

    await itemsController.update('1', {
      name: 'Ronaldo`s shoes',
      description: 'Cristiano Ronaldo`s shoes',
      image: 'https://localhost/shoes-ronaldo.jpg',
      eventId: 1,
      collectionIds: [1, 2, 3],
      attributes: [
        {
          id: 1,
          displayType: ItemAttributeDisplayEnum.Number,
          traitType: 'speed',
          value: '100',
          deleted: true,
        },
        {
          id: 2,
          displayType: ItemAttributeDisplayEnum.Number,
          traitType: 'strength',
          value: '120',
        },
        {
          traitType: 'character',
          value: 'dog',
          rank: 4,
        },
      ],
    });
  });

  it('offers', async () => {
    await offersController.create({
      itemId: 1,
      price: 1.5,
      startAt: new Date(),
      endAt: new Date(new Date().getTime() + 1000 * 3600),
    });
  });

  it('bids', async () => {
    await bidsController.create({
      itemId: 1,
      offerId: 1,
      bidderId: 1,
      price: 2,
    });
  });

  it('admins', async () => {
    await adminsController.create({
      firstName: 'Nick',
      lastName: 'Jang',
      username: 'nickjang',
      password: 'test1234',
    });
  });

  it('auth-admins', async () => {
    const user = await authAdminsController.signin({
      username: 'nickjang',
      password: 'test1234',
    });
  });
});
