import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD-Operation-Project';
  displayedColumns: string[] = ['Customer Name', 'Contact Number', 'Table Number', 'Veg/Non-Veg', 'Pizza Mania', 'Quantity', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){     //Opens Up the component

  }
  ngOnInit(): void {
    this.getAllProducts();
  }
openDialog() {
  this.dialog.open(DialogComponent, {
   width :'35%'  ,
  }).afterClosed().subscribe(val=>{
    if(val ==='save'){
      this.getAllProducts();
    }
  })
 }
 getAllProducts(){
  this.api.getProduct()
  .subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
    },
    error : ()=>{
      alert("Error while fetching the order")
    }
  })
 }
 editProduct(row : any){
  this.dialog.open(DialogComponent,{
    width : '30%',
    data :row     
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProducts();
      }
    })
  }
 deleteProduct(id : number){
  this.api.deleteProduct(id)
  .subscribe({
    next :(res)=>{
      alert("Menu Deleted Succesfully")
      this.getAllProducts();
    },
    error:()=>{
      alert("Error while deleting the item!!!")
    }
  })

 }

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}}
