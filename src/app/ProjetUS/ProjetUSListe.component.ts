import { Component, OnInit } from '@angular/core';
import { ProjetService } from './ProjetUSListe.service';
import { ProjetUserStory } from '../models/projetUserStory.model';

@Component({
  selector: 'app-projetusliste',
  templateUrl: './ProjetUSListe.component.html',
  styleUrls: ['./ProjetUSListe.component.css']
})
export class ProjetUSListeComponent implements OnInit {
  public projets: ProjetUserStory[];
  displayedColumns: string[] = ['libelle', 'auteur', 'equipe', 'pole', 'datecreation'];
  public dataSource: any;

  constructor(private service: ProjetService) {
  }

  ngOnInit()
  {
   this.service.liste().
   subscribe(data => {
    this.projets = data;
    this.dataSource = this.projets;
    console.log('lecture ok kdij :-)', data);
  },
  error => {
    console.log('erreur lecture :-/');
  }
   );
}
}
