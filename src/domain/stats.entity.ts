import { Entity, Column, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { StatsStagedEvent } from '../application/stage/events/stats.staged.event';
import * as uuid from 'uuid';

@Entity()
export class Stats extends AggregateRoot {
  @PrimaryColumn('uuid')
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

  @Column()
  status: string;

  @Column({ type: 'datetime' })
  statusDate: Date;

  @Column({ type: 'text', nullable: true })
  statusInfo: string;

  constructor() {
    super();
    this.id = uuid.v1();
  }
  initialize() {
    this.status = 'STAGED';
    this.statusDate = new Date();
    this.apply(new StatsStagedEvent(this.id));
  }

  markAsSent() {
    this.status = 'SENT';
    this.statusDate = new Date();
  }

  markAsFailed(error: string) {
    this.status = 'ERROR';
    this.statusDate = new Date();
    this.statusInfo = error;
  }
}
