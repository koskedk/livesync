import { ManifestStagedEvent } from '../application/stage/events/manifest.staged.event';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { IndicatorStagedEvent } from '../application/stage/events/indicator.staged.event';

@Entity()
export class Indicator extends AggregateRoot {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  facilityCode: number;

  @Column({ type: 'text'})
  facilityName: string;

  @Column({ type: 'text'})
  name: string;

  @Column({ type: 'text' })
  value: string;

  @Column({ type: 'datetime', nullable: true })
  indicatorDate: Date;

  @Column({ type: 'text'})
  stage: string;

  @Column({ type: 'uuid', nullable: true  })
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
    this.apply(new IndicatorStagedEvent(this.id));
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
