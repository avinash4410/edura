import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface SideNavToggle {
  isSideNavCollapsed: boolean;
  screenWidht: number;
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  }
