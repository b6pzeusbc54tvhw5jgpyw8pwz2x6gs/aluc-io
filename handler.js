const AWS = require('aws-sdk')
const path = require('path')
const mime = require('mime-types')
const _ = require('lodash')
const s3 = new AWS.S3()

// aluc.io/
// aluc.io/about
// aluc.io/search

// handler.js
module.exports.index = (event, context, callback) => {
  console.log(event)
  console.log(context)

  const depth1 = (event.pathParameters || {}).depth1 || ''
  const depth2 = (event.pathParameters || {}).depth2 || ''

  let Key = ''
  if( _.includes(['posts','pages'], depth1)) {
    Key = path.join(depth1, depth2, 'index.html')
  } else if( depth1.split('-')[0] === 'slide' && depth2 === '' ) {
    Key = path.join(depth1,'index.html')
  } else if( depth1 === 'search' ) {
    Key = path.join(depth1, depth2, 'index.html')
  } else if( depth1 === '' && depth2 === '' ) {
    Key = 'index.html'
  } else {
    Key = path.join(depth1, depth2)
  }
  console.log( 'Key: ' + Key )

  const Bucket = 'aluc.io'
  const getParams = { Bucket, Key }
  s3.getObject(getParams, (err, data) => {

    if (err) {
      console.error(err)
      callback(null, {
        statusCode: 404,
        headers: {
          "Content-Type": "text/html;",
          "Cache-Control": "no-cache",
        },
        body: `PAGE NOT FOUND: ${Key}`,
      })
      return
    }

    const contentType = mime.contentType(path.basename( Key ))
    console.log("Content-Type: " + contentType)
    let response
    if( contentType.split('/')[0] !== 'image' ) {
      response = {
        statusCode: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-cache",
        },
        body: data.Body.toString('utf-8'),
      }
    } else {
      response = {
        statusCode: 302,
        headers: {
          Location: s3.getSignedUrl('getObject', { Bucket, Key }),
          "Content-Type": contentType,
          "Cache-Control": "no-cache",
        },
      }
    }

    callback(null, response )
  })
}

