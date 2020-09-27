import React, {Component} from 'react';
import {Media} from 'reactstrap';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle
} from 'reactstrap';

function RenderDish({dish}) {
  return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name}/>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
  )
}

function RenderComments({comments}) {
  const commentsArr = comments.map((comment) => {
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
          {commentsArr}
        </ul>
      </>
  )
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
        <div className="container">
          <div className='row'>
            <div className='col-12 col-md-5 m-1'>
              <RenderDish dish={props.dish} />
            </div>
            <div className='col-12 col-md-5 m-1'>
              <RenderComments comments={props.dish.comments} />
            </div>
          </div>
        </div>

    )
  } else {
    return (
        <div/>
    )
  }
}


export default DishDetail;