import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OfferStatusEnum } from '../constants/enums';
import { Bid } from './bid.entity';
import { Item } from './item.entity';

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.offers)
  item: Item;

  @Column({ nullable: true })
  itemId;

  @Column({ type: 'float' })
  price: number;

  @Column({ nullable: true })
  startAt: Date;

  @Column({ nullable: true })
  endAt: Date;

  @OneToMany(() => Bid, (bid) => bid.item)
  bids: Bid[];

  @Column({
    type: 'enum',
    enum: OfferStatusEnum,
    default: OfferStatusEnum.Opened,
  })
  offerStatus: OfferStatusEnum;

  @Column({ nullable: true })
  offerTxHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
