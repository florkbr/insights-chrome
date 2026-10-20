import { useLoadModule } from '@scalprum/react-core';

const useLightwellApp = () => useLoadModule({ scope: 'contentSources', module: './LightwellApp' }, undefined);

export default useLightwellApp;
