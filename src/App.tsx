import React from 'react';

import styles from './App.module.scss';
import AlertTitle from './components/DashboardTitle';
import HeaderBar from './components/HeaderBar';
import NavigationBar from './components/NavigationBar';
import AlertsWidget from './widgets/AlertsWidget';
import ChartsWidget from './widgets/ChartsWidget';
import InsightsWidget from './widgets/InsightsWidget';
import ResourcesWidget from './widgets/ResourcesWidget';

const App: React.FC<{}> = () => {
  return (
    <div data-testid="app-root">
      <HeaderBar />
      <main className={styles.content}>
        <div className={styles.space3} />
        <NavigationBar />
        <AlertTitle />
        <div className={styles.space2} />
        <ChartsWidget />
        <div className={styles.space1} />
        <div className={styles.widgets}>
          <div className={styles.spaceToRight}>
            <ResourcesWidget />
          </div>
          <div className={styles.spaceToRight}>
            <InsightsWidget />
          </div>
          <AlertsWidget />
        </div>
      </main>
    </div>
  );
};

export default App;
