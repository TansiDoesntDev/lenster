import ExploreFeed from '@components/Explore/Feed';
import { GridItemEight, GridItemFour, GridLayout } from '@components/GridLayout';
import Announcement from '@components/Home/Announcement';
import NewPost from '@components/Publication/New';
import Footer from '@components/Shared/Footer';
import Seo from '@components/utils/Seo';
import { Mixpanel } from '@lib/mixpanel';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { useAppStore } from 'src/store/app';
import { PAGEVIEW } from 'src/tracking';

import EnableDispatcher from './EnableDispatcher';
import HomeFeed from './Feed';
import Hero from './Hero';
import RecommendedProfiles from './RecommendedProfiles';
import SetDefaultProfile from './SetDefaultProfile';
import SetProfile from './SetProfile';
import Streak from './Streak';

const Home: NextPage = () => {
  useEffect(() => {
    Mixpanel.track(PAGEVIEW.HOME);
  }, []);

  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <>
      <Seo />
      {!currentProfile && <Hero />}
      <GridLayout>
        <GridItemEight className="space-y-5">
          {currentProfile ? (
            <>
              <NewPost />
              <HomeFeed />
            </>
          ) : (
            <ExploreFeed />
          )}
        </GridItemEight>
        <GridItemFour>
          {currentProfile ? <EnableDispatcher /> : null}
          <Announcement />
          {currentProfile ? (
            <>
              <SetDefaultProfile />
              <SetProfile />
              <Streak />
            </>
          ) : null}
          <RecommendedProfiles />
          <Footer />
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default Home;
