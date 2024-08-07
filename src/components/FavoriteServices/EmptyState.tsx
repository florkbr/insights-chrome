import { Button } from '@patternfly/react-core/dist/dynamic/components/Button';
import { Flex } from '@patternfly/react-core/dist/dynamic/layouts/Flex';
import { Stack, StackItem } from '@patternfly/react-core/dist/dynamic/layouts/Stack';
import { Text, TextContent } from '@patternfly/react-core/dist/dynamic/components/Text';

import React from 'react';
import ChromeLink from '../ChromeLink';

import './EmptyState.scss';

const EmptyState = () => (
  <>
    <Flex className="pf-v5-u-justify-content-center pf-v5-u-align-items-stretch">
      <Stack className="pf-v5-u-justify-content-center">
        <StackItem className="pf-v5-u-text-align-center">
          <img src="https://console.redhat.com/apps/frontend-assets/favoritedservices/favoriting-emptystate.svg" alt="favoriting image" />
        </StackItem>
        <StackItem className="pf-v5-u-text-align-center">
          <TextContent>
            <Text component="h3" className="pf-v5-m-center">
              No favorited services
            </Text>
            <Text component="small" className="pf-v5-u-mt-sm">
              Add a service to your favorites to get started here.
            </Text>
          </TextContent>
        </StackItem>
        <StackItem className="pf-v5-u-text-align-center pf-v5-u-mt-md">
          <Button variant="primary" alt="View all services" component={(props) => <ChromeLink {...props} href="/allservices" />}>
            View all services
          </Button>
        </StackItem>
      </Stack>
    </Flex>
  </>
);

export default EmptyState;
