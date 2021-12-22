import clsx       from 'clsx';
import React      from 'react';

import baseConfig from '../../mael.config';

import styles     from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image?: string;
  description: React.ReactNode;
};

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx(`col col--4`, styles.feature)}>
      {image && (
        <div className={`text--center`}>
          <img className={styles.featureImage} src={image} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// eslint-disable-next-line arca/no-default-export
export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container`}>
        <div className={`row`}>
          {baseConfig.index.features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
