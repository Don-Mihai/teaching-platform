import { useState } from 'react';
import { IGroup } from '../../redux/Group/types';
import './Group.scss';
import GroupEdit from './GroupEdit';
import GroupMain from './GroupMain';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Menu, MenuItem, IconButton } from '@mui/material';

interface Props {
  group: IGroup;
  onRemove: (groupId: string | number) => void;
}

const Group = ({ group, onRemove }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    handleEditClick();
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={isEditing ? 'group flip' : 'group'}>
      <GroupEdit group={group} onFlip={handleEditClick} isShowed={!isEditing} onRemove={onRemove} />
      <GroupMain group={group} onFlip={handleEditClick} isShowed={isEditing} onRemove={onRemove} />

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="group__more"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Редактировать</MenuItem>
        <MenuItem onClick={() => onRemove(group.id)}>Удалить</MenuItem>
      </Menu>
    </div>
  );
};

export default Group;
