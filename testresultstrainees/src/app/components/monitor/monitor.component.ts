import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TraineeService } from '../../services/trainee.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { trainee } from '../../models/data.model';


@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,MatCheckboxModule,MatInputModule,MatTableModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent {
  traineeService = inject(TraineeService);
  formBuilder = inject(FormBuilder);
  IDs = new FormControl('');
  IDsListDuplicate = this.traineeService.ELEMENT_DATA.map(data => data.id);

  IDsList = this.IDsListDuplicate.filter((item , index )=> this.IDsListDuplicate.indexOf(item) === index);
  displayedColumns: string[] = ['id', 'name', 'average', 'exams'];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );  names = new FormControl('');
  state = this.formBuilder.group({
    passed: false,
    failed: false,
  });
}
