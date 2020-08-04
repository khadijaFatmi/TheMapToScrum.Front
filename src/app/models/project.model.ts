import { BaseEntity } from './baseEntity.model';

import { Team } from './team.model';
import { BusinessManager } from './businessManager.model';
import { Department } from './department.model';

export class Project extends BaseEntity {
  label: string;
  businessManagerId: number;
  technicalManagerId: number;
  teamId: number;
  departmentId: number;
  businessManager: BusinessManager;
  team: Team;
  department: Department;


}

