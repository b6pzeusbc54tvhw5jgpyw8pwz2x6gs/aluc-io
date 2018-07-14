import React from "react"
import PropTypes from "prop-types"
import FacebookProvider, { Comments } from "react-facebook"
require("core-js/fn/array/find")

import config from "_config/meta"
import theme from "_src/theme/theme.yaml"

const PostComments = props => {
  const { slug, facebook } = props

  return (
    <div id="post-comments" className={'postComments'}>
      <FacebookProvider appId={facebook.appId}>
        <Comments
          href={`${config.siteUrl}${slug}`}
          width="100%"
          colorscheme={theme.main.colors.fbCommentsColorscheme}
        />
      </FacebookProvider>
      <style jsx>{`
        .postComments {
          margin: 3em 0 0;
          padding: 3em 0 0;
          border-top: 1px solid #ddd;
        }
      `}</style>
    </div>
  )
}

PostComments.propTypes = {
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired,
}

export default PostComments
