import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-to-do-input-item',
  templateUrl: './to-do-input-item.component.html',
  styleUrls: ['./to-do-input-item.component.scss']
})
export class ToDoInputItemComponent implements OnInit {
  @Input() content: string
  @Input() status: boolean
  @Input() dueDate: string
  @Input() dueTime: string
  @Input() id: string
  @Output() checkBoxEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  updateToDoItemStatus() {
    var putObj = {
      status: !this.status,
      id: this.id
    }
    this.checkBoxEvent.next(putObj);
  }
  editToDoItem() {
    this.editEvent.next();
  }
  deleteToDoItem(){
    this.deleteEvent.next(this.id);
  }

}
