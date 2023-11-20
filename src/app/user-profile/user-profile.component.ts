import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:any
  id:string = ''
  constructor(private service :UserService) {
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      const parseObj = JSON.parse(userData)
      this.id = parseObj._id
    }
   }

  ngOnInit(): void {
    this.service.getSingleUser(this.id).subscribe(user => {
      this.user = user;
    })
  }

}
