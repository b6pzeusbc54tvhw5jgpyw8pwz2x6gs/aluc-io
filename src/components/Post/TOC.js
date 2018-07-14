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
          font-size: 12px;
          position: fixed;
          left: 4px;
        }
        .inner :global(a:hover) {
          box-shadow: none;
          background-color: rgba(0, 128, 0, 0.2);
        }
        .inner :global(a) {
          box-shadow: none;
        }
      `}</style>
    </div>
  )
}

TOC.propTypes = {
  tableOfContents: PropTypes.string.isRequired,
}

export default TOC
