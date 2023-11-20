import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: string = ''
  Id: string = ''
  user: any
  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.service.user.subscribe((user: any) => {
      console.log(user);
      if (user) {
        this.name = user.firstName
        this.Id = user._id
      }
    })
  }
}
