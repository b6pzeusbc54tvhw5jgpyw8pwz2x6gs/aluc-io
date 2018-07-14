import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { forceCheck } from "react-lazyload"

import { setNavigatorPosition, setNavigatorShape, setCategoryFilter } from "../../store"
import List from "./List"
import theme from "../../theme/theme.yaml"

const SHOW_LAYOUT = true

class SimplePostList extends React.Component {

  expandOnClick = e => {
    this.props.setNavigatorShape("open")
    setTimeout(forceCheck, 600)
  }

  removefilterOnClick = e => {
    this.props.setCategoryFilter("all posts")
  }

  render() {
    const { posts, navigatorPosition, navigatorShape, categoryFilter } = this.props

    return (
      <div className='box'>
        <List
          posts={posts}
          navigatorPosition={navigatorPosition}
          navigatorShape={navigatorShape}
          linkOnClick={(e) => console.log(e)}
          expandOnClick={this.expandOnClick}
          categoryFilter={categoryFilter}
          removeFilter={this.removefilterOnClick}
        />
        <div className='seeMore'>See more...</div>
        <style jsx>{`
          .box {
            transform: translate3d(0, 0, 0);
/*             will-change: left, top, bottom, width; */
/*             position: absolute; */
/*             top: 0, */
/*             left: 0, */
/*             transition-timing-function: "ease", */
/*             transition: "left .9s", */
            width: 640px;
            background-color: ${SHOW_LAYOUT ? "rgba(0, 21, 128, 0.17)" : theme.navigator.colors.background};
            margin: 10px auto 0 auto;
          }
          .seeMore {
            margin-top: 20px;
            font-family: ${theme.font.family.base};
            font-size: 1.2rem;
            font-style: oblique;
            color: ${theme.color.neutral.accent};
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
              padding: ${theme.space.layoutPadding.l};
            }
          }
        `}</style>
      </div>
    )
  }
}

SimplePostList.propTypes = {
  posts: PropTypes.array.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  setNavigatorPosition: PropTypes.func.isRequired,
  setNavigatorShape: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
  isPostPage: state.navigatorPosition === 'is-aside',
  navigatorPosition: state.navigatorPosition,
  navigatorShape: state.navigatorShape,
  isWideScreen: state.isWideScreen,
  categoryFilter: state.categoryFilter
})

const mapDispatchToProps = {
  setNavigatorPosition,
  setNavigatorShape,
  setCategoryFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(SimplePostList)
