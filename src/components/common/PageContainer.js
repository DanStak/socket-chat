import React from 'react';
import ClassNames from 'classnames';

const PageContainer = ({ className, children }) => {

  const classes = ClassNames({
    'page-container': true,
  }, className)

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default PageContainer;
