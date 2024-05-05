import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../service/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from "../../page-title/page-title.component";
import { TaskListComponent } from "../../task-list/task-list.component";
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-all-task',
    standalone: true,
    templateUrl: './all-task.component.html',
    styleUrl: './all-task.component.css',
    imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent]
})
export class AllTaskComponent {
dateNow: string | number | Date | undefined;
search($event: Event) {
throw new Error('Method not implemented.');
}
newTask="";
initialTaskList:any[]=[];
taskList:any[]=[];
httpService = inject (HttpService);
stateService=inject(StateService);
ngOnInit() {
  this.stateService.searchSubject.subscribe((value)=>{
    if(value){
     this.taskList=this.initialTaskList.filter(x=>x.title.toLowerCase().includes(value.toLowerCase())
    );
  }
  else{
    this.taskList=this.initialTaskList;
  }
  });
  this.getAllTasks();
}
addTask(){
  console.log("addTask", this.newTask)
  this.httpService.addTask(this.newTask). subscribe (()=>{
    this.newTask="";
    this.getAllTasks();
  })
}
getAllTasks(){
  this.httpService.getAllTasks().subscribe((result:any)=>{
    this.initialTaskList = this.taskList = result;
  })
}
onComplete(task:any){
  task.complete = true;
console.log("complete", task);
this.httpService.updateTask(task).subscribe(()=>{
  this.getAllTasks();
})
}
onImportant(task:any){
  task.important = true;
  console.log("important", task);
  this.httpService.updateTask(task).subscribe(()=>{
this.getAllTasks();
  });
}
}
