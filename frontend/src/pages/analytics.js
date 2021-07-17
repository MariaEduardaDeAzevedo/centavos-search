import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { DollarSign, GitHub, Menu } from "react-feather";
import { ImSearch } from "react-icons/im";
import { navigate } from "gatsby";
import Footer from "../components/Footer";

import "./styles.css";

const Analytics = () => {
  const [variables, setVariables] = useState({
      "approved": NaN, 
      "days": NaN, 
      "max": NaN, 
      "mean": NaN, 
      "median": NaN, 
      "min": NaN, 
      "no-approved": NaN, 
      "percent_approved": NaN
    });

  const api = axios.create({
    baseURL: "https://centavos-search.herokuapp.com",
  });

  useEffect(() => {
    api
      .get(`/analytics`)
      .then((response) => {
        setVariables(response.data);
      })
      .catch((err) => {
        window.alert(`Algo deu errado... acesse http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt para conferir seus centavos da forma tradicional.
                    [${err}]`);
      });

    document.title = "CENTAVOS SEARCH";
  }, [variables]);

  const navigateHome = useCallback(() => {
    navigate("/");
  }, [variables]);

  return (
    <Container className="container">
      <header>
        <div className="menu">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="menu-dropdown"
            >
              <Menu />
            </Dropdown.Toggle>

            <Dropdown.Menu className="drop">
              <Dropdown.Item
                target="_blank"
                href="https://github.com/MariaEduardaDeAzevedo/centavos-search"
                className="drop-item"
              >
                Contibua no GitHub
                <GitHub />
              </Dropdown.Item>
              <Dropdown.Item
                target="_blank"
                href="https://mariaeduardadeazevedo.github.io/"
                className="drop-item"
              >
                Sobre quem desenvolveu...
              </Dropdown.Item>
              <Dropdown.Item
                target="_blank"
                href="http://lad.ufcg.edu.br/loac/"
                className="drop-item"
              >
                Site de LOAC
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button
            className="no-styled-btn"
            onClick={navigateHome}
            type="button"
          >
            <h3>
              <DollarSign /> <span>CENTAVOS SEARCH</span>
            </h3>
          </button>
        </div>

          <h3>
            <ImSearch /> 
            <span>ANALYTICS</span>
          </h3>
          <span className="desc">Veja como está a situação da turma</span>
      </header>

      <main className="analytics">
        <p>
        Em <strong>{variables.days} DIAS DE AULA</strong>, a <strong>MÉDIA DA TURMA É DE {variables.mean} CENTAVOS</strong>, <strong>A MEDIANA DE {variables.median} CENTAVOS</strong>, a <strong>MAIOR QUANTIDADE DE CENTAVOS ACUMULADOS</strong> por um alune foi de <strong>{variables.max} CENTAVOS</strong> e a <strong>MENOR de {variables.min} CENTAVOS</strong>. Há <strong>{variables.approved} ALUNES APROVADES</strong>, enquanto <strong>{variables["no-approved"]} AINDA NÃO FORAM APROVADES</strong>, o que significa que <strong>{variables.percent_approved}% DA TURMA SE ENCONTRA APROVADA</strong>.
        </p> 
      </main>

      <Footer />
    </Container>
  );
};

export default Analytics;
