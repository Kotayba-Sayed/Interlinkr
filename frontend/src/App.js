import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [postData, setPostData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '', username: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/postRoute');
      setPostData(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleNewPostChange = (e, field) => {
    setNewPost({ ...newPost, [field]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://localhost:8000/postRoute', newPost);
      fetchPosts(); // After creating a new post, fetch the updated list
      setNewPost({ title: '', content: '', username: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleInputChange = (e, key, field) => {
    const updatedData = [...postData];
    updatedData[key][field] = e.target.value;
    setPostData(updatedData);
  };

  const handleSave = async (key) => {
    try {
      await axios.put(`http://localhost:8000/postRoute/${postData[key].id}`, postData[key]);
      setEditingId(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`http://localhost:8000/postRoute/${postData[key].id}`);
      const updatedData = [...postData];
      updatedData.splice(key, 1);
      setPostData(updatedData);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="App">
      <div>
        <h2>Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => handleNewPostChange(e, 'title')}
        />
        <input
          type="text"
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => handleNewPostChange(e, 'content')}
        />
        <input
          type="text"
          placeholder="Username"
          value={newPost.username}
          onChange={(e) => handleNewPostChange(e, 'username')}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Username</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postData.map((value, key) => (
            <tr key={key}>
              <td>
                {editingId === key ? (
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => handleInputChange(e, key, 'title')}
                  />
                ) : (
                  value.title
                )}
              </td>
              <td>
                {editingId === key ? (
                  <input
                    type="text"
                    value={value.content}
                    onChange={(e) => handleInputChange(e, key, 'content')}
                  />
                ) : (
                  value.content
                )}
              </td>
              <td>
                {editingId === key ? (
                  <input
                    type="text"
                    value={value.username}
                    onChange={(e) => handleInputChange(e, key, 'username')}
                  />
                ) : (
                  value.username
                )}
              </td>
              <td>
                {editingId === key ? (
                  <button onClick={() => handleSave(key)}>Save</button>
                ) : (
                  <button onClick={() => setEditingId(key)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
