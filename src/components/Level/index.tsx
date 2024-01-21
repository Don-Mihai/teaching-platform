import LinearProgress from '@mui/material/LinearProgress';
import './Level.scss'

interface Props {
	level: number;
	xp: number;
	maxXp: number;
}
const Level = ({ level, xp, maxXp }: Props) => {
    return (
        <div className="component-level">
            <div className="component-level__number">{level}</div>
            <LinearProgress className="component-level__progress" variant="determinate" value={xp / maxXp * 100} />
            <div className="component-level__xp">{xp}/{maxXp}</div>
        </div>
    );
};
 
export default Level;