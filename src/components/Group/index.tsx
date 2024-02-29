import { useState } from 'react';
import { IGroup } from '../../redux/Group/types';
import './Group.scss';
import GroupEdit from './GroupEdit';
import GroupMain from './GroupMain';

interface Props {
    group: IGroup;
}

const Group = ({ group }: Props) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={isEditing ? 'group flip' : 'group'}>
            <GroupEdit group={group} onFlip={handleEditClick} isShowed={!isEditing} />
            <GroupMain group={group} onFlip={handleEditClick} isShowed={isEditing} />
        </div>
    );
};

export default Group;
