import './Tasks.scss';
interface Props {
  title: string;
  children: React.ReactNode;
}

const Tasks = ({ title, children }: Props) => {
  return (
    <div className="item-statistic">
      <h2 className="item-statistic__title">{title}</h2>
      <p className="item-statistic__sub-title">{children}</p>
    </div>
  );
};

export default Tasks;
