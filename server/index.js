const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3000;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'one',
  'two',
  'three',
  'four',
  'five'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    // if url is blank
   // console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    // redirects the user to the appropriate '/quote' page
    res.end();
    // tells server request is over
  }

  // TODO: GET ONE
  if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    //YOUR CODE HERE
    res.writeHead(200, headers);
    // sets CORS requests
    res.write(quotes[getRandomInt(0, quotes.length)])
    // putting random quote on page
    res.end();
    // telling server this message call is over
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    // checks if url is good and method is a POST
    let body = '';
    // sets empty string to body var
    req.on('data', function(chunk) {
      // when request hits 'data' it calls the callback function and passes the data to the callback function as CHUNK
      body+= chunk;
      // add CHUNK to the body string
      quotes.push(body)
      // pushes that body string to the quotes aray
    })
    req.on('end', function () {
      // when request hits 'end' the cb function will be called
      req.writeHead(200, headers)
      // set headers
      req.end();
      // tell server request is done
    })
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    // gives error headers
    res.end('Page not found');
    // displays error message

  }
}

const server = http.createServer(handleRequest);

server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
