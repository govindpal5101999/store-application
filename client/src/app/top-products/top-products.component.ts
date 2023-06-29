import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import $ from 'jquery';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent implements OnInit {

  url: any = 'http://localhost:3000/images/';
  customDate: any;
  topData:any= [];
  maxQuantity: any;
  getDate: boolean = false;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {
        this.timeZone();
        this.getQuantity();
  }

  timeZone() {
    var d = new Date();
    this.customDate = `${d.getFullYear()}-${('' + (d.getMonth()) + 1).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`
    console.log(this.customDate)
  }


  getQuantity(){
    this._postService.findByDateQuantity(this.customDate).subscribe(res =>{
      this.topData  = res;
        if(this.topData.length <= 0){
            document.getElementById('top-para').style.display = 'block';
        }else{
          document.getElementById('top-para').style.display = 'none';
        }
    })

    this.getDate = false
  }

changeDate(){
  this.getDate = true;
}

}
