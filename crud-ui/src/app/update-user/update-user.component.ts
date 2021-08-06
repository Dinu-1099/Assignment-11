import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  editUser = new FormGroup({
    userid: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    address: new FormControl(''),
    customer_name: new FormControl(''),
    website: new FormControl(''),
    customer_address: new FormControl(''),
  });
  constructor(private route: ActivatedRoute, private crud: CrudService) {}

  ngOnInit(): void {
    this.crud.getCurrentUser(this.route.snapshot.params['']).subscribe(
      (result: any) => {
        console.log(result);

        this.editUser = new FormGroup({
          userid: new FormControl(result.userid),
          firstName: new FormControl(result.firstName),
          lastName: new FormControl(result.lastName),
          email: new FormControl(result.email),
          contact: new FormControl(result.contact),
          address: new FormControl(result.address),
          customer_name: new FormControl(result.customerName),
          website: new FormControl(result.website),
          customer_address: new FormControl(result.customer_address),
        });
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  collectUser() {
    this.crud
      .updateUser(this.route.snapshot.params[''], this.editUser.value)
      .subscribe(
        (result: any) => {
          console.log(result);
        },
        (err: Error) => {
          console.log(err);
        }
      );
  }
}
