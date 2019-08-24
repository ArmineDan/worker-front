import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import {
    getActiveCategories,
    getsubCategories,
    getUserSkills,
    removeSkillFromUserList
} from "../../../firebase/fireManager";
import '../../../styles/subSkillStyle.css';
import {db} from "../../../firebase/fire";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette,
    },
}));

export default function CheckboxList(props) {
    const classes = useStyles();
    const {catId} = props;
    const [subData, setSubData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value.id);
            // data for Armine's function
            const skillData = {
                'id': value.id,
                name: value.name
            };
            const userSkillData = {
                'skill-id': value.id,
                'user-id': props.userId
            };
            db.collection("Users-Skills").add(userSkillData)
                .then(function (docRef) {
                    // console.log("Document written with ID: ", docRef.id);
                    props.get_sub(skillData)
                })
                .catch(function (error) {
                    //console.error("Error adding document: ", error);
                });
            // console.log(userSkillData)
            // console.log(skillData)
        } else {
            newChecked.splice(currentIndex, 1);
            const skillData = {
                'id': value.id,
                name: value.name
            };
            removeSkillFromUserList(props.userId, value.id);
            props.delete_skill_Toggle(skillData);
            db.collection("Users-Skills").get()
                .then(data => {
                    // console.log(data.docs)
                })
                .catch(function (error) {
                    //console.error("Error adding document: ", error);
                });

        }
        setChecked(newChecked);
        //console.log(newChecked, value.name)
    };

    useEffect(() => {
        getUserSkills(props.userId).then(skill => {
           // debugger;
            console.log(props.removed_skill_id,"removed_skill_id")
                setChecked(skill);
            }
        );


    getsubCategories(catId).then(subData => {
        setSubData(subData);
        setLoading(true);
        //console.log(subData);

    });

    },[props.userId,props.removed_skill_id]);

    return (
        <List className={classes.root} style={{display:loading?'block':'none'}} >
            {subData.map(value => {
                let itemId = value.id;
                let item = value.name;

                return (
                    <ListItem key={item} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                color= 'primary'
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