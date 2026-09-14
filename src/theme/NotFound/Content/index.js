import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

export default function NotFoundContent({className}) {
  const {i18n: {currentLocale}} = useDocusaurusContext();

  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3">
          <Heading as="h1" className="hero__title">
            <Translate id="theme.NotFound.title">Page Not Found</Translate>
          </Heading>
          <p>
            <Translate id="theme.NotFound.p1">We could not find what you were looking for.</Translate>
          </p>
          <p>
            <Link to="/">{currentLocale === 'zh-Hans' ? '返回主页' : 'Back to home'}</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
