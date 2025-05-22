import React from 'react';
import PublicationsOverview from '../../components/research/PublicationsOverview';
import PageHeader from '../../components/PageHeader';

const Publications = () => {
  return (
    <div className="pt-20"> {/* Added pt-20 here */}
      <PageHeader
        title="Publications"
        description="Disseminating our research findings to the scientific community"
      />
      <PublicationsOverview />
    </div>
  );
};

export default Publications;
