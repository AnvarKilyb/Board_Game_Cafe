import styles from "./Game.module.css";

const Game = (props) => {
  return (
    <div className={styles.game}>
      {props.game.title}
    </div>
  );
};
export default Game;