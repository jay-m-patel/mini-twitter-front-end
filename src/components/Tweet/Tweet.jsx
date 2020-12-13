import React from 'react'
import { Box, Card, CardContent, Typography, Divider, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}))

export default function Tweet({tweet, uploader, createdAt, onClick, ...props}) {
    const classes = useStyles()
    console.log(props)
    return (
        <Box mb={3}>
        <Divider />
        <ListItem button
            onClick={onClick}
        >

            <ListItemText 
                primary={`${uploader.name} (${uploader.userName})`}
            />
        </ListItem>
        <div dangerouslySetInnerHTML={{__html: tweet}}>
        </div>
        <Typography component='h5' color='textSecondary'>
            {new Date(createdAt).toLocaleString()}
        </Typography>
        </Box>
    )
}
