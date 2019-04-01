import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"

import avatar from "../../../static/new-avatar.png"

const Seo = props => {
  const { data, config } = props
  const { facebook } = config
  const postTitle = ((data || {}).frontmatter || {}).title
  const postDescription = ((data || {}).frontmatter || {}).description
  const postCover = ((data || {}).frontmatter || {}).cover
  const postSlug = ((data || {}).fields || {}).slug || ""

  const title = postTitle ? `${postTitle} - ${config.shortSiteTitle}` : config.siteTitle
  const description = postDescription ? postDescription : config.siteDescription
  const siteImage = postCover ? postCover : config.siteImage
  const url = config.siteUrl + config.pathPrefix + postSlug

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: "og: http://ogp.me/ns#",
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={avatar} />
      <meta property="og:type" content="website" />
      <meta property="fb:app_id" content={facebook.appId} />
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.authorTwitterAccount ? config.authorTwitterAccount : ""}
      />
      <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding|Roboto" rel="stylesheet"/>
    </Helmet>
  )
}

Seo.propTypes = {
  data: PropTypes.object,
  config: PropTypes.object.isRequired,
}

export default Seo
