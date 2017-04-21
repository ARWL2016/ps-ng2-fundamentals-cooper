import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  EventsListComponent, 
  EventService, 
  EventThumbnailComponent, 
  EventDetailsComponent, 
  CreateEventComponent,
  EventRouteActivator, 
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe

} from './events/index'; 

import {EventsAppComponent} from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import {Error404Component} from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { TOASTR_TOKEN, Toastr } from "./common/toastr.service";

// there is a global toastr object
declare let toastr:Toastr; 

@NgModule({
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
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
    DurationPipe

  ], 
  providers: [ 
    EventService, 
    { provide: TOASTR_TOKEN, useValue: toastr}, 
    EventRouteActivator,
    EventListResolver,
    AuthService,
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