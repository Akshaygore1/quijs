import PropTypes from "prop-types";

const Option = ({ id, value, isSelected, onClick, answer, isSubmitted }) => {
  return (
    <div
      className={`
        flex items-center p-4 mb-3 rounded-lg cursor-pointer transition-all duration-300
        ${
          isSelected
            ? isSubmitted
              ? answer === "bg-green-500"
                ? "bg-green-500 text-gray-800"
                : "bg-red-500 text-white"
              : "bg-black text-white"
            : "bg-white text-gray-800 hover:bg-black hover:text-white"
        }
        border-2 ${isSelected ? "border-black" : "border-gray-300"}
      `}
      onClick={onClick}
    >
      <div
        className={`
        flex items-center justify-center w-6 h-6 mr-4 rounded-md p-4
        ${isSelected ? "bg-white text-black" : "bg-gray-200 text-black"}
      `}
      >
        {id}
      </div>
      <span className="text-lg">{value}</span>
    </div>
  );
};

Option.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
};

export default Option;
