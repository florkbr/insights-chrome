import React, { useContext, useEffect } from 'react';

import { NotificationDrawer } from '@patternfly/react-core/dist/dynamic/components/NotificationDrawer';

import ChromeAuthContext from '../../auth/ChromeAuthContext';
import InternalChromeContext from '../../utils/internalChromeContext';

import { getSharedScope } from '@scalprum/core';
import { useAtomValue } from 'jotai';
import { notificationDrawerReadyAtom } from '../../state/atoms/notificationDrawerAtom';

export type DrawerPanelProps = {
  panelRef: React.Ref<unknown>;
  toggleDrawer: () => void;
};
const NOTIF_DRAWER_MODULE = '@notif-module/drawer';

const DrawerPanelBase: React.FC<DrawerPanelProps> = ({ panelRef, toggleDrawer }) => {
  const auth = useContext(ChromeAuthContext);
  const isOrgAdmin = auth?.user?.identity?.user?.is_org_admin;
  const { getUserPermissions } = useContext(InternalChromeContext);
  const { DrawerPanel, useNotificationsDrawer } = getSharedScope()[NOTIF_DRAWER_MODULE]['1.0.0'].get();
  const isNotificationsDrawerReady = useAtomValue(notificationDrawerReadyAtom);
  const { state, initialize } = useNotificationsDrawer();
  const notificationProps = {
    isOrgAdmin: isOrgAdmin,
    getUserPermissions: getUserPermissions,
    panelRef: panelRef,
    toggleDrawer: toggleDrawer,
  };

  useEffect(() => {
    if (!isNotificationsDrawerReady) return;
    getUserPermissions('notifications').then(perms => {
      initialize(true, perms);
    }).catch(err => {
      console.error('Error fetching user notifications permissions while rendering drawer content', err);
    });
  }, [isNotificationsDrawerReady]);

  return (
    <NotificationDrawer ref={panelRef} {...notificationProps}>
      <DrawerPanel {...notificationProps} />
    </NotificationDrawer>
  );
};

const DrawerPanel = React.forwardRef<unknown, Omit<DrawerPanelProps, 'panelRef'>>((props, innerRef) => {
  const isNotificationsDrawerReady = useAtomValue(notificationDrawerReadyAtom);
  const { DrawerContextProvider } = getSharedScope()[NOTIF_DRAWER_MODULE]?.['1.0.0']?.get();

  return (
    <>
      {isNotificationsDrawerReady &&  <DrawerContextProvider>
          <DrawerPanelBase panelRef={innerRef} {...props} />
        </DrawerContextProvider>}
    </>
  );
});
DrawerPanel.displayName = 'DrawerPanel';

export default DrawerPanel;
