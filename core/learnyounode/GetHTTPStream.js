var http = require('http')
var bl = require('bl')

var count = 0

module.exports = function(urls, callback, stream = []) {
  urls.forEach((url, idx) =>
    httpGet(url, idx, urls.length, callback, stream)
  )
}

function httpGet(url, idx, urlsLen, callback, stream) {
  http.get(url, function(response) {
    response.pipe(bl(function (err, data) {
      if (err) {
        return callback(err)
      }
      stream[idx] = data.toString()
      count++
      if (count === urlsLen) {
        return callback(null, stream)
      }
    }))
  })
}
