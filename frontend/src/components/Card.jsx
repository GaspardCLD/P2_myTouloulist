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
}) {
  return (
    <p>
      {name}, {shortDescription}, {tags}, {address}, {schedules}, {api},{" "}
      {isFiltersMenuVisible}, {longDescription}, {phone}, {email}, {nature},{" "}
      {access}
    </p>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  address: PropTypes.string.isRequired,
  schedules: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  isFiltersMenuVisible: PropTypes.bool.isRequired,
  longDescription: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  nature: PropTypes.string.isRequired,
  access: PropTypes.string.isRequired,
};

export default Card;
