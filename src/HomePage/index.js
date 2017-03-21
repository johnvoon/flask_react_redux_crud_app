import React, { Component } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { fetchPracticeAreas } from 'Entities/PracticeAreasActions';
import { fetchPosts } from 'Entities/PostsActions';
import Button from 'components/Button';
import sr from 'components/ScrollReveal';

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
    sr.reveal(this.whatWeDo, config);
    sr.reveal(this.ourCoreValues, config);
  }

  handleClick(index) {
    this.setState({ 
      currentIndex: index,
      prevIndex: this.state.currentIndex
    });
  }

  render() {
    return (
      <main>
        <Helmet
          title="Concept Law Firm"
          meta={[
            { name: 'description', content: 'A firm that serves that community.'}
          ]}/>
        <div 
          className="jumbotron"
          style={{backgroundImage: `url(${API_URL}/static/images/2000/home.jpg)`}}>
          <div className="container text-center">
            <Link
              to="/appointment"
              className="btn btn-home">
              Make an appointment with us today
            </Link>
          </div>
        </div>
        <div className="home-content container-fluid">
          <div 
            className="lg-margin-top" 
            ref={div => this.whoWeAre = div}>
            <h1 className="text-center">Who We Are</h1>
            <p>We are a team of highly experienced professionals who are highly sought after in key industries with a proven track record in delivering smart and cost-efficient solutions to legal problems.</p>
          </div>
          <div 
            className="lg-margin-top" 
            ref={div => this.whatWeDo = div}>
            <h1 className="text-center">What We Do</h1>
            <p>Our firm provides comprehensive legal services across a range of areas, including Dispute Resolution, Family Law, Mergers & Acquisitions and Criminal Law.</p>
          </div>
          <div 
            className="lg-margin-top" 
            ref={div => this.ourCoreValues = div}>
            <h1 className="text-center">Our Core Values?</h1>
            <p>We value honesty and integrity, excellence, hard work, teamwork, mutual respect, diversity and contribution to our community and believe these are the keys to our success.</p>
          </div>
        </div>
      </main>
    );
  }
}

export default HomePage;