import React from 'react';
import { PageContentType } from './Pages';
import '../../styles/PageContent.scss';

type PageContentProps = PageContentType;

const PageContent = ({ heading, subheading, body }: PageContentProps): JSX.Element => {
  return (
    <div>
      <h1>{heading}</h1>
      {subheading && <h4>{subheading}</h4>}
      {body}
    </div>
  );
};

export default PageContent;
