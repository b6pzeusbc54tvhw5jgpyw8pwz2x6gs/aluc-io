import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { graphql } from "gatsby"
require("core-js/fn/array/find")
require("prismjs/themes/prism-okaidia.css")

//import { setNavigatorPosition, setNavigatorShape } from "_src/store"
import Post from "_src/components/Post/"
import Footer from "_src/components/Footer/"
import Seo from "_src/components/Seo"
import Article from "_src/components/Main/Article"

import theme from "_src/theme/theme.yaml"
import config from "_config/meta"
import Layout from '../components/layout'
import LayoutHeader from '_src/components/LayoutHeader'

class PostTemplate extends React.Component {

  render() {
    const { location, data, pathContext } = this.props
    const tableOfContents = data.post.tableOfContents
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook

    return (
      <Layout location={location}>
        { !/\/pages\/1--about\/?$/.test(location.pathname)  && <LayoutHeader location={location} config={config}/>}
        <Article>
          <Post
            location={location}
            post={data.post}
            slug={pathContext.slug}
            author={data.author}
            facebook={facebook}
            tableOfContents={tableOfContents}
          />
          <Footer footnote={data.footnote} />
          <Seo config={config} data={data.post} facebook={facebook} />
        </Article>
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
  //navigatorPosition: PropTypes.string.isRequired,
  //setNavigatorPosition: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    //navigatorPosition: state.navigatorPosition,
  }
}

const mapDispatchToProps = {
  //setNavigatorPosition,
  //setNavigatorShape
}

export default connect(mapStateToProps, mapDispatchToProps)(PostTemplate)

//eslint-disable-next-line no-undef
export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      tableOfContents
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        subTitle
        category
        cover {
          childImageSharp {
            resize(width: 300) {
              src
            }
          }
        }
      }
    }
    author: markdownRemark(fields: { fileRelativePath: { eq: "parts/author.md" }}) {
      id
      html
    }
    footnote: markdownRemark(fields: { fileRelativePath: { eq: "parts/footnote.md" }}) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`
