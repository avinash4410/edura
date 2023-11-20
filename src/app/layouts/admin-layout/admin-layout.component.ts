import { Component, EventEmitter, OnInit, Output, HostListener, Input, ElementRef } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;

}


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  animations:[
    trigger('fadeInOut',[
          transition(':enter',[
            style({opacity : 0}),
            animate('350ms',
            style({opacity : 1}))
          ]),
          transition(':leave',[
            style({opacity : 1}),
            animate('350ms',
            style({opacity : 0}))
          ])



    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform : 'rotate(0deg)',offset:'0'}),
          style({transform : 'rotate(2turn)', offset : '1'})
        ]))
      ])
    ])

  ]
})
export class AdminLayoutComponent implements OnInit {
  constructor(private service: AuthService,private el: ElementRef) { }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  user: any;
  collapsed = false; //true kely natr actions hotey but inside hoty //
  screenWidth = 0;
  navData = navbarData;
  @Input() data: any; // Define the input property 'data'

  @HostListener('window:resize',['$event'])
  onResize(event : any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed : this.collapsed, screenWidth:this.screenWidth});

    }
  }

  onMouseEnter(): void {
    // Check if the sidenav was collapsed and the cursor is entering
    if (this.collapsed) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      this.toggleCollapse();
    }
  }

  onMouseLeave(event: MouseEvent): void {
    // Check if the event target is outside the sidenav element
    if (this.collapsed && !this.el.nativeElement.contains(event.relatedTarget)) {
      this.closeSidenav();
    }
  }
  


  isSideNavCollapsed= true
  filteredMenus: any = []
  role: string = ''
  sideNavOpen: boolean;

  ngOnInit(): void {
    // this.menu = navbar.menus
    const userData = localStorage.getItem('UserData');
    if (userData != null) {
      const parseObj = JSON.parse(userData)
      this.role = parseObj.role[0]
    }
    this.user = JSON.parse(localStorage.getItem('UserData'))
    console.log("............", this.user);

    this.screenWidth = window.innerWidth;
    this.el.nativeElement.addEventListener('mouseleave', (event:any) => this.onMouseLeave(event));

  }



  toggleCollapse():void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed : this.collapsed, screenWidth:this.screenWidth});
    this.updateBodyClass();
  }

  closeSidenav():void{
    this.collapsed = false
    this.resetSubMenus();
    this.onToggleSideNav.emit({collapsed : this.collapsed, screenWidth:this.screenWidth});
    this.updateBodyClass();
    
  }

  toggleSubMenu(menuItem: any): void {
    menuItem.showSubItems = !menuItem.showSubItems;
  }
  
  resetSubMenus(): void {
    this.navData.forEach(item => (item.showSubItems = false));
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

  private updateBodyClass() {
    if (this.collapsed) {
      document.body.classList.remove('sidenav-expanded');
    } else {
      document.body.classList.add('sidenav-expanded');
    }
  }

}


