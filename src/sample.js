import {areEqual} from './utility';
import dateFormat from 'dateformat';
import {SampleUpdated,SampleViewed,SampleNew} from './messages';
import {WildflyAPI} from './wildfly-api';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DateFormatValueConverter} from './common/converters';
import {inject} from 'aurelia-framework';

@inject(WildflyAPI, EventAggregator, DateFormatValueConverter)
export class Sample {
  constructor(wild, ea, dateFormatValueConverter) {
    this.wild = wild;
    this.ea = ea;
    this.dateFormatValueConverter = dateFormatValueConverter;
    this.samples = [];
    this.ea.subscribe(SampleNew, msg => {
          console.log("new sample")
        });
    this.ea.subscribe(SampleViewed, msg => this.select(msg.sample));
    this.ea.subscribe(SampleUpdated, msg => {
      let id = msg.sample.id;
      let found = this.samples.find(x => x.id == id);
      if (found) {
        console.log('found existing sample with id ' +found.id);
        Object.assign(found, msg.sample);
      } else {
        console.log("pushing new sample with id " + msg.sample.id);
        this.samples.push(msg.sample);
        this.select(msg.sample);
      }
    });
    ea.subscribe(SampleNew, msg => this.select(msg.sample));
  }

  created() {
//    this.api.getSampleList().then(samples => this.samples = samples);
  }

  select(sample) {
    console.log("Selected sample id " + sample.id);
    this.selectedId = sample.id;
    if (sample.id != -1) {
    let found = this.samples.find(x => x.id == sample.id);
    this.sample = found;
    this.routeConfig.navModel.setTitle(found.goat.nombre);
    this.originalSample = JSON.parse(JSON.stringify(found));
    this.originalSample.sampleDate = this.dateFormatValueConverter.toView(this.originalSample.sampleDate);
    }
//    this.api.getSampleDetails(sample.id).then(sample => {
//              this.sample = sample;
//              this.routeConfig.navModel.setTitle(sample.goat.nombre);
//              this.originalSample = JSON.parse(JSON.stringify(sample));
////              this.ea.publish(new SampleViewed(this.sample));
//              console.log("Viewing " + sample.nombre);
//              });
    return true;
  }

  activate(params, routeConfig) {
      this.routeConfig  = routeConfig;
//      this.api.getSampleList().then(samples => this.samples = samples);
  //     this.api.fetchGoatList().then(goats => this.goats = goats);
      var myPromise = this.wild.fetchGoatList();
      myPromise.then(response => response.json())
                  .then(data => {
                          console.log(data);
                          this.goats = data;
                  });
      console.log("activate with " + params.id);
      if (params.id == undefined) {
        this.createNew();
      }  else {
        console.log("start of else block calling api...");
      }
    }

    get canSave() {
        return (this.sample.id != -1) && (this.sample.liters > 0) && this.sample.sampleDate;
      }

    save() {
        console.log("saving....");
        this.wild.saveSample(this.sample)
          .then(response => response.json())
          .then(savedSample => {
          this.sample = savedSample;
          this.routeConfig.navModel.setTitle(savedSample.nombre);
          this.originalSample = JSON.parse(JSON.stringify(savedSample));
          this.originalSample.sampleDate =
          this.ea.publish(new SampleUpdated(this.sample));
        });
      }

      canDeactivate() {
      // TODO why doesn't this work?
//        if (!areEqual(this.originalSample, this.sample)) {
//          let result = confirm('You have unsaved changes. Are you sure you wish to leave?');
//
//          if (!result) {
//            this.ea.publish(new SampleViewed(this.sample));
//          }
//          return result;
//        }
        return true;
      }

      clean() {
        return this.sample === undefined || areEqual(this.originalSample, this.sample);
      }

      createNew() {
        console.log("start of createNew...");
        var now = new Date();
        //var formatted = dateFormat(now, "isoDateTime");
        var sample = {id: -1,
                       goat: {},
                       liters:'',
                       sampleDate: now };
        this.sample = sample;
        this.routeConfig.navModel.setTitle("New Sample");
        this.originalSample = JSON.parse(JSON.stringify(sample));
        this.ea.publish(new SampleNew(sample));
      }

      goatMatcher = (a, b) => a && a.id === b.id;
}
