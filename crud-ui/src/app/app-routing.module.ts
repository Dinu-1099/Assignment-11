import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {
    component: AddUserComponent,
    path: 'add',
  },
  {
    component: ListUsersComponent,
    path: 'users',
  },
  {
    component: UpdateUserComponent,
    path: 'update/:',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
