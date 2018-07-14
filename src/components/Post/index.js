import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

//import avatar from "_src/images/jpg/avatar.jpg"
import Article from "../Main/Article"
//import PostHeader from "./PostHeader"
import Headline from "./Headline"
import Content from "../Main/Content"
import PostFooter from "./PostFooter"
import Meta from "./Meta"
import TOC from "./TOC"

import theme from "_src/theme/theme.yaml"
import { isWideScreenSelector } from '_src/selectors/layout'

const SHOW_LAYOUT = false

const Post = connect( mapStateToProps )( props => {
  const { post, author, slug, facebook } = props
  const { tableOfContents } = props
  const { isWideScreen } = props
  const frontmatter = (post || {}).frontmatter
  console.log(isWideScreen)

  const title = frontmatter.title
  const subTitle = frontmatter.subTitle
  const category = frontmatter.category
  const authorName = 'alfreduc'

  const prefix = ((post || {}).fields || {}).prefix
  const html = (post || {}).html

  return (
    <div className='box'>
      { isWideScreen && <TOC tableOfContents={tableOfContents}/>}
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
    isWideScreen: isWideScreenSelector(state),
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  tableOfContents: PropTypes.string.isRequired,
}


export default connect(mapStateToProps)(Post)

