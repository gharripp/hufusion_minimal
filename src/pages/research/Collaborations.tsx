import React from 'react';
import CollaborationsOverview from '../../components/research/CollaborationsOverview';
import PageHeader from '../../components/PageHeader';
import usePageTitle from '../../hooks/usePageTitle';

const Collaborations = () => {
  usePageTitle('Collaborations');

  return (
    <div className="pt-20"> {/* Added pt-20 here */}
      <PageHeader
        title="Collaborations"
        description="Working together to advance fusion energy science"
      />
      <CollaborationsOverview />
    </div>
  );
};

export default Collaborations;
