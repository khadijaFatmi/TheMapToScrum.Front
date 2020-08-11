import { BaseEntity } from './baseEntity.model';

import { Team } from './team.model';
import { BusinessManager } from './businessManager.model';
import { Department } from './department.model';
import { TechnicalManager } from './technicalManager.model';

export class Project extends BaseEntity {
  label: string;
  businessManagerId: number;
  technicalManagerId: number;
  teamId: number;
  departmentId: number;
  businessManager: BusinessManager;
  technicalManager: TechnicalManager;
  team: Team;
  department: Department;
}

