import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (id) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(`/news/article/${id}`);
  };

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="有特定想找的文章嗎？例如：咖啡館"
        value={searchTerm}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((article) => (
            <li key={article.id} onClick={() => handleSelect(article.id)}>
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;