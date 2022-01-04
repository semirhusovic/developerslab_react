import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

function ViewPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  let params = useParams();
  useEffect(() => {
    fetch('https://jsonblob.com/api/jsonblob/927636205148061696', {
      method: 'get',
      headers: {
        Accept: 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data.filter((item) => item.id == params.id)[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container">
      {loading && <h3>Ucitavanje</h3>}
      <div className="row">
        <div className="col s4 offset-s4">
          <Card post={post} />
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
