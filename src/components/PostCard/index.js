import './index.css'

import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import {FcLike} from 'react-icons/fc'

class PostCard extends Component {
  state = {
    comment: '',
  }

  clikedOnLike = id => {
    const {ClikedOnLikeOrUnlike} = this.props
    ClikedOnLikeOrUnlike(id, true)
  }

  clikedOnUnLike = id => {
    const {ClikedOnLikeOrUnlike} = this.props
    ClikedOnLikeOrUnlike(id, false)
  }

  changeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {postData, clikedOnCommenttoHome} = this.props

    const {
      userId,
      profilePic,
      userName,
      imageUrl,
      likesCount,
      caption,
      comments,
      createdAt,
      postId,
      message,
      showCommentbox,
    } = postData

    const Islike = message === 'Post has been liked'

    const clikedOnComment = () => {
      clikedOnCommenttoHome(postId)
    }

    const clikedonAddComment = () => {
      const {addComment} = this.props
      const {comment} = this.state
      addComment(comment, postId)
    }

    return (
      <li key={userId} className="list-item">
        <div className="larger-one">
          <div className="profilePicContainer">
            <img
              src={profilePic}
              alt="post author profile"
              className="profilepic"
            />
            <Link to={`/users/${userId}`} className="link">
              <p className="user-name">{userName}</p>
            </Link>
          </div>

          <div>
            <img src={imageUrl} alt="post" className="Image" />
          </div>
          <div className="informaton">
            <div className="icons-container">
              {Islike ? (
                <FcLike
                  testid="unLikeIcon"
                  className="iconz"
                  onClick={() => {
                    this.clikedOnUnLike(postId)
                  }}
                />
              ) : (
                <BsHeart
                  testid="likeIcon"
                  className="iconz"
                  onClick={() => {
                    this.clikedOnLike(postId)
                  }}
                />
              )}
              <FaRegComment className="iconz" onClick={clikedOnComment} />
              <BiShareAlt className="iconz" />
            </div>
            <div className="info">
              <p className="likes-para">{likesCount} Likes</p>
              <p className="discription">{caption}</p>

              {showCommentbox && (
                <div className="comment-container">
                  <input
                    type="text"
                    className="input-for-comment"
                    onChange={this.changeComment}
                  />
                  <button
                    type="button"
                    className="button-for-comment"
                    onClick={clikedonAddComment}
                  >
                    Add comment
                  </button>
                </div>
              )}

              <ul className="ul-for-comments">
                {comments.map(each => (
                  <li key={each.user_id} className="list-for-comment">
                    <p className="commnets">
                      <span className="spanl">{each.user_name}</span>_
                      {each.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="time">{createdAt}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default PostCard
