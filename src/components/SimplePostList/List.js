import React from "react";
import PropTypes from "prop-types";
import { forceCheck } from "react-lazyload";

import ListItem from "./ListItem";

class List extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      setTimeout(forceCheck, 300);
    }
  }

  render() {
    const {
      posts,
      linkOnClick,
      expandOnClick,
      categoryFilter,
      navigatorShape,
      removeFilter
    } = this.props;

    return (
      <div className={'posts'}>
        <div className={'inner'}>
          <ul className={'list'}>
            {posts && posts.map((post, i) => (
              <ListItem
                key={i}
                post={post}
                linkOnClick={linkOnClick}
                categoryFilter={categoryFilter}
              />
            ))}
          </ul>
        </div>
        <style jsx>{`
          .posts {
            left: 0px;
            top: 0px;
            width: 100%;
          }
          .inner { }
          .list {
            list-style: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    );
  }
}

List.propTypes = {
  posts: PropTypes.array.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  expandOnClick: PropTypes.func.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default List
