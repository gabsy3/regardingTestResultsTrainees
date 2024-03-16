import { Injectable } from '@angular/core';
import { ELEMENT_DATA, trainee } from '../models/data.model';

@Injectable({
  providedIn: 'root',
})
export class TraineeService {
  constructor() {}
  ELEMENT_DATA = ELEMENT_DATA;
  newId:number = ELEMENT_DATA.length;
  addTrainee(formValue: any) {
    this.newId++;
    let {
      studentId,
      name,
      grade,
      email,
      date,
      address,
      city,
      country,
      zip,
      subject,
    } = formValue;
    date = this.formatDateUpdate(date);

    this.ELEMENT_DATA.push({
      id:String(this.newId),
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
    let {
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
    } = formValue;
    let stIndex = this.ELEMENT_DATA.findIndex(item=> item.id === formValue.id);
    let filterBy = ELEMENT_DATA[stIndex].filterBy;
    date = this.formatDateUpdate(date);
    this.ELEMENT_DATA[stIndex] = {
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
      filterBy,
    };
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
