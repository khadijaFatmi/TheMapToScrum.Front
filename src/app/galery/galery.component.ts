import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-galery',
  templateUrl: './galery.component.html',
  styleUrls: ['./galery.component.css']
})
export class GaleryComponent implements OnInit {

  constructor() { }

  slides = [
    {image: 'assets/galery/CitationsScrum1.jpg', description: 'quote 01'}
    , {image: 'assets/galery/CitationsScrum2.jpg', description: 'quote 02'}
    , {image: 'assets/galery/CitationsScrum3.jpg', description: 'quote 03'}
    , {image: 'assets/galery/CitationsScrum4.jpg', description: 'quote 04'}
    , {image: 'assets/galery/CitationsScrum5.jpg', description: 'quote 05'}
    , {image: 'assets/galery/CitationsScrum6.jpg', description: 'quote 06'}
    , {image: 'assets/galery/CitationsScrum7.jpg', description: 'quote 07'}
    , {image: 'assets/galery/CitationsScrum8.jpg', description: 'quote 08'}
    , {image: 'assets/galery/CitationsScrum9.jpg', description: 'quote 09'}
    , {image: 'assets/galery/CitationsScrum10.jpg', description: 'quote 10'}
    , {image: 'assets/galery/CitationsScrum11.jpg', description: 'quote 11'}
    , {image: 'assets/galery/CitationsScrum12.jpg', description: 'quote 12'}
    , {image: 'assets/galery/CitationsScrum13.jpg', description: 'quote 13'}
    , {image: 'assets/galery/CitationsScrum14.jpg', description: 'quote 14'}
    // faute de frappe , {image: 'assets/galery/CitationsScrum15.jpg', description: 'quote 15'}
    , {image: 'assets/galery/CitationsScrum16.jpg', description: 'quote 16'}
    , {image: 'assets/galery/CitationsScrum17.jpg', description: 'quote 17'}
    , {image: 'assets/galery/CitationsScrum18.jpg', description: 'quote 18'}
    , {image: 'assets/galery/CitationsScrum19.jpg', description: 'quote 19'}
    , {image: 'assets/galery/CitationsScrum20.jpg', description: 'quote 20'}
    , {image: 'assets/galery/CitationsScrum21.jpg', description: 'quote 21'}
    , {image: 'assets/galery/CitationsScrum22.jpg', description: 'quote 22'}
    , {image: 'assets/galery/CitationsScrum23.jpg', description: 'quote 23'}
    , {image: 'assets/galery/CitationsScrum24.jpg', description: 'quote 24'}
    , {image: 'assets/galery/CitationsScrum25.jpg', description: 'quote 25'}
    , {image: 'assets/galery/CitationsScrum26.jpg', description: 'quote 26'}
    , {image: 'assets/galery/CitationsScrum27.jpg', description: 'quote 27'}
    , {image: 'assets/galery/CitationsScrum28.jpg', description: 'quote 28'}
    , {image: 'assets/galery/CitationsScrum29.jpg', description: 'quote 29'}
    , {image: 'assets/galery/CitationsScrum30.jpg', description: 'quote 30'}
    , {image: 'assets/galery/CitationsScrum31.jpg', description: 'quote 31'}
    , {image: 'assets/galery/CitationsScrum32.jpg', description: 'quote 32'}
    , {image: 'assets/galery/CitationsScrum33.jpg', description: 'quote 33'}
    , {image: 'assets/galery/CitationsScrum34.jpg', description: 'quote 34'}
    , {image: 'assets/galery/CitationsScrum35.jpg', description: 'quote 35'}
    , {image: 'assets/galery/CitationsScrum36.jpg', description: 'quote 36'}
    , {image: 'assets/galery/CitationsScrum37.jpg', description: 'quote 37'}
    , {image: 'assets/galery/CitationsScrum38.jpg', description: 'quote 38'}
    , {image: 'assets/galery/CitationsScrum39.jpg', description: 'quote 39'}
    , {image: 'assets/galery/CitationsScrum40.jpg', description: 'quote 40'}
    , {image: 'assets/galery/CitationsScrum41.jpg', description: 'quote 41'}
    , {image: 'assets/galery/CitationsScrum42.jpg', description: 'quote 42'}
    , {image: 'assets/galery/CitationsScrum43.jpg', description: 'quote 43'}
    , {image: 'assets/galery/CitationsScrum44.jpg', description: 'quote 44'}
    , {image: 'assets/galery/CitationsScrum45.jpg', description: 'quote 45'}
  ];


  ngOnInit() {
  }

}
