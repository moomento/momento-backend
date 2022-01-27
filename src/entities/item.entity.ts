import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Bid } from './bid.entity';
import { Collection } from './collection.entity';
import { Event } from './event.entity';
import { ItemAttribute } from './item-attribute.entity';
import { Offer } from './offer.entity';
import { User } from './user.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  image: string;

  @Column({ nullable: true })
  externalUrl: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  backgroundColor: string;

  @Column({ nullable: true })
  animationUrl: string;

  @Column({ nullable: true })
  youtubeUrl: string;

  @ManyToOne(() => Event)
  event: Event;

  @Column({ nullable: true })
  eventId?: number;

  @OneToMany(() => ItemAttribute, (attribute) => attribute.item)
  attributes: ItemAttribute[];

  @ManyToMany(() => Collection)
  @JoinTable()
  collections: Collection[];

  @ManyToOne(() => User)
  creator: User;

  @Column()
  creatorId: number;

  @ManyToOne(() => User)
  owner: User;

  @Column()
  ownerId: number;

  @Column({ nullable: true })
  tokenId: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];

  @Column({ default: false })
  onSale: boolean;

  @Column({ nullable: true })
  mintTxHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
