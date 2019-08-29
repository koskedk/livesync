import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { StatsDto } from './dto/stats.dto';
import { AggregateRoot } from '@nestjs/cqrs';
import { ManifestStagedEvent } from '../application/stage/events/manifest.staged.event';

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

  @Column()
  status: string;

  @Column({ type: 'datetime' })
  statusDate: Date;

  @Column({ type: 'text', nullable: true })
  statusInfo: string;

  initialize() {
    this.status = 'STAGED';
    this.statusDate = new Date();
    this.apply(new ManifestStagedEvent(this.id));
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
