import axios from "axios";
import React, { useCallback, useEffect, useState } from "react"
import {Container, Dropdown, Row} from 'react-bootstrap'
import Card from "../components/Card";
import moment from 'moment';
import {Search, DollarSign, Heart, GitHub, Menu, ChevronDown } from 'react-feather';
import { ImArrowUp2, ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";
import { navigate } from 'gatsby';

import "./styles.css"

const Home = () => {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [cents, setCents] = useState(0);
  const [order, setOrder] = useState();
  const [situation, setSituation] = useState("");
  const [directionIcon, setDirectionIcon] = useState(<></>)

  const api = axios.create({
    baseURL: "https://centavos-search.herokuapp.com"
  });

  useEffect(() =>{

    document.title = "CENTAVOS SEARCH"

    if (cents >= 700) {
      setSituation("APROVADE")
    } else {
      setSituation("NÃO APROVADE")
    }
    
  }, [search, projects, cents, order]);

  const navigateHome = useCallback(()=>{
    setProjects([]);
    setOrder(undefined);
    navigate('/');
  }, [setProjects, setOrder, navigate]);

  const handleOrder = useCallback((array)=>{
    if(order) {
      return array.sort((p1, p2) => {
        let firstElement = p1[order.key];
        let secondElement = p2[order.key];
        // se for date, é necessário tratá-lo antes
        if(order.key === 'date'){
          firstElement = moment(p1.date, 'DD-MM');
          secondElement = moment(p2.date, 'DD-MM');
        }
        if(order.direction === 'asc'){
          return (
            firstElement < secondElement ? -1 : 
            firstElement > secondElement ?  1 :
            0
          )
        } else {
          return (
            firstElement < secondElement ?  1 : 
            firstElement > secondElement ? -1 :
            0
          )
        }
      }
      );
    }
    return array;
  }, [order]);

  function handleSearch(event) {
    event.preventDefault();
    setOrder(undefined);
    api.get(`/search/${search}`).then(
      (response) => {
          setProjects(response.data.projects)
          setCents(response.data.cents)

          if (response.data.mens == 'Student not found...') {
            window.alert("Ops... ID de anonimização inexistente!")
          }

      }
    ).catch(
      (err) => {
        window.alert(`Algo deu errado... acesse http://lad.ufcg.edu.br/loac/uploads/OAC/anon.txt para conferir seus centavos da forma tradicional.
                    [${err}]`)
      }
    )
  }

  return(
    <Container className="container">
      <header>

      <div className="menu">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="menu-dropdown">
            <Menu/>
          </Dropdown.Toggle>

          <Dropdown.Menu className="drop">
            <Dropdown.Item target="_blank" href="https://github.com/MariaEduardaDeAzevedo/centavos-search" className="drop-item">Contibua no GitHub <GitHub/></Dropdown.Item>
            <Dropdown.Item target="_blank" href="https://mariaeduardadeazevedo.github.io/" className="drop-item">Sobre quem desenvolveu...</Dropdown.Item>
            <Dropdown.Item target="_blank" href="http://lad.ufcg.edu.br/loac/" className="drop-item">Site de LOAC</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <h3 onClick={navigateHome}><DollarSign /> <span>CENTAVOS SEARCH</span></h3>
      </div>
      
        <span title="A anotação do professor não deixa claro os descontos dados" className="cents">
          {
            projects?.length > 0 ? `Aproximadamente ${cents} centavos acumulados - ${situation}` : ""
          }
        </span>
        <div className="form">
        <Dropdown className="actionbar" onSelect={(k, e)=>{
            const [key, direction] = k.split(':');
            const icon = direction === 'asc' ? <ImSortAmountAsc /> : <ImSortAmountDesc />
            setOrder({key, direction, name: `${e.target.text}`, icon});
          }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="actionbar__select">
              <Row>
                <span>{ order ? `${order.name}` : 'Ordenar por'} {order ? order.icon : ""}</span>
              </Row>
              <ChevronDown />
            </Dropdown.Toggle>

            <Dropdown.Menu className="actionbar__menu">
              <Dropdown.Item className="actionbar__menuItem" eventKey="cents:asc">Centavos <ImSortAmountAsc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="cents:desc">Centavos <ImSortAmountDesc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="date:asc">Data <ImSortAmountAsc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="date:desc">Data <ImSortAmountDesc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="description:asc">Descrição <ImSortAmountAsc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="description:desc">Descrição <ImSortAmountDesc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="mode:asc">Ambiente <ImSortAmountAsc /></Dropdown.Item>
              <Dropdown.Item className="actionbar__menuItem" eventKey="mode:desc">Ambiente <ImSortAmountDesc /></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <form className="search-box" onSubmit={handleSearch}>
            <input placeholder="ID DE ANONIMIZAÇÃO" onChange={(event) => {setSearch(event.target.value)}} />
            <button type="submit" onClick={handleSearch}>
              <Search/>
            </button>
          </form>
        </div>
      </header>
      <main>
      {projects?.length > 0 ?
          handleOrder([...projects]).map((res, index) => {
            return(
              <Card cents={res.cents} date={res.date} description={res.description} mode={res.mode} key={index}/>
            );
          })
         : "Pesquise pelo seu ID DE ANONIMIZAÇÃO e confira suas atividades corrigidas e centavos acumulados na disciplina de LOAC."}
      </main>
      <footer>
        <a href="#top" className="top-back">Voltar ao topo <ImArrowUp2 /></a>
        <span>Feito com Gatsby e <Heart className="heart"/> por <a target="_blank" href="https://mariaeduardadeazevedo.github.io">Maria Eduarda de Azevedo © 2021</a></span>
        <a target="_blank" className="github" href="https://github.com/MariaEduardaDeAzevedo/centavos-search">Contribua no GitHub <GitHub /></a>
      </footer>
    </Container>
  )
}

export default Home;