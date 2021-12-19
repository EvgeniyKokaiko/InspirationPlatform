import React, { useCallback, useState } from 'react';
import MenuComponent from '../MenuComponent';
import { BaseProps } from '../../Types/Types';
import { StackScreens } from '../Core/MainNavigationScreen';

type IProps = {} & BaseProps;

const MenuContainer: React.FC<IProps> = (props: IProps): JSX.Element => {
  const [search, setSearch] = useState('');
  function onChange(v: string) {
    setSearch(v);
    console.log(search);
  }

  const onPostPress = useCallback((postData) => {
    props.navigation.navigate(StackScreens.PostDetails, { postData });
  }, []);

  const STATE = {
    search,
    setSearch,
    onChange,
    onPostPress,
  };

  return <MenuComponent {...STATE} />;
};

export default MenuContainer;
