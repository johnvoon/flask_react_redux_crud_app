import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

export default class ModalMedium extends Component {
  render() {
    const { title, show, onHide, children } = this.props;

    return (
      <Modal 
        animation={false}
        onHide={onHide}
        show={show}
        aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    );  
  }
}

ModalMedium.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};