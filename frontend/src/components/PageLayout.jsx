import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';

const PageLayout = ({ children, isHomePage = false }) => {
  return (
    <>
      {isHomePage ? (
        <HeroSection>
          <Header isHeroHeader={true} />
         </HeroSection>
       ) : (
         <Header isHeroHeader={false} />
       )}
      <main>
        {isHomePage ? children : <>{children}</>}
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;