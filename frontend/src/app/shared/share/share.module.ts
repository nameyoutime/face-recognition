import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from 'src/app/components/class/class.component';
import { ClassDetailComponent } from 'src/app/components/class-detail/class-detail.component';



@NgModule({
  declarations: [ClassComponent, ClassDetailComponent,],
  imports: [
    CommonModule

  ],
  exports: [ClassComponent, ClassDetailComponent,]
})
export class ShareModule { }
