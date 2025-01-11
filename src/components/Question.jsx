import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./Option";

import "./Question.css";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestion];

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option },
    });
  };

  return (
    <div id="question">
      {/* Cartão branco centralizado */}
      <div className="question-card">
        {/* Caso queira remover a contagem de perguntas, comente essa linha */}
        <p className="question-count">
          Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
        </p>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div id="options-container">
          {currentQuestion.options.map((option) => (
            <Option
              option={option}
              key={option}
              answer={currentQuestion.answer}
              selectOption={() => onSelectOption(option)}
              hide={quizState.optionToHide === option ? "hide" : null}
            />
          ))}
        </div>

        {/* Botão para dica, se disponível e ainda não foi selecionada resposta */}
        {!quizState.answerSelected && !quizState.help && currentQuestion.tip && (
          <button className="btn-hint" onClick={() => dispatch({ type: "SHOW_TIP" })}>
            Dica
          </button>
        )}

        {/* Exibição da dica */}
        {!quizState.answerSelected && quizState.help === "tip" && (
          <p className="tip">{currentQuestion.tip}</p>
        )}

        {/* Botão para ir para a próxima pergunta, se a resposta já foi selecionada */}
        {quizState.answerSelected && (
          <button className="btn-next" onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
            Continuar
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
