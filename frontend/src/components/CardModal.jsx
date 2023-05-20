/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import "./CardModal.css";

function CardModal({
  name,
  longDescription,
  address,
  schedules,
  access,
  isCardModalVisible,
  setIsCardModalVisible,
  dateDisplayed,
  tags,
  imageDisplayed,
  imageDisplayedString,
  handleOpenNavigation,
  placeName,
  booking,
}) {
  // prevents window from scrolling when modal is open

  if (isCardModalVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  // allow scroll inside the modal

  const modal = document.querySelector(".cardModalContainer");
  if (modal) {
    modal.addEventListener("touchmove", (e) => {
      e.stopPropagation();
    });
  }

  // handle booking button
  const handleBooking = () => {
    // opens url booking in a new window on click
    window.open(`https://${booking}`);
  };

  return (
    <>
      <div
        className={`cardModalContainer ${!isCardModalVisible ? "hidden" : ""}`}
      >
        <button
          id="close-modal"
          onClick={() => setIsCardModalVisible(false)}
          type="button"
        >
          <img src="/assets/close_icon.svg" alt="close" />
        </button>

        <div id="modal-event-card-presentation">
          <img
            src={
              imageDisplayed
                ? `/assets/events_pictures/${imageDisplayedString}.png`
                : "/assets/events.png"
            }
            alt="event"
            id="modal-image"
          />
          <div className="modal-text">
            <div>
              <div id="modal-name-date">
                <p className="modal-card-title">{name}</p>
                <p id="modal-card-dates">{dateDisplayed} </p>
              </div>
              <div className="cards-tags">
                {tags.map((el) => (
                  <span className="cards-tag" key={el}>
                    {el}
                  </span>
                ))}
              </div>
            </div>

            <p id="modal-event-long-description">{longDescription}</p>

            <p className="modal-date-access">📅 {schedules}</p>
            <p className="modal-date-access">
              <span id="place-name">{placeName}</span>
              <br />
              {address}
              <br />
              {access ? <span>🚈 {access}</span> : ""}
            </p>
          </div>
        </div>
        <div className="modal-buttons">
          <button
            className="access-link"
            id="card-modal-access-link"
            onClick={handleOpenNavigation}
            type="button"
          >
            <p>Accès</p>
          </button>
          {booking ? (
            <button
              className="access-link"
              id="modal-booking-link"
              onClick={handleBooking}
              type="button"
            >
              <p>Réservations</p>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        type="button"
        className={`cardModalBackground ${!isCardModalVisible ? "hidden" : ""}`}
        onClick={() => setIsCardModalVisible(false)}
      >
        <p>.</p>
      </button>
    </>
  );
}

CardModal.propTypes = {
  name: PropTypes.string.isRequired,
  longDescription: PropTypes.string.isRequired,

  isCardModalVisible: PropTypes.bool.isRequired,
  setIsCardModalVisible: PropTypes.func.isRequired,
  dateDisplayed: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOpenNavigation: PropTypes.func.isRequired,
};

export default CardModal;
