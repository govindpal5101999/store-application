import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../service/http.service';
import { Products } from '../products';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {


  PaidUnpaidstatus: string[] = ['Unpaid', 'Paid'];
  default: string = 'Unpaid';
  unitPrice: any;
  totalAmount: any;
  quantity: any;
  image: any;
  date: any;

  stationeryForm = new FormGroup({
    Name: new FormControl(''),
    UnitPrice: new FormControl(''),
    Quantity: new FormControl(''),
    TotalAmount: new FormControl(''),
    Date: new FormControl(''),
    Image: new FormControl(''),
    // Status: ['', Validators.required],
    Status: new FormControl('')
  })
  dataList: any = [];


  constructor(private _postService: PostService, private route: ActivatedRoute, private router: Router) {

    this.stationeryForm.controls['Status'].setValue(this.default, { onlySelf: true });
  }

  ngOnInit(): void {

    document.getElementById('TA').addEventListener('click', () => {
      this.totalAmount = this.quantity * this.unitPrice
    })

    this.getUpdate();
  }


  unitPriceChange() {
    var UP = this.stationeryForm.get('UnitPrice').value;
    var Q = this.stationeryForm.get('Quantity').value;
    var UPQ = UP * Q;

    this.stationeryForm.get('TotalAmount').setValue(UPQ);
  }

  quantityChange() {
    var UP = this.stationeryForm.get('UnitPrice').value;
    var Q = this.stationeryForm.get('Quantity').value;
    var UPQ = UP * Q;

    this.stationeryForm.get('TotalAmount').setValue(UPQ);
  }

  getUpdate() {
    this._postService.getDataById(this.route.snapshot.params.id).subscribe(res => {
      this.dataList = res;
      this.stationeryForm = new FormGroup({
        Name: new FormControl(this.dataList[0]['Name']),
        UnitPrice: new FormControl(this.dataList[0]['UnitPrice']),
        Quantity: new FormControl(this.dataList[0]['Quantity']),
        TotalAmount: new FormControl(this.dataList[0]['TotalAmount']),
        Date: new FormControl(this.dataList[0]['Date']),
        Image: new FormControl(this.dataList[0]['Image']),
        Status: new FormControl(this.dataList[0]['Status'])
      })
      this.stationeryForm.controls['Status'].setValue(this.default, { onlySelf: true });

      for (let i = 0; i < this.dataList.length; i++) {
        var d = this.dataList[i].Date;
        this.date = d.slice(0, 10)
      }
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


  checktype(file: File) {
    if (file.type === "image/jpeg" || file.type === 'image/jpg' || file.type === 'image/png') {
      (document.getElementById('subBtn') as HTMLButtonElement).disabled = false;
    } else {
      alert('Please choose jpeg, png, jpg file');
      (document.getElementById('subBtn') as HTMLButtonElement).disabled = true;
    }
  }

  onUpdate() {

    const formData = new FormData();
    formData.append('Image', this.image)
    formData.append('Name', this.stationeryForm.get('Name').value)
    formData.append('UnitPrice', this.stationeryForm.get('UnitPrice').value)
    formData.append('Quantity', this.stationeryForm.get('Quantity').value)
    formData.append('TotalAmount', this.stationeryForm.get('TotalAmount').value)
    formData.append('Date', this.stationeryForm.get('Date').value)
    formData.append('Status', this.stationeryForm.get('Status').value)
    this._postService.update(this.route.snapshot.params.id, formData).subscribe(res => {
      this.router.navigate(['/productList'])
    }), (err) => {
      alert('error in updating')
    };

  }

}
