import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoItem } from './ToDoItem.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getToDoItems(): Observable<Array<ToDoItem>> {
    const toDoItems = this.http.get<Array<ToDoItem>>('http://localhost:3000/todoitems');
    return toDoItems;
  }

  public updateToDoItem(id: string, checkBoxStatus: boolean): Observable<ToDoItem> {
    const toDoItems = this.http.put<ToDoItem>(`http://localhost:3000/todoitems/${id}`, {
      completed: checkBoxStatus
    });
    return toDoItems;
  }
  public deleteToDoItem(id: string): Observable<any> {
    const deletedMessage = this.http.delete(`http://localhost:3000/todoitems/${id}`);
    return deletedMessage;
  }
  public addToDoItem(taskContent: string, taskDecription?: string, dueDate?: string, dueTime?: string): Observable<ToDoItem> {
    const postToDoItem = this.http.post<ToDoItem>('http://localhost:3000/todoitems', {
      taskContent: taskContent,
      description: taskDecription,
      dueDate: dueDate,
      dueTime: dueTime
    }
    );
    return postToDoItem;
  }
  public editToDoItem(id: string, taskContent: string, taskDecription?: string, dueDate?: string, dueTime?: string) {
    const toDoItems = this.http.put<ToDoItem>(`http://localhost:3000/todoitems/${id}`, {
      taskContent: taskContent,
      description: taskDecription,
      dueDate: dueDate,
      dueTime: dueTime
    });
    return toDoItems;
  }

  public deleteAllToDoItems(): Observable<any> {
    const deletedMessage = this.http.delete('http://localhost:3000/todoitems');
    return deletedMessage;
  }
}
