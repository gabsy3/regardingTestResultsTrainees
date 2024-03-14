import { Injectable } from '@angular/core';
import { trainee } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  constructor() {}
  studentIdNumber: number = 3;
  studentId : any  = null;
  ELEMENT_DATA: trainee[] = [
    {
      id: '1',
      name: 'Gabi',
      date: '30-01-2024',
      grade: '80',
      subject: 'Algebra',
      studentId: '200791291',
    },
    {
      id: '2',
      name: 'Maly',
      date: '08-03-2024',
      grade: '85',
      subject: 'History',
      studentId: '300111111',
    },
    {
      id: '3',
      name: 'Yossi',
      date: '10-02-2024',
      grade: '10',
      subject: 'Algebra',
      studentId: '100123342',
    },

    {
      id: '4',
      name: 'Gabi',
      date: '10-03-2024',
      grade: '30',
      subject: 'History',
      studentId: '200791291',
    },
    {
      id: '5',
      name: 'Maly',
      date: '12-05-2023',
      grade: '65',
      subject: 'Algebra',
      studentId: '300111111',
    },
    {
      id: '6',
      name: 'Yossi',
      date: '10-03-2023',
      grade: '87',
      subject: 'History',
      studentId: '100123342',
    },
    {
      id: '7',
      name: 'Maly',
      date: '10-01-2024',
      grade: '77',
      subject: 'Algebra',
      studentId: '300111111',
    },
    {
      id: '8',
      name: 'Yossi',
      date: '10-03-2024',
      grade: '90',
      subject: 'History',
      studentId: '100123342',
    },
    {
      id: '9',
      name: 'Gabi',
      date: '10-03-2024',
      grade: '55',
      subject: 'Algebra',
      studentId: '200791291',
    },
    {
      id: '10',
      name: 'Gabi',
      date: '10-03-2024',
      grade: '80',
      subject: 'History',
      studentId: '200791291',
    },
  ];
  addTrainee(formValue: any) {
    let { id, name, grade, email, date, address, city, country, zip, subject } =
      formValue;
    date = this.formatDateUpdate(date);
    let studentId = '';
    const index = this.ELEMENT_DATA.findIndex((item) => item.id === id);
    const stuId = this.ELEMENT_DATA.find((stid) => stid.name === name);
    if (stuId) {
      studentId = stuId.studentId;
    } else {
      this.studentIdNumber++;
      studentId = String(this.studentIdNumber);
    }
    if (index >= 0) {
      return false;
    }
    this.ELEMENT_DATA.push({
      id,
      name,
      grade,
      email,
      date,
      address,
      city,
      country,
      zip,
      subject,
      studentId,
    });
    return true;
  }
  removeTrainee(id: string) {
    const traineeIndex = this.ELEMENT_DATA.findIndex(
      (trainee) => trainee.id === id
    );
    this.ELEMENT_DATA.splice(traineeIndex, 1);
  }
   updateTrainee(formValue: any) {
    let { id, name, grade, email, date, address, city, country, zip, subject } =
      formValue;
    let findStudentId = this.ELEMENT_DATA.find(
      (trainee) => trainee.name === name
    );
    this.studentId = findStudentId?.studentId;
    const filterBy = findStudentId?.filterBy;
    const findTrainee = this.ELEMENT_DATA.findIndex(
      (trainee) => trainee.id === id
    );
    if (findTrainee > -1) {
      date = this.formatDateUpdate(date);
      
      this.ELEMENT_DATA[findTrainee] = {
        id,
        name,
        grade,
        email,
        date,
        address,
        city,
        country,
        zip,
        subject,
        studentId:this.studentId,
        filterBy:filterBy
      };
      return true;
    }
    return false;
  }
  formatDate(date: any) {
    date = date.split('-');
    const stringDate = date[2] + '-' + date[1] + '-' + date[0];
    const d = new Date(stringDate);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  formatDateUpdate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('-');
  }
}
