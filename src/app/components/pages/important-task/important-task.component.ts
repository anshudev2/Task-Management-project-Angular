import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { HttpService } from '../../../service/http.service';

@Component({
  selector: 'app-important-task',
  standalone: true,
  imports: [PageTitleComponent,TaskListComponent],
  templateUrl: './important-task.component.html',
  styleUrl: './important-task.component.css'
})
export class ImportantTaskComponent {
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
      this.taskList = result.filter((x:any)=>x.important==true);
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

