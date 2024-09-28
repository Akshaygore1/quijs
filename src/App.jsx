import { useState, useEffect, useRef } from "react";
import ques from "../quiz_questions.json";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import Option from "./ui/Options";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Explanation from "./ui/Explaination";

const App = () => {
  const [questions] = useState(ques);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const codeRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answer, setAnswer] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [nextQuestionTimer, setNextQuestionTimer] = useState(null);

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute("data-highlighted");
      codeRef.current.className = "language-javascript";
      hljs.highlightElement(codeRef.current);
    }
    setSelectedOption(null);
    setIsSubmitted(false);
    setExplanation(null);
    setIsDisabled(true);
    setNextQuestionTimer(null);
  }, [selectedQuestion]);

  useEffect(() => {
    let timer;
    if (nextQuestionTimer !== null && nextQuestionTimer > 0) {
      timer = setTimeout(() => {
        setNextQuestionTimer(nextQuestionTimer - 1);
      }, 1000);
    } else if (nextQuestionTimer === 0) {
      setSelectedQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    }
    return () => clearTimeout(timer);
  }, [nextQuestionTimer, questions.length]);

  function handleSubmit() {
    const currentQuestion = questions[selectedQuestion];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswer(isCorrect);
    setIsSubmitted(true);
    setExplanation(currentQuestion.explanation);

    if (isCorrect) {
      setNextQuestionTimer(5);
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-2">
      <div className="w-full rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:space-x-6">
          {/* Selected question details column */}
          <div className="w-full md:w-3/4 overflow-y-auto mb-6 md:mb-0">
            {selectedQuestion !== null ? (
              <div>
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Question {selectedQuestion + 1}
                    </h3>
                    <p className="mb-4">
                      {questions[selectedQuestion].question}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-black text-white rounded-md p-2 disabled:bg-gray-400"
                      disabled={selectedQuestion <= 0}
                      onClick={() => {
                        setSelectedQuestion(selectedQuestion - 1);
                      }}
                    >
                      <ArrowLeft />
                    </button>
                    <button
                      className="bg-black text-white rounded-md p-2 disabled:bg-gray-400"
                      disabled={selectedQuestion >= questions.length - 1}
                      onClick={() => {
                        setSelectedQuestion(selectedQuestion + 1);
                      }}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
                <pre className="bg-gray-800 text-white rounded-md overflow-x-auto mb-4">
                  <code ref={codeRef} className="language-javascript">
                    {questions[selectedQuestion].code}
                  </code>
                </pre>
                <div className="space-y-2">
                  {Object.entries(questions[selectedQuestion].options).map(
                    ([key, value]) => (
                      <Option
                        key={key}
                        id={key}
                        value={value}
                        isSelected={selectedOption === key}
                        answer={answer ? "bg-green-500" : "bg-red-500"}
                        isSubmitted={isSubmitted}
                        onClick={() => {
                          setIsDisabled(false);
                          setAnswer(false);
                          setSelectedOption(key);
                          setIsSubmitted(false);
                        }}
                      />
                    )
                  )}
                </div>
                <div className="mt-4 flex flex-row justify-end gap-4">
                  <div>
                    <Explanation
                      isSubmitted={isSubmitted}
                      explanation={explanation}
                      isCorrect={answer}
                    />
                  </div>
                  <div>
                    <button
                      className={`bg-black text-white rounded-md p-2 transition-colors duration-200 ${
                        isDisabled
                          ? "bg-gray-400 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                      disabled={isDisabled}
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Please select a question from the bottom.
              </p>
            )}
          </div>

          {/* Question selection column */}
          <div className="w-full md:w-1/4 md:pl-4 md:border-l md:border-gray-200 md:max-h-screen">
            <div className="flex flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Questions</h3>
              {nextQuestionTimer !== null && (
                <div className="text-sm font-medium">
                  Next Question: {nextQuestionTimer}s
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[calc(100vh-120px)] justify-center">
              {questions.map((question, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedQuestion === index
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
