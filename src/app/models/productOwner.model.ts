import { BaseEntity } from './baseEntity.model';

export class ProductOwner extends BaseEntity {
  lastName: string;
  firstName: string;
  fullName: string;
}
