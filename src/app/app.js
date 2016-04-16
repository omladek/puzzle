//import 'babel-polyfill';
import Puzzle from './puzzle/puzzle.js';

let app = {};

app.start = function(config) {
    app.puzzle = app.init(Puzzle.init, document.getElementById('puzzle'), config);
};

app.init = function(Klass, container, ...args) {
    if (container) {
        return new Klass(container, ...args);
    }
};

app.factory = function(Klass, containers, ...args) {
    return [...containers].map((container) => {
        return new Klass(container, ...args);
    });
};

app.initStatic = function(klass, container, ...args) {
    if (container) {
        return klass.init(container, ...args);
    }
};

window.app = app;
