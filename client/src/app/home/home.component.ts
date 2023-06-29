import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/http.service';
import $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  statusdata: any = [];
  url: any = 'http://localhost:3000/images/';
  Unpaidstatusdata: any = [];
  customDate: any;
  dataContainer: any = [];
  total: number = 0;
  maxQuant:any = [];
  getDate: boolean = false;

  constructor(private _postService: PostService) { }

  ngOnInit(): void {


    this.timeZone();
    this.getPaidDetails();
    this.getUnpaidDetails();
    this.changeDate();
    this.getDataByDate();

  }

  timeZone() {
    var d = new Date();
    this.customDate = `${d.getFullYear()}-${('' + (d.getMonth()) + 1).slice(-2)}-${('0' + (d.getDate())).slice(-2)}`
    console.log(this.customDate)
  }


  getPaidDetails() {
    this._postService.getPaidStatus().subscribe({
      next: (res) => {
        this.statusdata = res

        for (let i = 0; i < this.statusdata.length; i++) {
          var current = this.statusdata[i]._id
        }
        if (this.statusdata.length === 0) {
          document.getElementById('paid-error').innerHTML = "No Data To Show";
          document.getElementById('paid-table').style.display = 'none';
        }
      }
    }), (error) => {
      alert('error in fetching')
    }
  }


  getUnpaidDetails() {
    this._postService.getUnpaidStatus().subscribe({
      next: (res) => {
        this.Unpaidstatusdata = res;
        if (this.Unpaidstatusdata.length === 0) {
          document.getElementById('unpaid-error').innerHTML = "No Data To Show";
          document.getElementById('unpaid-table').style.display = 'none';
        }


      }
    }), (error) => {
      alert('error in fetching')
    }
  }

  getDataByDate() {
    this._postService.findByDate(this.customDate).subscribe({
      next: (data) => {
        this.dataContainer = data;
        if(this.dataContainer.length <=0){
          document.getElementById('sales-error').style.display = 'block';
        }else{
          document.getElementById('sales-error').style.display = 'none';
        }
        if (this.dataContainer.length > 0) {
          for (let i = 0; i < this.dataContainer.length; i++) {
            this.total += this.dataContainer[i].TotalAmount;
          }
          var current_progress = 0;
          if (this.total > 0 && this.total <= 500) {
            current_progress += 25;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
          }
          if (this.total > 500 && this.total <= 1000) {
            current_progress += 50;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
            if (current_progress >= 100) { }
          }
          if (this.total > 1000 && this.total <= 1500) {
            current_progress += 75;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
            if (current_progress >= 100) { }
          }
          if (this.total > 2000) {
            current_progress += 100;
            $("#dynamic")
              .css("width", current_progress + "%")
              .attr("aria-valuenow", current_progress)
              .text(current_progress + "%");
          }
          document.getElementById('scroll').style.display = "block";
        } else {
          this.total = 0;
          current_progress = 0
          $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .text(current_progress + "%");
        }
      }
    })

    this.getDate = false;
  }

  
  changeDate() {
    this.total = 0;
    this.getDate = true;  
  }


}
