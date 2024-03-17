import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TraineeService } from '../../services/trainee.service';
import { MatTableDataSource } from '@angular/material/table';
import { trainee } from '../../models/data.model';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

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
    BaseChartDirective,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  /*chart 1*/
  public pieChartOptions1: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels1: any = [];
  public pieChartDatasets1: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend1 = true;
  public pieChartPlugins1 = [];

  /*chart 2*/
  public pieChartOptions2: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels2: any = [];
  public pieChartDatasets2: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];
  sumAvgAllStudent = 0;

  /*chart 3*/
  public pieChartOptions3: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels3: any = [];
  public pieChartDatasets3: any = [
    {
      data: [],
    },
  ];
  public pieChartLegend3 = true;
  public pieChartPlugins3 = [];
  AvgSubject: any = [];

  traineeService = inject(TraineeService);
  formanalysis = new FormGroup({
    IDs : new FormControl(''),
    subjects : new FormControl(''),
  });
 
  IDsListDuplicate: any = [];
  subjectListDuplicates: any = [];
  idsList: any = [];
  subjectList: any = [];
  selectedIds: any = [];
  selectedSubject: any = [];
  dataSource = new MatTableDataSource<trainee>(
    this.traineeService.ELEMENT_DATA
  );
  ds = this.dataSource.data;
  storageArr:any = [{selectedIds:null , selectedSubject:null}]
  ngOnInit(): void {
    let filterStorge: any = window.localStorage.getItem('filterAnalysis');
    filterStorge = JSON.parse(filterStorge);

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

   
    

    if (filterStorge) {
      if(filterStorge.selectedIds){
        this.selectedIds = filterStorge.selectedIds;
        this.formanalysis.controls.IDs.setValue(filterStorge.selectedIds);
      }
      if(filterStorge.selectedSubject){
        this.selectedSubject = filterStorge.selectedSubject;
        this.formanalysis.controls.subjects.setValue(filterStorge.selectedSubject);
      }
    }


    this.formanalysis.valueChanges.subscribe(x=>{
      window.localStorage.setItem(
        'filterAnalysis',
        JSON.stringify({
          selectedIds:x.IDs,
          selectedSubject:x.subjects
        })
      );
    })
  }

  displayIdChart() {
    let studentMarks = this.ds.filter((item: any) =>
      this.selectedIds?.includes(item.studentId)
    );
    let DuplicateSnames = studentMarks.map((item) => item.name);
    let names = DuplicateSnames.filter(
      (item, index) => DuplicateSnames.indexOf(item) === index
    );
    this.pieChartLabels1 = names;

    let std = studentMarks.filter((item,index)=>item.name === names[index])
  
    let avgPerStd = std.map((item: any) => item.average);
    this.pieChartDatasets1[0].data = avgPerStd;

    

  }
  displayIdChart2() {
    this.sumAvgAllStudent = 0;
    let avgArr = [];
    let studentMarks = this.ds.filter((item: any) =>
      this.selectedIds?.includes(item.studentId)
    );
    let DuplicateSnames = studentMarks.map((item) => item.name);
    let names = DuplicateSnames.filter(
      (item, index) => DuplicateSnames.indexOf(item) === index
    );
    this.pieChartLabels2 = [names];

    let std: any = studentMarks.filter(
      (item, index) => names[index] === item.name
    );
    let avgPerStd = std.map((item: any) => item.average);
    avgPerStd.forEach((element: any) => {
      this.sumAvgAllStudent += element;
    });
    const avg = this.sumAvgAllStudent / avgPerStd.length;
    avgArr.push(avg);
    this.pieChartDatasets2[0].data = avgArr;

    
    
  }
  displaySubjectChart() {
    this.AvgSubject = [];
    let numberToDivide = 1;
    let studentMarks = this.ds.filter((item: any) =>
      this.selectedSubject.includes(item.subject)
    );
    let DuplicateSSubjects = studentMarks.map((item) => item.subject);
    let subjects = DuplicateSSubjects.filter(
      (item, index) => DuplicateSSubjects.indexOf(item) === index
    );
    this.pieChartLabels3 = subjects;

    for (let i = 0; i < subjects.length; i++) {
      let sum = 0;
      studentMarks.forEach((item) => {
        if (item.subject === subjects[i]) {
          numberToDivide = studentMarks.filter(
            (item) => item.subject === subjects[i]
          ).length;
          sum += +item.grade;
        }
      });
      let avg = sum / numberToDivide;
      this.AvgSubject.push(avg);
    }
    this.pieChartDatasets3[0].data = this.AvgSubject;

  }


  drag(ev:any){
    ev.dataTransfer.setData("text", ev.target.id);
  }
  drop(ev:any){
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let el = document.getElementById(data);
    let el2 = document.getElementById(ev.target.id)?.parentElement;
    let parentEl = el?.parentElement;
    if(el && el2){
      el2.replaceWith(el);
      parentEl?.appendChild(el2);
      el.draggable = false;
      el.ondragover = this.allowDrop;
      el.ondrop = this.drop;
      el2.draggable =true;
      el2.ondragstart = this.drag;
    }
   
  }
  allowDrop(ev:any){
    ev.preventDefault();
  }
}
