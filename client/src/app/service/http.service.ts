import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../products';
  
@Injectable({
  providedIn: 'root'
})
export class PostService {

  private product:Products;
   
  constructor(private httpClient: HttpClient) { }

  getData(){
    return this.httpClient.get('/api/getData')
  }

  getDataById(id){
    return this.httpClient.get('/api/getdataById/'+ id)
  }

  delete(){
    return this.httpClient.get('/api/deleteAll')
  }

  postImg(img){
    return this.httpClient.post('/api/save', img)
  }

  getPaidStatus(){
    return this.httpClient.get('/api/paidstatus')
  }

  getUnpaidStatus(){
    return this.httpClient.get('/api/unpaidstatus')
  }

  deleteProductById(id){
    return this.httpClient.delete('/api/deleteById/'+id)
  }

  deleteProducts(){
    return this.httpClient.delete('/api/deleteAll')
  }

  findByDate(date){
    return this.httpClient.get('/api/getdatabyDate/'+ date)
  }

  findByDateQuantity(date){
    return this.httpClient.get('/api/getdatabyDateQauntity/'+ date)
  }

  update(id:any, data:any){
    return this.httpClient.put('/api/updateData/'+ id, data)
  }

  
  setter(product:Products){
    this.product = product;
  }

  getter(){
    return this.product
  }


  
}