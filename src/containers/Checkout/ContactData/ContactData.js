import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axiosOrder'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: ''
    },
    loading: false
  }

  orderHandler = (e) => {
    console.log(this.props);
    e.preventDefault();
    this.setState({loading: true})
    const order = {
      ingridients: this.props.ingridients,
      price: this.props.price,
      customer: {
        name: 'Vitalii',
        address: {
          street: 'Some str.',
          postcode: 'k3 l32',
          country: 'GB'
        },
        email: 'some@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(this.setState({loading: false}));
  }

  render() {
    console.log(this.props);
    let form = <Spinner />
    if (!this.state.loading) {
      form = (
        <form>
          <Input inputtype='input' type='text' name='name' placeholder='Your name' />
          <Input inputtype='input' type='email' name='email' placeholder='Your email' />
          <Input inputtype='input' type='text' name='steet' placeholder='Street' />
          <Input inputtype='input' type='text' name='postcode' placeholder='Postecode' />
          <Button type='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;
