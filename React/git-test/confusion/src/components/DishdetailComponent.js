import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Media} from 'reactstrap';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import {Link} from "react-router-dom";

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
    return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
            </div>
          </div>
        </div>

    )
}


export default DishDetail;