import { Component, inject } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';

@Component({
  selector: 'app-completed-task',
  standalone: true,
  imports: [PageTitleComponent, TaskListComponent],
  templateUrl: './completed-task.component.html',
  styleUrl: './completed-task.component.css'
})
export class CompletedTaskComponent {
  newTask="";
  taskList:any[]=[];
  httpService = inject (HttpService);
  dateNow: string | number | Date | undefined;
  
  ngOnInit() {
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
      this.taskList = result.filter((x:any)=>x.complete==true);
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
    })
  }
}
