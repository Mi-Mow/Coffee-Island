import { Link } from 'react-router-dom';

const EventCard = ({ imgSrc, tags, date, title, link = "#" }) => (
  <Link to={link} className="event-card">
    <img src={imgSrc} alt={title} />
    <div className="event-tags">
      {tags.map((tag, index) => (
        <p key={index} className="tagName">{tag}</p>
      ))}
    </div>
    <p className="date">{date}</p>
    <h2>{title}</h2>
  </Link>
);

export default EventCard;
