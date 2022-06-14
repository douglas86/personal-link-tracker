import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import CategoryMap2 from "../../organism/CategoryMap2";
import { alert } from "../../atom/alert2";
import { spinner } from "../../atom/spinner2";

import { GetRoute } from "../../../API";
import { AlertContext } from "../../../Context/AlertContext";

const Home2 = () => {
  const { alerts } = useContext(AlertContext);
  const { show, color, message } = alerts;

  const fetcher = GetRoute("/api/category").data;

  return (
    <div>
      <Container>
        {show ? alert(color, message) : null}
        {fetcher ? <CategoryMap2 arr={Object.entries(fetcher)} /> : spinner()}
      </Container>
    </div>
  );
};

export default Home2;
