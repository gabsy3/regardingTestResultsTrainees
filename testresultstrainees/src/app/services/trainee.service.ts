import { Injectable } from '@angular/core';
import { trainee } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  constructor() {}
  ELEMENT_DATA: trainee[] = [
    {
      id: '1',
      name: 'Gabi',
      date: '30-01-2024',
      grade: "80",
      subject: 'Algebra',
    },
    {
      id: '2',
      name: 'Maly',
      date: '08-03-2024',
      grade: "85",
      subject: 'History',
    },
    {
      id: '3',
      name: 'Yossi',
      date: '10-02-2024',
      grade: "10",
      subject: 'test',
    },
    {
      id: '4',
      name: 'Beryllium',
      date: '10-03-2024',
      grade: "30",
      subject: 'test',
    },
    {
      id: '5',
      name: 'Boron',
      date: '12-05-2023',
      grade: "65",
      subject: 'test',
    },
    {
      id: '6',
      name: 'Carbon',
      date: '10-03-2023',
      grade: "87",
      subject: 'test',
    },
    {
      id: '7',
      name: 'Nitrogen',
      date: '10-01-2024',
      grade: "77",
      subject: 'test',
    },
    {
      id: '8',
      name: 'Oxygen',
      date: '10-03-2024',
      grade: "90",
      subject: 'test',
    },
    {
      id: '9',
      name: 'Fluorine',
      date: '10-03-2024',
      grade: "55",
      subject: 'test',
    },
    {
      id: '10',
      name: 'Neon',
      date: '10-03-2024',
      grade: "80",
      subject: 'test',
    },
  ];
  addTrainee(formValue: any) {
    let { id, name, grade, date, subject } = formValue;
    const findTrainee = this.ELEMENT_DATA.some((trainee) => trainee.id === id);
    if (!findTrainee) {
      date = this.formatDateUpdate(date);
      this.ELEMENT_DATA.push({ id, name, grade, date, subject });
      return true;
    }
    return false;
  }
  removeTrainee(id: string) {
    const traineeIndex = this.ELEMENT_DATA.findIndex(
      (trainee) => trainee.id === id
    );
    this.ELEMENT_DATA.splice(traineeIndex, 1);
  }
  updateTrainee(formValue: any) {
    let {id,name,grade,email,date,address,city,country,zip,subject} = formValue;
    const findTrainee = this.ELEMENT_DATA.findIndex((trainee) => trainee.id === id);
    if (findTrainee > -1 ) {
      date = this.formatDateUpdate(date);
      this.ELEMENT_DATA[findTrainee] = { id, name, grade ,email , date, address , city,country,zip, subject };
      return true;
    }
    return false;
  }
  formatDate(date: any) {
    date = date.split("-");
    const stringDate = date[2] + "-" + date[1] + "-" + date[0];
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
    return [day, month,year].join('-');
  }
}
