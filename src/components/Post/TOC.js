import React from "react"
import PropTypes from "prop-types"

const TOC = props => {
  const { tableOfContents } = props
  const tableOfContentsHtml = { __html: tableOfContents }

  return (
    <div className='toc'>
      <div className='inner' dangerouslySetInnerHTML={tableOfContentsHtml}/>
      <style jsx>{`
        .toc {
          width: 20rem;
          font-size: 14px;
        }
        .inner {
          position: fixed;
        }
      `}</style>
    </div>
  )
}

TOC.propTypes = {
  tableOfContents: PropTypes.string.isRequired,
}

export default TOC
