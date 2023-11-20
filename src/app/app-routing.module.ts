import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



import { CurrentSessionComponent } from './current-session/current-session.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { AdmissionEnquiryComponent } from './admission-enquiry/admission-enquiry.component';
import { VisitorBookComponent } from './visitor-book/visitor-book.component';
import { SetupFrontOfficeComponent } from './setup-front-office/setup-front-office.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegistrationComponent
  },
  {
    path: '', component: AdminLayoutComponent,
    children: [
      // {
      //   path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
      // },

      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'current-session', component: CurrentSessionComponent, canActivate: [AuthGuard]
      },
      {
        path: 'admin-enquiry', component: AdmissionEnquiryComponent
      },
      {
        path: 'visitor-book', component: VisitorBookComponent
      },
      {
        path: 'quick-links', component: QuickLinksComponent, canActivate: [AuthGuard]
      },
      {
        path: 'Front setUp Master', component: SetupFrontOfficeComponent
      },
      
      {
        path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]
      },
     


    ]
  },
  {
    path: '**', component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
