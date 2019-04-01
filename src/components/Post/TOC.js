import React from "react"
import PropTypes from "prop-types"
import Scrollspy from 'react-scrollspy'
import cheerio from 'cheerio'
import { findIndex } from 'lodash'
import cx from 'classnames'

const LI = ({ value, depth, id, isActive }) => {
  const cn = cx(depth, {actived: isActive})
  return (
    <li className={cn}>
      <a href={'#' + id}>{value}</a>
        <style jsx>{`
          li {
            margin: 0px;
          }
          :global(.actived) {
            background-color: blue;
          }
        `}</style>
    </li>
  )
}

LI.propTypes = {
  value: PropTypes.string.isRequired,
  depth: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
}

class TOC extends React.Component {
  constructor(props) {
    super(props)
    const { headings, tableOfContents } = this.props
    const $ = cheerio.load(tableOfContents)
    const aArr = $('a').toArray()
    const hrefArr = aArr.map( a => a.attribs.href ).map( href => href.replace(/.*#(.*)$/, '$1'))
    this.state = {
      headings: headings.map( (h,i) => ({
        ...h,
        depth: `depth${h.depth}`,
        id: decodeURIComponent(hrefArr[i]),
        isActive: false,
      })),
    }
  }
  updateTOC = (e) => {
    if (!e) return

    const id = e.getAttribute('id')
    const idx = findIndex(this.state.headings, { id })
    const deactive = obj => obj.isActive ? { ...obj, isActive: false } : obj
    this.setState({ 
      headings: [
        ...this.state.headings.slice(0,idx).map( deactive ),
        { ...this.state.headings[idx], isActive: true },
        ...this.state.headings.slice(idx+1).map( deactive ),
      ]
    })
  }

  render() {
    const headingIdArr = this.state.headings.map(h => h.id)

    return (
      <div className='toc'>
        <Scrollspy
          items={headingIdArr}
          currentClassName="is-current"
          scrolledPastClassName='past'
          onUpdate={this.updateTOC}
        >
          { this.state.headings.map( (h,i) => <LI key={i} value={h.value} depth={h.depth} id={h.id} isActive={h.isActive}/>)}
        </Scrollspy>

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
}

TOC.propTypes = {
  headings: PropTypes.array.isRequired,
  tableOfContents: PropTypes.string.isRequired,
}

export default TOC
