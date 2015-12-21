# Daniboomerang

[daniboomerang.com] is a fully-responsive, pure-css-parallax, svg-animated, AngularJS powered creative portfolio.

It´s open source project aimed to show my expertise as a software engineer.

## Description

##### The graphyc design: 
- Over 30 SVG images, custom icons and logo

##### The front-end: 
- Component Pattern with AngularJS (only directives). 
- Plenty of animated SVGs
- Grate performance: No JS on the parallax, fully optimized SVGs, and very intelligent Angular directives that trigger/stop animations dynamically.
- Fully Responsive

##### The back-end: 
- A very simple Express server and some custom Grunt taks

##### QA and Continuous Integration:
- Unit and E2E tests with Karma and Protractor
- CircleCI

##### Continuous Deployment:
- With Dokku Docker

## Tech
Daniboomerang uses a number of open source projects to work properly:
* [angularJS] - HTML enhanced for web apps!
* [node.js] - javaScript runtime
* [express] - fast node.js network app framework
* [grunt] - the tasks runner
* [jQuery] - SVGs don´t get alive alone!
* The whole parallax thing is inspired by the grate [parallax design of Keith Clark]. Have a look at the  [practical css parallax] article

And of course Daniboomerang itself is open source.

## Install it

Clone the project
```sh
$ git clone https://github.com/daniboomerang/daniboomerang
```
And install the dependencies
```sh
$ npm install
```
And that´s it!

## Run it

Run the server
```sh
$ grunt server
```
Run the unit tests
```sh
$ grunt unitDEV
```
Run the E2E tests
```sh
$ grunt e2eDEV
```
Run the unit and the E2E tests
```sh
$ grunt testDEV
```

## Version
1.0.0

## Todos

 - Mobile version will be supported. A non parallax solution is required 
 - The non mobile version will support Internet Explorer

License
----

[MIT]

   [daniboomerang.com]: <http://www.daniboomerang.com>
   [git-repo-url]: <https://github.com/daniboomerang/daniboomerang>
   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [angularJS]: <http://angularjs.org>
   [grunt]: <http://gruntjs.com>
   [parallax design of Keith Clark]: <http://keithclark.co.uk/articles/pure-css-parallax-websites/>
   [practical css parallax]: <http://keithclark.co.uk/articles/practical-css-parallax/>
   [MIT]: <https://github.com/daniboomerang/daniboomerang/blob/master/LICENSE>


