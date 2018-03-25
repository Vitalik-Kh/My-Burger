import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    return (
      <Aux>
        <Backdrop visible={this.props.visible}  clicked={this.props.hideBackdrop}/>
        <div
          className={classes.Modal}
          style={{
            transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.visible ? '1' : '0'
          }} >
          {this.props.children}
        </div>
      </Aux>
    );
  }

}

export default Modal;
