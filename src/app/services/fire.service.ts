import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
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
    const path = `users/${this.auth.userData.uid}/recipes`;
    console.log('Ruta de la colección:', path);
    this.itemCollection = this.firestore.collection(path);
    this.items$ = this.itemCollection.valueChanges({ idField: 'id' });
  }

  createRecipe(recipe: Recipe): Promise<DocumentReference<any>> {
    return this.itemCollection.add(recipe);
  }

  deleteRecipe(id: string): Promise<void> {
    return this.itemCollection.doc(id).delete();
  }

  getRecipesById(id: string): Observable<Recipe> {
    console.log('Fetching recipe with ID:', id);
    return this.itemCollection.doc(id).valueChanges();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.items$;
  }

  getRecipesWithID() {
    return this.itemCollection.snapshotChanges().pipe(
      map((actions: any) => actions.map((a: any) => {
        const data = a.payload.doc.data() as Recipe;
        const idMeal = a.payload.doc.id;
        return { idMeal: idMeal, ...data };
      }))
    );
  }
}