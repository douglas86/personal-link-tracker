import { makeStyles } from "@material-ui/core";

export const categoryStyles = makeStyles(() => ({
  root: {
    display: "inline-block",
  },
  molecule: {
    cards: {
      width: "20px",
      height: "12px",
      padding: "2%",
    },
    container: {
      display: "flex",
      border: "2px solid #3291a8",
      borderRadius: "10px",
    },
  },
}));
