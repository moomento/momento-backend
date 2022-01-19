import { Controller } from '@nestjs/common';
import { ScopeService } from './scope.service';
import { Crud } from '@nestjsx/crud';

import { Scope } from './entities/scope.entity';
@Crud({
  model: {
    type: Scope,
  },
})
@Controller('scope')
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) {}
}
