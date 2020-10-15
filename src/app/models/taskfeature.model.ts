import { BaseEntity } from './baseEntity.model';

import { Project } from './project.model';
import { UserStory } from './userstory.model';
import { Developer } from './developer.model';
import { DeveloperDetailComponent } from '../developer/developerDetail/developerDetail.component';
import { Department } from './department.model';

export class TaskFeature extends BaseEntity {
  id: number;
  number: number;
  projectId: number;
  userStoryId: number;
  developerId: number;
  project: Project;
  userStory: UserStory;
  developer: Developer;
  // department: Department;
  label: string;
  feature: string;
  estimatedDuration: number;
  assumption: string;
  acceptanceCriteria: string;
  risk: string;
  priority: number;
  strPriority: string;
  priorityColor: number;
  strpriorityColor: string;
  statusColor: number;
  strStatusColor: string;
  taskStatus: number;
  strTaskStatus: string;
  dateDebut: Date;
  dateFin: Date;
  usLabel: string;

}
