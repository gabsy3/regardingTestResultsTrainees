import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { dataGridModel } from '../../models/data.model';



const ELEMENT_DATA: dataGridModel[] = [
  {id: "1", name: 'Hydrogen', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "2", name: 'Helium', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "3", name: 'Lithium', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "4", name: 'Beryllium', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "5", name: 'Boron', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "6", name: 'Carbon', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "7", name: 'Nitrogen', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "8", name: 'Oxygen', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "9", name: 'Fluorine', date: "10/03/2024", grade: 80, subject:"test"},
  {id: "1", name: 'Neon', date: "10/03/2024", grade: 80, subject:"test"}
];

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MatButtonModule , MatTableModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss'
})
export class DataComponent {
  displayedColumns: string[] = ['id', 'name', 'date', 'grade','subject'];
  dataSource = ELEMENT_DATA;
}
