import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <Link to={`/article/${article._id}`}>{article.heading}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
