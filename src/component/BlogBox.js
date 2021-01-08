import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  	root: {
    	maxWidth: 300,
    	boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    	borderRadius: 8,
  	},
  	media: {
    	height: 0,
    	paddingTop: '56.25%', // 16:9
  	},
  	avatar: {
   		backgroundColor: red[500],
  	},
}));

const BlogBox = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      	<CardHeader
        	avatar={
          	<Avatar aria-label="recipe" className={classes.avatar}>
            	R
          	</Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"/>
      	<CardContent>
        	<Typography variant="body2" color="textSecondary" component="p">
          		{props.content}
        	</Typography>
      	</CardContent>
    </Card>
  );
}

export default BlogBox;