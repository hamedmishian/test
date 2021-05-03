import makeStyles from "@material-ui/core/styles/makeStyles";

export default makeStyles(theme => ({
  test: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(#111111, #575757)",
    position: "relative"
  },
  addBtn: {
    width: "60px",
    height: "60px",
    backgroundColor: "red",
    borderRadius: "50%",
    position: "absolute",
    bottom: "10px",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    "&:hover": {
      backgroundColor: "tomato"
    }
  },
  userBox: {
    border: "1px solid gray",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "5px",
    margin: "1px",
    cursor: "grab"
  },
  boxContainer: {
    height: "90%",
    paddingLeft: "50px",
    paddingRight: "50px",
    paddingBottom: "50px"
  }
}));
