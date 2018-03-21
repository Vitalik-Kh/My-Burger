import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => {

  return (
    <div className={classes.BuildControls}>
      <p>Totol price: <strong>{props.price}</strong></p>
      {controls.map(ctrl => {
        return <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          addIngridient={() => props.addIngridient(ctrl.type)}
          removeIngridient={() => props.removeIngridient(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          />
      })}
    </div>
  );
}

export default buildControls;
