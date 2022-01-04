import './App.css';
import Card from './components/Card';
import {useEffect,useState} from 'react'

function App() {
  const [posts,setPosts] = useState([])

  useEffect(() => {
    fetch("https://jsonblob.com/api/jsonblob/927636205148061696", {
      method: 'get',
      headers: {
        "Accept": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch((error) => {
        console.error('Error:', error);
    });
  }, [])

  return (
    <div className="App">

      <div className="container">
        <div className='wrapper'>
          {posts.map((post) => {
            return <Card key={post.id} post={post}/>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
