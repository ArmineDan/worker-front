import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



export default function HeaderSkillList() {

    return (

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Why should I add my skills?
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p" >
                    Adding skills will help you boost your profile and appear in
                    search results. Add all the skills that you are confident about.
                    Please don't overload adding skills to have satisfied clients.
                    And also, please, add your mobile number, age and address.

                </Typography>

            </CardContent>

    )
}

