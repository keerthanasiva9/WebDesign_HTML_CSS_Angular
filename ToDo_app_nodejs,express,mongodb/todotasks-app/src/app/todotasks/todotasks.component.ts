import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { TodoService } from '../todo.service';
import { ToDoItem } from '../ToDoItem.model';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-todotasks',
  templateUrl: './todotasks.component.html',
  styleUrls: ['./todotasks.component.scss']
})
export class TodotasksComponent implements OnInit {
  toDoItems: Array<ToDoItem>
  contentValue: string;
  constructor(private toDoService: TodoService, private modalService: ModalService) { }

  ngOnInit() {
    this.getAllToDoItems();
  }
  getAllToDoItems() {
    this.toDoService.getToDoItems().subscribe(items => {
      this.toDoItems = this.reverseItems(items);
    })
  }
  reverseItems(toDoItems: Array<ToDoItem>) {
    return toDoItems.reverse();
  }
  addToDoItem(addtaskinput: any) {
    if (addtaskinput.contentValue == undefined || addtaskinput.contentValue == "") {
      alert("Please enter any task in add task box")
    } else {
      addtaskinput.contentValue = '';
      this.addToDoItemInfo(addtaskinput.taskContent);
    }
  }
  afterEdit(items: Array<ToDoItem>) {
    this.toDoItems = this.reverseItems(items);
  }
  addToDoItemInfo(taskContent: string, taskDescription?: string, dueDate?: string, dueTime?: string) {
    console.log(taskContent, taskDescription, dueDate, dueTime);
    this.toDoService.addToDoItem(taskContent, taskDescription, dueDate, dueTime).subscribe(toDoItem => {
      this.getAllToDoItems();
      this.closeModal('custom-modal-1')
    })
  }

  updateToDoItemStatus(checkBoxStatus: boolean, id: string) {
    this.toDoService.updateToDoItem(id, checkBoxStatus).subscribe(toDoItem => {
      this.getAllToDoItems();
    })
  }

  clearAllToDoItems() {
    this.toDoService.deleteAllToDoItems().subscribe(deletedMessage => {
      this.getAllToDoItems();
    })
  }
  editToDoItem(edittoDoItem: ToDoItem) {
    this.modalService.open('custom-modal-1', edittoDoItem);
  }
  deleteToDoItem(id: string) {
    this.toDoService.deleteToDoItem(id).subscribe(deletedMessage => {
      this.getAllToDoItems();
    })
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
@Component({
  selector: 'to-do-item-dialog',
  templateUrl: 'to-do-item-dialog.html',
  styleUrls: ['to-do-item-dialog.scss']
})
export class AddToDoItemDialog implements OnInit {
  @Output() addEvent = new EventEmitter<any>();
  @Output() closeEvent = new EventEmitter();
  currentDate: string;

  ngOnInit(): void {
    this.currentDate = new Date().toISOString().split("T")[0];;
  }

  constructor() { }

  closeModal() {
    this.closeEvent.next()
  }
  addToDoItem(inputTaskTitle: any, inputTaskDescription: any, dueDate: string, dueTime: string) {
    var toDoObj = {
      taskContent: inputTaskTitle.taskContent,
      taskDescription: inputTaskDescription.taskDescription,
      dueDate: dueDate,
      dueTime: dueTime
    }
    this.addEvent.next(toDoObj);
    inputTaskTitle.contentValue = "";
    inputTaskDescription.contentValue = "";
    dueDate = "";
    dueTime = ""
  }


}
