import { BaseEntity } from './baseEntity.model';

import { Projet } from './projets.model';

export class UserStory extends BaseEntity {
  titre: string;
  version: string;
  projetId: number;
  projet: Projet;
  name: string;
  role: string;
  function1: string;
  function2: string;
  notes: string;
  priority: string;
  storyPoints: number;
  epicStory: boolean;

}
