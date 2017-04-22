import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http'; 

import {
  EventsListComponent, 
  EventService, 
  EventThumbnailComponent, 
  EventDetailsComponent, 
  CreateEventComponent,
  EventListResolver,
  EventResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe, 
  UpvoteComponent, 
  VoterService, 
  LocationValidator } from './events/index'; 

import { EventsAppComponent } from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import {Error404Component} from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { 
  JQ_TOKEN, 
  TOASTR_TOKEN, 
  Toastr, 
  CollapsibleWellComponent, 
  SimpleModal, 
  ModalTriggerDirective } from './common/index'; 

// there is a global toastr object
declare let toastr:Toastr; 
declare let jQuery: Object; 

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ], 
  declarations: [
    EventsAppComponent, 
    NavBarComponent,
    EventsListComponent, 
    EventThumbnailComponent, 
    EventDetailsComponent, 
    CreateEventComponent,
    Error404Component, 
    CreateSessionComponent, 
    SessionListComponent, 
    CollapsibleWellComponent, 
    DurationPipe, 
    SimpleModal, 
    ModalTriggerDirective, 
    UpvoteComponent, 
    LocationValidator

  ], 
  providers: [ 
    EventService, 
    { provide: TOASTR_TOKEN, useValue: toastr}, 
    { provide: JQ_TOKEN, useValue: jQuery}, 
    EventListResolver,
    EventResolver,
    AuthService,
    VoterService,
    {
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState
    }
     ], 
  bootstrap: [ EventsAppComponent ]
})
export class AppModule{}

function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm("Not saved. Really leave?"); 
  }
  return true; 
}