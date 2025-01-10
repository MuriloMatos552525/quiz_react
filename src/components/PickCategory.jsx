import { useContext, useState } from "react";
import { QuizContext } from "../context/quiz";

import Category from "../img/logo.png";
import "./PickCategory.css";

// ---- IMPORTAÇÕES DO FIREBASE ----
import db from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const PickCategory = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    telefone: "",
    email: "",
    age: "",
    cpf: "",
    termosUso: false,
    regulamento: false,
  });

  // Estado para indicar se o formulário foi enviado
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Estado para exibir/esconder Modal de Termos de Uso
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se os checkboxes estão marcados
    if (!formData.termosUso || !formData.regulamento) {
      alert("Você deve aceitar os termos e o regulamento para continuar.");
      return;
    }

    try {
      // Enviando os dados para o Firestore
      const docRef = await addDoc(collection(db, "usuarios"), {
        ...formData,
        createdAt: new Date(),
      });

      console.log("Dados do usuário registrados com ID:", docRef.id);
      alert("Formulário enviado com sucesso!");

      // Marca que o formulário foi submetido
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Erro ao salvar dados no Firestore:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <div id="category">
      <div className="pick-container">
        <img src={Category} alt="Logo" className="quiz-image" />
        <h1>Preencha o formulário</h1>
        <p className="subtitle">
          Participe e descubra o quanto você sabe!
        </p>

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
                className="termos-link"
                onClick={() => setIsModalOpen(true)}
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
              Li e aceito o Regulamento da promoção
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

        {isFormSubmitted && (
          <div className="quiz-buttons">
            {quizState.questions.map((question) => (
              <button
                onClick={() => chooseCategoryAndReorderQuestions(question.category)}
                key={question.category}
              >
                {question.category}
              </button>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Termos de Uso</h2>
              <p>
                Aqui estão os termos de uso detalhados da aplicação. Leia com
                atenção antes de aceitar.
              </p>
              <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickCategory;
