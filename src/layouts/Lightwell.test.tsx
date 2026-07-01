jest.mock('../components/ErrorComponents/DefaultErrorComponent', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-error-component" />,
}));

// jest.mock does not intercept @scalprum/* in this project's SWC/Jest setup,
// so we initialize scalprum with a stub config instead.
import { initialize } from '@scalprum/core';
import { render } from '@testing-library/react';
import Lightwell from './Lightwell';
import { describe, expect, it } from '@jest/globals';

describe('Lightwell', () => {
  beforeAll(() => {
    initialize({
      appsConfig: {
        contentSources: {
          name: 'contentSources',
          manifestLocation: '/test/manifest.json',
        },
      },
    });
  });

  it('should render the layout shell', () => {
    const { container } = render(<Lightwell />);
    expect(container.querySelector('#chrome-app-render-root')).toBeTruthy();
  });

  it('should not render header or sidebar', () => {
    const { container } = render(<Lightwell />);
    expect(container.querySelector('.chr-c-masthead')).toBeFalsy();
    expect(container.querySelector('#chr-c-sidebar')).toBeFalsy();
  });
});
