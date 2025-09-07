import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GridService {
  private gridSubject = new BehaviorSubject<boolean[][]>([]);
  grid$ = this.gridSubject.asObservable();
  private history: boolean[][][] = [];
  private runner?: Subscription;

  initialize(width: number, height: number) {
    const grid = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => false)
    );
    this.history = [];
    this.gridSubject.next(grid);
  }

  randomize() {
    const grid = this.gridSubject.getValue().map(row =>
      row.map(() => Math.random() > 0.7)
    );
    this.history = [];
    this.gridSubject.next(grid);
  }

  step() {
    const old = this.gridSubject.getValue();
    if (!old.length || !old[0].length) return; // ✅ guard clause
    const h = old.length, w = old[0].length;
    const next = old.map((row, y) =>
      row.map((cell, x) => {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dy === 0 && dx === 0) continue;
            const ny = y + dy, nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w && old[ny][nx]) count++;
          }
        }
        return cell ? count === 2 || count === 3 : count === 3;
      })
    );
    this.history.push(old);
    this.gridSubject.next(next);
  }

  run(ms = 300) {
    if (!this.runner) this.runner = interval(ms).subscribe(() => this.step());
  }

  stop() {
    this.runner?.unsubscribe();
    this.runner = undefined;
  }

  setGrid(grid: boolean[][]) {
    this.gridSubject.next(grid);
  }

  getHistory() {
    return this.history;
  }

  getCurrentGrid(): boolean[][] {
  return this.gridSubject.getValue();
}


  generation = 0;

stepGen() {
  // ... existing logic
  this.generation++;
}

getGeneration(): number {
  return this.generation;
}

toggleRun(ms = 300) {
  this.runner ? this.stop() : this.run(ms);
}


}