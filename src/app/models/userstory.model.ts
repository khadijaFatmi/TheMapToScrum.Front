import { BaseEntity } from './baseEntity.model';
import { ProjetService } from '../ProjetUS/ProjetUSListe.service';
import { ProjetUserStory } from './projetUserStory.model';

export class UserStory extends BaseEntity {
  titre: string;
  version: string;
  projetId: number;
  projet: ProjetUserStory;
  name: string;
  role: string;
  function1: string;
  function2: string;
  notes: string;
  priority: string;
  storyPoints: number;
  epicStory: boolean;

}
