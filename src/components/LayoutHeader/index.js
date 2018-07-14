import React from "react"
import PropTypes from "prop-types"
import Avatar from "@material-ui/core/Avatar"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Link } from "gatsby"

import theme from "../../theme/theme.yaml"
import ToolBox from '../ToolBox'
import avatar from "../../images/jpg/avatar.jpg"
import { isWideScreenSelector } from '_src/selectors/layout'

const SHOW_LAYOUT = true

const LayoutHeader = props => {
  const { config, location } = props
  console.log( props )


  return (
    <div className='box'>
      <div className='avatarBox'>
        <Link className='link' to="/">
          <Avatar alt={config.infoTitle} src={avatar} className='avatar' />
        </Link>
      </div>
      <div className='siteTitleBox'>
        <Link className='siteTitle' to="/">{config.siteTitle}</Link>
      </div>
      <ToolBox />
      <style jsx>{`
        .link {
          display: inline-block;
        }
        .box {
          transform: translate3d(0, 0, 0);
          background-color: ${SHOW_LAYOUT ? "rgba(64, 148, 64, 0.31)" : "none"};
          margin: 0 auto 0 auto;
          font-size: 1.2rem;
        }

        .box.postPage {
          width: 800px;
          position: relative;
          max-width: 50em;
          margin: 0 auto 0 auto;
          background-color: ${SHOW_LAYOUT ? "rgba(64, 148, 64, 0.31)" : "none"};
        }

        .avatarBox {
        }
        .siteTitleBox {
          margin-top: 10px;
          background-color: ${SHOW_LAYOUT ? "rgba(64, 48, 64, 0.31)" : "none"};
        }
        .box :global(.siteTitle) {
          color: ${theme.main.colors.title};
          font-size: 1.4rem;
          font-weight: 400;
          display: inline-block;
        }
        .box :global(.avatar) {
      /*     borderRadius: 65% 75%; */
          border: 1px solid #ddd;
          width: 64px;
          height: 64px;
          background-color: ${SHOW_LAYOUT ? "rgba(64, 48, 64, 0.31)" : "none"};
        }
        :global(.svg) {
          width: 40px;
          height: 40px;
/*           fill: ${theme.info.colors.socialIcons}; */
          transition: all .5s;
        }
        @media ${theme.mediaQuery.s} {
          .box {
            padding: ${theme.space.layoutPadding.s};
          }
        }
        @media ${theme.mediaQuery.m} {
          .box {
            padding: ${theme.space.layoutPadding.m};
          }
        }
        @media ${theme.mediaQuery.l} {
          .box {
            padding: 0;
          }
        }

      `}</style>
    </div>
  )
}

LayoutHeader.propTypes = {
  config: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  isWideScreen: isWideScreenSelector(state),
  showLayout: state.layout.showLayout,
  //navigatorPosition: state.navigatorPosition,
  //navigatorShape: state.navigatorShape,
  //categoryFilter: state.categoryFilter,
})

export default withRouter(connect(mapStateToProps)(LayoutHeader))
