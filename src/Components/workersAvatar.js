import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 89,
    height: 89,
  },
});

export default function ImageAvatars(props) {

  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="Varpet Avatar" src={props.img} className={classes.bigAvatar} />
    </Grid>
  );
}