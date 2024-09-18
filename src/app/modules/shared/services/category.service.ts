import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base_url = "http://localhost:8080/api/v1";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { 

  }

  config() :void {
    
  }

  /** 
   * Obtiene todas las categorias*/
  getCategories(){
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }

  /**
   * Guardar Categorias
   */
  saveCategory(body: any){
    const endpoint =`${base_url}/categories`;
    return this.http.post(endpoint, body);

  }



  //** Obtiene todas las categorias por ID**/
  getCategoryById(){

  }

}
