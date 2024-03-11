export interface trainee {
  [x: string]: any;
  filterBy?: any;
  id: string;
  studentId:string;
  name: string;
  grade: string;
  email?:string;
  date: string;
  address?:string;
  city?:string;
  country?:string;
  zip?:string;
  subject: string;
  average?:number;
  exams?:number;
  sum?:number;
}
