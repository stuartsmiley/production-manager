import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {SampleNew} from './messages';

@(inject(EventAggregator))
export class NoSelection {
  constructor(eventAggregator) {
    this.message = "Click new to record a Sample.";
    this.eventAggregator = eventAggregator;
  }

  createNew() {
      console.log("publishing SampleNew message.");
      this.eventAggregator.publish(new SampleNew());
  }
}
