import React from 'react'
import {Link} from 'react-router-dom'

function Card({post}) {
  return (
    <div key={post.key}>

      <div className="row">
          <div className="col s12 m12 l12">
            <div className="card">
              <Link to={`/post/${post.id}`}>
              <div className="card-image">
                <img alt="poster" src={post.image} />
                <span className="card-title">{post.title}</span>
              </div>
              </Link>
              <div className="card-content">
                <p>{post.description}</p>
              </div>
              <div className="card-action">
              <Link to={`/post/${post.id}`}>Read more</Link>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Card
