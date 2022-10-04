import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SuperHero } from 'src/app/models/super-hero';
import { SuperHeroService } from 'src/app/services/super-hero.service';

@Component({
  selector: 'app-heroes-table',
  templateUrl: './heroes-table.component.html',
  styleUrls: ['./heroes-table.component.scss'],
})
export class HeroesTableComponent implements OnInit {
  displayedColumns = ['name', 'power', 'location'];
  heroes: SuperHero[] = [];

  constructor(private superHeroService: SuperHeroService) { }

  ngOnInit(): void {
    this.superHeroService
      .getSuperHeroes()
      .subscribe((result: SuperHero[]) => {
        this.heroes = result;
        console.log(this.heroes);
      });
  }
}
