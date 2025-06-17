import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
const base = import.meta.env.BASE_URL;

function SearchBar({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = articles.filter((article) => {
      const lowerValue = value.toLowerCase();
      return (
        (article.title || '').toLowerCase().includes(lowerValue) ||
        (article.content || '').toLowerCase().includes(lowerValue) ||
        (article.titleEN || '').toLowerCase().includes(lowerValue) ||
        (article.contentEN || '').toLowerCase().includes(lowerValue)

      );
    });

    setSuggestions(filtered);
  };

  const handleSelect = (id) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(`${base}news/article/${id}`);
  };

  return (
    <div className="search-container">
      <input
        type="search"
        placeholder={language === 'zh-TW' ? "有特定想找的文章嗎？例如：手沖咖啡" : "Are you looking for a specific article? For example, pour-over coffee?"}
        value={searchTerm}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((article) => (
            <li key={article.id} onClick={() => handleSelect(article.id)}>
              {language === 'zh-TW' ? article.title : article.titleEN}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;