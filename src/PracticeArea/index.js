import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Scrollbars } from 'react-custom-scrollbars';
import sr from '../components/ScrollReveal';
import { Link, withRouter } from 'react-router';
import { fetchPracticeAreas } from '../Entities/actions';
import classNames from 'classnames';
import { createOptionsList } from '../utils';
import Footer from '../components/Footer';

const mapStateToProps = (state) => {
  const { practiceAreas, entities } = state;

  return {...practiceAreas, ...entities};
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  }
});

class PracticeArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPracticeArea: ''
    }
  }

  componentWillMount() {
    this.props.onFetchPracticeAreas();
    const { location } = this.props;
    this.setState({
      currentPracticeArea: location.state.id
    });
  }

  componentDidMount() {
    const config = {
      duration: 2000,
      scale: 1,
      distance: 0
    };
    this.props.onFetchPracticeAreas();
    sr.reveal(this.whoWeAre, config);
    sr.reveal(this.coreValues, config);
  }

  handleChange({target: {value}}) {
    const { practiceAreas } = this.props;
    const endpoint = practiceAreas[value].area.split(/[^A-Za-z]+/).join('-').toLowerCase();
    this.setState({
      currentPracticeArea: value
    })
    this.props.router.push({
      pathname: `/practice-areas/${endpoint}`
    })
  }

  render() {
    this.handleChange = this.handleChange.bind(this);
    const { practiceAreas } = this.props;
    const { currentPracticeArea } = this.state;
    const practiceArea = practiceAreas[currentPracticeArea]
    const practiceAreaName = practiceArea.area;
    const imgFilename = practiceAreaName.split(' ')[0].toLowerCase();
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const description = (practiceArea.description || []).map((paragraph, idx) => {
      if (practiceArea.description.length > 1) {
        return (
          <p key={idx}>{paragraph}</p>
        );
      } else {
        return (
          <div key={idx} dangerouslySetInnerHTML={{__html: description}}/>
        );
      }
    });

    return (
      <main className="practice-area">
        <Helmet
          title={practiceAreaName}
          meta={[
            { name: 'description', content: practiceAreaName }
          ]}/>
        <div 
          className="jumbotron hidden-md hidden-lg"
          style={{backgroundImage: `url('http://localhost:8000/static/images/2000/${imgFilename}.jpg')`}}>
          <div className="container text-center">
            <h1 className="text-uppercase">{practiceAreaName}</h1>
            <select 
              className={classNames(
                "form-control",
                "select",
                `bg-${imgFilename}`)}
              onChange={this.handleChange}>
              <option 
                className="text-uppercase
                "value="">
                Select Practice Area
              </option>
              {practiceAreaOptions.map((option) => {
                const [id, text] = option.split(" - ");
                return (
                  <option key={id} value={id}>{text}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="container-fluid hidden-md hidden-lg">
          {description}  
        </div>
        <div className="row practice-area-container hidden-sm">
          <div 
            className="col-md-5 practice-area-image"
            style={{backgroundImage: `url('http://localhost:8000/static/images/2000/${imgFilename}.jpg')`}}>
            <div className="select-absolute">
              <h1 className="text-uppercase text-left">{practiceAreaName}</h1>
              <select
                className={classNames(
                  "form-control",
                  "select",
                  `bg-${imgFilename}`)}
                onChange={this.handleChange}>
                <option 
                  className="text-uppercase
                  "value="">
                  Select Practice Area
                </option>
                {practiceAreaOptions.map((option) => {
                  const [id, text] = option.split(" - ");
                  return (
                    <option key={id} value={id}>{text}</option>
                  );
                })}
              </select>                
            </div>
          </div>
          <div className="col-md-7 practice-area-content">
            <Scrollbars 
              style={{ 
                width: '80%', 
                height: '70%', 
                marginTop: '70px',
                marginLeft: 'auto',
                marginRight: 'auto' }}>
              {description}
            </Scrollbars>
          </div>
        </div>
        <footer className="footer text-center">
          <div className="container">
            <ul className="list-inline">
              <li className="text-muted">Concept Law Firm &copy; 2017</li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>
        </footer>  
      </main>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PracticeArea)
);