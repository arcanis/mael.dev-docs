import Link                 from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout               from '@theme/Layout';
import clsx                 from 'clsx';
import React                from 'react';

import baseConfig           from '../../mael.config';
import HomepageFeatures     from '../components/HomepageFeatures';

import styles               from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(`hero hero--primary`, styles.heroBanner)}>
      <div className={`container`}>
        <h1 className={`hero__title`}>{siteConfig.title}</h1>
        <p className={`hero__subtitle`}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className={`button button--outline button--secondary button--lg ${styles.getStarted}`} to={baseConfig.index.getStarted}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

// eslint-disable-next-line arca/no-default-export
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
