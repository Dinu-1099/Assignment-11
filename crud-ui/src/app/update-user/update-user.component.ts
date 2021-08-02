import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  // userData: any = {};

  editUser = new FormGroup({
    userid: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    address:new FormControl(''),
    customer_name: new FormControl(''),
    website: new FormControl(''),
    customer_address: new FormControl(''),
  })
  constructor(private route: ActivatedRoute, private crud: CrudService) {

  }



  ngOnInit(): void {
    this.crud.getCurrentUser(this.route.snapshot.params.id).subscribe((result: any) => {
      this.editUser = new FormGroup({
        userid: new FormControl(result[0].userid),
        name: new FormControl(result[0].name),
        email: new FormControl(result[0].email),
        contact: new FormControl(result[0].contact),
        address:new FormControl(result[0].address),
        customer_name: new FormControl(result[0].customer_name),
        website: new FormControl(result[0].website),
        customer_address: new FormControl(result[0].customer_address),
        role: new FormControl(result[0].role)
      })
    }, (err: Error) => {
      console.log(err);
    })
  }

  collectUser() {
    this.crud.updateUser(this.route.snapshot.params.id, this.editUser.value).subscribe((result: any) => {
      console.log(result);
    }, (err: Error) => {
      console.log(err);
    })
  }

}
