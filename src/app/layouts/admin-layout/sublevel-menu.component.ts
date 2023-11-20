// import { Component, Input, OnInit } from '@angular/core';
// import { INavbarData } from './helper';
// import { trigger, state, style, transition, animate } from '@angular/animations';

// @Component({
//   selector: 'app-sublevel-menu',
//   template: `
//     <!-- Your component template here -->
//     <ul *ngIf="collapsed && data.items && data.items.length > 0" 
//     class ="sublevel-menu">
//     <li *ngFor="let item of data.items"  class="sublevel-menu-item">
//       <a class ="sublevel-menu-link" 
//       (click)="handleClick(item)"
//       *ngIf="item.items && item.items.length > 0 ">
//       <i class="sublevel-link-icon fa fa-circle"></i>
//       <span class="sublevel-link-text" *ngIf="collapsed">{{item. label}}</span>
//       <i *ngIf="item. items && collapsed" class="menu-collapse-icon" [ngClass]="litem.expanded? 'fal fa-angle-right': 'fal fa-angle-down' "></i>
//     </a>
//     <a class="sublevel-nav-link" *ngIf="litem.items || (item.items && item. items.length == 0)" [routerLink]="[item. routeLink]" routerLinkActive="active-sublevel"[routerLinkActiveOptions]="{exact: true}">
//     <i class="sublevel-link-icon fa fa-circle"></i> <span class="sublevel-link-text" *ngIf="collapsed">{{item. label}}</span> </a>

    


// </li>

// </ul>

//   `,
//   styleUrls: ['./admin-layout.component.css'],
//   animations: [
//     trigger('submenu', [
//       state('collapsed', style({
//         height: '0',
//         overflow: 'hidden',
//         opacity: 0,
//       })),
//       state('expanded', style({
//         height: '*',
//         overflow: 'visible',
//         opacity: 1,
//       })),
//       transition('collapsed <=> expanded', animate('200ms ease-in-out')),
//     ]),
//   ],
// })
// export class SublevelMenuComponent implements OnInit {
//   @Input() data: INavbarData = {
//     routeLink: '',
//     icon: '',
//     label: '',
//     items: []
//   };

//   @Input() collapsed = false;
//   @Input() animating: boolean = false;
//   @Input() multiple = false;
//   @Input() expanded = false;
//   litem: any;

//   constructor() { }

//   ngOnInit(): void { }

//   handleClick(item: INavbarData): void {
//     if (!this.multiple) {
//       if (this.data.items && this.data.items.length > 0) {
//         for (let modelItem of this.data.items) {
//           if (item !== modelItem && modelItem.expanded) {
//             modelItem.expanded = false;
//           }
//         }
//       }
//     }
//     item.expanded = !item.expanded;
//   }
// }
