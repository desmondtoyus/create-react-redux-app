import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import {signInModal, signUpModal, closeUserModal, signIn, changeInput, logOut, verifyUsers } from "../redux/actions/user.action";
import green from '@material-ui/core/colors/green';
// import createHistory from 'history/createBrowserHistory'
 
// const history = createHistory()


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 0,
    margin: '10px'
  },
  flexA: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paperModal: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    textAlign:"center",
    margin:"auto"
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin:"auto",
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class MainWrapper extends React.Component {
componentDidMount(){
  if (localStorage.getItem('jwtToken')) {
    let token =  localStorage.getItem('jwtToken')
  const tokenParts = token.split(' ');
  const encodedPayload =  tokenParts[1];
 let user={
   token:encodedPayload
 }
  this.props.verifyUsers(user);
    
  } else {
    console.log('NOT LOGGED IN');
    // REDIRECT TO LOGOUT
  }
  
}

componentWillUpdate(nextProps){
  if (this.props.user !== nextProps.user) {
    if(nextProps.user){
    this.props.history.push('/about')
    }
  }

}

  handleOpen = (e) => {
    e.preventDefault();
    this.props.signInModal(); 
  };

  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOut(); 
  };

  handleChange = (event) => {
    console.log(event.currentTarget.name, '=' , event.currentTarget.value)
    this.props.changeInput({ prop: event.currentTarget.name, value: event.currentTarget.value });
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.closeUserModal();
  };

  handleSignUp = (e)=>{
    e.preventDefault();
    this.props.signUpModal(); 
  }

  handleSubmit = (e)=>{

    const { email, password} = this.props
    e.preventDefault();
    this.props.changeInput({ prop: 'loader', value: true });
    this.props.signIn({email, password})
    
  }
  render() {
    const { classes } = this.props;
    const{email, password, loader} = this.props;
    return (
      <div>
      <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link to='/' style={{color:'white'}}>Home </Link>
            </Typography>
            <Typography variant="title" color="inherit" className={classes.flexA}>
              <Link to='about' style={{color:'white'}}>About </Link>
            </Typography>
            <Button color="inherit" onClick={this.handleOpen}>Login</Button>
            <Button color="inherit" onClick={this.handleLogOut}>Log Out</Button>
          </Toolbar>
        </AppBar>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.modalOpen}
          onClose={this.handleClose}
          disableEnforceFocus={true}
        >
          <div className={classes.paper}>
          
          
                <Paper className={classes.paperModal}>
                <span style={{marginLeft:'100%', marginRight:"auto", marginTop:0, cursor:'pointer'}} onClick={this.handleClose}>X</span>
                  <Avatar className={classes.avatar}>
                    <LockIcon />
                  </Avatar>
                  <Typography variant="headline">{!this.props.isSignUp ? 'Sign in' : 'Sign up'}</Typography>
                  <form className={classes.form}>
                  {this.props.isSignUp ? <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Full Name</InputLabel>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        autoFocus
                        onChange={this.handleChange}
                      /> </FormControl>:null}

                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <Input
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={this.handleChange}
                      />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <Input
                        name="password"
                        value ={password}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleChange}
                      />
                    </FormControl>
                                      {!this.props.isSignUp ? <Button
                      type="submit"
                      fullWidth
                      variant="raised"
                      color="primary"
                      className={classes.submit}
                      onClick={this.handleSubmit}
                    >
                      {loader && <CircularProgress  className={classes.fabProgress} />}

                      Sign in
                    </Button>:null}
                    <Button
                      type="submit"
                      fullWidth
                      variant="raised"
                      color="default"
                      className={classes.submit}
                      onClick={this.handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </form>
                </Paper>
           
          </div>
        </Modal>
        {this.props.children}

        {/* FOOTER */}
      </div>
    );
  }
}

MainWrapper.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
// const MainWrapper = withStyles(styles)(MainWrapper);

// export default MainWrapper;

const mapStateToProps = state => {
  const {   user, 
    tabIndex,
    isSignUp,
    modalOpen,
    email,
    password,
    name,
    loader} = state.users

  return { user, 
    tabIndex,
    isSignUp,
    modalOpen,
    email,
    password,
    name,
    loader };
};



export default compose(
  withStyles(styles),
  connect(mapStateToProps, {signIn, changeInput, signInModal, signUpModal, logOut, closeUserModal, verifyUsers })
)(MainWrapper);