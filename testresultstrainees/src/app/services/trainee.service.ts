import { Injectable } from '@angular/core';
import { trainee } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor() { }
  ELEMENT_DATA: trainee[] = [
    {
      id: '1',
      name: 'Gabi',
      date_joined: '01/03/2024',
      grade: 80,
      subject: 'Algebra',
    },
    {
      id: '2',
      name: 'Maly',
      date_joined: '08/03/2024',
      grade: 85,
      subject: 'History',
    },
    {
      id: '3',
      name: 'Yossi',
      date_joined: '10/02/2024',
      grade: 100,
      subject: 'test',
    },
    {
      id: '4',
      name: 'Beryllium',
      date_joined: '10/03/2024',
      grade: 30,
      subject: 'test',
    },
    {
      id: '5',
      name: 'Boron',
      date_joined: '12/05/2023',
      grade: 65,
      subject: 'test',
    },
    {
      id: '6',
      name: 'Carbon',
      date_joined: '10/03/2023',
      grade: 87,
      subject: 'test',
    },
    {
      id: '7',
      name: 'Nitrogen',
      date_joined: '29/01/2024',
      grade: 77,
      subject: 'test',
    },
    {
      id: '8',
      name: 'Oxygen',
      date_joined: '10/03/2024',
      grade: 90,
      subject: 'test',
    },
    {
      id: '9',
      name: 'Fluorine',
      date_joined: '10/03/2024',
      grade: 55,
      subject: 'test',
    },
    {
      id: '10',
      name: 'Neon',
      date_joined: '10/03/2024',
      grade: 80,
      subject: 'test',
    },
  ];
  addTrainee(formValue:any){
    const { id, name, grade, date_joined, subject } = formValue;
    const findTrainee = this.ELEMENT_DATA.some((trainee) => trainee.id === id);
    if(!findTrainee){
      this.ELEMENT_DATA.push({ id, name, grade: +grade, date_joined, subject });
      return true;
    }
    return false;
  }
}
