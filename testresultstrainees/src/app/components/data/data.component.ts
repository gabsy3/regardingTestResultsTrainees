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
  displayedColumns: string[] = ['id', 'name', 'date_joined', 'grade', 'subject'];
  dataSource = new MatTableDataSource<trainee>(this.traineeService.ELEMENT_DATA);
  dataSource2 = [...this.traineeService.ELEMENT_DATA]
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

  @ViewChild(MatTable)
  table!: MatTable<trainee>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openTrainee() {
    this.showDetails = true;
  }
  closeTrainee() {
    this.showDetails = false;
  }
  saveTrainee() {
    if (this.traineeForm.status === 'VALID') {
      const { id, name, grade, date_joined, subject } = this.traineeForm.value;
      if(id && name &&  grade && date_joined &&  subject){
        this.traineeService.addTrainee(this.traineeForm.value);
        this.dataSource2 = [...this.traineeService.ELEMENT_DATA]
        this.table.renderRows();
      }
    }
  }
  removeTrainee() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }
}
