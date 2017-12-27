// HTTP JSON API Server
function httpJsonApiServer() {
  const http = require('http')
  const url = require('url')

  function parsetime (time) {
    return {
      hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    }
  }
  function unixtime (time) {
    return { unixtime: time.getTime() }
  }

  const server = http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true)
    const time = new Date(parsedUrl.query.iso)
    let result

    //if (parsedUrl.pathname === '/api/parsetime') {
    if (/^\/api\/parsetime/.test(req.url)) {
      result = parsetime(time)
    }
    //if (parsedUrl.pathname === '/api/unixtime') {
    if (/^\/api\/unixtime/.test(req.url)) {
      result = unixtime(time)
    }

    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(404)
      res.end()
    }

  })
  server.listen(Number(process.argv[2]))
}


// HTTP Uppercaser
function httpUppercaser() {
  var http = require('http')
  var map = require('through2-map')

  var server = http.createServer(function(req, res) {
    if (req.method !== 'POST') {
      return res.end('Send Me a POST\n')
    }

    req.pipe(map(function(chunk) {
      return chunk.toString().toUpperCase()
    })).pipe(res)
  })

  server.listen(Number(process.argv[2]))
}

// HTTP File Server
function httpFileServer() {
  var http = require('http')
  var fs = require('fs')
  var port = Number(process.argv[2])
  var path = process.argv[3]

  var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    fs.createReadStream(path).pipe(response)
  })
  server.listen(port)
}

// TCP Time Server
function tcpTimeServer() {
  var net = require('net')
  var strftime = require('strftime')
  var server = net.createServer(listener)
  function now() {
    return strftime('%F %H:%M', new Date())
  }
  function listener(socket) {
    socket.end(now() + '\n')
  }
  server.listen(Number(process.argv[2]))
}

// Juggling Async
function jugglingAsync() {
  var getStream = require('./GetHTTPStream')
  var urls = process.argv.filter((arg, i) => i > 1)
  getStream(urls, function(err, stream) {
    if (err) {
      console.error(err)
    }
    logResults(stream)
  })
  function logResults(results) {
    results.forEach(r => console.log(r))
  }
}

// HTTP Collect
function httpCollect() {
  var http = require('http')
  var bl = require('bl')
  //var concatStream = require('concat-stream')
  http.get(process.argv[2], function(response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return console.error(err)
      }
      data = data.toString()
      console.log(data.length)
      console.log(data)
    }))
  })  //.on('error', console.error)
}

// HTTP Client
function httpClient() {
  var http = require('http')
  var url = process.argv[2]
  // there's also an 'https' module :)
  http.get(url, function(response) {
    response.setEncoding('utf8')
    response.on('data', console.log)
    response.on('error', console.error)
  }).on('error', console.error)
}
// response = Stream = object that emits events: data, error, end, etc.
//console.log string contents of each 'data' event from the response

// Make It Modular
// outer stuff - function has to do w/ view
function makeItModular() {
  var filteredLs = require('./FilteredLs')
  var folder = process.argv[2]
  var ext = process.argv[3]

  filteredLs(folder, ext, function(err, files) {
    if (err) {
      console.error('There\'s been an error: ', err)
    }
    files.forEach(file => console.log(file))
  })
}

// Filtered LS
function filteredLs() {
  var fs = require('fs')
  var path = require('path')

  var folder = process.argv[2]
  var ext = process.argv[3]  // e.g., `txt`

  fs.readdir(folder, function callback (err, files) {
    if (err) return console.error(err)
    files.forEach(function(file) {
      if (path.extname(file) === '.' + ext) {
        console.log(file)
      }
    })
  })
}

// My First Async I/O - the Node.js way
function myFirstAsyncIO() {
  var fs = require('fs')
  var file = process.argv[2]

  fs.readFile(file, 'utf8', function callback (err, contents) {
    if (err) {
      return console.log(err)
    }
    console.log(contents.split('\n').length - 1)
  })
}

// My First I/O - Not the node.js way
function myFirstIO() {
  var fs = require('fs');
  var path = process.argv[2];
  var content = fs.readFileSync(path);
  var nNewlines = content.toString().split('\n').length - 1;
  console.log(nNewlines);
}

// Baby Steps
function babySteps() {
  var args = process.argv;
  args = args.slice(2, args.length);
  console.log(args.reduce((prev, curr) => prev + +curr, 0));
  // console.log(args.reduce((prev, curr) => prev + Number(curr), 0));
  // console.log(args.reduce((prev, curr) => prev + parseInt(curr, 10), 0));
}
