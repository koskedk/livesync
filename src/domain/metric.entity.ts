import { ManifestStagedEvent } from '../application/stage/events/manifest.staged.event';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { MetricStagedEvent } from '../application/stage/events/metric.staged.event';

@Entity()
export class Metric extends AggregateRoot {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  facilityCode: number;

  @Column()
  facilityName: string;

  @Column({ type: 'text', nullable: true })
  cargo: string;

  @Column({ type: 'int' })
  cargoType: number;

  @Column({ type: 'uuid' })
  facilityManifestId: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  statusDate: Date;

  @Column({ type: 'text', nullable: true })
  statusInfo: string;

  constructor() {
    super();
  }

  initialize() {
    this.status = 'STAGED';
    this.statusDate = new Date();
    this.apply(new MetricStagedEvent(this.id));
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
