import {makeStyles} from "@material-ui/core";

export  const myStyles ={
    button: {
        margin: "10px auto",
        width: 'inherit',

    },
    worker: {
            height: '150px',
            width: '150px',
            margin: '0px auto',
    },
    icon:{
        width:100,
        height: 100,
        margin: 'auto',
        color:"black"
    },
    h4:{color: 'antiquewhite'}

};
 export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    iconColor:{
        color:'black',
    },
    pStyle:{
        fontStyle: 'italic',
        color: 'mediumslateblue',
        fontSize: 'small',
    },
    butStyle:{
        display: 'inline-block!important',
        margin:'0 5px !important',
        padding: '8px 2px !important',
        color:'white'
    },
    pErrorStyle:{
        textAlign: 'left',
        color: 'red',
        margin: '0 12px',
        fontSize: 'small',
        display: 'block'
    }

}));