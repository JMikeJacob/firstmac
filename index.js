const data = require('./data.json');
const input = require('./input.json');

function printPath(path) {
    let printStr = '';
    for (let i = 0; i < path.length; i++) {
        printStr += path[i];
        if (i < path.length - 1) {
            printStr += ' ';
        }
    }

    console.log(printStr);
}

function search(source, destination) {
    // BFS: find shortest route
    let queue = [[source]];
    let userFound = false;
    const checkedUsers = [];

    let path = [];
    while (queue.length > 0) {
        path = queue.shift();
        // check current user / node at the end of the path
        const currentUser = path[path.length - 1];

        if (currentUser === destination) {
            userFound = true;
            break;
        }

        const following = data[currentUser].follows;
        following.sort(); // ensures smallest id will be processed first
        for (let i = 0; i < following.length; i++) {
            // queue up all possible paths up to this point
            if (!checkedUsers.includes(following[i])) { // ignore already visited users
                const newPath = [...path, following[i]]
                queue.push(newPath);
            }
        }
        checkedUsers.push(currentUser)
    }

    if (!userFound) {
        console.log('Link not found');
    } else {
        printPath(path);
    }
}

for (let i = 0; i < input.length; i++) {
    search(input[i].from, input[i].to);
}