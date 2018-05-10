import {inject} from 'aurelia-framework';
import {WildflyAPI} from './wildfly-api';
import {DateOnlyValueConverter} from './common/converters';

@inject(WildflyAPI, DateOnlyValueConverter)
export class Rain {

  id = '';
  millimeters = 0;
  recordedOn = null;
  saveMessage = null;
  errorMessage = null;
  constructor(wildfly, dateFormatValueConverter) {
    this.wildfly = wildfly;
    this.dateFormatValueConverter = dateFormatValueConverter
  }

  created() {
      console.log('hello from created.')
      const d = new Date();
      d.setDate(d.getDate() -1);
      this.recordedOn = d;
      console.log("recorded on is " + this.recordedOn);
  }

  activate(params, routeConfig) {
  }

  save() {
    console.log('saving rain');
    console.log('value for recorded on: ' + this.recordedOn);
    if (!(this.recordedOn instanceof Date)) {
        this.recordedOn = new Date(this.recordedOn + 'T07:00');
    }
    console.log('Value of recorded on as millis' + this.recordedOn.getTime());
    let toSave = {
      'id': parseInt(this.id),
      'millimeters': parseFloat(this.millimeters),
      'recordedOn': this.recordedOn.getTime() };
    this.wildfly.isRequesting = true;
    this.wildfly.saveRain(toSave)
      .then(response => response.json())
      .then(savedRain => {
        this.id = savedRain.id;
        this.wildfly.isRequesting = false;
        this.saveMessage = 'Rainfall total saved.';
      })
      .catch(error => {
        this.errorMessage = 'SAVE FAILED';
        this.wildfly.isRequesting = false;
      });
  }

  // TODO: date the date a unique column in the db table so we cannot have two entries for same date
  // Error handling for when user enters bad date
  // Message showing the data was saved or there was an error.
}
