import ProblemItem from './ProblemItem';
import classes from './ProblemList.module.css';

function ProblemList(props) {
  return (
    <ul className={classes.list}>
      {props.problems.map((problem) => (
        <ProblemItem
          key={problem.id}
          id={problem.id}
          image={problem.image}
          title={problem.title}
          isFavorite={problem.isFavorite}
          gym={problem.gym}
          description={problem.description}
          rating={problem.rating}
          vrating={problem.vrating}
        />
      ))}
    </ul>
  );
}

export default ProblemList;