import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  user:any;
  constructor(private service : AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('UserData'))
    console.log("............",this.user);
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out!'
    }).then((result) => {
      if (result.value) {
        this.service.SignOut();
      }
    })
  }

}
