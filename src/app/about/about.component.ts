import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  // tslint:disable-next-line:component-selector
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {

      // // DEFINITION BLUEPRINT
      // const interval$ = timer(3000, 1000);
      //
      // const sub = interval$.subscribe(val => console.log('Stream 1 => ' + val));
      // setTimeout(() => sub.unsubscribe(), 5000);
      //
      // // DEFINITION BLUEPRINT
      // const click$ = fromEvent(document, 'click');
      //
      // click$.subscribe(
      //   event => console.log(event),
       //   () => ('Stream is completed...')
      // );

      const http$ = createHttpObservable('/api/courses');

      const courses$ = http$
        .pipe(
          map(res => Object.values(res['payload']) )
        );

      courses$.subscribe(
        course => console.log(course),
        noop,
        () => console.log('Completed')
      );

      // const subject = new Subject();
      const subject = new BehaviorSubject(0);

      // This observable is emiting the values of subject
      const series$ = subject.asObservable();
      series$.subscribe(val => console.log('early sub:' + val));

      subject.next(1);
      subject.next(2);
      subject.next(3);
      // subject.complete();

      setTimeout(() => {
        series$.subscribe(val => console.log('late sub:' + val));
        subject.next(4);
      }, 3000);



}}






