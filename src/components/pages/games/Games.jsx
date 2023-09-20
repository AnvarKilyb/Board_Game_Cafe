import styles from "./Games.module.css";
import Filter from "./filter/Filter";
import Game from "./game/Game";

const Games = () => {
  return (
    <div className={styles.row}>
      <div className={`${styles.column} ${styles.filter}`}> <Filter /> </div>
      <div className={`${styles.column} ${styles.games}`}> <Game/> </div>
    </div>
  );
};
export default Games;