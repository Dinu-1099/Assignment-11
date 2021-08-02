import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private crud: CrudService) { }

  addUser = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    cname: new FormControl(''),
    website: new FormControl(''),
    customer_address: new FormControl(''),
    role: new FormControl('')
  })

  ngOnInit(): void {
  }
  collectUser() {
    console.log(this.addUser.value);
    this.crud.addUser(this.addUser.value).subscribe((result) => {
      console.log('success', result);
    }, (err) => {
      console.log(err);
    })
  }
}
