// src/app/grid/grid.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgForOf, AsyncPipe } from '@angular/common';
import { GridService } from './grid.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgForOf, AsyncPipe, TranslatePipe],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges {
  @Input() width = 20;
  @Input() height = 20;
  grid$!: Observable<boolean[][]>;

  constructor(private gridService: GridService) {
    this.grid$ = this.gridService.grid$;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['width'] || changes['height']) {
      this.gridService.initialize(this.width, this.height);
    }
  }

toggleCell(y: number, x: number) {
  const current = this.gridService.getCurrentGrid();
  const copy = current.map(r => [...r]);
  copy[y][x] = !copy[y][x];
  this.gridService.setGrid(copy);
}

  onRandomize() { this.gridService.randomize(); }
  onStep()      { this.gridService.step(); }
  onRun()       { this.gridService.run(); }
  onStop()      { this.gridService.stop(); }
}