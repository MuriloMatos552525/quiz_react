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

  // -----------------------------
  //  HANDLERS DE MÁSCARA MANUAL
  // -----------------------------

  // Telefone: formato (99) 99999-9999
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for dígito
    value = value.replace(/\D/g, "");

    // Limita a 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Insere a máscara passo a passo
    // Exemplo de fluxo para "21987654321":
    // => "(" + "21987654321"
    // => "(21) 987654321"
    // => "(21) 98765-4321"
    let maskedValue = value;

    // Adiciona parênteses iniciais se houver ao menos 1 dígito
    if (maskedValue.length > 0) {
      maskedValue = "(" + maskedValue;
    }
    // Se houver ao menos 3 dígitos, fecha parênteses e adiciona espaço
    if (maskedValue.length > 3) {
      maskedValue = maskedValue.slice(0, 3) + ") " + maskedValue.slice(3);
    }
    // Se houver ao menos 9 dígitos (3 DDD + 5 celular), adiciona hífen
    if (maskedValue.length > 9) {
      maskedValue = maskedValue.slice(0, 9) + "-" + maskedValue.slice(9);
    }

    setFormData((prev) => ({ ...prev, telefone: maskedValue }));
  };

  // CPF: formato 000.000.000-00
  const handleCpfChange = (e) => {
    let value = e.target.value;

    // Remove tudo que não for dígito
    value = value.replace(/\D/g, "");

    // Limita a 11 dígitos
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // Insere a máscara passo a passo
    // Exemplo para "12345678901"
    // => "123.456.789-01"
    let maskedValue = value;

    // Após 3 dígitos, insere ponto
    if (maskedValue.length > 3) {
      maskedValue = maskedValue.slice(0, 3) + "." + maskedValue.slice(3);
    }
    // Após 6 dígitos, insere outro ponto
    if (maskedValue.length > 7) {
      maskedValue = maskedValue.slice(0, 7) + "." + maskedValue.slice(7);
    }
    // Após 9 dígitos, insere hífen
    if (maskedValue.length > 11) {
      maskedValue = maskedValue.slice(0, 11) + "-" + maskedValue.slice(11);
    }

    // Obs.: se o usuário já tiver, por ex., 9 dígitos, ele adiciona ponto e hífen corretamente

    setFormData((prev) => ({ ...prev, cpf: maskedValue }));
  };

  // Demais campos (nome, email, data) seguem a lógica genérica
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Se o campo for checkbox, pega o checked; caso contrário, o value
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------
  //  HANDLE SUBMIT
  // -----------------------------
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
      //alert("Formulário enviado com sucesso!");

      // Marca que o formulário foi submetido
      setIsFormSubmitted(true);
    } catch (error) {
      console.error("Erro ao salvar dados no Firestore:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <div id="cadastro-screen">
      {/* Container branco arredondado */}
      <div className="card-container">
        {/* Exibe somente a logo, sem texto abaixo */}
        <img src={Category} alt="Logo" className="amo-logo" />

        <h1>CADASTRO</h1>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            required
          />

          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handlePhoneChange}
            placeholder="(99) 99999-9999"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            required
          />

          <input
            type="date"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Data de Nascimento"
            required
          />

          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            required
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="termosUso"
                checked={formData.termosUso}
                onChange={handleChange}
              />{" "}
              Aceito os{" "}
              <span onClick={() => setIsModalOpen(true)}>Termos de Uso</span>
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="regulamento"
                checked={formData.regulamento}
                onChange={handleChange}
              />{" "}
              Aceito o Regulamento da promoção
            </label>
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
              <p>Texto dos termos de uso...</p>
              <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickCategory;
