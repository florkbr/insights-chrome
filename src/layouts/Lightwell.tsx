import React from 'react';
import { ScalprumComponent } from '@scalprum/react-core';
import LoadingFallback from '../utils/loading-fallback';
import ErrorComponent from '../components/ErrorComponents/DefaultErrorComponent';

// TODO: Temporary layout for content-sources-frontend authed experience (RHCLOUD-48921). Revisit for a longer-term approach.
const Lightwell = () => (
  <div id="chrome-app-render-root">
    <ScalprumComponent scope="contentSources" module="./LightwellApp" appId="contentSources" ErrorComponent={<ErrorComponent />} fallback={LoadingFallback} />
  </div>
);

export default Lightwell;
