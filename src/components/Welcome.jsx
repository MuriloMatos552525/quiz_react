import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./Welcome.css";
import QuizLogo from "../img/logo.png";

const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  return (
    <div id="welcome">
      <div className="welcome-container">
        <h2>Seja bem-vindo ao Quiz!</h2>
        <p className="subtitle">Teste seus conhecimentos e divirta-se</p>
        <button className="btn-start" onClick={() => dispatch({ type: "CHANGE_STAGE" })}>
          Iniciar
        </button>
        <img src={QuizLogo} alt="Início do Quiz" />
      </div>
    </div>
  );
};

export default Welcome;
