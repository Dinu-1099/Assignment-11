import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  constructor(private crud: CrudService) {}
  collection: any;
  objectKeys = Object.keys;
  ngOnInit(): void {
    this.crud.getList().subscribe((result) => {
      this.collection = result;
    });
  }
  deleteUser(id: any) {
    this.crud.deleteUser(id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
