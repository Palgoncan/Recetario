import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  api = inject(ApiService);
  router = inject(Router);

  $state:WritableSignal<any> = signal({
    type:'nationality',
    loading:false,
    error:false,
    data:[]
  });

  @Input()
  set type(type:string){
    //1.Analizar el valor
    //2.LLamar al servicio

    //Hemos recibido un cambio en la ruta
    this.$state.update(state =>(
      {...state, loading:true, type:type}
    ));

    let request:Observable<any>;
    switch(type){
      case 'category':
        request = this.api.getCategories();
        break;
      default:
        request = this.api.getNationalities();
    }


    request.subscribe(
      (data: any) => {
        this.$state.update(state => (
          { ...state, loading: false, error: false, 
            data: data.map((m:any)=>(type == 'category' ? ({name:m.strCategory}) : ({name:m.strArea})))}
        ))
        console.log(data)
      },
      (err) => {
        console.log(err)
        this.$state.update(state => (
          { ...state, loading: false, error: err, data: [] }
        ))
      });
  }



  listRecipes(ingredient:string){
    //ir a la pagina recipe/tipo/ingredient
    this.router.navigate(['recipes', this.$state().type, ingredient]);
  }
}
