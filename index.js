const data = require('./data.json');
const input = require('./input.json');
const findShortestPath = require('./search');

for (let i = 0; i < input.length; i++) {
    findShortestPath(data, input[i].from, input[i].to);
}