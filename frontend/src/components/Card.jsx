/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import PropTypes from "prop-types";
import { useState } from "react";
import "./Card.css";
import CardModal from "./CardModal";

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
  startingDate,
  endingDate,
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

  // handleOpenNavigation opens Google Maps, Apple Maps and Waze with the coordinates of the place
  const handleOpenNavigation = async () => {
    const googleMapsLink = `https://maps.google.com/maps?q=${coordinates[0]},${coordinates[1]}`;
    const appleMapsLink = `http://maps.apple.com/?q=${coordinates[0]},${coordinates[1]}`;
    const wazeLink = `https://www.waze.com/ul?ll=${coordinates[0]},${coordinates[1]}&navigate=yes`;

    window.open(googleMapsLink); // Ouvre Google Maps
    window.open(appleMapsLink); // Ouvre Apple Maps
    window.open(wazeLink); // Ouvre Waze
  };

  const [isCardModalVisible, setIsCardModalVisible] = useState(false);
  const handleOpenCardModal = () => {
    setIsCardModalVisible(!isCardModalVisible);
  };

  // turn dates into a more readable format from 2023-05-13 into 13/05/2023
  const startingDateModified = startingDate
    ? `${startingDate.slice(8, 10)}/${startingDate.slice(
        5,
        7
      )}/${startingDate.slice(0, 4)}`
    : null;
  const endingDateModified = endingDate
    ? `${endingDate.slice(8, 10)}/${endingDate.slice(5, 7)}/${endingDate.slice(
        0,
        4
      )}`
    : null;

  // if starting date and ending date are not the same, we display`Du ${startingDateModified} au ${endingDateModified}`, else, we display 'Le ${startingDateModified}'
  const dateDisplayed =
    startingDateModified !== endingDateModified
      ? `Du ${startingDateModified} au ${endingDateModified}`
      : `Le ${startingDateModified}`;

  if (api === "events") {
    return (
      <>
        <div className="card">
          <div className="card-header">
            <img
              src={
                imageDisplayed
                  ? `/assets/events_pictures/${imageDisplayedString}.png`
                  : "/assets/events.png"
              }
              alt="event"
            />

            <div id="event-card-presentation">
              <p className="card-title">{name}</p>
              <div className="cards-tags">
                {tags.map((el) => (
                  <span className="cards-tag" key={el}>
                    {el}
                  </span>
                ))}
              </div>
              <p id="event-short-description">{shortDescription}</p>
              <div className="events-date-discover">
                <p id="card-dates">{dateDisplayed} </p>
                <button
                  className="access-link"
                  id="discover-link"
                  onClick={handleOpenCardModal}
                  type="button"
                >
                  <p>Découvrir</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <CardModal
          name={name}
          shortDescription={shortDescription}
          tags={tags}
          address={address}
          schedules={schedules}
          api={api}
          isFiltersMenuVisible={isFiltersMenuVisible}
          longDescription={longDescription}
          phone={phone}
          email={email}
          nature={nature}
          access={access}
          coordinates={coordinates}
          website={website}
          startingDate={startingDate}
          endingDate={endingDate}
          isCardModalVisible={isCardModalVisible}
          handleOpenCardModal={handleOpenCardModal}
        />
      </>
    );
  }

  if (api === "stadiums") {
    // stadium description has only a capital letter at beginning of the string, the rest is lower case, except "XV" and "XIII"
    const stadiumDescription = longDescription
      ? longDescription
          .toLowerCase()
          .split(" ")
          .map((word) => {
            if (word === "xv" || word === "xiii") {
              return word.toUpperCase();
            }
            return word.charAt(0).toUpperCase() + word.substring(1);
          })
          .join(" ")
      : null;

    return (
      <div className="card">
        <div className="card-header">
          <img src="/assets/stadium.png" alt="stadium" />
          <div className="stadium-card-presentation">
            <p className="card-title">{name}</p>
            <div className="cards-tags">
              {tags.map((el) => (
                <span className="cards-tag" key={el}>
                  {el}
                </span>
              ))}
            </div>
            <p id="stadium-description">{stadiumDescription}</p>
          </div>
        </div>
        <button
          className="access-link"
          onClick={handleOpenNavigation}
          type="button"
        >
          <p>Accès</p>
        </button>
      </div>
    );
  }

  if (api === "cinemas") {
    return (
      <div className="card">
        <div className="card-header">
          <img src="/assets/cinema.png" alt="cinemas" />
          <div className="cinemas-card-presentation">
            <p className="card-title">{name}</p>
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
          </div>
        </div>
        <div id="cinemas-links">
          <button
            className="access-link"
            onClick={handleOpenNavigation}
            type="button"
          >
            <p>Accès</p>
          </button>
          {website && (
            <a href={`${website}`} className="access-link">
              <p id="cinemas-website">@</p>
            </a>
          )}
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
  startingDate: PropTypes.string,
  endingDate: PropTypes.string,
};

export default Card;
