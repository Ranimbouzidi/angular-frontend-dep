import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-hr',
  templateUrl: './hr.component.html',
  styleUrls: ['./hr.component.css']
})
export class HrComponent implements OnInit {

  public employeeShared: any;
  isUpdating: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  get = ($event: any) => {  
    this.isUpdating  = true;
    this.employeeShared = $event;
  }

}
