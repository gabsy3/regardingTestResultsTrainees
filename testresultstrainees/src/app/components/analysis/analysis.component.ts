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
  public pieChartLabels :any = [];
  public pieChartDatasets:any = [ {
    data: [70,30]
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
  selectedIds :any  = [];
  selectedSubject = [];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  ds = this.dataSource.data;
  ngOnInit(): void {
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
  displayIdChart() {
    let studentMarks = this.ds.filter((item: any) =>
        this.selectedIds?.includes(item.studentId)
    );
    console.log("studentsMarks",studentMarks);
    let DuplicateSnames = studentMarks.map(item=>item.name);
    let names = DuplicateSnames.filter(
      (item, index) => DuplicateSnames.indexOf(item) === index
    );
    this.pieChartLabels = names;

    
    let std:any = studentMarks.filter(
      (item, index) => names[index] === item.name
    );
    console.log(std);
    let avgPerStd = std.map((item:any)=> item.average)
    this.pieChartDatasets[0].data = avgPerStd;
  }
  displaySubjectChart() {}
}
