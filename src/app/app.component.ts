import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {API} from 'aws-amplify';
import {Pizza} from '../types/pizza';
 
const apiName = 'japifyPizzas'; // replace with the name of your API
const path = '/pizzas'; // replace with the name of the path of your resource
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'japify-pizza';
 
  public createForm: FormGroup;
  public submitForm: () => void;
 
  constructor(private fb: FormBuilder) {
  }
 
  public async ngOnInit(): Promise<void> {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
 
   public async onSubmit(pizza: Pizza): Promise<void> {
    try {
        const response = await API.post(apiName, path, {body: pizza});
        console.log('Added pizza successfully: ' + JSON.stringify(response));
    } catch (error) {
        console.error(error);
    }
  }
}