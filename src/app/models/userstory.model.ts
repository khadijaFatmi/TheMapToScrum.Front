import { BaseEntity } from './baseEntity.model';

import { Project } from './project.model';

export class UserStory extends BaseEntity {
  titre: string;
  version: string;
  projectId: number;
  project: Project;
  label: string;
  role: string;
  function1: string;
  function2: string;
  notes: string;
  priority: string;
  storyPoints: number;
  epicStory: boolean;

}
