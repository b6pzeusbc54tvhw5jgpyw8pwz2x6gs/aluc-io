import React from 'react'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { graphql } from "gatsby"

import Layout from '../components/layout'
import SimplePostList from '../components/SimplePostList'
import Seo from '../components/Seo'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const config = get(this.props, 'data.site.siteMetadata')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const posts = get(this.props, 'data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location}>
        <Seo config={config}/>
        {posts.length > 0 && <SimplePostList posts={posts} />}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        author
        description
        algolia {
          appId
        }
        facebook {
          appId
        }
      }
    }
    allMarkdownRemark(
      filter: { fields: { fileRelativePath: { regex: "/posts/.+?/index\\.md/" }}}
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            subTitle
            category
          }
        }
      }
    }
  }
`
