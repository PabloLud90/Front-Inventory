import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);


  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElements>();

 
  getCategories(): void{
    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        console.log("respuesta...", data);
       // this.processCategoriesResponse(data);
      }, (e: any) => {
        console.log("error......", e);
      });
  }

  processCategoriesResponse(resp:any){
    const dataCategory: CategoryElements[] =[];

    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElements )=> {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElements>(dataCategory);

    }


  }

}

export interface CategoryElements {
  description: string,
  id: number,
  name: string
}
