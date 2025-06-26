import { Component } from '@angular/core';
import { AddItemComponent } from '../../component/add-item/add-item.component';

@Component({
    selector: 'rp-edit',
    imports: [AddItemComponent],
    templateUrl: './edit.component.html'
})
export class EditComponent {}
