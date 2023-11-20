import { Component } from '@angular/core';

interface SidenavToggle{
  screenWidth: number;
  collapsed:boolean;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  isSideNavCollapsed = false;
  screenWidth = 0;
  
  onToggleSidenav(event: Event): void {
    // Check if the event has the expected properties
    if (this.isSidenavToggleEvent(event)) {
      const sidenavToggleEvent = event as SidenavToggle;
      this.screenWidth = sidenavToggleEvent.screenWidth;
      this.isSideNavCollapsed = sidenavToggleEvent.collapsed;
    }
  }

  // Helper function to check if the event has the expected properties
  private isSidenavToggleEvent(event: any): event is SidenavToggle {
    return (
      event &&
      typeof event === 'object' &&
      'screenWidth' in event &&
      'collapsed' in event
    );
  }

}
