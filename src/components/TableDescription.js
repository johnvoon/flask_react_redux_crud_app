import React, { Component, PropTypes } from 'react';
import Truncate from 'react-truncate';

class TableDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      truncated: false
    };

    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
  }

  handleTruncate(truncated) {
    this.setState({
      truncated
    });
  }

  toggleLines(event) {
    event.preventDefault();

    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { children, more, less, lines } = this.props;
    const { expanded, truncated } = this.state;
    
    return (
      <div>
        <Truncate
          lines={!expanded && lines}
          ellipsis={(
            <span>...
              <a href="#" onClick={this.toggleLines}>{more}</a>
            </span>
          )}
          onTruncate={this.handleTruncate}>
          {children}
        </Truncate>
        {!truncated && expanded && (
          <span>
            <a href="#" onClick={this.toggleLines}>{less}</a>
          </span>
        )}
      </div>
    );    
  }
}

export default TableDescription;

TableDescription.propTypes = {
  children: PropTypes.node.isRequired,
  more: PropTypes.string.isRequired,
  less: PropTypes.string.isRequired,
  lines: PropTypes.number.isRequired
};