# gatsby-starter-blog
Gatsby starter for creating a blog

Install this starter (assuming Gatsby is installed) by running from your CLI:

`gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog`

## Running in development
`gatsby develop`


## deploy test
```sh
$ gatsby build
$ aws s3 rm --recursive s3://$TF_VAR_TEST_BUCKET_NAME/ --exclude 'slide-*'
$ aws s3 cp --recursive public s3://$TF_VAR_TEST_BUCKET_NAME/
```

## deploy prd
```sh
$ gatsby build
$ aws s3 rm --recursive s3://$TF_VAR_BUCKET_NAME/ --exclude 'slide-*'
$ aws s3 cp --recursive public s3://$TF_VAR_BUCKET_NAME/
```
