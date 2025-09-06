// src/app/grid/grid.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GridService {
  grid$ = new BehaviorSubject<boolean[][]>([]);
  private history: boolean[][][] = [];
  private runner?: Subscription;

  get grid() {
    return this.grid$.asObservable();
  }

  initialize(width: number, height: number) {
    const newGrid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );
    this.history = [];
    this.grid$.next(newGrid);
  }

  randomize() {
    const g = this.grid$.value.map(row =>
      row.map(() => Math.random() > 0.7)
    );
    this.history = [];
    this.grid$.next(g);
  }

  step() {
    const oldGrid = this.grid$.value;
    const height = oldGrid.length;
    const width = oldGrid[0].length;

    const nextGrid = oldGrid.map((row, y) =>
      row.map((alive, x) => {
        // count alive neighbors
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = y + dy;
            const nx = x + dx;
            if (
              ny >= 0 && ny < height &&
              nx >= 0 && nx < width &&
              oldGrid[ny][nx]
            ) {
              count++;
            }
          }
        }
        // Game of Life rule
        return alive ? (count === 2 || count === 3) : (count === 3);
      })
    );

    this.history.push(oldGrid);
    this.grid$.next(nextGrid);
  }

  run(intervalMs: number = 300) {
    if (this.runner) return;
    this.runner = interval(intervalMs).subscribe(() => this.step());
  }

  stop() {
    this.runner?.unsubscribe();
    this.runner = undefined;
  }

  getHistory() {
    return this.history;
  }
}