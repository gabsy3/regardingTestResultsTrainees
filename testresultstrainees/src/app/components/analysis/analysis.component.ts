import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TraineeService } from '../../services/trainee.service';
import { MatTableDataSource } from '@angular/material/table';
import { trainee } from '../../models/data.model';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    BaseChartDirective
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download' ], [ 'Sales' ], 'Mail' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  traineeService = inject(TraineeService);
  IDs = new FormControl('');
  subjects = new FormControl('');
  IDsListDuplicate: any = [];
  subjectListDuplicates: any = [];
  idsList: any = [];
  subjectList: any = [];
  selectedIds = [];
  selectedSubject = [];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  ngOnInit(): void {
    this.configChart();
    this.IDsListDuplicate = this.traineeService.ELEMENT_DATA.map(
      (data) => data.studentId
    );
    this.idsList = this.IDsListDuplicate.filter(
      (item: any, index: any) => this.IDsListDuplicate.indexOf(item) === index
    );
    this.subjectListDuplicates = this.dataSource.data.map(
      (item) => item.subject
    );
    this.subjectList = this.subjectListDuplicates.filter(
      (item: any, index: any) =>
        this.subjectListDuplicates.indexOf(item) === index
    );
  }
  displayIdChart() {}
  displaySubjectChart() {}
  configChart() {
    
  }
}
