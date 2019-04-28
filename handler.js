import { join, basename } from 'path'

import { createServer, proxy } from  'aws-serverless-express'
import { eventContext } from  'aws-serverless-express/middleware'
import express from 'express'
import * as AWS from 'aws-sdk'
import morgan from 'morgan'
import mime from 'mime-types'
import slash from 'slash'

const { SLS_BUCKET_NAME, CIRCLE_TAG } = process.env

const s3 = new AWS.S3()
const binaryMimeTypes = []
const app = express()

app.use(morgan('short'));
app.use(eventContext())


app.use('/', (req, res) => {
  const s3Path =
        /\d\d\d\d-\d\d-\d\d--/.test(req.path) ? join(req.path, 'index.html')
      : req.path.split('-')[0] === 'slide'    ? join(req.path, 'index.html')
      : /search/.test(req.path)               ? join(req.path, 'index.html')
      : req.path === '/'                      ? 'index.html'
      : req.path

  const params = { Bucket: SLS_BUCKET_NAME, Key: slash(join(CIRCLE_TAG, s3Path)) }
  s3.getObject(params, (err, data) => {
    if (err) return res.status(404).send(`PAGE NOT FOUND: ${params.Key}`)

    const contentType = mime.contentType(basename(params.Key))
    console.log("Content-Type: " + contentType)

    if( contentType.split('/')[0] === 'image' ) {
      return res.redirect(s3.getSignedUrl('getObject', params))
    }

    res.send(data.Body.toString('utf-8'))
  })
})

const server = createServer(app, null, binaryMimeTypes)
export const index = (event, context) => proxy(server, event, context)

