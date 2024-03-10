import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatTableModule,
  MatTableDataSource,
  MatTable,
} from '@angular/material/table';
import { trainee } from '../../models/data.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TraineeService } from '../../services/trainee.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent implements AfterViewInit {
  traineeService = inject(TraineeService);
  displayedColumns: string[] = [
    'id',
    'name',
    'date_joined',
    'grade',
    'subject',
  ];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  dataSource2 = [...this.traineeService.ELEMENT_DATA];
  showDetails: boolean = false;
  traineeForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    email: new FormControl(''),
    date_joined: new FormControl('', Validators.required),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zip: new FormControl(''),
    subject: new FormControl('', Validators.required),
  });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  gridChecked: boolean = false;
  clickedRows = new Set<trainee>();


  @ViewChild(MatTable)
  table!: MatTable<trainee>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openTrainee() {
    this.traineeForm.patchValue({
      id: '',
      name: '',
      grade: '',
      email: '',
      date_joined: '',
      address: '',
      city: '',
      country: '',
      zip: '',
      subject: '',
    });
    this.gridChecked = false;
    this.showDetails = true;
  }
  closeTrainee() {
    this.showDetails = false;
  }
  saveTrainee() {
    if (this.traineeForm.status === 'VALID') {
      const { id, name, grade, date_joined, subject } = this.traineeForm.value;
      if (id && name && grade && date_joined && subject) {
        if(this.showDetails && this.gridChecked){
          let updateResult = this.traineeService.updateTrainee(this.traineeForm.value);
          if (updateResult) {
            this.dataSource2 = [...this.traineeService.ELEMENT_DATA];
            this.table.renderRows();
          }
        }
        if(this.showDetails && !this.gridChecked){
          let addResult = this.traineeService.addTrainee(this.traineeForm.value);
          if (addResult) {
            this.dataSource2 = [...this.traineeService.ELEMENT_DATA];
            this.table.renderRows();
            this.traineeForm.reset();
          }
        }
      }
    }
  }
  chooseRow(row: any) {
    this.traineeForm.reset();
    if(row.id === this.traineeForm.value.id){
      this.showDetails = !this.showDetails;
      this.gridChecked = !this.gridChecked;
    }
    else{
      this.showDetails = true;
      this.gridChecked = true;
    }
    if (this.showDetails && this.gridChecked) {
      this.traineeForm.patchValue(row);
      
      this.traineeForm.get('date_joined')?.patchValue(this.formatDate(row.date_joined));
    }
  }

  private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, day,month].join('-');
  }

  removeTrainee() {
    const { id } = this.traineeForm.value;
    if (id) {
      this.traineeService.removeTrainee(id);
      this.dataSource2 = [...this.traineeService.ELEMENT_DATA];
      this.table.renderRows();
      this.traineeForm.reset();
      this.showDetails = false;
      this.gridChecked = false;
    }
  }
}
