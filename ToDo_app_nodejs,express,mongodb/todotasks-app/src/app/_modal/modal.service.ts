import { Injectable } from '@angular/core';
import { ToDoItem } from '../ToDoItem.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];

    add(modal: any) {
        // add modal to array of active modals
        this.modals.push(modal);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.modals = this.modals.filter(x => x.id !== id);
    }

    open(id: string, toDoItem?: ToDoItem) {
        // open modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.open(toDoItem);
    }

    close(id: string) {
        // close modal specified by id
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}