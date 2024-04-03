import { Component, OnInit, effect, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TraineeService } from '../../services/trainee.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filterd, trainee } from '../../models/data.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { signalState, patchState } from '@ngrx/signals';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatTableModule,
    JsonPipe,
    CommonModule
  ],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
})
export class MonitorComponent implements OnInit {
  traineeService = inject(TraineeService);
  formBuilder = inject(FormBuilder);
  IDs = new FormControl('');
  IDsListDuplicate = this.traineeService.ELEMENT_DATA.map(
    (data) => data.studentId
  );
  IDsList = this.IDsListDuplicate.filter(
    (item, index) => this.IDsListDuplicate.indexOf(item) === index
  );
  displayedColumns: string[] = ['studentId', 'name', 'average', 'exams'];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  names = new FormControl('');
  state = this.formBuilder.group({
    passed: true,
    failed: true,
  });
  uniqueDataSource: trainee[] = [];
  datauniqueDataSource: trainee[] = [];
  selected: any = [];
  count = 0;
  filterdSignal = signalState<filterd>({
    pass: true,
    fail: true,
    name: '',
    ids: [],
  });

  constructor() {
    effect(() => {
      this.uniqueDataSource = this.datauniqueDataSource;
      if (this.filterdSignal.name()) {
        this.uniqueDataSource = this.uniqueDataSource.filter((item) =>
          item.name.toLowerCase().includes(this.filterdSignal.name().toLowerCase())
        );
      }
      if (!this.filterdSignal.pass()) {
        this.uniqueDataSource = this.uniqueDataSource.filter(
          (item: any) => item.average < 65
        );
      }
      if (!this.filterdSignal.fail()) {
        this.uniqueDataSource = this.uniqueDataSource.filter(
          (item: any) => item.average >= 65
        );
      }
      if (this.filterdSignal.ids()) {
        this.uniqueDataSource = this.uniqueDataSource.filter((item: any) =>
          this.selected.includes(item.studentId)
        );
      }
      window.localStorage.setItem(
        'filter',
        JSON.stringify(this.filterdSignal())
      );
    });
  }

  ngOnInit(): void {
    let filterStorge: any = window.localStorage.getItem('filter');
    filterStorge = JSON.parse(filterStorge);
    const mapFromDataSource = new Map(
      this.traineeService.ELEMENT_DATA.map((c) => [c.name, c])
    );
    this.uniqueDataSource = [...mapFromDataSource.values()];
    this.datauniqueDataSource = this.uniqueDataSource;
    this.filterByCheckbox();
    this.IDs.valueChanges.subscribe((x) => {
      if (x?.length) {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          ids: x,
        }));
      } else {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          ids: [],
        }));
      }
    });


    this.names.valueChanges.subscribe((x) => {
      if (x?.length) {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          name: x,
        }));
      } else {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          name: '',
        }));
      }
    });

    if (filterStorge) {
      this.state.patchValue({passed:filterStorge.pass,failed:filterStorge.fail})
      this.names.patchValue(filterStorge.name)
      this.selected = filterStorge.ids;
      this.IDs.setValue(filterStorge.ids)
     
      patchState(this.filterdSignal, (state) => ({
        ...state,
        name: filterStorge.name,
        ids: filterStorge.ids,
        pass: filterStorge.pass,
        fail: filterStorge.fail,
      }));
    }
    this.avg();
  }

  avg() {
    let obj = this.dataSource.data;
    for (let item in obj) {
      this.count = 0;
      const sum = this.sumOfNames(obj[item].name);
      this.dataSource.data[item].sum = sum;
      this.dataSource.data[item].exams = this.count;
      this.dataSource.data[item].average = sum / this.count;
    }
  }

  sumOfNames = (name: any) =>
  this.dataSource.data
    .filter((i) => {
      if (i.name === name) {
        this.count++;
      }
      return i.name === name;
    })
    .reduce((a, b) => a + +b.grade, 0);

  filterByCheckbox() {
    const passed = this.state.value.passed;
    const failed = this.state.value.failed;
    if (passed && !failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass: true,
        fail: false,
      }));
    } else if (!passed && failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass: false,
        fail: true,
      }));
    } else if (passed && failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass: true,
        fail: true,
      }));
    } else {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass: false,
        fail: false,
      }));
    }

   
  }
}
