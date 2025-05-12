import { Link } from 'react-router-dom';

const EventCard = ({ imgSrc, tags, date, title, link = "#" }) => (
  <Link to={link} className="event-card">
    <figure>
      <img src={imgSrc} alt={title} />
    </figure>
    <div className="event-tags">
      {tags.map((tag, index) => (
        <p key={index} className="tagName">{tag}</p>
      ))}
    </div>
    <p className="date">{date}</p>
    <div className='title-container'><h3>{title}</h3></div>
  </Link>
);

export default EventCard;
