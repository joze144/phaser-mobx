import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HeartIcon from '../Icon/HeartIcon';

interface Props {
  currentScore: Number;
}

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  heartIcon: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  overlay: {
    position: 'absolute',
    top: '30%',
    width: '100%',
    zIndex: 1000,
  },
});

const CurrentScoreView = (props: Props) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.heartIcon}><HeartIcon /></div>
      <div className={styles.overlay}><div>{props.currentScore}</div></div>
  </div>);
};

export default CurrentScoreView;
