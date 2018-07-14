import React from "react"
import Link from "gatsby-link"
import PropTypes from "prop-types"
import injectSheet from "react-jss"

const styles = theme => ({
  listItem: {
    margin: "0 0 .7em 0",
    transition: "height 1s",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      margin: "0 0 0 0"
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 0"
      }
    }
  },
  listLink: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: ".5em 0em .5em 0em",
    color: theme.navigator.colors.postsListItemLink,
    "@media (hover: hover)": {
      "&:hover": {
        color: theme.navigator.colors.postsListItemLinkHover,
        "& .pointer": {
          borderRadius: "65% 75%"
        }
      }
    }
  },
  listItemText: {
    margin: "0 0 0 0",
    flexGrow: 1,
    //display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "Nanum Gothic Coding",
    fontWeight: 100,
    "& .title": {
      color: theme.navigator.colors.postsListItemLinkHover,
    },
    "& .date": {
      marginRight: 16,
    },
    "& span": {
      fontWeight: 100,
      lineHeight: 1.15,
      letterSpacing: "-0.03em",
      margin: 0,
      fontSize: `1.1em`,
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      ".moving-featured &, .is-aside &": {
        margin: "0 0 0 .5em"
      }
    }
  }
})

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
    const { classes, post, linkOnClick } = this.props
    const { node } = post
    const { fields } = node
    const dateStr = new Date(fields.prefix).toDateString()

    return (
      <li
        className={`${classes.listItem} ${post.node.frontmatter.category}`}
        style={{ display: `${this.state.hidden ? "none" : "block"}` }}
        key={fields.slug}
      >
        <Link
          activeClassName="active"
          className={classes.listLink}
          to={fields.slug}
          onClick={linkOnClick}
        >
          <div className={classes.listItemText}>
            <span className={"date"}>{dateStr}</span>
            <span className={"title"}>{post.node.frontmatter.title}</span>
          </div>
        </Link>
      </li>
    )
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  linkOnClick: PropTypes.func.isRequired,
  categoryFilter: PropTypes.string.isRequired
}

export default injectSheet(styles)(ListItem)
