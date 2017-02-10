import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPracticeAreas } from '../Entities/actions';
import ButtonLink from '../components/ButtonLink';
import sr from '../components/ScrollReveal';
import { changePracticeArea } from './actions';

const mapStateToProps = (state) => {
  const { entities } = state;

  return {...entities};
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  },

  onChangePracticeArea: (id) => {
    dispatch(changePracticeArea(id));
  }
});

class PracticeAreas extends Component {
  componentDidMount() {
    const config = {
      duration: 1000,
      scale: 1,
      distance: 0
    };
    this.props.onFetchPracticeAreas();
    sr.reveal(this._buttonLink, config);
  }

  handleClick(endpoint, practiceAreaId) {
    console.log(endpoint, practiceAreaId)
  }

  render() {
    this.handleClick = this.handleClick.bind(this);
    const { practiceAreas } = this.props;
    const buttonLinks = Object.keys(practiceAreas).map(id => {
      const practiceArea = practiceAreas[id].area;
      const endpoint = practiceArea.split(/[^A-Za-z]+/).join('-').toLowerCase();
      const imgFilename = practiceArea.split(' ')[0].toLowerCase();

      return (
        <div 
          key={id}
          className="col-sm-6"
          ref={div => this._buttonLink = div}>
          <ButtonLink
            handleClick={this.handleClick.bind(this, endpoint, id)}
            id={id}
            text={practiceArea}
            endpoint={`/practice-areas/${endpoint}`}
            imgFilename={imgFilename}
            customClassNames="btn-practice-area"/>
        </div>
      );
    });

    return (
      <main>
        <div 
          className="jumbotron"
          style={{backgroundImage: "url('http://localhost:8000/static/images/2000/home.jpg')"}}>
          <div className="container">
            <h1 className="text-uppercase">
              Practice Areas
            </h1>
          </div>
        </div>
        <div className="container-fluid">
          {buttonLinks}
        </div>
      </main>
    );
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PracticeAreas);