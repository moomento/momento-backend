import { Module } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { ScopeController } from './scope.controller';

@Module({
  controllers: [ScopeController],
  providers: [ScopeService]
})
export class ScopeModule {}
