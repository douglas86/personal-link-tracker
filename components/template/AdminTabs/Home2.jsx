import React, { useContext } from "react";
import { Container } from "react-bootstrap";

import CategoryMap from "../../organism/CategoryMap";
import { alert } from "../../atom/alert";
import { spinner } from "../../atom/spinner";

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
        {fetcher ? <CategoryMap arr={Object.entries(fetcher)} /> : spinner()}
      </Container>
    </div>
  );
};

export default Home2;
