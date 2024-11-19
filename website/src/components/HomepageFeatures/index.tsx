import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Modular',
    description: (
      <>
        Modular architecture and composable features that minimize the amount of code bundled
        into your production website.
      </>
    )
  },
  {
    title: 'Lightweight',
    description: (
      <>Just 1.4 kB for a fully functional and accessible autocomplete solution in React.</>
    )
  },
  {
    title: 'Headless',
    description: (
      <>
        Providing behavior and data/state management without imposing any specific markup or
        styling.
      </>
    )
  }
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
