import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adddescription',
  templateUrl: './adddescription.component.html',
  styleUrls: ['./adddescription.component.scss']
})
export class AdddescriptionComponent implements OnInit {
  taskDescription: string;

  constructor() { }

  ngOnInit() {
  }
  updateTaskDescription(value: string) {
    this.taskDescription = value;
  }
}
