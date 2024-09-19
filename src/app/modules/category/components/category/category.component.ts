import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElements>();

 
  getCategories(): void{
    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        console.log("respuesta...", data);
        this.processCategoriesResponse(data);
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


  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria agregada", "Con éxito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar", "Error");
        this.getCategories();
      }
      
    });
    
  }


  openSnackBar(mensaje: string, accion: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(mensaje, accion, {
      duration: 2000
    })
  }

  edit(id: number, nombre: string, descripcion: string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      data:{id: id, nombre: nombre, descripcion: descripcion}, width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria actualizad", "Con éxito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar", "Error");
        this.getCategories();
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data:{id: id}, width: '400px', height: '200px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Categoria eliminada", "Con éxito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar", "Error");
        this.getCategories();
      }
    });
  }

  buscarCategory(termino:string){
    if(termino.length === 0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(termino)
        .subscribe((resp:any) => {
          console.log('----->', resp);
          this.processCategoriesResponse(resp);
        })
  }


}

export interface CategoryElements {
  description: string,
  id: number,
  name: string
}
