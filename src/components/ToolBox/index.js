import React from "react"
import DeveloperBoard from 'react-icons/lib/md/developer-board'
import Search from 'react-icons/lib/fa/search'

import theme from "../../theme/theme.yaml"

const ToolBox = (props) =>
  <div className='box'>
    <div className='iconBox'>
      <DeveloperBoard className='icon devBoard'/>
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

export default ToolBox

