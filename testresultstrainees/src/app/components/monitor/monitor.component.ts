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
import { JsonPipe } from '@angular/common';
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
  filterdSignal = signalState<filterd>({
    pass:true,fail:true,name:'',ids:['']
  });

  constructor(){
    effect(()=>{
      this.uniqueDataSource = this.datauniqueDataSource
      this.uniqueDataSource = this.uniqueDataSource.filter(item=> item.name.includes(this.filterdSignal.name()))
    })
  }

  ngOnInit(): void {
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
          ids:x,
        }));

        // this.uniqueDataSource = this.uniqueDataSource.filter((item) =>
        //   this.selected.includes(item.studentId)
        // );
      } else {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          ids:[],
        }));
        // this.uniqueDataSource = this.datauniqueDataSource;
      }
    });
  }

  filterByCheckbox() {
    const passed = this.state.value.passed;
    const failed = this.state.value.failed;
    // this.uniqueDataSource = this.datauniqueDataSource;
    if (passed && !failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass:true,
        fail:false
      }));
      // this.uniqueDataSource = this.uniqueDataSource.filter(
      //   (item: any) => item.average > 65
      // );
    } else if (!passed && failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass:false,
        fail:true,
      }));
      // this.uniqueDataSource = this.uniqueDataSource.filter(
      //   (item: any) => item.average < 65
      // );
    } else if (passed && failed) {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass:true,
        fail:true
      }));
      // this.uniqueDataSource = this.datauniqueDataSource = this.uniqueDataSource;
    } else {
      patchState(this.filterdSignal, (state) => ({
        ...state,
        pass:false,
        fail:false
      }));
      // this.uniqueDataSource = [];
    }

    this.names.valueChanges.subscribe((x) => {
      if (x?.length) {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          name:x,
        }));
      } else {
        patchState(this.filterdSignal, (state) => ({
          ...state,
          name:'',
        }));
      }
    });
  }
}
