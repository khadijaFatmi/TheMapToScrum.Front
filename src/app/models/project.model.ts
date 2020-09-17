import { BaseEntity } from './baseEntity.model';

import { Team } from './team.model';
import { ProductOwner } from './productOwner.model';
import { Department } from './department.model';
import { ScrumMaster } from './scrumMaster.model';

export class Project extends BaseEntity {
  label: string;
  projectStatus: number;
  strProjectStatus: string;
  productOwnerId: number;
  scrumMasterId: number;
  teamId: number;
  departmentId: number;
  productOwner: ProductOwner;
  scrumMaster: ScrumMaster;
  team: Team;
  department: Department;
}

