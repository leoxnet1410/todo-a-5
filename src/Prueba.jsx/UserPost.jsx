import React from "react";

const UserPost = ({ post }) => {
  return (
    <div className="post">
      <h3>{post.username}</h3>
      <p>{post.content}</p>
      <span>{post.timestamp}</span>
    </div>
  );
};

const UserPosts = () => {
  // Datos simulados para las publicaciones de los usuarios
  const posts = [
    {
      username: 'Juan Perez',
      content: '¡Amo React! Es una herramienta genial para desarrollo frontend.',
      timestamp: 'Hace 2 horas'
    },
    {
      username: 'Maria Lopez',
      content: 'Estoy aprendiendo JavaScript, ¡es muy interesante!',
      timestamp: 'Hace 3 horas'
    },
    {
      username: 'Carlos Ruiz',
      content: 'Acabo de completar mi primer proyecto con CSS Grid. 😍',
      timestamp: 'Hace 5 horas'
    },
  ];

  return (
    <div className="posts-container">
      {posts.map((post, index) => (
        <UserPost key={index} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
