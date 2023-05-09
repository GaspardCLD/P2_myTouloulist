/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import "./Card.css";

function Card({
  name,
  shortDescription,
  tags,
  address,
  schedules,
  api,
  isFiltersMenuVisible,
  longDescription,
  phone,
  email,
  nature,
  access,
  coordinates,
  website,
}) {
  const availableImages = [
    "Danse",
    "Musée",
    "Art contemporain",
    "Artisanat",
    "Musique classique",
    "Jeune public",
    "Nocturne",
    "Plantes",
    "Marionnette",
    "Photographie",
    "Cirque",
    "Rap - reggae - soul - funk",
    "Vin - oenologie",
    "Gastronomie",
    "Arts de la rue",
    "Randonnée",
    "Musical",
    "Musique de variété",
    "Jazz et blues",
    "Comique",
    "Musique du monde",
    "Littérature",
    "Pop musique (rock...)",
    "Musique contemporaine",
    "Contes",
  ];

  // create an imageDisplayed const that returns the first value of "tags" that is included in availableImages if there is one, null otherwise
  const imageDisplayed = tags.find((el) => availableImages.includes(el));

  // turn imagedisplayed into a string with no space and no accent, no capital letter, remove "-"
  const imageDisplayedString = imageDisplayed
    ? imageDisplayed
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "")
        .toLowerCase()
        .replace(/-/g, "")
    : null;

  if (api === "events") {
    return (
      <div className="event-card">
        <div className="event-card-header">
          <img
            src={
              imageDisplayed
                ? `/assets/events_pictures/${imageDisplayedString}.png`
                : "/assets/events.png"
            }
            alt="event"
          />

          <div id="event-card-presentation">
            <p id="event-title">{name}</p>
            <div className="cards-tags">
              {tags.map((el) => (
                <span className="cards-tag" key={el}>
                  {el}
                </span>
              ))}
            </div>
            <p id="event-short-description">{shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }

  if (api === "stadiums") {
    return (
      <div className="stadium-card">
        <div className="stadium-card-header">
          <img src="/assets/stadium.png" alt="stadium" />
          <div className="stadium-card-presentation">
            <p id="stadium-title">{name}</p>
            <div className="cards-tags">
              {tags.map((el) => (
                <span className="cards-tag" key={el}>
                  {el}
                </span>
              ))}
            </div>
            <p>{longDescription}</p>
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${coordinates[0]},${coordinates[1]}`}
          target="_blank"
          rel="noreferrer"
          id="access-stadium"
        >
          <p>Accès</p>
        </a>
      </div>
    );
  }

  if (api === "cinemas") {
    return (
      <div className="cinemas-card">
        <div className="cinemas-card-header">
          <img src="/assets/cinema.png" alt="cinemas" />
          <div className="cinemas-card-presentation">
            <p id="cinemas-title">{name}</p>
            <div className="cards-tags">
              {tags.map((el) => (
                <span className="cards-tag" key={el}>
                  {el}
                </span>
              ))}
            </div>
            {/* <p id="cinemas-address">{address}</p>, adress is transformed with only first letter of each word as capital letter */}
            <p id="cinemas-address">
              {address
                .toLowerCase()
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
                .join(" ")}
            </p>
            {/* if it does exist, display website */}
            {website && (
              <a href={`${website}`} target="_blank" rel="noreferrer">
                <p id="cinemas-website">Site web</p>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  address: PropTypes.string,
  schedules: PropTypes.string,
  api: PropTypes.string.isRequired,
  isFiltersMenuVisible: PropTypes.bool.isRequired,
  longDescription: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  nature: PropTypes.string,
  access: PropTypes.string,
  coordinates: PropTypes.arrayOf(PropTypes.number),
  website: PropTypes.string,
};

export default Card;
