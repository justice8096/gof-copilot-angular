This is the initial prompt for the GOF Copilot Angular project.
```
Create an Angular 20 program that will allow internationalization with color themes based on the language chosen. It will have a grid with options to increase it's width and height separately. This grid will dynamically resize to stay within a constrained area. The state of the grid will be recorded, and it will support single step, running and stopping. It will also support randomly setting cells in the grid. The state of each cell will be determined by an algorithm that checks each of the neighboring cells.
```
The project Setup Instructions did not include the setup for Angular 20. You will need the following steps to set up 
```
npm install -g @angular/cli
```
First steps from Copilot:
```
ng new game-of-life --routing=false --style=css
cd game-of-life
```
At this point I already had a project started. So I backed one directory up and changed the project name to gof-copilot-angular
```
ng new gof-copilot-angular --routing=false --style=css
cd gof-copilot-angular
```
Installng ngx-translate:
```
npm install @ngx-translate/core @ngx-translate/http-loader
```
It had me create two translation file under src/assets/i18n
1. en.json
2. es.json
It had me create a global style in src/styles.css
-- I changed this to use scss, so it is now in src/styles.scss
It had me create a module under src/app/app.module.ts
It had me create a component under src/app/app.component.ts
It had me create the HTML for app under src/app/app.component.html
-- Once again, since I desired scss I changed this src/app/component.scss
It had me create a service under src/app/grid/grid.service.ts
It had me create a component under src/spp/grid/grid.component.ts
It had me create the HTML for grid under src/app/grid/grid.component.html
It had me create the CSS for the grid under src/app/grid/grid.component.scss
It had me create a service under src/app/grid/grid.service.ts
It had me create a component under src/app/grid/grid.component.ts
It had me create the HTML for grid under src/app/grid/grid.component.html
It had me create the CSS for the grid under src/app/grid/grid.component.css
-- Once again, since I desired scss I changed this src/app/grid/grid.component.scss
Had to use the ```ng serve``` to start application
-- Had to fix use of NgFor in grid.html
-- Had to fix references to standalone components from declares to imports
