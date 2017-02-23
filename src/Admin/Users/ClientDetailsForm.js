import React, { Component } from 'react';
import { connect } from 'redux-form';
import { Field } from 'redux-form';
import classNames from 'classnames';
import AddMatterForm from './AddMatterForm';
import MultiselectFormGroup from 'components/MultiselectFormGroup';
import ButtonBlock from 'components/ButtonBlock';
import { createOptionsList } from 'utils';


const mapStateToProps = (state) => {
  const { entities } = state;
  return {
    ...entities
  };
};

class ClientDetailsForm extends Component {
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
    const { matters, isDisplayed, changeMatterFieldValue } = this.props;
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
        <ButtonBlock
          handleClick={this.handleClick}>
          {showAddMatterForm ? "Cancel" : "Add Matter"}
        </ButtonBlock>
        {showAddMatterForm ? (
          <div>
            <AddMatterForm
              addButtonOnly={true}
              changeMatterFieldValue={changeMatterFieldValue}/>
          </div>
        ) : null}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null
)(ClientDetailsForm);