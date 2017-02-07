import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalMedium extends Component {
  render() {
    const {title, children, onHide} = this.props;

    return (
      <Modal {...this.props} animation={false} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
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

ModalMedium.propTypes = {
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};