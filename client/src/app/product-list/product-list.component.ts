import { coerceStringArray } from '@angular/cdk/coercion';
import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../service/http.service';
import { Products } from '../products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  url:any = 'http://localhost:3000/images/';
  searchItem:any;

  public products:Products[];

  // tutorials?:any = [];
  // currentTutorial?:any;
  // currentIndex = -1;
  // title = '';

  constructor(private _postService: PostService, private router: Router) { }

  alert:boolean = false;

  public Allproducts:any = [];

  ngOnInit(): void {
    this.getProducts();
  }
  

getProducts(){
  this._postService.getData().subscribe({
     next: (data) =>{
      this.Allproducts = data
      Array.of(this.Allproducts)

     }
  }), (error) =>{
    alert('not fetched data')
  };
}


deleteAllProducts(){
 var response = confirm("Are you sure? Click OK to proceed otherwise click Cancel.");
  if ( response == true )
  {
    this._postService.deleteProducts().subscribe({
      next:(res) =>{
        this.ngOnInit();
      }
    }), (error) =>{
      console.log(error)
    }
  }
}

delete(pro){

//  var nwId =  this.Allproducts.slice(pro.id, 1)
  this._postService.deleteProductById(pro).subscribe({
    next: (res) =>{
      alert('Deleted Successfully')
      this.ngOnInit();
    }
  })
}


}

