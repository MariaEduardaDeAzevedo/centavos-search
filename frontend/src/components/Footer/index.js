import * as React from "react";
import { ImArrowUp2 } from "react-icons/im";
import { Heart, GitHub } from "react-feather"

const Footer = () => (
  <footer>
    <a href="#top" className="top-back">
      Voltar ao topo
      <ImArrowUp2 />
    </a>
    <span>
      Feito com Gatsby e <Heart className="heart" /> por{" "}
      <a
        target="_blank"
        href="https://mariaeduardadeazevedo.github.io"
        rel="noreferrer"
      >
        Maria Eduarda de Azevedo © 2021
      </a>
    </span>
    <a
      target="_blank"
      className="github"
      href="https://github.com/MariaEduardaDeAzevedo/centavos-search"
      rel="noreferrer"
    >
      Contribua no GitHub
      <GitHub />
    </a>
  </footer>
);

export default Footer;
