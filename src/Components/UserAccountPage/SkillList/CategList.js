import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import Collapse from '@material-ui/core/Collapse/index';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Done from '@material-ui/icons/Done';
import '../../../styles/skillListStyle.css';
import CheckboxList from './SubCategoriesChekedLIst';
import {useState, useEffect} from 'react';
import {getActiveCategories} from "../../../firebase/fireManager";
import {db} from "../../../firebase/fire";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function SkillList(props) {
    const[catData,setData] = useState([]);
    const[loading,setLoading]= useState(false);
    const classes = useStyles();
    const [openIds, setOpen] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [otherSkillName, setOtherSkill] = useState();
    const addOtherSkill = (e)=>{
        //console.log(e.target.value);
        setInputValue(e.target.value);
        setOtherSkill(e.target.value);
    };
    const doneHandleClick = ()=>{
        const otherData = {
            id :'8.Others',
            name:otherSkillName
        };
        const userSkillData ={
            'skill-id':'8.Others',
            'user-id':props.userId
        };
        console.log(otherData);
        console.log(userSkillData);
        db.collection("Users-Skills").add(userSkillData)
            .then(function(docRef) {
                //console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
               // console.error("Error adding document: ", error);
            });
         setInputValue('');
    };
    const handleClick = catId =>()=> {
         // console.log(catId);
       const currentIndex = openIds.indexOf(catId);
       const newOpenIds = [...openIds];
          if (currentIndex === -1) {
             newOpenIds.push(catId);
         } else {
             newOpenIds.splice(currentIndex, 1);
         }

         setOpen(newOpenIds);
     };
    useEffect(() => {
        // code to run on component mount
        getActiveCategories().then(data => {
            debugger;
            data.map( (value , index ) => {
                if(value.id === '8.Others'){
                    data.splice(index,1);
                }
                            } );
            console.log(data);
            //let newData = data.splice(-1,1);
          //  console.log(newData );
                setData(data);
                setLoading(true);
           // console.log(data,'cattttttttttttt')
            }
        );

    }, []);

    return (
        <div className='skillDiv' style={{display:loading?'block':'none'}}>
            <h5 style={{color: 'white'}}>Choose your skills</h5>
            { catData.map(value => {
                    return (
                        <List key  = {value.id}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                           className={classes.root}
                        >
                            <ListItem key = {value.id} style={{backgroundColor: 'beige'}} onClick={handleClick(value.id)}>
                                <ListItemText primary={value.name} />
                                {openIds.indexOf(value.id) !== -1  ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={openIds.indexOf(value.id) !== -1} timeout="auto" unmountOnExit>
                                <List  component="div" disablePadding>
                                     <CheckboxList   catId={value.id} userId ={props.userId} get_sub={props.get_sub} delete_skill_Toggle={props.delete_skill_Toggle} />
                                </List>
                            </Collapse>
                        </List>
                    )
                }
              )
            }
            <p>Input Other skills: </p>
            <div>
            <input type='text' onChange={addOtherSkill} value ={inputValue}/>
            <Done onClick={doneHandleClick} style={{fill:"orange",backgroundColor:'#6c757d', marginTop:'0.6px', position:"absolute",height:'1.1em'}}/>
            </div>
           </div>
            );
}