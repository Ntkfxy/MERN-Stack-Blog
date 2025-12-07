import React, { useEffect, useState } from "react";
import Card from '../components/Card.jsx';


const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="p-6 grid gap-4">
      {news.map((item) => (
        <Card
  key={item.id}
  id={item.id}
  title={item.title}
  content={item.content}
  image={item.image}
  date={item.date}
  category={item.category}
/>
      ))}
    </div>
  );
}
export default Home;