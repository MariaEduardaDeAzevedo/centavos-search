import axios from "axios";
import React, { useEffect, useState } from "react"
import {Container, Dropdown} from 'react-bootstrap'
import Card from "../components/Card";
import {Search, DollarSign, Heart, GitHub, Menu} from 'react-feather'

import "./styles.css"

const Home = () => {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [cents, setCents] = useState(0);
  const [situation, setSituation] = useState("");

  const api = axios.create({
    baseURL: "https://centavos-search.herokuapp.com"
  });

  useEffect(() =>{
    if (cents >= 700) {
      setSituation("APROVADE")
    } else {
      setSituation("NÃO APROVADE")
    }
  }, [search, projects, cents])

  function handleSearch() {
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

        <h3><DollarSign /> <span>CENTAVOS SEARCH</span></h3>
      </div>
      
        <span>
          {
            projects?.length > 0 ? `${cents} centavos acumulados - ${situation}` : ""
          }
        </span>
        <div className="form">
          <input placeholder="ID DE ANONIMIZAÇÃO" onChange={(event) => {setSearch(event.target.value)}} />
          <button onClick={() => {handleSearch()}}>
            <Search/>
          </button>
        </div>
      </header>

      <main>
        {projects?.length > 0 ?
          projects.map((res) => {
            return(
              <Card cents={res.cents} date={res.date} description={res.description} mode={res.mode} key={res.description}/>
            );
          })
         : "Pesquise pelo seu ID DE ANONIMIZAÇÃO e confira suas atividades corrigidas e centavos acumulados na disciplina de LOAC."}
      </main>
      <footer>
        <span>Feito com Gatsby e <Heart className="heart"/> por <a target="_blank" href="https://mariaeduardadeazevedo.github.io">Maria Eduarda de Azevedo © 2021</a></span>
        <a target="_blank" className="github" href="https://github.com/MariaEduardaDeAzevedo/centavos-search">Contribua no GitHub <GitHub /></a>
      </footer>
    </Container>
  )
}

export default Home;