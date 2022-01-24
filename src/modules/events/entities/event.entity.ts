import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Team } from '../../teams/entities/team.entity';

export enum EventStatus {
  Scheduled = 'scheduled',
  Live = 'live',
  Ended = 'ended',
  Postponed = 'postphoned',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @ManyToOne(() => Category, (category) => category.events)
  category: Category;

  @Column({ nullable: true })
  categoryId?: number;

  @ManyToOne(() => Team)
  homeTeam: Team;

  @Column({ nullable: true })
  homeTeamId?: number;

  @ManyToOne(() => Team)
  awayTeam: Team;

  @Column({ nullable: true })
  awayTeamId?: number;

  @Column()
  startAt: Date;

  @Column({ default: 0 })
  duration: number;

  @Column({ nullable: true })
  endAt: Date;

  @Column({
    type: 'enum',
    enum: [
      EventStatus.Scheduled,
      EventStatus.Live,
      EventStatus.Ended,
      EventStatus.Postponed,
    ],
    default: EventStatus.Scheduled,
  })
  status: EventStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
