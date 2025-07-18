import React from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { IntlProvider } from 'react-intl';
import ContextSwitcher from '../../../src/components/ContextSwitcher';
import chromeStore from '../../../src/state/chromeStore';

const Wrapper = ({ children }) => (
  <IntlProvider locale="en">
    <JotaiProvider store={chromeStore}>{children}</JotaiProvider>
  </IntlProvider>
);

const testUser = {
  identity: {
    account_number: '123456',
    org_id: '7890',
    internal: {
      org_id: '7890',
      account_id: '13579',
    },
    type: 'external',
    user: {
      username: 'Extra fella',
      email: 'mail@mail.com',
      first_name: 'john',
      last_name: 'doe',
      is_active: true,
      is_internal: false,
      is_org_admin: false,
      locale: 'en-us',
    },
  },
};

describe('<ContextSwithcer />', () => {
  it('should not fire cross account request for non-internal user', () => {
    cy.intercept('http://localhost:8080/api/rbac/v1/cross-account-requests/?status=approved&order_by=-created&query_by=user_id', {
      data: [],
    });
    const elem = cy
      .mount(
        <Wrapper>
          <ContextSwitcher accountNumber={testUser.identity.account_number} isInternal={testUser.identity.user.is_internal} />
        </Wrapper>
      )
      .get('html');
    elem.matchImageSnapshot();
  });

  it('should fire cross account request for internal user and render component', () => {
    cy.viewport(1280, 720);
    cy.intercept('http://localhost:8080/api/rbac/v1/cross-account-requests/?status=approved&order_by=-created&query_by=user_id', {
      data: [
        {
          target_account: '111',
          request_id: '111',
          end_date: '2022',
          target_org: '222',
        },
      ],
    }).as('crossAccountRequests');
    testUser.identity.user.is_internal = true;
    const elem = cy
      .mount(
        <Wrapper>
          <ContextSwitcher accountNumber={testUser.identity.account_number} isInternal={testUser.identity.user.is_internal} />
        </Wrapper>
      )
      .get('html');
    cy.wait('@crossAccountRequests');
    elem.get('body').matchImageSnapshot();
  });
});
