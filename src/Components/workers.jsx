import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ImageAvatars from './workersAvatar';
import '../styles/workersStyle.css';
import {Link} from "react-router-dom";

const useStyles = makeStyles({
  card: {
      maxWidth: '195px',
      minWidth: '194px',
      float: 'left',
     margin: '7px 12px'
    
  },
  media: {
    height: 35,
      backgroundColor:'#ff9800'

  },
    auto:{
      margin:'auto'
    }
});

export default function MediaCard(props) {
    const [users, setUsers] = useState();
  //console.log(users,"users-workers")
    useEffect(()=>{
        setUsers(props.users_list)
    },[users,props]);
  const classes = useStyles();

  return (
      <>{users?


    <Card className={classes.card}>

      <CardActionArea >
        <CardMedia
          className={classes.media}
        />
        <ImageAvatars img={users.avatar}/>
        <CardContent >
            <Typography gutterBottom variant="h5" component="h2">
        {users['firstName']}&nbsp;{users['lastName']}
            </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
              {users['address']}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {users['age']}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <Link to={{ pathname:`/profile/${users.id}`}} className={classes.auto} >
        <Button  size="small" color="primary" margin= "center" >  More
                   </Button>
          </Link>
        </CardActions>
    </Card>

            :null}
    </>
  );
}

