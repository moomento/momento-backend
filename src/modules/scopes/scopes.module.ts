import { Module } from '@nestjs/common';
import { ScopesService } from './scopes.service';
import { ScopesController } from './scopes.controller';
import { Scope } from './entities/scope.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Scope])],
  exports: [TypeOrmModule],
  controllers: [ScopesController],
  providers: [ScopesService],
})
export class ScopesModule {}
