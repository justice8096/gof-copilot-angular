// src/app/grid/grid.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridService } from './grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [GridService],
})
export class GridComponent implements OnChanges {
  @Input() width!: number;
  @Input() height!: number;
  grid: boolean[][] = [];

  constructor(private gridService: GridService) {
    this.gridService.grid.subscribe(g => this.grid = g);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ([changes.width] || [changes.height]) {
      this.gridService.initialize(this.width, this.height);
    }
  }

  toggleCell(y: number, x: number) {
    const g = this.grid.map(row => [...row]);
    g[y][x] = !g[y][x];
    this.gridService.stop();
    this.gridService.initialize(this.width, this.height);
    this.gridService.grid$.next(g);
  }

  onRandomize() {
    this.gridService.randomize();
  }

  onStep() {
    this.gridService.step();
  }

  onRun() {
    this.gridService.run();
  }

  onStop() {
    this.gridService.stop();
  }
}