import { Link } from 'gatsby'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from 'react'
import throttle from "lodash/throttle"

import { setWindowSize } from '_src/store'

import { rhythm, scale } from '../utils/typography'
import ToolBox from './ToolBox'

class Layout extends React.Component {
  componentDidMount() {
    this.resizeHandler()
    if (typeof window !== "undefined") {
      const throttleHandler = throttle(this.resizeHandler, 500)
      window.addEventListener("resize", throttleHandler, false)
    }
  }

  resizeHandler = () => {
    this.props.setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(28),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <ToolBox />
        {children}
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]).isRequired,
  setWindowSize: PropTypes.func.isRequired,
  //fontSizeIncrease: PropTypes.number.isRequired,
  //setFontSizeIncrease: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    //isWideScreen: state.isWideScreen,
    //fontSizeIncrease: state.fontSizeIncrease,
  }
}

const mapDispatchToProps = {
  setWindowSize,
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
