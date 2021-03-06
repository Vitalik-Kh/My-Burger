import React, {Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/auxi';
import {Redirect} from 'react-router-dom';
import checkValidity from '../../shared/validation';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          requaired: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          requaired: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true

  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({controls: updatedControls});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp};
    })
  }

  render() {
    const formElArr = [];
    for (let key in this.state.controls) {
      formElArr.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = formElArr.map(el => {
      return (
        <Input
          key = {el.id}
          name = {el.id}
          elType = {el.config.elementType}
          elConfig = {el.config.elementConfig}
          value = {el.config.value}
          changed = {event => this.inputChangedHandler(event, el.id)}
          invalid = {!el.config.valid}
          shouldValid = {el.config.validation}
          touched = {el.config.touched}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMessage = null

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return (
      <Aux>
        {this.props.isAuth ? <Redirect to={this.props.authRedirectPath} /> : null}
        <div className = {classes.Auth}>
          <form onSubmit = {this.submitHandler}>
            {form}
            {errorMessage}
            <Button type='Success' disabled = {false}>Submit</Button>
          </form>
          <Button
            type='Danger'
            clicked={this.switchAuthModeHandler} >
            Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'}
          </Button>
        </div>
    </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.bb.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapPropsToDispatch = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(Auth);
