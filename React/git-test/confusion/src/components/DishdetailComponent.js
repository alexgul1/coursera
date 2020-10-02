import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Col, Label, Media, Modal, ModalBody, ModalHeader, Row} from 'reactstrap';
import {
  Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle
} from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, Errors, LocalForm} from "react-redux-form";

const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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

function RenderComments({comments, addComment, dishId}) {
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
        <CommentForm dishId={dishId} addComment={addComment}/>
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
              <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
            </div>
          </div>
        </div>

    )
}


class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      isModalOpen: false
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return(
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg" /> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="rating">Rating</Label>
                    <Control.select model=".rating" name="rating" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="your-name">Your Name</Label>
                    <Control.text model=".author" name="your-name"
                                  className="form-control" placeholder="Your Name"
                                  validators={{
                                    minLength: minLength(3),
                                    maxLength: maxLength(15)
                                  }}
                    />
                    <Errors className="text-danger" model=".your-name" show="touched"
                            messages={{
                              minLength: 'Must be greater than 2 characters',
                              maxLength: 'Must be 15 characters or less'
                            }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Label htmlFor="comment">Comment</Label>
                    <Control.textarea model=".comment" rows="6" name="comment" className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col>
                    <Button type="submit" color="primary">Submit</Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
    )
  }

}

export default DishDetail;