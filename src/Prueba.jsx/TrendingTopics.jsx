import React from "react";

const TrendingTopic = ({ topic }) => {
  return (
    <div className="trending-topic">
      <h4>{topic.name}</h4>
      <p>{topic.posts} posts</p>
    </div>
  );
};

const TrendingTopics = () => {
  // Datos simulados para los temas populares
  const trendingTopics = [
    { name: 'React', posts: 12000 },
    { name: 'JavaScript', posts: 10000 },
    { name: 'Frontend Dev', posts: 8000 },
    { name: 'CSS Tricks', posts: 5000 },
  ];

  return (
    <div className="trending-topics-container">
      {trendingTopics.map((topic, index) => (
        <TrendingTopic key={index} topic={topic} />
      ))}
    </div>
  );
};

export default TrendingTopics;
