import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-paneled-table',
    templateUrl: 'paneled-table.component.html',
})
export class PaneledTableComponent {
    @Input() title: string
    @Input() plusSignTitle: string
    @Output() addClicked = new EventEmitter()
    onAddClick() {
        this.addClicked.emit()
    }
}
