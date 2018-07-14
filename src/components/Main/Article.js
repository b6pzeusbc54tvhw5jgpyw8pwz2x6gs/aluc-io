import React from "react";
import PropTypes from "prop-types";

import theme from "_src/theme/theme.yaml"

const Article = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <article className="article">{children}</article>

      {/* --- STYLES --- */}
      <style jsx>{`
        .article {
          padding: ${theme.space.inset.xs};
          margin: 0 auto;
        }
        @from-width m {
          .article {
            padding: ${`calc(${theme.space.s}) calc(${theme.space.s})`};
          }
        }
        @from-width l {
          .article {
            padding: ${`calc(${theme.space.default} * 2) 0 calc(${
              theme.space.default
            })`};
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
};

export default Article;
