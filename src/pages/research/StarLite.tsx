import React from 'react';
import StarLiteOverview from '../../components/research/StarLiteOverview';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';

const StarLite = () => {
  usePageTitle('STAR_Lite');

  return (
    <div className="pt-20"> {/* Added pt-20 here */}
      <PageHeader
        title="STAR_Lite Stellarator"
        description="A Student-Driven Stellarator for Training And Research – Learn Interesting Things Everyday"
      />
      <StarLiteOverview />
    </div>
  );
};

export default StarLite;
