import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { dataGridModel, trainee } from '../../models/data.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

const ELEMENT_DATA: dataGridModel[] = [
  { id: '1', name: 'Gabi', date: '01/03/2024', grade: 80, subject: 'Algebra' },
  { id: '2', name: 'Maly', date: '08/03/2024', grade: 85, subject: 'History' },
  { id: '3', name: 'Yossi', date: '10/02/2024', grade: 100, subject: 'test' },
  {
    id: '4',
    name: 'Beryllium',
    date: '10/03/2024',
    grade: 30,
    subject: 'test',
  },
  { id: '5', name: 'Boron', date: '12/05/2023', grade: 65, subject: 'test' },
  { id: '6', name: 'Carbon', date: '10/03/2023', grade: 87, subject: 'test' },
  { id: '7', name: 'Nitrogen', date: '29/01/2024', grade: 77, subject: 'test' },
  { id: '8', name: 'Oxygen', date: '10/03/2024', grade: 90, subject: 'test' },
  { id: '9', name: 'Fluorine', date: '10/03/2024', grade: 55, subject: 'test' },
  { id: '10', name: 'Neon', date: '10/03/2024', grade: 80, subject: 'test' },
];

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
  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
  dataSource = new MatTableDataSource<dataGridModel>(ELEMENT_DATA);
  showDetails: boolean = false;
  traineeForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    date_joined: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
  });

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

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
    if(this.traineeForm.status === 'VALID'){
      
    }
  }
}
