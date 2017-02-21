import React, { Component } from 'react';
import { Field } from 'redux-form';
import AddMatterForm from './AddMatterForm';
import MultiselectFormGroup from '../components/MultiselectFormGroup';
import Button from '../components/Button';
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
      showAddMatterForm: this.state.showAddMatterForm ? false : true
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
    const { onAddMatter, matters, practiceAreas, isDisplayed, changeMatterFieldValue } = this.props;
    const { showAddMatterForm } = this.state;
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
          {showAddMatterForm ? "Cancel" : "Add Matter"}
        </Button>
        {showAddMatterForm ? (
          <div>
            <AddMatterForm
              practiceAreas={practiceAreas}
              onAddMatter={onAddMatter}
              onHide={this.onHide}
              changeMatterFieldValue={changeMatterFieldValue}/>
          </div>
        ) : null}
      </div>
    )
  }
}
