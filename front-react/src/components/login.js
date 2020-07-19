import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Row } from 'react-bootstrap'
import * as UserActions from "../redux/actions/user-actions"
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));


function LoginComponent(props) {
  const [email, setEmail] = useState(0);
  const [password, setPassword] = useState(0);

  const classes = useStyles();
  const onSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      props.authenticate({ email: email, password: password }).then(data => {
        if (data && data.message) {
          if (data.message === "Success") {
            localStorage.setItem('user' ,JSON.stringify(data))
            props.history.push('/topic')
          }
        }
      })

    }
  };
  const onsignup = (e) => {
    e.preventDefault();
    props.history.push('register')
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div style={{ marginLeft: "25%", marginRight: "25%", marginTop: "100px" }}>
        <TextField
          error={email === '' ? true : false}
          type="email"
          id="outlined-error"
          label="Email ID"
          placeholder="Please Select Email ID"
          variant="outlined"
          size="small"
          helperText={password === '' ? 'Please enter email.' : ''}
          onChange={(e) => (setEmail(e.target.value))}
        />
        <TextField
          error={password === '' ? true : false}
          type="password"
          id="outlined-error-helper-text"
          label="Password"
          placeholder="Please enter Password"
          helperText={password === '' ? 'Please enter Password.' : ''}
          variant="outlined"
          size="small"
          // value ={this.state.password}
          onChange={(e) => (setPassword(e.target.value))}

        />
      </div>
      <Row style={{ marginLeft: "26%", marginRight: "25%", }}>
        <Button onClick={onSubmit} variant="contained" color="secondary" style={{ width: "100%", height: "40px" }}> Login </Button>
      </Row>
      <Row style={{ marginLeft: "26%", marginRight: "25%", marginTop: "20px" }}>

        <a onClick={onsignup}>Does not have an account ? Sign up Here</a>      </Row>
    </form>
  );
}

LoginComponent.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  saveusermessage: PropTypes.string
};
function mapStateToProps(state) {
  return {
    ...state.user
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...UserActions }, dispatch);
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { forwardRef: true }
  )(LoginComponent)
);