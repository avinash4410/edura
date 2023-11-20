import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: any
  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.service.getUser().subscribe(user => this.users = user)
  }
  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Delete User?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUser(id).subscribe(res => {
          console.log(res);
          if (res) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User Deleted Successfully...!',
            })
            this.getUser()
          }
        })
      }
    })
  }

}
