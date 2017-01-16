import React, { Component, PropType } from 'react';
import RichTextEditor, { createValueFromString, createEmptyValue } from 'react-rte';

export default class RichTextHTML extends Component {
  currentValue: '';

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { editorValue: createEmptyValue() };
  }

  componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.updateStateFromProps(newProps);
  }

  updateStateFromProps(props) {
    const { value } = props;
    const { editorValue } = this.state;
    if (this.currentValue != null) {
      const currentValue = this.currentValue;
      if (value === currentValue) {
        return;
      }
    }
    this.setState({
      editorValue: editorValue.setContentFromString(value, 'html')
    });
    this.currentValue = value;
  }

  handleChange(editorValue) {
    const { value, onChange } = this.props;
    const oldEditorValue = this.state.editorValue;
    this.setState({editorValue});
    const oldContentState = oldEditorValue ? oldEditorValue.getEditorState().getCurrentContent() : null;
    const newContentState = editorValue.getEditorState().getCurrentContent();
    if (oldContentState !== newContentState) {
      const stringValue = editorValue.toString('html');
      this.currentValue = stringValue;
      if (onChange && stringValue !== this.props.value) {
        onChange(stringValue);
      }
    }
  }

  render() {
    return (
      <RichTextEditor 
        value={this.state.editorValue}
        onChange={this.handleChange}/>
    )
  }
}