import React, {Component} from 'react';
import {Media} from 'reactstrap';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle
} from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
        <Card>
          <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name}/>
          <CardBody>
            <CardTitle>{this.props.selectedDish.name}</CardTitle>
            <CardText>{this.props.selectedDish.description}</CardText>
          </CardBody>
        </Card>
    )
  }

  renderComments(dishComments) {
    const comments = dishComments.map((comment) => {
      return (
          <li>
            <p>{comment.comment}</p>
            <p>-- {comment.author} , {(new Date(comment.date)).toLocaleString('en-US',{month: 'short', day:'numeric', year:'numeric'})}</p>
          </li>
      )
    })

    return (
        <>
          <h4>Comments</h4>
          <ul className='list-unstyled'>
            {comments}
          </ul>
        </>
    )
  }

  render() {
    if (this.props.selectedDish != null) {
      return (
          <div className='row'>
            <div className='col-12 col-md-5 m-1'>
              {this.renderDish(this.props.selectedDish)}
            </div>
            <div className='col-12 col-md-5 m-1'>
              {this.renderComments(this.props.selectedDish.comments)}
            </div>
          </div>
      )
    } else {
      return (
          <div/>
      )
    }
  }
}

export default DishDetail;