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
      //   err => console.log('Oh no....', err),
      //   () => ('Stream is completed...')
      // );

      const http$ = new Observable(observer => {
        fetch('/api/courses')
          .then(response => {
            return response.json();
          })
          .then(body => {
            // @ts-ignore
            observer.next(body);
            // @ts-ignore
            observer.complete(body);
        })
          .catch(err => {
            observer.error(err);
          });
      });

      http$.subscribe(
        val => console.log(val),
        noop,
        () => console.log('Completed')
      );


    }


}






