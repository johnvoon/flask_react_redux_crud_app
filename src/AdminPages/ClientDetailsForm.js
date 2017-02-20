import React, { Component } from 'react';
import { Field } from 'redux-form';
import AddMatterForm from './AddMatterForm';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import { Button } from '../components/Button';
import { createOptionsList } from '../utils';
import classNames from 'classnames';

export default class ClientDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMatterForm: false
    }
  }

  handleClick() {
    this.setState({
      showAddMatterForm: true
    });
  }

  onHide() {
    this.setState({
      showAddMatterForm: false
    })
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    this.onHide = this.onHide.bind(this);
    const { matters, isDisplayed } = this.props;
    const matterOptions = createOptionsList(matters, "description");

    return (
      <div className={classNames({
        hidden: !isDisplayed
      })}>
        <Field 
          name="matters"
          component={MultiselectFormGroup}
          label="Matters Handled"
          options={matterOptions}
          placeholder="Select one or more matters"/>
        <Button
          handleClick={this.handleClick}>
          Add Matter
        </Button>
        {showAddMatterForm ? (
          <div>
            <AddMatterForm
              onHide={this.onHide}/>
            <Button
              handleClick={this.onHide}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    )
  }
}
