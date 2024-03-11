import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TraineeService } from '../../services/trainee.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,MatCheckboxModule,MatInputModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss'
})
export class MonitorComponent {
  traineeService = inject(TraineeService);
  formBuilder = inject(FormBuilder);
  IDs = new FormControl('');
  IDsList = this.traineeService.ELEMENT_DATA.map(data => data.id);
  names = new FormControl('');
  state = this.formBuilder.group({
    passed: false,
    failed: false,
  });
}
