import React, { Component, PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

export default class RelatedPost extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { dispatchEvent } = this.props;
    dispatchEvent();
  }
  
  render() {
    const { post } = this.props;

    return (
      <div className="col-md-4">
        <Card>
          <CardHeader
            title={"By " + post.author} 
            avatar={post.thumbnailSrc}/>
          <CardMedia>
            <img src={post.imgSrc} alt="img"/>    
          </CardMedia>
          <CardTitle>
            <Link to={`/blog/${post.id}`} onClick={this.handleClick}>{post.title}</Link>
          </CardTitle>
          <CardText>
            {post.summary}
          </CardText>
          <CardActions>
            <RaisedButton>
              <Link to={`/blog/${post.id}`} onClick={this.handleClick}>Read More</Link>
            </RaisedButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

RelatedPost.propTypes = {
  dispatchEvent: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};