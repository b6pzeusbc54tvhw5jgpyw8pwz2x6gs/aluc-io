import React from "react"
import PropTypes from "prop-types"
import DeveloperBoard from 'react-icons/lib/md/developer-board'
import { connect } from "react-redux"
import Search from 'react-icons/lib/fa/search'

import theme from '_src/theme/theme.yaml'
import { setShowLayout } from '_src/store'

const ToolBox = (props) => {

  const { showLayout } = props

  return (
    <div className='box'>
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
        .iconBox {
          transition: all .5s;
          display: inline-block;
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
}

const mapDispatchToProps = {
  setShowLayout,
}

const mapStateToProps = (state, ownProps) => ({
  showLayout: state.layout.showLayout,
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)

