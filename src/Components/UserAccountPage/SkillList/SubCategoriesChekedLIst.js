import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import {getsubCategories} from "../../../firebase/fireManager";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette,
    },
}));

export default function CheckboxList(props) {
    const classes = useStyles();
    const {catId}= props;
    const[subData,setSubData] = useState([]);
    const[loading,setLoading]= useState(false);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {debugger;
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        console.log(newChecked)
    };

    useEffect(()=> {
        getsubCategories(catId).then(subData => {            
            setSubData(subData);
            setLoading(true);
                //console.log(subData);
              });
        
    },[]);

    return (
        <List className={classes.root} style={{display:loading?'block':'none'}} >
            {subData.map(value => {
                let itemId = value.id;
                let item = value.name;

                return (
                    <ListItem key={item} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={checked.indexOf(value.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': itemId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={itemId} primary={item}/>

                    </ListItem>
                );
            })}
        </List>
    );
}