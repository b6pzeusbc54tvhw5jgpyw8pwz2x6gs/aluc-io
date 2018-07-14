import React from "react"
import PropTypes from "prop-types"

import theme from "_src/theme/theme.yaml"

const Article = props => {
  const { children } = props

  const tableOfContentsHtml = { __html: tableOfContents }
  return (
    <React.Fragment>

      <div className='box'>
        <article>{children}</article>
        { isWideScreen &&
          <div className='toc' dangerouslySetInnerHTML={tableOfContentsHtml}></div>
        }
      </div>

      <style jsx>{`
        article {
          background: ${theme.main.colors.background};
          max-width: ${theme.main.sizes.articleMaxWidth};
          margin: 0 auto;
/*           padding: 1.5rem; */
        }
        article strong, article b {
          letter-spacing: -.02em;
        }
        article a {
          font-weight: bold;
          letter-spacing: -.02em;
          text-shadow: 2px 2px ${theme.main.colors.background},
            -2px  2px ${theme.main.colors.background},
            -2px -2px ${theme.main.colors.background},
            -2px  2px ${theme.main.colors.background},
            -2px  0   ${theme.main.colors.background},
             2px  0   ${theme.main.colors.background};
          display: inline-block;
          text-decoration: none;
          transition: 0.3s;
        }
        article a:hover {
          color: ${theme.main.colors.linkHover};
        }
        @media (min-width: ${theme.mediaQueryTresholds.M}px) {
          article {
/*             padding: 2.5rem 3.5rem; */
          }
        }
        @media (min-width: ${theme.mediaQueryTresholds.L}px) {
          article {
/*             padding: 2rem; */
            left: 20rem;
            position: relative;
          }
        }
      `}</style>
    </React.Fragment>
  )
}

Article.propTypes = {
  children: PropTypes.node.isRequired
}

export default Article
