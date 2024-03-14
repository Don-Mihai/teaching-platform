import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../redux/store';
import { addGroup, get, deleteGroup } from '../../redux/Group';

import Button from '@mui/material/Button';
import Group from '../../components/Group';
import { IGroup } from '../../redux/Group/types';
import GoogleAuth from '../../components/GoogleAuth';
import './Main.scss';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { groups } = useSelector((state: RootState) => state.group);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    user?.id && dispatch(get());
  }, [user?.id]);

  const handleAddGroup = () => {
    const group: Partial<IGroup> = {
      name: '',
      url: {
        inordic: '',
        sber: '',
      },
      userId: user.id || '',
    };
    dispatch(addGroup(group));
  };

  const handleRemoveGroup = (groupId: string | number) => {
    dispatch(deleteGroup(groupId));
  };

  return (
    <>
      <GoogleAuth />
      <div className="groups">
        {groups.map((group) => (
          <Group group={group} key={group.id} onRemove={handleRemoveGroup} />
        ))}
      </div>
      <Button className="create-group" onClick={handleAddGroup} variant="contained" color="primary">
        +
      </Button>
    </>
  );
};

export default MainPage;
