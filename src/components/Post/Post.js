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

const Post = connect( mapStateToProps )( props => {
  const { post, author, slug, facebook } = props
  const { tableOfContents } = props
  const { canRenderTOC } = props
  const frontmatter = (post || {}).frontmatter

  const title = frontmatter.title
  const subTitle = frontmatter.subTitle
  const category = frontmatter.category
  const authorName = 'alfreduc'

  const prefix = ((post || {}).fields || {}).prefix
  const html = (post || {}).html

  return (
    <div className='box'>
      { canRenderTOC && <TOC tableOfContents={tableOfContents}/>}
      <Article>
        <Headline title={title} theme={theme}/>
        <Meta prefix={prefix} authorName={authorName} category={category}/>
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
})

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
  tableOfContents: PropTypes.string.isRequired,
}


export default connect(mapStateToProps)(Post)
