import { Scope } from '../modules/scope/entities/scope.entity';
export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Scope],
  },
});
