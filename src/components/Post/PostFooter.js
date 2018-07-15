import React from "react";
import PropTypes from "prop-types";

//import asyncComponent from "_src/components/AsyncComponent";
import { asyncComponent } from 'react-async-component';

import PostComments from "./PostComments";
import theme from "_src/theme/theme.yaml"

const PostShare = asyncComponent({
  resolve: () => import('./PostShare'),
  LoadingComponent: () => <div>Loading</div>, // Optional
  ErrorComponent: ({ error }) => <div>{error.message}</div>, // Optional
})


const PostFooter = ({ author, post, slug, facebook }) => {
  return (
    <footer className={'footer'}>
      <PostShare post={post} slug={slug} />
      <PostComments post={post} slug={slug} facebook={facebook} />
      <style jsx>{`
        footer {
          color: ${theme.main.colors.footer};
          font-size: ${theme.main.fonts.footer.size}em;
          line-height: ${theme.main.fonts.footer.lineHeight};
        }
        footer p {
          margin: 0;
        }
      `}</style>
    </footer>
  );
};

PostFooter.propTypes = {
  author: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
  facebook: PropTypes.object.isRequired
};

export default PostFooter
