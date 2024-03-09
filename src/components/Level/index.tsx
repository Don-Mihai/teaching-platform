import LinearProgress from '@mui/material/LinearProgress';
import './Level.scss';
import { memo } from 'react';

interface Props {
  level: number;
  xp: number;
  maxXp: number;
  foo?: () => void;
}

const Level = memo(({ level, xp, maxXp, foo }: Props) => {
  return (
    <div className="component-level">
      <div className="component-level__number">{level}</div>
      <LinearProgress className="component-level__progress" variant="determinate" value={(xp / maxXp) * 100} />
      <div className="component-level__xp">
        {xp}/{maxXp}
      </div>
    </div>
  );
});

export default Level;
