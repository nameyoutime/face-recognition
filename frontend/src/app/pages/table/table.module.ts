import { ShareModule } from './../../shared/share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { AttendanceDetailComponent } from 'src/app/components/attendance-detail/attendance-detail.component';
import { DateEposhPipe } from '../../pipes/date-eposh.pipe';


@NgModule({
  declarations: [
    TableComponent,
    AttendanceDetailComponent,
    DateEposhPipe
  ],
  imports: [
    
    CommonModule,
    TableRoutingModule,
    ShareModule
  ]
})
export class TableModule { }
