import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { initialPosts } from './posts';
import './App.css';

function PostList({ posts }) {
  return (
    <section>
      <h2>Alle Beiträge</h2>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
            <span className="meta">
              {post.author} · {post.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <section>
        <h2>Beitrag nicht gefunden</h2>
        <Link to="/">Zurück zur Übersicht</Link>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="meta">
        {post.author} · {post.date}
      </p>
      <p>{post.content}</p>
      <Link to="/">Zurück zur Übersicht</Link>
    </article>
  );
}

function NewPost({ onCreate }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const id = onCreate({ title, author, content });
    navigate(`/posts/${id}`);
  }

  return (
    <section>
      <h2>Neuer Beitrag</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <label>
          Titel
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Autor
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label>
          Inhalt
          <textarea rows="6" value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <button type="submit">Speichern</button>
      </form>
    </section>
  );
}

function App() {
  const [posts, setPosts] = useState(initialPosts);

  function createPost({ title, author, content }) {
    const id = Math.max(0, ...posts.map((p) => p.id)) + 1;
    const date = new Date().toISOString().slice(0, 10);
    setPosts([...posts, { id, title, author, date, content }]);
    return id;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>
            <Link to="/">CRA-Blog</Link>
          </h1>
          <nav>
            <Link to="/">Beiträge</Link>
            <Link to="/new">Neuer Beitrag</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<PostList posts={posts} />} />
            <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
            <Route path="/new" element={<NewPost onCreate={createPost} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
