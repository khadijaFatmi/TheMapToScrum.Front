import { Pipe, PipeTransform } from '@angular/core';

import { UserStory } from '../models/userstory.model';

@Pipe({
  name: 'Ouinon'
})
export class OuinonPipe implements PipeTransform
{
  transform(epicStory: boolean): string {
    return epicStory ? 'Yes' : 'No';
  }

}
