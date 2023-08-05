import styles from "./Wrapper.module.css";
//THIS IS WRAPPER FOR THE UI PURPOSES ON THE BIGGER SCREENS
//Import Wrapper and you can just wrap your content with <Wrapper>content</Wrapper>
//And you will have your content centered with max-width of 1280px
const Wrapper = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
export default Wrapper;
