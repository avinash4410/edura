import { NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { myReactiveForm } from '@angular/forms'


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { DirectorDashboardComponent } from './director-dashboard/director-dashboard.component';
import { SupplierDashboardComponent } from './supplier-dashboard/supplier-dashboard.component';

import { ProfileCardComponent } from './profile-card/profile-card.component';
import { UserService } from './services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { AdmissionEnquiryComponent } from './admission-enquiry/admission-enquiry.component';
import { VisitorBookComponent } from './visitor-book/visitor-book.component';
import { PhoneCallLogComponent } from './phone-call-log/phone-call-log.component';
import { PostalDispatchComponent } from './postal-dispatch/postal-dispatch.component';
import { PostalReceiveComponent } from './postal-receive/postal-receive.component';
import { ComplainComponent } from './complain/complain.component';
import { SetupFrontOfficeComponent } from './setup-front-office/setup-front-office.component';
import { CurrentSessionComponent } from './current-session/current-session.component';
import { QuickLinksComponent } from './quick-links/quick-links.component';
// import { SublevelMenuComponent } from './layouts/admin-layout/sublevel-menu.component';

import { StudentInformationComponent } from './student-information/student-information.component';
import { FeesCollectionComponent } from './fees-collection/fees-collection.component';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExaminationsComponent } from './examinations/examinations.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { AcademicsComponent } from './academics/academics.component';
import { HumanResourceComponent } from './human-resource/human-resource.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminBodyComponent } from './admin-body/admin-body.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrorComponent,
    RegistrationComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    UserProfileComponent,
    ListUsersComponent,
    ManagerDashboardComponent,
    DirectorDashboardComponent,
    SupplierDashboardComponent,
   
    ProfileCardComponent,
    SidenavComponent,
    FrontOfficeComponent,
    AdmissionEnquiryComponent,
    VisitorBookComponent,
    PhoneCallLogComponent,
    PostalDispatchComponent,
    PostalReceiveComponent,
    ComplainComponent,
    SetupFrontOfficeComponent,
    CurrentSessionComponent,
    QuickLinksComponent,
    // SublevelMenuComponent,
  
    StudentInformationComponent,
    FeesCollectionComponent,
    IncomeComponent,
    ExpensesComponent,
    ExaminationsComponent,
    LessonPlanComponent,
    AcademicsComponent,
    HumanResourceComponent,
    AdminBodyComponent,
    AdminPanelComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    DataTablesModule,

    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
