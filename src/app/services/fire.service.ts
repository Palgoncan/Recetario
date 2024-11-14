import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Recipe } from '../model/recipe';


@Injectable({
  providedIn: 'root'
})
export class FireService {

  firestore = inject(AngularFirestore);
  itemCollection!: AngularFirestoreCollection<any>;
  items$!: Observable<any[]>;
  auth = inject(AuthService);


  constructor() {
     this.itemCollection = this.firestore.collection(`users/${this.auth.userData.uid}/recipes`);
     this.items$ = this.itemCollection.valueChanges();
   }

   createRecipe(recipe: Recipe):Promise<DocumentReference<any>> {
    return this.itemCollection.add(recipe);
   }
   deleteRecipe(id:string): Promise<void>{
     return this.itemCollection.doc(id).delete(); 
   }
   getRecipesById(id:string):Observable<Recipe>{
     return this.itemCollection.doc(id).valueChanges();
   }
   //update to do
   getRecipes():Observable<Recipe[]> {
      return this.items$;
   }
}