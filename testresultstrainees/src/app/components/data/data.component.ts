import { AfterViewInit, Component, ViewChild } from '@angular/core';
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

const ELEMENT_DATA: trainee[] = [
  {
    id: '1',
    name: 'Gabi',
    date_joined: '01/03/2024',
    grade: 80,
    subject: 'Algebra',
  },
  {
    id: '2',
    name: 'Maly',
    date_joined: '08/03/2024',
    grade: 85,
    subject: 'History',
  },
  {
    id: '3',
    name: 'Yossi',
    date_joined: '10/02/2024',
    grade: 100,
    subject: 'test',
  },
  {
    id: '4',
    name: 'Beryllium',
    date_joined: '10/03/2024',
    grade: 30,
    subject: 'test',
  },
  {
    id: '5',
    name: 'Boron',
    date_joined: '12/05/2023',
    grade: 65,
    subject: 'test',
  },
  {
    id: '6',
    name: 'Carbon',
    date_joined: '10/03/2023',
    grade: 87,
    subject: 'test',
  },
  {
    id: '7',
    name: 'Nitrogen',
    date_joined: '29/01/2024',
    grade: 77,
    subject: 'test',
  },
  {
    id: '8',
    name: 'Oxygen',
    date_joined: '10/03/2024',
    grade: 90,
    subject: 'test',
  },
  {
    id: '9',
    name: 'Fluorine',
    date_joined: '10/03/2024',
    grade: 55,
    subject: 'test',
  },
  {
    id: '10',
    name: 'Neon',
    date_joined: '10/03/2024',
    grade: 80,
    subject: 'test',
  },
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
  displayedColumns: string[] = ['id', 'name', 'date_joined', 'grade', 'subject'];
  dataSource = new MatTableDataSource<trainee>(ELEMENT_DATA);
  dataSource2 = [...ELEMENT_DATA]
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
        this.dataSource2.push({ id, name, grade: +grade, date_joined, subject });
        this.table.renderRows();
      }
    }
  }
  removeTrainee() {
    // this.dataSource.pop();
    // this.table.renderRows();
  }
}
