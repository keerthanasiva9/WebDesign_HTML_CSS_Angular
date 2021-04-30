import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './modal.component';
import { AddtaskinputComponent } from './addtaskinput/addtaskinput.component';
import { AdddescriptionComponent } from './adddescription/adddescription.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ModalComponent, AddtaskinputComponent,
        AdddescriptionComponent],
    exports: [ModalComponent]
})
export class ModalModule { }