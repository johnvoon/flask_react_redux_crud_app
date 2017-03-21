import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class LargeModal extends Component {
  render() {
    const {title, children, onHide} = this.props;

    return (
      <Modal {...this.props} animation={false} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <button 
            className="btn btn-secondary"
            onClick={onHide}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );  
  }
}

LargeModal.propTypes = {
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};