import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';

import {
  EventsListComponent, 
  EventService, 
  EventThumbnailComponent, 
  EventDetailsComponent, 
  CreateEventComponent,
  EventRouteActivator, 
  EventListResolver

} from './events/index'; 

import {EventsAppComponent} from "./events-app.component";
import { NavBarComponent } from "./nav/navbar.component";
import { ToastrService } from "./common/toastr.service";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { Error404Component } from "./errors/404.component";



@NgModule({
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes)
  ], 
  declarations: [
    EventsAppComponent, 
    NavBarComponent,
    EventsListComponent, 
    EventThumbnailComponent, 
    EventDetailsComponent, 
    CreateEventComponent,
    Error404Component 

  ], 
  providers: [ 
    EventService, 
    ToastrService, 
    EventRouteActivator,
    EventListResolver,
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