export interface trainee {
  [x: string]: any;
  filterBy?: any;
  id: string;
  studentId: string;
  name: string;
  grade: string;
  email?: string;
  date: string;
  address?: string;
  city?: string;
  country?: string;
  zip?: string;
  subject: string;
  average?: number;
  exams?: number;
  sum?: number;
}

export interface filterd {
  pass: boolean;
  fail: boolean;
  name: string;
  ids:any;
}


export let ELEMENT_DATA: trainee[] = [
  {
    id: '1',
    name: 'gabi',
    date: '30-01-2024',
    grade: '80',
    subject: 'algebra',
    studentId: '200791291',
  },
  {
    id: '2',
    name: 'nofar',
    date: '08-03-2024',
    grade: '85',
    subject: 'history',
    studentId: '300111111',
  },
  {
    id: '3',
    name: 'gabriell',
    date: '10-02-2024',
    grade: '10',
    subject: 'algebra',
    studentId: '100123342',
  },

  {
    id: '4',
    name: 'gabi',
    date: '10-03-2024',
    grade: '30',
    subject: 'history',
    studentId: '200791291',
  },
  {
    id: '5',
    name: 'nofar',
    date: '12-05-2023',
    grade: '65',
    subject: 'algebra',
    studentId: '300111111',
  },
  {
    id: '6',
    name: 'gabriell',
    date: '10-03-2023',
    grade: '87',
    subject: 'history',
    studentId: '100123342',
  },
  {
    id: '7',
    name: 'nofar',
    date: '10-01-2024',
    grade: '77',
    subject: 'algebra',
    studentId: '300111111',
  },
  {
    id: '8',
    name: 'gabriell',
    date: '10-03-2024',
    grade: '90',
    subject: 'history',
    studentId: '100123342',
  },
  {
    id: '9',
    name: 'gabi',
    date: '10-03-2024',
    grade: '55',
    subject: 'algebra',
    studentId: '200791291',
  },{
    id: '10',
    name: 'gabi',
    date: '10-03-2024',
    grade: '80',
    subject: 'history',
    studentId: '200791291',
  }
];
