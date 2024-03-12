import { Component, OnInit, inject } from '@angular/core';
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
import { trainee } from '../../models/data.model';
import { JsonPipe } from '@angular/common';

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
  IDsListDuplicate = this.traineeService.ELEMENT_DATA.map((data) => data.id);
  IdsFilterd: any = [];
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
  selected: any;

  ngOnInit(): void {
    const mapFromDataSource = new Map(
      this.traineeService.ELEMENT_DATA.map((c) => [c.name, c])
    );
    this.uniqueDataSource = [...mapFromDataSource.values()];
    this.datauniqueDataSource = this.uniqueDataSource;
  }

  filterByCheckbox(ev: any) {
    const passed = this.state.value.passed;
    const failed = this.state.value.failed;
    this.uniqueDataSource = this.datauniqueDataSource;
    console.log(this.selected);

    if (passed && !failed) {
      this.uniqueDataSource = this.uniqueDataSource.filter(
        (item: any) => item.average > 65
      );
    } else if (!passed && failed) {
      this.uniqueDataSource = this.uniqueDataSource.filter(
        (item: any) => item.average < 65
      );
    } else if (passed && failed) {
      this.uniqueDataSource = this.datauniqueDataSource = this.uniqueDataSource;
    } else {
      this.uniqueDataSource = [];
    }
    if (this.selected.length >= 0) {
      this.uniqueDataSource = this.uniqueDataSource.filter((item) =>
        this.selected.includes(item.studentId)
      );
    } else {
      this.uniqueDataSource = this.datauniqueDataSource = this.uniqueDataSource;
    }
  }
}
