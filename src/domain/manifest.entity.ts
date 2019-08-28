import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { ManifestStagedEvent } from '../application/stage/events/manifest.staged.event';

@Entity()
export class Manifest extends AggregateRoot {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'int' })
  facilityCode: number;

  @Column()
  facilityName: string;

  @Column('text')
  docket: string;

  @Column({ type: 'datetime' })
  logDate: Date;

  @Column({ type: 'datetime' })
  buildDate: Date;

  @Column({ type: 'int' })
  patientCount: number;

  @Column('text')
  cargo: string;

  @Column({ type: 'boolean' })
  isCurrent: boolean;

  @Column()
  status: string;

  @Column({ type: 'datetime' })
  statusDate: Date;

  @Column('text')
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
