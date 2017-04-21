import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'

@Component({
  selector: 'session-list',
  templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
  @Input() sessions:ISession[]; 
  @Input() filterBy: string; 
  @Input() sortBy: string; 
  visibleSessions: ISession[] =[]; 

  ngOnChanges():void {
    if(this.sessions) {
      this.filterSessions(this.filterBy); 
      this.sortBy === 'name' ? 
        this.visibleSessions.sort(sortByNameAsc) :
        this.visibleSessions.sort(sortByVotesDesc); 
    }
  }

  filterSessions(filter:string) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0); 
    } else {
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter; 
      })
    }
  }
}