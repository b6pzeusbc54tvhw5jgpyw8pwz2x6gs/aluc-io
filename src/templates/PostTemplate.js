import React from "react"
import PropTypes from "prop-types"
//import Main from "../components/Main/"
import { connect } from "react-redux"
import { graphql } from "gatsby"
require("core-js/fn/array/find")
require("prismjs/themes/prism-okaidia.css")

import { setNavigatorPosition, setNavigatorShape } from "_src/store"
import Post from "_src/components/Post/"
import Footer from "_src/components/Footer/"
import Seo from "_src/components/Seo"
import theme from "_src/theme/theme.yaml"
import config from "_config/meta"
import Layout from '../components/layout'

class PostTemplate extends React.Component {

  render() {
    const { data, pathContext } = this.props
    const tableOfContents = data.post.tableOfContents
    const facebook = (((data || {}).site || {}).siteMetadata || {}).facebook

    return (
      <Layout location={this.props.location}>
        <main>
          <Post
            post={data.post}
            slug={pathContext.slug}
            author={data.author}
            facebook={facebook}
            tableOfContents={tableOfContents}
          />
          <Footer footnote={data.footnote} />
          <Seo config={config} data={data.post} facebook={facebook} />
          <style jsx>{`
            main {
              /* position: "absolute", */
              /* top: 0, */
              /* left: 0, */
              /* bottom: 0, */
              /* width: 100%; */
              animation-name: main-entry;
              animation-duration: .5s;
              @media (min-width: ${theme.mediaQueryTresholds.L}px) {
              /* width: 100%; */
              }
            }

          `}</style>
        </main>
      </Layout>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    navigatorPosition: state.navigatorPosition,
  }
}

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape
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
