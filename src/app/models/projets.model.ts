import { BaseEntity } from './baseEntity.model';

export class Projet extends BaseEntity {
  label: string;
  authorId: string;
  teamId: string;
  departmentId: string;
  datecreation: Date;
}

