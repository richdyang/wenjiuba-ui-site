import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UIRouterModule} from "@uirouter/angular";
import {MomentModule} from "angular2-moment";

import * as moment from 'moment';
import 'moment/min/locales';

moment.locale('zh-cn');

@Component({
  selector: 'p-timeline',
  template: `
  <section class="ui-timeline">
    <div class="ui-timeline-block" *ngFor="let item of items">
			<div class="ui-timeline-img ui-movie">
			  <i class="{{item.iconClasses}}"></i>
				<!--<img src="https://codyhouse.co/demo/vertical-timeline/img/cd-icon-picture.svg" alt="Movie">-->
			</div> <!-- ui-timeline-img -->

			<div class="ui-timeline-content">
				<h5>{{item.title}}</h5>
				<p>{{item.content}}</p>
				<a uiSref="{{item.uiSref}}" [uiParams]="item.uiParams" class="ui-timeline-readmore">查看</a>
				<span class="ui-timeline-date">{{item.date | amTimeAgo}}</span>
			</div> <!-- ui-timeline-content -->
		</div> <!-- ui-timeline-block -->
		
	</section> <!-- cd-timeline -->
  `,
  styleUrls: ['./timeline.css']
})
export class Timeline {
  @Input() items: TimelineItem[]
}

interface TimelineItem {
  iconClasses: string,
  title: string,
  link: string,
  date: string,
  uiSref: string,
  uiParams: any,
  content: string
}

@NgModule({
  imports: [CommonModule, UIRouterModule, MomentModule],
  exports: [Timeline],
  declarations: [Timeline]
})
export class TimelineModule { }
