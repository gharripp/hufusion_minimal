import React from 'react';
import CollaborationsOverview from '../../components/research/CollaborationsOverview';
import PageHeader from '../../components/PageHeader';

const Collaborations = () => {
  return (
    <div>
      <PageHeader
        title="Collaborations"
        description="Working together to advance fusion energy science"
      />
      <CollaborationsOverview />
    </div>
  );
};

export default Collaborations;
