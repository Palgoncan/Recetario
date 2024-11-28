import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass, FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);
  selectedRecipeId: string | null = null;
  isEditModalOpen = false;

  @Input()
  type: string = '';

  @Input()
  subtype: string = '';

  isModalOpen: boolean = false;

  $state: WritableSignal<any> = signal({
    loading: false,
    error: false,
    data: []
  });

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.$state.update(state => ({
      ...state,
      loading: true
    }));

    let resquest;
    switch (this.type) {
      case 'category':
        resquest = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        resquest = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        resquest = this.fire.getRecipesWithID();
        break;
      default:
        console.log('Fetching favorites');
        resquest = null;
    }

    if (resquest) {
      (resquest as any).subscribe({
        next: (data: any) => {
          data.reduce((acc: any, item: any) => {
            const { id, ...recipeData } = item;
            acc[id] = recipeData;
            return acc;
          }, {});

          this.$state.update(state => ({
            ...state,
            loading: false,
            error: false,
            data: data
          }));
        },
        error: (err: any) => {
          this.$state.update(state => ({
            ...state,
            loading: false,
            error: err,
            data: []
          }));
        }
      });
    } else {
      this.$state.update(state => ({
        ...state,
        loading: false,
        error: false,
        data: []
      }));
    }
  }

  goToRecipe(idMeal: string) {
  if (this.type === undefined) {
    this.router.navigate(['recipe/favorites', idMeal]);
  } else {
    this.router.navigate(['recipe', idMeal]);
  }
}

  openModal() {
    this.isModalOpen = true;
    history.pushState({}, document.title);
  }

  closeModal($event?: any) {
    if ($event) {
      console.log("Desde el componente que abre el modal" + $event);
    }
    this.isModalOpen = false;
  }

  async deleteRecipe(idMeal: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
      try {
        await this.fire.deleteRecipe(idMeal);
        this.fetchData();
      } catch (error) {
        console.error('Error al eliminar la receta:', error);
      }
    }
  }

  editRecipe(idMeal: string): void {
    this.router.navigate([`/favorites/edit/${idMeal}`]);
  }

}
