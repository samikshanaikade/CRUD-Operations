import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from'@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit{
  freshnessList = ["Veg", "Non-Veg"]

  productForm !: FormGroup

  actionBtn: String = "Save"

  constructor(private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA)  public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){}


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      customerName :['',Validators.required],
      contactNumber :['',Validators.required],
      tableNumber : ['',Validators.required],
      kind : ['',Validators.required],
      pizzaMania : ['',Validators.required],
      quantity : ['',Validators.required]
    })      

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls["customerName"].setValue(this.editData.customerName);
      this.productForm.controls["contactNumber"].setValue(this.editData.contactNumber);
      this.productForm.controls["tableNumber"].setValue(this.editData.tableNumber);
      this.productForm.controls["kind"].setValue(this.editData.kind);
      this.productForm.controls["pizzaMania"].setValue(this.editData.pizzaMania);
      this.productForm.controls["quantity"].setValue(this.editData.quantity);
    }    
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert("Menu added succesfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error :()=>{
            alert("Error while adding Menu")
          }
        })
      }else{
        this.updateProduct()
      }
    }
  }
    updateProduct(){
      this.api.putProduct(this.productForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Item updated Succesfully")
          this.productForm.reset()
          this.dialogRef.close('update')
        },
        error:()=>{
          alert("Error while updating the item!!!")
        }
      })
    }
  }



