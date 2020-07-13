import { BaseEntity } from './baseEntity.model';

export class Projet extends BaseEntity {
  name: string;
  auteur: string;
  equipe: string;
  pole: string;
  datecreation: Date;
}

