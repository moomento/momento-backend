import { Not, ObjectLiteral, Repository, getRepository } from 'typeorm';

import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export type ScopedValidationOptions = ValidationOptions & { scope?: string[] };

@ValidatorConstraint({ async: true, name: 'IsUniq' })
export class IsUniqConstraint implements ValidatorConstraintInterface {
  public async validate(
    value: unknown,
    args: ValidationArguments,
  ): Promise<boolean> {
    if (args.value == null) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    const repository = getRepository<ObjectLiteral>(args.targetName);
    const entity = await repository.findOne({
      where: { [args.property]: value },
    });
    return !entity;
  }
}

/**
 * Checks if a value is uniq across all records in a database or inside a scope.
 *
 * @param validationOptions accept `scope` options and all `class-validator` options
 */
export const IsUniq = (validationOptions?: ScopedValidationOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: object, propertyName: string): void => {
    console.log('scope');
    const scope = validationOptions && validationOptions.scope;
    const opts: ScopedValidationOptions = {
      message: scope
        ? `$target with $property '$value' already exists in scope: ${scope.join(
            ', ',
          )}`
        : "$target with $property '$value' already exists",
      ...validationOptions,
    };
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: opts,
      constraints: scope || [],
      validator: IsUniqConstraint,
    });
  };
};
