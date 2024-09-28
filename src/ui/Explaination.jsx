import PropTypes from "prop-types";

const Explanation = ({ isSubmitted, explanation, isCorrect }) => {
  if (!isSubmitted || !explanation) {
    return null;
  }

  const bgColor = isCorrect ? "bg-green-100" : "bg-red-100";
  const borderColor = isCorrect ? "border-green-400" : "border-red-400";
  const textColor = isCorrect ? "text-green-700" : "text-red-700";

  return (
    <div
      className={`p-4 mb-4 ${bgColor} ${borderColor} border-l-4 rounded-r-md`}
    >
      <div className="flex items-center mb-2">
        <svg
          className={`w-5 h-5 mr-2 ${textColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d={
              isCorrect
                ? "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                : "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            }
            clipRule="evenodd"
          />
        </svg>
        <span className={`font-bold ${textColor}`}>
          {isCorrect ? "Correct!" : "Incorrect"}
        </span>
      </div>
      <p className={textColor}>{explanation}</p>
    </div>
  );
};

Explanation.propTypes = {
  isSubmitted: PropTypes.bool.isRequired,
  explanation: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

export default Explanation;
