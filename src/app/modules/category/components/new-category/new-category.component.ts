import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }

  onSave(){
    let data = {
      nombre: this.categoryForm.get('nombre')?.value,
      descripcion: this.categoryForm.get('descripcion')?.value
    }

    this.categoryService.saveCategory(data)
    .subscribe((data:any) => {
      console.log(data);
      this.dialogRef.close(1);
    }, (error:any) => {
      this.dialogRef.close(2);
    });

  }

  onCancel(){
    this.dialogRef.close(3)
  }


}
