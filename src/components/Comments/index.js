import { Component } from 'react'
import { v4 } from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = { commentsList: [], commentInput: '', nameInput: '' }

  componentDidMount(){
    const commentsList = JSON.parse(localStorage.getItem('commentsList')) || []
    this.setState({ commentsList })
  }

  updateLocalStorage = (commentsList) => {
    localStorage.setItem('commentsList', JSON.stringify(commentsList))
  }

  onAddComment = event => {
    event.preventDefault()
    const { nameInput, commentInput } = this.state
    const initialBackgroundColorClassName = `initial-container ${initialContainerBackgroundClassNames[
      Math.ceil(
        Math.random() * initialContainerBackgroundClassNames.length - 1,
      )
    ]
      }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    // before update local storage

    // this.setState(prevState => ({
    //   commentsList: [...prevState.commentsList, newComment],
    //   nameInput: '',
    //   commentInput: '',
    // }))

    this.setState(prevState => {
      const updateCommentsList = [...prevState.commentsList, newComment]

      return {
        commentsList: updateCommentsList,
        commentInput: '',
        nameInput: '',
      };
    },
      () => this.updateLocalStorage(this.state.commentsList) // Save to localStorage after state update
    )
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return { ...eachComment, isLiked: !eachComment.isLiked }
        }
        return eachComment
      }),
    }),
      () => this.updateLocalStorage(this.state.commentsList) // Save to localStorage after state update
    )
  }

  //before update local storage

  // deleteComment = commentId => {
  //   const { commentsList } = this.state

  //   this.setState({
  //     commentsList: commentsList.filter(comment => comment.id !== commentId),
  //   }),
  //   () => this.updateLocalStorage(this.state.commentsList)
  // }

  deleteComment = commentId => {
    this.setState(
      prevState => {
        const updatedCommentsList = prevState.commentsList.filter(
          comment => comment.id !== commentId
        );
        return { commentsList: updatedCommentsList };
      },
      () => this.updateLocalStorage(this.state.commentsList) // Save to localStorage after state update
    );
  };

  onAddNameChange = event => {
    this.setState({ nameInput: event.target.value })
  }

  onAddCommentChange = event => {
    this.setState({ commentInput: event.target.value })
  }

  render() {
    const { commentsList, nameInput, commentInput } = this.state
    return (
      <div className="app-container">
        <div className="bg-container">
          <form className="form-container" onSubmit={this.onAddComment}>
            <h1 className="heading">Comments</h1>
            <p className="description">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="input"
              value={nameInput}
              onChange={this.onAddNameChange}
            />
            <div>
              <textarea
                placeholder="Your Comment"
                className="comment-box"
                value={commentInput}
                onChange={this.onAddCommentChange}
              />
            </div>
            <button className="button" type="submit">
              Add Comment
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
        </div>
        <hr className="break-line" />
        <div className="comments-container">
          <div className="count-container">
            <p className="count">{commentsList.length}</p>
            <p className="description">Comments</p>
          </div>
          <ul className="comment-list-container">
            {commentsList.map(eachItem => (
              <CommentItem
                commentDetails={eachItem}
                key={eachItem.id}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments