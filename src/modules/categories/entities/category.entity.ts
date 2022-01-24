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
  OneToMany,
} from 'typeorm';
import { Region } from '../../regions/entities/region.entity';
import { Team } from '../../teams/entities/team.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('categories')
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => Scope, (scope) => scope.categories)
  scope: Scope;

  @Column({ nullable: true })
  scopeId?: number;

  @ManyToOne(() => Region, (region) => region.categories)
  region: Region;

  @Column({ nullable: true })
  regionId?: number;

  @OneToMany(() => Category, (category) => category.teams)
  teams: Team[];

  @OneToMany(() => Category, (category) => category.events)
  events: Event[];

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @Column({ nullable: true })
  parentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
