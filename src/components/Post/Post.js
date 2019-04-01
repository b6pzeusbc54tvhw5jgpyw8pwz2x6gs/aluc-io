import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import theme from "_src/theme/theme.yaml"

import { canRenderTOCSelector } from '../../selectors/layout'
import Article from "../Main/Article"
import Headline from "./Headline"
import Content from "../Main/Content"
import PostFooter from "./PostFooter"
import Meta from "./Meta"
import TOC from "./TOC"

const SHOW_LAYOUT = false

const Post = props => {
  const { post, author, slug, facebook, headings, tableOfContents } = props
  const { canRenderTOC } = props
  const { location } = props
  const frontmatter = (post || {}).frontmatter

  const title = frontmatter.title
  const subTitle = frontmatter.subTitle
  const category = frontmatter.category
  const authorName = 'alfreduc'

  const prefix = ((post || {}).fields || {}).prefix
  const html = (post || {}).html

  return (
    <div className='box'>
      { canRenderTOC && <TOC headings={headings} tableOfContents={tableOfContents}/>}
      <Article>
        <Headline title={title} theme={theme}/>
        { !/\/pages\/1--about\/?$/.test(location.pathname) && <Meta prefix={prefix} authorName={authorName} category={category}/>}
        <Content html={html} />
        <PostFooter author={author} post={post} slug={slug} facebook={facebook} />
      </Article>
      <style jsx>{`
        .box {
          background-color: ${SHOW_LAYOUT ? 'yellow' : 'inherit'};
        }
      `}</style>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    canRenderTOC: canRenderTOCSelector(state),
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  canRenderTOC: PropTypes.bool.isRequired,
  headings: PropTypes.array.isRequired,
  tableOfContents: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}


export default connect(mapStateToProps)(Post)
