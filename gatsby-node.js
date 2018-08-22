const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    //const blogPost = path.resolve('./src/templates/blog-post.js')
    const blogPost = path.resolve('./src/templates/PostTemplate.js')
    resolve(
      graphql(`{
        allMarkdownRemark(
          filter: { fields: { slug: { regex: "//posts|pages//" }}},
          sort: { fields: [fields___prefix], order: DESC },
          limit: 1000
        ) {
          edges {
            node {
              id
              fileAbsolutePath
              fields {
                slug
                prefix
              }
              frontmatter {
                title
              }
            }
          }
        }
      }`).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        let posts = result.data.allMarkdownRemark.edges
        posts = _.reject(posts, post => {
          const isPost = /^\/posts\//.test(post.node.fields.slug)
          const isIndexMd = /index\.md$/.test(post.node.fileAbsolutePath)
          return isPost && ! isIndexMd
        })

        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const contentsPath = path.resolve('./contents')


    const fileRelativePath = path.relative(contentsPath, node.fileAbsolutePath)

    const isPost = /^posts\//.test(fileRelativePath)
    const isIndexMd = /index\.md$/.test(fileRelativePath)
    if( isPost && ! isIndexMd ) return

    createNodeField({ node, name: `fileRelativePath`, value: fileRelativePath })

    const slug = `/` + path.dirname(fileRelativePath)
    createNodeField({ node, name: `slug`, value: slug })
    //console.log(slug)

    const prefix = path.basename(slug).split('--')[0]
    //console.log(prefix)
    createNodeField({ node, name: `prefix`, value: prefix })
  }
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.ya?ml$/,
          include: path.resolve("data"),
          use: {
            loader: 'yaml-loader',
          }
        }
      ]
    }
  })
}

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "styled-jsx/babel",
    options: {
      plugins: [
        "styled-jsx-plugin-postcss",
        ["styled-jsx-plugin-stylelint", { stylelint: require('./stylelint.config') }],
      ],
    }
  })

  actions.setBabelPlugin({
    name: "babel-plugin-module-resolver",
    options: {
      alias: {
        "_src": "./src",
        "_content": "./content",
        "_config": "./config",
      }
    }
  })

  actions.setBabelPlugin({
    name: "babel-plugin-import",
    options: { libraryName: "antd", style: "css" },
  })

  actions.setBabelPlugin({ name: `@babel/plugin-syntax-dynamic-import` })
  actions.setBabelPlugin({ name: `babel-plugin-dynamic-import-webpack` })
}
