/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import "./CardModal.css";

function CardModal({
  // availableImages,
  name,
  // shortDescription,
  longDescription,
  // address,
  // schedules,
  // isFiltersMenuVisible,
  // phone,
  // email,
  // access,
  // coordinates,
  // website,
  // startingDate,
  // endingDate,
  isCardModalVisible,
  setIsCardModalVisible,
  // handleOpenNavigation,
  dateDisplayed,
  tags,
  imageDisplayed,
  imageDisplayedString,
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

        <img
          src={
            imageDisplayed
              ? `/assets/events_pictures/${imageDisplayedString}.png`
              : "/assets/events.png"
          }
          alt="event"
          id="modal-image"
        />

        <div id="event-card-presentation">
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
          <p id="modal-event-long-description">{longDescription}</p>
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
  // shortDescription: PropTypes.string.isRequired,
  longDescription: PropTypes.string.isRequired,
  // address: PropTypes.string.isRequired,
  // schedules: PropTypes.string.isRequired,
  // isFiltersMenuVisible: PropTypes.bool.isRequired,
  // phone: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // access: PropTypes.string.isRequired,
  // coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  // website: PropTypes.string.isRequired,
  // startingDate: PropTypes.string.isRequired,
  // endingDate: PropTypes.string.isRequired,
  isCardModalVisible: PropTypes.bool.isRequired,
  setIsCardModalVisible: PropTypes.func.isRequired,
  // handleOpenNavigation: PropTypes.func.isRequired,
  dateDisplayed: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  // availableImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageDisplayed: PropTypes.bool.isRequired,
  imageDisplayedString: PropTypes.string.isRequired,
};

export default CardModal;
