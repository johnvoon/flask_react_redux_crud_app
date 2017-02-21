import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import sr from '../components/ScrollReveal';
import { Link } from 'react-router';
import Animate from 'rc-animate';
import { fetchPracticeAreas } from '../Entities/PracticeAreasActions';
import { fetchPosts } from '../Entities/PostsActions';
import Hero from '../components/Hero';
import PracticeAreaNavbar from '../components/PracticeAreaNavbar';
import Slider from 'react-slick';
import classNames from 'classnames';

const mapStateToProps = (state) => {
  const { entities } = state;

  return {...entities};
};

const mapDispatchToProps = (dispatch) => ({
  onFetchPracticeAreas: () => {
    dispatch(fetchPracticeAreas());
  },
  onFetchPosts: () => {
    dispatch(fetchPosts());
  }
});

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      prevIndex: null,
      currentIndex: 0
    };
  }

  componentDidMount() {
    const config = {
      duration: 2000,
      scale: 1,
      distance: 0
    };

    sr.reveal(this.whoWeAre, config);
    sr.reveal(this.coreValues, config);
  }

  handleClick(index) {
    this.setState({ 
      currentIndex: index,
      prevIndex: this.state.currentIndex
    });
  }

  render() {
    const { start, currentIndex, prevIndex } = this.state;
    const { practiceAreas } = this.props;
    const heroComponents = Object.keys(practiceAreas).map(id => {
      const practiceArea = practiceAreas[id].area;
      const practiceAreaClass = practiceArea.split(' ')[0].toLowerCase();
      
      return (
        <div>
          <Hero
            key={id}
            index={Number(id)}
            currentIndex={currentIndex}
            prevIndex={prevIndex}
            buttonText={practiceArea}
            heroClass={practiceAreaClass}/>
        </div>
      );
    });

    return (
      <main>
        <Helmet
          title="Concept Law Firm"
          meta={[
            { name: 'description', content: 'A firm that serves that community.'}
          ]}/>
        <div 
          className="jumbotron"
          style={{backgroundImage: "url('http://localhost:8000/static/images/2000/home.jpg')"}}>
          <div className="container text-center">
            <button 
              type="button" 
              className="btn btn-primary btn-home">
              Make an appointment today
            </button>
          </div>
        </div>
        <div className="container-fluid">
          <div 
            className="lg-margin-top" 
            ref={div => this.whoWeAre = div}>
            <h1 className="text-center">Who We Are</h1>
            <p>We are a team of highly experienced professionals who are highly sought after in key industries with a proven track record in delivering smart and cost-efficient solutions to legal problems that make our clients happy.</p>
            <Link 
              to={"/team"}
              className="btn btn-primary text-uppercase">
              Our Team
            </Link>
          </div>
          <div 
            className="lg-margin-top" 
            ref={div => this.coreValues = div}>
            <h1 className="text-center">Our Core Values?</h1>
            <p>We are a team of highly experienced professionals who are highly sought after in key industries with a proven track record in delivering smart and cost-efficient solutions to legal problems that make our clients happy.</p>
          </div>
        </div>
      </main>
    );
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HomePage);