import { BaseEntity } from './baseEntity.model';

export class ProjetUserStory extends BaseEntity {
  libelle: string;
  auteur: string;
  equipe: string;
  pole: string;
  datecreation: Date;
}

