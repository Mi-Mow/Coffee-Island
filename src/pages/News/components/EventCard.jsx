const EventCard = ({ imgSrc, tags, date, title, onClick }) => (
  <div className="event-card" onClick={onClick} style={{ cursor: 'pointer' }}>
    <figure>
      <img src={imgSrc} alt={title} />
    </figure>
    <div className="event-tags">
      {tags.map((tag, index) => (
        <p key={index} className="tagName">{tag}</p>
      ))}
    </div>
    <p className="date">{date}</p>
    <div className="title-container">
      <h3>{title}</h3>
    </div>
  </div>
);

export default EventCard;
