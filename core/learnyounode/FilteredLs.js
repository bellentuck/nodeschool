// const fs = require('fs')
// const path = require('path')
// // inner stuff - function has to do with logic
// module.exports = function(folder, ext, callback) {
//   fs.readdir(folder, function(err, files) {
//     if (err) {
//       return callback(err)
//     }
//     return callback(null, files.filter(file =>
//       path.extname(file) === '.' + ext
//     ))
//   })
// }



// const fs = require('fs')
// const path = require('path')
//
// module.exports = function(folder, ext, callback) {
//   fs.readdir(folder, function(err, files) {
//     if (err) {
//       return callback(err)
//     }
//     files = files.filter(function(file) {
//       return path.extname(file) === '.' + ext
//     })
//     callback(null, files)
//   })
// }
