import {CustomFetch} from './custom-fetch';
import {inject} from 'aurelia-framework';
import {json} from 'aurelia-fetch-client';

@inject(CustomFetch)
export class WildflyAPI {
  constructor(client) {
    this.client = client;
    }

    fetchGoatList() {
      return this.client.fetch('rest/lists/producers');
    }

    saveSample(sample){
      if (sample.id === -1) {
        sample.id = null;
      }
      return this.client.fetch('rest/sample', {
          method: 'post',
          body: json(sample)
      });
    }
}


