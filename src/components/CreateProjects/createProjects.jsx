/* eslint-disable react-hooks/rules-of-hooks */
import "./createProjects.css";

import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

import api from "../../api/fetchApi";
import useToast from "../../hooks/useToast";

const CreateProjects = () => {
  const [titleProject, setTitleProject] = useState("");
  const [dayProject, setDayProject] = useState("");
  const [monthProject, setMonthProject] = useState("");
  const [yearProject, setYearProject] = useState("");
  const [localProject, setLocalProject] = useState("");
  const [descriptionProject, setDescriptionProject] = useState("");
  const [goalProject, setGoalProject] = useState(0);
  const [collectedProject, setCollectedProject] = useState(0);
  const [imagem, setImagem] = useState(null);
  const [messageError, setMessageError] = useState("");
  const [resultError, setResultError] = useState(false);
  const [resultLogin, setResultLogin] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("titleProject", titleProject);
      formData.append("dayProject", dayProject);
      formData.append("monthProject", monthProject);
      formData.append("yearProject", yearProject);
      formData.append("localProject", localProject);
      formData.append("descriptionProject", descriptionProject);
      formData.append("goalProject", goalProject);
      formData.append("collectedProject", collectedProject);
      formData.append("imagem", imagem);

      const response = await api.post("/projects", formData);

      setMessageSuccess(response.data.mensagem);

      console.log(response);

      useToast(response.data.mensagem);

      setResultLogin(true);
      setResultError(false);
      setTitleProject("");
      setDayProject("");
      setMonthProject("");
      setYearProject("");
      setLocalProject("");
      setDescriptionProject("");
      setGoalProject(0);
      setCollectedProject(0);
      setImagem("");
    } catch (error) {
      console.log(error);
      console.error("Erro ao fazer a solicitação:", error.response);
      setResultError(true);
      setMessageError(error.response.data.mensagem);
    }
  };

  return (
    <>
      <section className="panel-section-create">
        <h1 id="panel-title-h1">
          <FontAwesomeIcon icon={faCalendarDay} /> Novo Projeto
        </h1>

        <form id="panel-form-create">
          <label htmlFor="titleProject">Nome do Projeto:</label>
          <input
            id="titleProject"
            value={titleProject}
            onChange={(e) => setTitleProject(e.target.value)}
            required
          />

          <label htmlFor="dayProject">Data de criação do Projeto</label>
          <input
            id="dayProject"
            value={dayProject}
            onChange={(e) => setDayProject(e.target.value)}
            required
          />

          <label htmlFor="monthProject">Mês do Projeto</label>
          <input
            id="monthProject"
            value={monthProject}
            onChange={(e) => setMonthProject(e.target.value)}
            required
          />

          <label htmlFor="yearProject">Ano do Projeto</label>
          <input
            id="yearProject"
            value={yearProject}
            onChange={(e) => setYearProject(e.target.value)}
            required
          />

          <label htmlFor="localProject">Local do Projeto</label>
          <input
            id="localProject"
            value={localProject}
            onChange={(e) => setLocalProject(e.target.value)}
            required
          />

          <label htmlFor="descriptionProject">Descrição do Projeto</label>
          <textarea
            className="message-events"
            id="descriptionProject"
            value={descriptionProject}
            placeholder="Descreva o Projeto"
            onChange={(e) => setDescriptionProject(e.target.value)}
            required
          ></textarea>

          <label htmlFor="goalProject">Meta do Projeto</label>
          <input
            id="goalProject"
            value={goalProject}
            onChange={(e) => setGoalProject(e.target.value)}
            required
          />

          <label htmlFor="collectedProject">Arrecadado</label>
          <input
            id="collectedProject"
            value={collectedProject}
            onChange={(e) => setCollectedProject(e.target.value)}
            required
          />

          <label htmlFor="imageProject">Selecione uma Imagem</label>
          <input
            id="imageProject"
            type="file"
            onChange={(e) => setImagem(e.target.files[0])}
            required
          />

          {resultError ? (
            <div>{messageError}</div>
          ) : resultLogin ? (
            <button className="btn-back-home">
              <NavLink className="style-btn-back-home">
                {messageSuccess}
              </NavLink>
            </button>
          ) : null}

          <button className="btn-pay" onClick={handleSubmit}>
            Criar o Projeto
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateProjects;
