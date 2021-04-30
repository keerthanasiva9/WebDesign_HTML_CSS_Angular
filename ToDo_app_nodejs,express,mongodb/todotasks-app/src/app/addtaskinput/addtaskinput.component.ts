import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-addtaskinput',
  templateUrl: './addtaskinput.component.html',
  styleUrls: ['./addtaskinput.component.scss']
})
export class AddtaskinputComponent implements OnInit {
  taskContent: string;
  @Input() className:string;
  constructor() { }

  ngOnInit() {
  }

  updateTaskContent(value: string) {
    this.taskContent = value;
  }

}
