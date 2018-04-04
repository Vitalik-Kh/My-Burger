import React, {Component} from 'react';

import axios from '../../axiosOrder';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentWillMount() {
     axios.get('orders.json')
      .then(res => {
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }

        this.setState({
          loading: false,
          orders: fetchedOrders
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
      })
  }

  render() {
    console.log(this.state.orders);
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order
            key={order.id}
            price={order.price}
            ingridients={order.ingridients}/>
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
