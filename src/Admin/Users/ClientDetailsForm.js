import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import AddMatterForm from 'Admin/Matters/AddMatterForm';
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
    };

    this.handleClick = this.handleClick.bind(this);
    this.onHideAddMatterForm = this.onHideAddMatterForm.bind(this);
  }

  handleClick() {
    this.setState({
      showAddMatterForm: this.state.showAddMatterForm ? false : true
    });
  }

  onHideAddMatterForm() {
    this.setState({
      showAddMatterForm: false
    });
  }

  render() {
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
          label="Matters"
          options={matterOptions}
          placeholder="Select one or more matters"/>
        <ButtonBlock
          type="button"
          customClassNames="btn-primary"
          handleClick={this.handleClick}>
          {showAddMatterForm ? "Cancel" : "Add Matter"}
        </ButtonBlock>
        {showAddMatterForm ? (
          <div>
            <AddMatterForm
              addButtonOnly={true}
              changeMatterFieldValue={changeMatterFieldValue}
              onHideAddMatterForm={this.onHideAddMatterForm}/>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(ClientDetailsForm);

ClientDetailsForm.propTypes = {
  matters: PropTypes.object.isRequired,
  isDisplayed: PropTypes.bool.isRequired,
  changeMatterFieldValue: PropTypes.func.isRequired 
};