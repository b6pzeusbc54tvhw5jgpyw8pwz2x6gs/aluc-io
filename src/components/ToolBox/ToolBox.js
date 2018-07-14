import { connect } from "react-redux"
import { withRouter } from 'react-router-dom'
import DeveloperBoard from 'react-icons/lib/md/developer-board'
import PropTypes from "prop-types"
import React from "react"
import Search from 'react-icons/lib/fa/search'
import cx from 'classnames'

import { setShowLayout } from '_src/store'
import theme from '_src/theme/theme.yaml'

const ToolBox = (props) => {

  const { showLayout, location } = props
  const boxCN = cx('box', { listPage: location.pathname === '/' })

  return (
    <div className={boxCN}>
      <div className='iconBox'>
        <DeveloperBoard
          className='icon devBoard'
          onClick={() => props.setShowLayout(!showLayout)}
        />
      </div>
      <div className='iconBox'>
        <Search className='icon' />
      </div>
      <style jsx>{`
        .box {
          position: fixed;
          right: 4px;
        }
        .iconBox {
          transition: all .5s;
          display: inline-block;
          display: block;
          margin-top: 20px;
          margin-right: 10px;
        }
        .box :global(.devBoard) {
          transform: translateY(2px) scale(1.25);
        }
        .box :global(.icon) {
          width: 36px;
          height: 36px;
          cursor: pointer;
          fill: ${theme.color.neutral.gray.gray};
        }
        .box :global(.icon):hover {
          fill: ${theme.color.neutral.gray.f};
        }
      `}</style>
    </div>
  )
}

ToolBox.propTypes = {
  showLayout: PropTypes.bool.isRequired,
  setShowLayout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  setShowLayout,
}

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolBox))
