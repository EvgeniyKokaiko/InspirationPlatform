import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionImpl } from '../../redux/actions';
import { Store } from '../../redux/reducers/reducers';
import { Notification } from '../../Types/Models';
import { BaseResponse, TypedBaseResponse } from '../../Types/Types';
import { onFocus } from '../Core/MainNavigationScreen';
import NotificationsComponent from '../NotificationsComponent';

type IState = {
  loading: boolean;
  refresh: boolean;
};
type IProps = {};

const NotificationContainer: React.FC<IProps> = () => {
  const [getState, setState] = useState<IState>({
    loading: false,
    refresh: false,
  });
  const dispatch = useDispatch();
  const notifications = useSelector<Store>((store) => store.notificationsReducer) as TypedBaseResponse<Array<Notification>>;

  const onReload = useCallback(() => {
    dispatch(actionImpl.getNotifications(0, 0));
  }, []);

  const STATE = {
    loading: getState.loading,
    items: notifications.data,
    refresh: getState.refresh,
    onReload,
  };

  onFocus(() => {
    dispatch(actionImpl.getNotifications(0, 0));
    setState({ ...getState, loading: true });
  }, []);

  useEffect(() => {
    setState({ ...getState, loading: false });
    console.log(notifications, 'notific');
  }, [notifications]);

  return <NotificationsComponent {...STATE} />;
};

export { NotificationContainer };
