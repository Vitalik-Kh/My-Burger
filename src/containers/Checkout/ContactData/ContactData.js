import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your address'
        },
        value: ''
      },
      postcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postcode'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'E-mail'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        }
      }
    },
    loading: false
  }

  orderHandler = (e) => {
    console.log(this.props);
    e.preventDefault();
    this.setState({loading: true})
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(this.setState({loading: false}));
  }

  render() {
    let form = <Spinner />
    if (!this.state.loading) {
      form = (
        <form>
          <Input elType='...' elConfig='...' value='...' />
          {

          }
          <Button type='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      );
    }

    const formElArr = [];
    for (let key in this.state.orderForm) {
      formElArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    return (
      <div className={classes.ContactData}>
        <h3>Enter your contact data</h3>
        {
          formElArr.map(el => {
            return (
              <Input
                key={el.id}
                elType={el.config.elementType}
                elConfig={el.config.elementConfig}
                value={el.config.value} />
            );
          })
        }
      </div>
    );
  }
}

export default ContactData;
