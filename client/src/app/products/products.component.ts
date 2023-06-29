import { Component, OnInit, Type } from '@angular/core';
import { PostService } from '../service/http.service';
import { FormControl,FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  stationeryForm: FormGroup;
  PaidUnpaidstatus: string[] = ['Unpaid', 'Paid'];
  default: string = 'Unpaid';

  constructor(private _postService: PostService,  public formBuilder: FormBuilder) {
    this.stationeryForm= this.formBuilder.group({
      Name: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      Quantity: ['', Validators.required],
      TotalAmount: ['', Validators.required],
      Date: [''],
      Image: ['', Validators.required],
      // Status: ['', Validators.required],
      Status: new FormControl(null)
    })

    this.stationeryForm.controls['Status'].setValue(this.default, {onlySelf: true});
   }

   unitPrice:any;
   totalAmount:any;
   quantity:any;
   image:any;



  ngOnInit(): void {


    document.getElementById('TA').addEventListener('mouseenter', () =>{
      this.totalAmount = this.quantity * this.unitPrice
    })

  }


    //For Post Method---->
    selectFile(event) {
      //for selecting multiple files---->
      this.image = event.target.files[0];
       
      if (this.image) {
        for (let i = 0; i < this.image.length; i++) {
          this.checktype(this.image);
        }
      } 

      console.log(this.image)
    }
  
    checktype(file: File){
          if(file.type === "image/jpeg" || file.type === 'image/jpg' || file.type === 'image/png'){
            (document.getElementById('subBtn')as HTMLButtonElement).disabled = false;
          }else{
            alert('Please choose jpeg, png, jpg file');
            (document.getElementById('subBtn')as HTMLButtonElement).disabled = true;
          }
    }

    unitPriceChange(){
        var UP = this.stationeryForm.get('UnitPrice').value;
        var Q = this.stationeryForm.get('Quantity').value;
        var UPQ = UP*Q;

        this.stationeryForm.get('TotalAmount').setValue(UPQ);
    }

    quantityChange(){
      var UP = this.stationeryForm.get('UnitPrice').value;
      var Q = this.stationeryForm.get('Quantity').value;
      var UPQ = UP*Q;

      this.stationeryForm.get('TotalAmount').setValue(UPQ);
    }


  onSubmit(){

    
    const formData = new FormData();
    formData.append('Image',  this.image)
    formData.append('Name',  this.stationeryForm.get('Name').value)
    formData.append('UnitPrice',  this.stationeryForm.get('UnitPrice').value)
    formData.append('Quantity',  this.stationeryForm.get('Quantity').value)
    formData.append('TotalAmount',  this.stationeryForm.get('TotalAmount').value)
    formData.append('Date',  this.stationeryForm.get('Date').value)
    formData.append('Status',  this.stationeryForm.get('Status').value)
    this._postService.postImg(formData).subscribe({
      next: (res)=>{
        alert('Data Saved Successfully');
      }
    }), (error) =>{ alert('error in saving data')}
    

    var val = this.stationeryForm.get('Status').value
    console.log(val)
  }

}
