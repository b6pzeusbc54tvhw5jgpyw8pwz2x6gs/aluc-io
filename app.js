import { join, basename } from 'path'
import express from 'express'
import * as AWS from 'aws-sdk'
import morgan from 'morgan'
import mime from 'mime-types'
import slash from 'slash'

const { SLS_BUCKET_NAME, CIRCLE_TAG } = process.env

const s3 = new AWS.S3()
export const app = express()

app.use(morgan('short'));

app.use('/', (req, res) => {
  const s3Path =
        /^\/\d\d\d\d-\d\d-\d\d--/.test(req.path) ? join(req.path, 'index.html')     // posts
      : req.path.split('-')[0] === 'slide'       ? join(req.path, 'index.html')
      : /^\/search/.test(req.path)               ? join(req.path, 'index.html')
      : /^\/about-me/.test(req.path)             ? join(req.path, 'index.html')
      : /^\/qr/.test(req.path)                   ? join('/about-me', 'index.html')
      : /^\/favicon\.ico/.test(req.path)         ? join('favicon','favicon.ico')
      : /^\/favicon\//.test(req.path)            ? join(req.path)
      : req.path === '/'                         ? 'index.html'
      : req.path

  console.log(req.path)

  const params = { Bucket: SLS_BUCKET_NAME, Key: slash(join(CIRCLE_TAG, s3Path)) }

  const contentType = mime.contentType(basename(s3Path))
  if (contentType.split('/')[0] === 'image') {
    return res.redirect(s3.getSignedUrl('getObject', params))
  }

  s3.getObject(params, (err, data) => {
    if (err) return res.status(404).send(`PAGE NOT FOUND: ${params.Key}`)

    res.set('content-type', contentType)
    res.send(data.Body.toString('utf-8'))
  })
})
