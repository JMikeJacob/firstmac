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

function findShortestPath(graph, source, destination) {
    // Breadth-First Search: find shortest path
    let queue = [[source]];
    let userFound = false;
    const checkedUsers = [];

    let path = [];
    while (queue.length > 0) {
        path = queue.shift();
        // check current user / node at the end of the path
        const currentNode = path[path.length - 1];

        if (currentNode === destination) {
            userFound = true;
            break;
        }

        const following = graph[currentNode].follows;
        following.sort(); // ensures smallest id will be processed first
        for (let i = 0; i < following.length; i++) {
            // queue up all possible paths up to this point
            if (!checkedUsers.includes(following[i])) { // ignore already visited users
                const newPath = [...path, following[i]]
                queue.push(newPath);
            }
        }
        checkedUsers.push(currentNode)
    }

    if (!userFound) { // the target was not found after the queue has exhausted all possible paths
        console.log('Link not found');
    } else {
        printPath(path);
    }
}

module.exports = findShortestPath;