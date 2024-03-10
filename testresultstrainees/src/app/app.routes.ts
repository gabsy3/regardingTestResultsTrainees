import { Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MonitorComponent } from './components/monitor/monitor.component';

export const routes: Routes = [
  {
    path: '',
    component: DataComponent,
  },
  { path: 'data', component: DataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'monitor', component: MonitorComponent },
];
