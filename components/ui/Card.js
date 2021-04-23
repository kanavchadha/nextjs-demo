import classes from './Card.module.css';

function Card(props) {
  return <div className={classes.card} style={props.styles}>{props.children}</div>;
}

export default Card;
