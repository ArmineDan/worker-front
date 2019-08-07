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

const useStyles = makeStyles({
  card: {
      maxWdth: '195px',
      float: 'left',
     margin: '0 12px'
    
  },
  media: {
    height: 35,
      backgroundColor:'#ff9800'

  },
});

export default function MediaCard(props) {
    const [users, setUsers] = useState();

  console.log(users,"users-workers")
    useEffect(()=>{
        setUsers(props.users_list)
    },[users,props])
  const classes = useStyles();

  return (
      <>{users?

    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // // image="/static/images/cards/contemplative-reptile.jpg"
          // image="C:\Users\Shushan\Desktop\Port.jpg"
          // title="Contemplative Reptile"
        />
        <ImageAvatars img={users.img}/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              {users['firstName']}&nbsp;{users['lastName']}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Yerevan, Masiv, Gayi ave.
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Age: {users['age']}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" margin= "center">
          More
        </Button>
        </CardActions>
    </Card>

            :null}
    </>
  );
}

