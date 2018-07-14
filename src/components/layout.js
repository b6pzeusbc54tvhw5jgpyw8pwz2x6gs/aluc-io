import React from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import throttle from "lodash/throttle"

import { rhythm, scale } from '../utils/typography'
import { setWindowSize } from '_src/store'

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
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
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

