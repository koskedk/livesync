import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { StatsDto } from './dto/stats.dto';
import { AggregateRoot } from '@nestjs/cqrs';

@Entity()
export class Stats extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  facilityCode: number;

  @Column('text')
  docket: string;

  @Column('text')
  stats: string;

  @Column({ type: 'datetime' })
  updated: Date;

  @Column({ nullable: true })
  manifestId: string;
}
