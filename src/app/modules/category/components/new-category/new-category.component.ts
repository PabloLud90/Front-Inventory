import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm!:  FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public estadoFormulario: string = "";


  ngOnInit(): void {
    console.log("Actualizar..",this.data);
    this.estadoFormulario = "Agregar";
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })

    if( this.data != null ){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar"
    }
  }

  onSave(){
    let data = {
      nombre: this.categoryForm.get('nombre')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value
    }

    if (this.data != null ) {
      //actualiza registro
      this.categoryService.updateCategory(data, this.data.id)
            .subscribe((data:any) => {
              this.dialogRef.close(1);
            }, (error: any) => {
              this.dialogRef.close(2);

            })


    }else{
      //crea nuevo registro
      this.categoryService.saveCategory(data)
      .subscribe((data:any) => {
        console.log(data);
        this.dialogRef.close(1);
      }, (error:any) => {
        this.dialogRef.close(2);
      });
    }
  }

  onCancel(){
    this.dialogRef.close(3)
  }

  updateForm(data:any){
    this.categoryForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      descripcion: [data.descripcion, Validators.required],
    })
  }


}
