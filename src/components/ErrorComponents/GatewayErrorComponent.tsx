import React, { Fragment } from 'react';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import sanitizeHtml from 'sanitize-html';
import { useAtomValue } from 'jotai';
import { Text, TextContent } from '@patternfly/react-core/dist/dynamic/components/Text';

import ChromeLink from '../ChromeLink/ChromeLink';
import { useIntl } from 'react-intl';
import Messages from '../../locales/Messages';
import { ThreeScaleError } from '../../utils/responseInterceptors';
import { activeModuleAtom } from '../../state/atoms/activeModuleAtom';
import { activeProductAtom } from '../../state/atoms/activeProductAtom';

export type GatewayErrorComponentProps = {
  error: ThreeScaleError;
  serviceName?: string;
};

const MuaLink = (chunks: React.ReactNode) => (
  <ChromeLink appId="rbac" href="/iam/my-user-access">
    {chunks}
  </ChromeLink>
);

type DescriptionProps = {
  detail?: string;
  complianceError?: boolean;
};

const Description = ({ detail, complianceError }: DescriptionProps) => {
  const intl = useIntl();
  const description = intl.formatMessage(Messages.permissionErrorDescription, {
    MuaLink,
  });
  const errorDetail = intl.formatMessage(Messages.permissionErrorDetail, {
    message: detail || '',
  });
  return (
    <TextContent>
      {detail && complianceError ? (
        <Text dangerouslySetInnerHTML={{ __html: sanitizeHtml(detail) }}></Text>
      ) : (
        <Fragment>
          <Text>{description}</Text>
          {detail && <Text>{errorDetail}</Text>}
        </Fragment>
      )}
    </TextContent>
  );
};

const GatewayErrorComponent = ({ error, serviceName }: GatewayErrorComponentProps) => {
  const activeModule = useAtomValue(activeModuleAtom);
  const activeProduct = useAtomValue(activeProductAtom);

  return (
    <NotAuthorized
      description={<Description complianceError={error.complianceError} detail={error.detail} />}
      serviceName={activeProduct || activeModule || serviceName}
    />
  );
};

export default GatewayErrorComponent;
