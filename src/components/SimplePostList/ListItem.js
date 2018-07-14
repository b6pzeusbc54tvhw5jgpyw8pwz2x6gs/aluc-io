import React from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import theme from "../../theme/theme.yaml"

class ListItem extends React.Component {
  state = {
    hidden: false
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.categoryFilter !== this.props.categoryFilter) {
      const category = this.props.post.node.frontmatter.category
      const categoryFilter = this.props.categoryFilter

      if (categoryFilter === "all posts") {
        this.setState({ hidden: false })
      } else if (category !== categoryFilter) {
        this.setState({ hidden: true })
      } else if (category === categoryFilter) {
        this.setState({ hidden: false })
      }
    }
  }

  render() {
    const { post, linkOnClick } = this.props
    const { node } = post
    const { fields } = node
    const dateStr = new Date(fields.prefix).toDateString()

    return (
      <li
        className={`listItem ${post.node.frontmatter.category}`}
        style={{ display: `${this.state.hidden ? "none" : "block"}` }}
        key={fields.slug}
      >
        <Link
          activeClassName="active"
          className={'listLink'}
          to={fields.slug}
          onClick={linkOnClick}
        >
          <div className={'listItemText'}>
            <span className={"date"}>{dateStr}</span>
            <span className={"title"}>{post.node.frontmatter.title}</span>
          </div>
        </Link>
        <style jsx>{`
          .listItem {
            margin: 0px 0px .7em 0px;
            transition: height 1s;
          }

          .listLink {
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: flex-start;
            flex-direction: row;
            padding: .5em 0em .5em 0em;
            color: ${theme.navigator.colors.postsListItemLink};
          }
          .listLink:hover {
            color: ${theme.navigator.colors.postsListItemLinkHover};
          }
          .listLink:hover .pointer {
            border-radius: 65% 75%;
          }

          .listItemText {
            margin: 0 0 0 0;
            flex-grow: 1;
            flex-direction: column;
            width: 100%;
            font-family: 'Nanum Gothic Coding';
            font-weight: 100;
          }

          .listItemText .title {
            color: ${theme.navigator.colors.postsListItemLinkHover};
          }
          .listItemText .date {
            margin-right: 16px;
          }
          .listItemText span {
            font-weight: 100;
            line-height: 1.15;
            letter-spacing: -0.03em;
            margin: 0;
            font-size: 1.1em;
          }

        `}</style>
      </li>
    )
  }
}

ListItem.propTypes = {
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired
}

export default ListItem
