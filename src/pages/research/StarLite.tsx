import React from 'react';
import StarLiteOverview from '../../components/research/StarLiteOverview';
import PageHeader from '../../components/PageHeader';

const StarLite = () => {
  return (
    <div>
      <PageHeader
        title="STAR_Lite Stellarator"
        description="A Student-Driven Stellarator for Training And Research – Learn Interesting Things Everyday"
      />
      <StarLiteOverview />
    </div>
  );
};

export default StarLite;
