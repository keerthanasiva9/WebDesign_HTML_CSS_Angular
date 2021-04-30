import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalService } from './modal.service';
import { ToDoItem } from '../ToDoItem.model';
import { TodoService } from '../todo.service';

@Component({
    selector: 'jw-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    @Output() afterEditEvent = new EventEmitter();
    private element: any;
    toDoItem: ToDoItem;

    constructor(private toDoService: TodoService, private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(toDoItem: ToDoItem): void {
        this.toDoItem = toDoItem;
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }
    editToDoItem(id: string, taskContent: string, taskDescription?: string, dueDate?: string, dueTime?: string) {
        console.log(id, taskContent, taskDescription, dueDate, dueTime);
        this.toDoService.editToDoItem(id, taskContent, taskDescription, dueDate, dueTime).subscribe(toDoItem => {
            this.toDoService.getToDoItems().subscribe(items => {
                this.afterEditEvent.next(items);
            });
            this.closeModal('custom-modal-1')
        })
    }
    getAllToDoItems() {
        throw new Error("Method not implemented.");
    }
    closeModal(arg0: string) {
        this.modalService.close('custom-modal-1')
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}