import React from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import LayoutHeader from './LayoutHeader'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <LayoutHeader />
        {children}
      </div>
    )
  }
}

export default Template
