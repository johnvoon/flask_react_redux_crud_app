import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { createOptionsList } from 'utils';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router';
import { fetchPracticeAreas, fetchPracticeArea } from 'Entities/PracticeAreasActions';
import Footer from 'components/Footer';

const mapStateToProps = (state) => {
  const { practiceArea, entities } = state;
  
  return {
    ...practiceArea,
    ...entities
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  },

  onFetchPracticeArea: (slug) => {
    dispatch(fetchPracticeArea(slug));
  }
});

class PracticeArea extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { onFetchPracticeAreas, 
      onFetchPracticeArea, params } = this.props;
    
    onFetchPracticeAreas();
    onFetchPracticeArea(params.slug);
  }

  handleChange({target: {value}}) {
    const { onFetchPracticeArea, 
      practiceAreas, router } = this.props;
    const practiceArea = practiceAreas[value];
    
    onFetchPracticeArea(practiceArea.slug);
    router.push(`/practice-areas/${practiceArea.slug}`);
  }

  render() {
    const { practiceAreas, currentPracticeArea } = this.props;
    const practiceAreaName = currentPracticeArea.area;
    const imgFilename = (currentPracticeArea.slug || '').split('-')[0];
    const practiceAreaOptions = createOptionsList(practiceAreas, "area");
    const description = (currentPracticeArea.description || []).map((paragraph, idx) => {
      if (currentPracticeArea.description.length > 1) {
        return (
          <p key={idx}>{paragraph}</p>
        );
      } else {
        return (
          <div key={idx} dangerouslySetInnerHTML={{__html: description}}/> // eslint-disable-line react/no-danger
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
          style={{backgroundImage: `url(${currentPracticeArea.imgSrc})`}}>
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
        <div className="container-fluid visible-sm visible-xs">
          {description}  
        </div>
        <div className="row practice-area-container visible-md visible-lg">
          <div 
            className="col-md-5 practice-area-image"
            style={{backgroundImage: `url('${API_URL}/static/images/2000/${imgFilename}.jpg')`}}>
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
        <Footer/>
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

PracticeArea.propTypes = {
  onFetchPracticeAreas: PropTypes.func.isRequired,
  onFetchPracticeArea: PropTypes.func.isRequired,
  currentPracticeArea: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};