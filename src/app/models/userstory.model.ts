import { BaseEntity } from './baseEntity.model';

import { Project } from './project.model';

export class UserStory extends BaseEntity {
  label: string;
  version: string;
  projectId: number;
  project: Project;
  Label: string;
  role: string;
  function1: string;
  function2: string;
  notes: string;
  priority: string;
  storyPoints: number;
  epicStory: boolean;
  usStatus: number;
  strUsStatus: string;

}
