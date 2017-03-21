import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import ButtonLink from 'components/ButtonLink';
import Footer from 'components/Footer';

const mapStateToProps = (state) => {
  const { practiceAreas, entities } = state;

  return {
    ...practiceAreas,
    ...entities
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  }
});

class PracticeAreas extends Component {
  constructor(props) {
    super(props);
    this.renderButtonLinks = this.renderButtonLinks.bind(this);
  }

  componentDidMount() {
    this.props.onFetchPracticeAreas();
  }

  renderButtonLinks() {
    const { practiceAreas, practiceAreaIds } = this.props;

    return practiceAreaIds.map(id => {
      const practiceAreaName = practiceAreas[id].area;
      const slug = practiceAreas[id].slug;
      
      return (
        <div
          key={id}
          className="col-sm-6">
          <ButtonLink
            key={id}
            id={id}
            text={practiceAreaName}
            slug={`/practice-areas/${slug}`}
            imgSrc={practiceAreas[id].thumbnailSrc}
            customClassNames="btn-practice-area"/>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <main>
          <Helmet
            title="Our Practice Areas"
            meta={[
              { name: 'description', content: "Our firm's practice areas." }
            ]}/>
          <div 
            className="jumbotron"
            style={{backgroundImage: `url(${API_URL}/static/images/2000/melbourne-night.jpg)`}}>
            <div className="container">
              <h1 className="text-uppercase">
                Practice Areas
              </h1>
              <h3>We excel at what we do</h3>
            </div>
          </div>
          <div className="container-fluid">
            {this.renderButtonLinks()}
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

PracticeAreas.propTypes = {
  onFetchPracticeAreas: PropTypes.func.isRequired,
  practiceAreas: PropTypes.object.isRequired,
  practiceAreaIds: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PracticeAreas);