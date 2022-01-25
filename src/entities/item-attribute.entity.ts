import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

export enum ItemAttributeDisplayType {
  BoostNumber = 'boost_number',
  BoostPercentage = 'boost_percentage',
  Number = 'number',
  Date = 'date',
}

@Entity('items_attributes')
export class ItemAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  displayType: ItemAttributeDisplayType;

  @Column()
  traitType: string;

  @Column()
  value: string;

  @ManyToOne(() => Item, (item) => item.attributes)
  item: Item;

  @Column()
  itemId: number;

  @Column({ default: 1 })
  rank: number;
}
