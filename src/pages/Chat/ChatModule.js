import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { Fab } from '@mui/material';
import { TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

const ChatModule = () => {
  
    return (
        <div>
          <Grid container>
              <Grid item xs={12} >
                  <Typography variant="h5">Chat</Typography>
              </Grid>
          </Grid>
          <Grid container component={Paper}>
              <Grid item xs={3}>
                  <List>
                      <ListItem button key="RemySharp">
                          <ListItemIcon>
                          <Avatar alt="Remy Sharp" />
                          </ListItemIcon>
                          <ListItemText primary="John Wick"></ListItemText>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid item xs={12} style={{padding: '10px'}}>
                      <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                  </Grid>
                  <Divider />
                  <List>
                      <ListItem button key="RemySharp">
                          <ListItemIcon>
                              <Avatar alt="Remy Sharp"/>
                          </ListItemIcon>
                          <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                          <ListItemText secondary="online" align="right"></ListItemText>
                      </ListItem>
                      <ListItem button key="Alice">
                          <ListItemIcon>
                              <Avatar alt="Alice" />
                          </ListItemIcon>
                          <ListItemText primary="Alice">Alice</ListItemText>
                      </ListItem>
                      <ListItem button key="CindyBaker">
                          <ListItemIcon>
                              <Avatar alt="Cindy Baker" />
                          </ListItemIcon>
                          <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                      </ListItem>
                  </List>
              </Grid>
              <Grid item xs={9}>
                  <List>
                      <ListItem key="1">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="09:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="2">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="left" secondary="09:31"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                      <ListItem key="3">
                          <Grid container>
                              <Grid item xs={12}>
                                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                                  <ListItemText align="right" secondary="10:30"></ListItemText>
                              </Grid>
                          </Grid>
                      </ListItem>
                  </List>
                  <Divider />
                  <Grid container style={{padding: '20px'}}>
                      <Grid item xs={11}>
                          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                      </Grid>
                      <Grid xs={1} align="right">
                          <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        </div>
    );
  }
  
  export default ChatModule;