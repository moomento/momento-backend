import { Scope } from '../../scopes/entities/scope.entity';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Region } from 'src/modules/regions/entities/region.entity';

@Entity('categories')
@Tree('nested-set')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Scope, (scope) => scope.categories)
  scope: Scope;

  @ManyToOne(() => Region, (region) => region.categories)
  region: Region;
}
