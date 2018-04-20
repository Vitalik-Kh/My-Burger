import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (e) => {
    e.preventDefault();

    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);

  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.replace(/\s/g, '').length >=rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.replace(/\s/g, '').length <=rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, identifier) => {
    const updatedOrderForm = {...this.state.orderForm};
    const updatedOrderEl = {...this.state.orderForm[identifier]};
    updatedOrderEl.touched = true;
    updatedOrderEl.value = event.target.value;
    updatedOrderForm[identifier] = updatedOrderEl;
    updatedOrderEl.valid = this.checkValidity(updatedOrderEl.value, updatedOrderEl.validation);

    let formIsValid = true;
    for (let name in updatedOrderForm) {
      formIsValid = updatedOrderForm[name].valid && formIsValid;
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render() {
    let form = <Spinner />
    const formElArr = [];
    for (let key in this.state.orderForm) {
      formElArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.orderHandler}>
          {
            formElArr.map(el => {
              return (
                <Input
                  key={el.id}
                  name={el.id}
                  elType={el.config.elementType}
                  elConfig={el.config.elementConfig}
                  value={el.config.value}
                  changed={(event) => this.inputChangedHandler(event, el.id)}
                  invalid={!el.config.valid}
                  shouldValid={el.config.validation}
                  touched={el.config.touched}/>
              );
            })
          }
          <Button type='Success' disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
      );
    }

    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact data</h3>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingridients: state.bb.ingridients,
    totalPrice: state.bb.totalPrice,
    loading: state.ord.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => {
      dispatch(orderActions.purchaseBurger(orderData, token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
