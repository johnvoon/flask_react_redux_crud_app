import { connect } from 'react-redux';
import DisplayOptions from '../components/DisplayOptions';

const mapStateToProps = ({users}) => {
  selectedOption: users.selectedOption
}

const mapDispatchToProps = (dispatch) => {
  handleChange: (event) =>
    dispatch(changeUsersDisplay(event.target.value))
};

const UsersPerPageMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayOptions);

export default UsersPerPageMenu