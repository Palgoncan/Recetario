import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Meal } from '../model/meal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);

  constructor() { }


  /**
   * Petición GET a la API para obtener las nacionalidades
   * @returns Observable que es un array de las nacionalidades de tipo {strArea:"nationality"}
   */
  getNationalities() : Observable<{strArea:string}[]>{
    return this.http.get(environment.api.natiolalities).pipe(map((response:any) => response.meals));

  }

  getCategories() : Observable<{strCategory:string}[]>{
    return this.http.get(environment.api.categories).pipe(map((response:any) => response.meals));

  }

  getRecipesByCategory(category:string) : Observable<{strMeal:string, strMealThumb:string, idMeal:string}[]>{
    return this.http.get(`${environment.api.listByCategory}${category}`).pipe(map((response:any) => response.meals));

  }

  getRecipesByNationality(nationality: string) : Observable<{strMeal:string,strMealThumb:string,idMeal:string}[]> {
    return this.http.get(`${environment.api.listByNationality}${nationality}`).pipe(map((res: any) => res.meals));
  } 

  getRecipesById(id:string) : Observable<Meal | undefined>{
    return this.http.get(`${environment.api.viewRecipe}${id}`)
      .pipe(map((response:any) => {
        if(response.meals && response.meals.length > 0)
          return response.meals[0]
        else
          return undefined;
      }));
  }
}
