import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);

  @Input()
  type:string='';

  @Input()
  subtype:string='';

  $state:WritableSignal<any> = signal({
    loading:false,
    error:false,
    data:[]
  });

  ngOnInit(){
    this.fetchData();
  }

  fetchData(){
    this.$state.update(state => ({...state, loading:true}));


    let request;
    switch(this.type){
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      default:
        request = null;
    }

    if(request){
      
      
      request.subscribe({
        next: (data)=>{
          this.$state.update(state => ({...state, loading:false, data:data}));
        },
        error: (error)=>{
          this.$state.update(state => ({...state, loading:false, error:error, data:[]}));
        }
      });
    }else{
      this.$state.update(state => ({...state, loading:false, error:'Categoría incorrecta'}));
    }
  }

  goToRecipe(idMeal:string){
    //Navega recipe/:id
    this.router.navigate(['recipe', idMeal]);
  }

}
