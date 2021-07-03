import axios from "axios";
import React, { useEffect, useState } from "react"
import {Container, Col} from 'react-bootstrap'
import Card from "../components/Card";
import {Search, DollarSign} from 'react-feather'

import "./styles.css"

const Home = () => {

  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [cents, setCents] = useState(0);
  const [situation, setSituation] = useState("");

  const api = axios.create({
    baseURL: "http://127.0.0.1:5000/"
  });

  useEffect(() =>{
    if (cents >= 700) {
      setSituation("APROVADE")
    } else {
      setSituation("NÃO APROVADE")
    }
  }, [search, list, cents])

  function handleSearch() {
    api.get(`/search/${search}`).then(
      (response) => {
        setList(response.data.projects)
        console.log(response.data)
        setCents(response.data.cents)
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
        <h3><DollarSign /> <span>CENTAVOS SEARCH</span></h3>
        <span>
          {
            list.length != 0 ? `${cents} centavos acumulados - ${situation}` : ""
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
        {list.length > 0 ?
          list.map((res) => {
            return(
              <Card cents={res.cents} date={res.date} description={res.description} mode={res.mode} key={res.description}/>
            );
          })
         : "Pesquise pelo seu ID DE ANONIMIZAÇÃO e confira suas atividades corrigidas e centavos acumulados na disciplina de LOAC."}
      </main>
    </Container>
  )
}

export default Home;