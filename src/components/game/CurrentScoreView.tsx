import * as React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import HeartIcon from '../Icon/HeartIcon';
import Box from '@material-ui/core/Box';
import { observer } from 'mobx-react';
import { IGameStore } from './gameStore';

interface Props {
  gameStore?: IGameStore;
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    marginTop: '30px',
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
  box: {
    backgroundColor: theme.palette.primary.main
    }
}));

const CurrentScoreView = (props: Props) => {
  const styles = useStyles();

  return (
    <Box display="flex" className={styles.box}>
      <Box m="auto" textAlign="center">
        <div className={styles.container}>
          <div className={styles.heartIcon}><HeartIcon /></div>
          <div className={styles.overlay}><div>{props.gameStore!.currentScore}</div></div>
        </div>
      </Box>
    </Box>);
};

export default observer(CurrentScoreView);
