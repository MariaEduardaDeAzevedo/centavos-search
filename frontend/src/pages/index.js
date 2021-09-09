import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Dropdown, Row, Toast } from "react-bootstrap";
import moment from "moment";
import { Search, DollarSign, GitHub, Menu, ChevronDown } from "react-feather";
import { ImSearch, ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import { navigate } from "gatsby";
import Card from "../components/Card";
import Footer from "../components/Footer";

import "./styles.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [cents, setCents] = useState(0);
  const [totalCents, setTotalCents] = useState(0);
  const [order, setOrder] = useState();
  const [filter, setFilter] = useState();
  const [situation, setSituation] = useState("");
  const [types, setTypes] = useState([])
  const [searchView, setSearchView] = useState(false)

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(true);

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  const api = axios.create({
    baseURL: "https://centavos-search.herokuapp.com",
  });

  useEffect(() => {
    document.title = "CENTAVOS SEARCH";

    if (cents >= 700) {
      setSituation("APROVADE");
    } else {
      setSituation("NÃO APROVADE");
    }
    if (filter) {
      if (filter.name == "TODOS") {
        setCents(totalCents)
        return
      }
      let filterCents = 0;
      for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        if (element.mode.toUpperCase() == filter.name) {
          filterCents += element.cents;
        }
      }

      setCents(filterCents)
    }

  }, [search, projects, cents, order, types, filter]);

  const navigateHome = useCallback(() => {
    setProjects([]);
    setTypes([]);
    setOrder(undefined);
    setFilter(undefined);
    navigate("/");
    setSearchView(false);
  }, [setProjects, setOrder, setTypes, setFilter, setSearchView]);

  const handleOrder = useCallback(
    (array) => {
      if (order) {
        return array.sort((p1, p2) => {
          let firstElement = p1[order.key];
          let secondElement = p2[order.key];
          // se for date, é necessário tratá-lo antes
          if (order.key === "date") {
            firstElement = moment(p1.date, "DD-MM");
            secondElement = moment(p2.date, "DD-MM");
          }
          if (order.direction === "asc") {
            return firstElement < secondElement
              ? -1
              : firstElement > secondElement
              ? 1
              : 0;
          }
          return firstElement < secondElement
            ? 1
            : firstElement > secondElement
            ? -1
            : 0;
        });
      }
      return array;
    },
    [order]
  );

  function handleSearch(event) {
    event.preventDefault();
    setOrder(undefined);
    setFilter(undefined);
    api
      .get(`/search/${search}`)
      .then((response) => {
        setProjects(response.data.projects);
        setCents(response.data.cents);
        setTotalCents(response.data.cents);
        let modes = ["todos"]
        modes.push(...response.data.modes)
        setTypes(modes);
        if (response.data.mens === "Student not found...") {
          window.alert("Ops... ID de anonimização inexistente!");
        } else {
          setSearchView(true);
        }
      })
      .catch((err) => {
        window.alert(`Algo deu errado... acesse http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt para conferir seus centavos da forma tradicional.
                    [${err}]`);
      });
  }

  return (
    <Container className="container">
      <header>
        <div className="menu">
          <Dropdown className="dropdown">
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
              <Dropdown.Item
                href="/analytics"
                className="drop-item"
              >
                <ImSearch/>
                CENTAVOS ANALYTICS
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

        <span
          title="Contagem relativa à filtragem aplicada"
          className="cents"
        >
          {projects?.length > 0
            ? `${cents} centavos acumulados`
            : ""}
        </span>
        <div className="form">
          {!searchView?<></>:<div className="filters"><Dropdown
            className="actionbar"
            onSelect={(k, e) => {
              const [key, direction] = k.split(":");
              const icon =
                direction === "asc" ? (
                  <ImSortAmountAsc />
                ) : (
                  <ImSortAmountDesc />
                );
              setOrder({
                key,
                direction,
                name: `${e.target.text}`,
                icon,
              });
            }}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="actionbar__select"
            >
              <Row>
                <span>
                  {order ? `${order.name}` : "Ordenar por"}{" "}
                  {order ? order.icon : ""}
                </span>
              </Row>
              <ChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu className="actionbar__menu">
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="cents:asc"
              >
                Centavos
                <ImSortAmountAsc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="cents:desc"
              >
                Centavos
                <ImSortAmountDesc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="date:asc"
              >
                Data
                <ImSortAmountAsc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="date:desc"
              >
                Data
                <ImSortAmountDesc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="description:asc"
              >
                Descrição
                <ImSortAmountAsc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="description:desc"
              >
                Descrição
                <ImSortAmountDesc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="mode:asc"
              >
                Ambiente
                <ImSortAmountAsc />
              </Dropdown.Item>
              <Dropdown.Item
                className="actionbar__menuItem"
                eventKey="mode:desc"
              >
                Ambiente
                <ImSortAmountDesc />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            className="actionbar"
            onSelect={(k, e) => {
              const [key] = k;
              setFilter({
                key,
                name: `${e.target.text}`,
              });
            }}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="actionbar__select"
            >
              <Row>
                <span>
                  {filter ? `${filter.name}` : "Filtrar por"}{" "}
                </span>
              </Row>
              <ChevronDown />
              <Dropdown.Menu className="actionbar__menu">
              {
                types.map((res) => { return(
                  <Dropdown.Item
                    className="actionbar__menuItem"
                    eventKey={`${res}`}
                  >
                    {res.toUpperCase()}
                  </Dropdown.Item>)
                })
              }
              </Dropdown.Menu>
            </Dropdown.Toggle>
          </Dropdown></div>}
          <form className="search-box" onSubmit={handleSearch}>
            <input
              placeholder="ID DE ANONIMIZAÇÃO"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <button type="submit" onClick={handleSearch}>
              <Search />
            </button>
          </form>
        </div>
      </header>
      <main>
          {projects?.length > 0
            ? handleOrder([...projects]).map((res) => {
                if (!filter) {
                  return(<Card
                    cents={res.cents}
                    date={res.date}
                    description={res.description}
                    mode={res.mode}
                    key={Math.random()}
                  />)
                } else if (filter.name === 'TODOS') {
                  return(<Card
                    cents={res.cents}
                    date={res.date}
                    description={res.description}
                    mode={res.mode}
                    key={Math.random()}
                  />)
                } else if (filter.name === res.mode.toUpperCase()) {
                  return(<Card
                    cents={res.cents}
                    date={res.date}
                    description={res.description}
                    mode={res.mode}
                    key={Math.random()}
                  />)
                }
            })
            : "Pesquise pelo seu ID DE ANONIMIZAÇÃO e confira suas atividades corrigidas e centavos acumulados na disciplina de LOAC."}
      </main>
      <Footer />
    </Container>
  );
};

export default Home;
