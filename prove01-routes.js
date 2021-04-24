// Require the packedge to work with file system
const fs = require('fs');

const requestHandler = (req, res) => {
    // Constant to get the url being used.
    const url = req.url;

    // Constant to get the Method being used.
    const method = req.method;
    // Reading the file
    const content = fs.readFileSync('user.txt', 'utf8');
    // Cheching different URL and method
    if (url == '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page</title></head>');
        res.write('<body><h1>Welcome to My Page</h1>');
        res.write('<p>If you want to see a list of the users, pleas follow the <a href="./users">Link.</a></p>');
        res.write('<h2>Create a User</h2>');
        res.write('<p>If you want to become a user, fille the form with your full name!</p>');
        res.write('<form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        // the retun is needed if we enter the if, so that it stops execution and does not run the part after the if
        return res.end();
    }
    if (url == '/users' && !!content) {
        // console.dir(content);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page | Users</title></head>');
        res.write('<body><h1>List of Users</h1>');
        res.write('<ul>');
        res.write('<li>Mario Draghi</li>');
        res.write('<li>Tom Holland</li>');
        res.write('<li>Iron Man</li>');
        res.write('<li>Super Man</li>');
        res.write('<li>You</li>');
        res.write(`<li>${content}</li>`);
        res.write('</ul>');
        res.write('<p>Go back to the <a href="./">Home.</a></p></body>');
        res.write('</html>');
        return res.end();
    }
    if (url == '/users' && !content) {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>My Page | Users</title></head>');
        res.write('<body><h1>List of Users</h1>');
        res.write('<ul>');
        res.write('<li>Mario Draghi</li>');
        res.write('<li>Tom Holland</li>');
        res.write('<li>Iron Man</li>');
        res.write('<li>Super Man</li>');
        res.write('<li>You</li>');
        res.write('</ul>');
        res.write('<p>Go back to the <a href="./">Home.</a></p></body>');
        res.write('</html>');
        // the retun is needed if we enter the if, so that it stops execution and does not run the part after the if
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        // the on method helps us to listen to certain event, the data event runs when a new chunck is ready to be set. 
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            const user = parseBody.split('=')[1];
            console.log(user);
            fs.writeFile('user.txt', user, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    //Run this part if something goes wrong
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server! Looks like you got in the wronge page, go back! :D</h1></body>');
    res.write('</html>');
    res.end();
};

exports.handler = requestHandler;