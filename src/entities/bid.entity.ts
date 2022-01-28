import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BidStatusEnum } from '../constants/enums';
import { Item } from './item.entity';
import { Offer } from './offer.entity';
import { User } from './user.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.bids)
  item: Item;

  @Column({ nullable: true })
  itemId;

  @ManyToOne(() => Offer, (offer) => offer.bids)
  offer: Offer;

  @Column({ nullable: true })
  offerId: number;

  @ManyToOne(() => User)
  bidder: User;

  @Column({ nullable: true })
  bidderId: number;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'enum', enum: BidStatusEnum, default: BidStatusEnum.Leading })
  bidStatus: BidStatusEnum;

  @Column({ nullable: true })
  biddenTxHash: string;

  @Column({ nullable: true })
  withdrawnTxHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  withdrawnAt: Date;
}
