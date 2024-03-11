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
import { FormsModule } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TraineeService } from '../../services/trainee.service';
import { DatePipe } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-data',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    DatePipe,
    FormsModule,
    MatDatepickerModule,
  ],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent implements AfterViewInit  {
  traineeService = inject(TraineeService);
  date = new FormControl(new Date(''));
  displayedColumns: string[] = [
    'id',
    'name',
    'date',
    'grade',
    'subject',
  ];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  showDetails: boolean = false;
  traineeForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    email: new FormControl(''),
    date: new FormControl('', Validators.required),
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
  filterBy: string = '';

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
      date: '',
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
      const { id, name, grade, date, subject } = this.traineeForm.value;
      if (id && name && grade && date && subject) {
        if (this.showDetails && this.gridChecked) {
          let updateResult = this.traineeService.updateTrainee(
            this.traineeForm.value
          );
          if (updateResult) {
            this.dataSource.data = this.traineeService.ELEMENT_DATA;
          }
        }
        if (this.showDetails && !this.gridChecked) {
          let addResult = this.traineeService.addTrainee(
            this.traineeForm.value
          );
          if (addResult) {
            this.dataSource.data = this.traineeService.ELEMENT_DATA;
            this.traineeForm.reset();
          }
        }
      }
    }
  }
  chooseRow(row: any) {
    if (row.id === this.traineeForm.value.id) {
      this.showDetails = !this.showDetails;
      this.gridChecked = !this.gridChecked;
    } else {
      this.traineeForm.reset();
      this.showDetails = true;
      this.gridChecked = true;
    }
    if (this.showDetails && this.gridChecked) {
      this.traineeForm.patchValue(row);
      //this.date.patchValue(new Date(row.date));
      this.traineeForm
        .get('date')
        ?.patchValue(this.formatDate(row.date));
    }
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, day, month].join('-');
  }

  removeTrainee() {
    const { id } = this.traineeForm.value;
    if (id) {
      this.traineeService.removeTrainee(id);
      this.dataSource.data = this.traineeService.ELEMENT_DATA;
      this.traineeForm.reset();
      this.showDetails = false;
      this.gridChecked = false;
    }
  }
  applyFilter() {
    this.filterBy = this.filterBy.trim();
    const filterBy = this.filterBy.split(':')[0];
    let filterVal = this.filterBy.split(':')[1];
    const operationGrather = filterVal?.includes(">");
    const operationLower = filterVal?.includes("<");
    let operation = "";
    if(operationGrather || operationLower){
      operation = filterVal.substring(0,1);
      filterVal = filterVal.substring(1,filterVal.length)
    }
    this.dataSource.data.map(data => data.filterBy = filterBy)
    this.dataSource.filter = filterVal;

    if(operationGrather && filterBy === "grade"){
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let column = data.filterBy.toLowerCase();
        return +data[column] > + filter;
      };
    }
    else if(operationLower && filterBy === "grade"){
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let column = data.filterBy.toLowerCase();
        return +data[column] < + filter;
      };
    }
    else if(operationGrather && filterBy === "date"){
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let column = data.filterBy.toLowerCase();
        return new Date(data[column]) > new Date(filter);
      };
    }
    else if(operationLower && filterBy === "date"){
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let column = data.filterBy.toLowerCase();
        return new Date(data[column]) < new Date(filter);
      };
    }
    else{
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        let column = data.filterBy.toLowerCase();
        return data[column]?.includes(filter);
      };
    }
  }
}
