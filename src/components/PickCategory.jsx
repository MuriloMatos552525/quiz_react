import { useContext, useState } from "react";
import { QuizContext } from "../context/quiz";

import Category from "../img/logo.png";

import "./PickCategory.css";

const PickCategory = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Estado para o formulário
  const [formData, setFormData] = useState({
    name: "",
    telefone: "",
    email: "",
    age: "",
    cpf: "",
    termosUso: false,
    regulamento: false,
  });

  // Estado para os modais
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isRegulationModalOpen, setIsRegulationModalOpen] = useState(false);

  function chooseCategoryAndReorderQuestions(category) {
    dispatch({ type: "START_GAME", payload: category });
    dispatch({ type: "REORDER_QUESTIONS" });
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termosUso || !formData.regulamento) {
      alert("Você deve aceitar os termos para continuar.");
      return;
    }
    console.log("Dados do formulário:", formData);
    alert("Formulário enviado com sucesso!");
  };

  return (
    <div id="category">
      <img src={Category} alt="Categoria do Quiz" />
      <h1>Preencha o formulário com os seus dados:</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite seu nome"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Digite seu telefone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Idade:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Digite sua idade"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            placeholder="Digite seu CPF"
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="termosUso">
            Concordo com os{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsTermsModalOpen(true)}
            >
              Termos de Uso
            </span>{" "}
            e estou ciente do tratamento e privacidade de meus dados
          </label>
          <input
            type="checkbox"
            id="termosUso"
            name="termosUso"
            checked={formData.termosUso}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="regulamento">
            Li e aceito o{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => setIsRegulationModalOpen(true)}
            >
              Regulamento
            </span>{" "}
            da promoção
          </label>
          <input
            type="checkbox"
            id="regulamento"
            name="regulamento"
            checked={formData.regulamento}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Enviar
        </button>
      </form>
      {quizState.questions.map((question) => (
        <button
          onClick={() => chooseCategoryAndReorderQuestions(question.category)}
          key={question.category}
        >
          {question.category}
        </button>
      ))}

      {/* Modal de Termos de Uso */}
      {isTermsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Termos de Uso</h2>
            <p>
              Aqui estão os termos de uso detalhados da aplicação. Por favor,
              leia com atenção antes de aceitar.
            </p>
            <button onClick={() => setIsTermsModalOpen(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal do Regulamento */}
      {isRegulationModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Regulamento</h2>
            <p>
              Este é o regulamento completo da promoção. Leia atentamente para
              entender todos os detalhes e requisitos.
            </p>
            <button onClick={() => setIsRegulationModalOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickCategory;
