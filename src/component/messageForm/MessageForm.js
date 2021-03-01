import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

import {
  addMessageOperation,
  getMessagesOperation,
} from "../../redux/operations/messageOperations";
import EmptyNameAlert from "../alert/EmptyNameAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const initialState = {
  name: "",
  message: "",
};

const MessageForm = () => {
  const [formMessage, setFormMessage] = useState(initialState);
  const [alertEmpty, setAlertEmpty] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getLocalStorageData = localStorage.getItem("message");
    getLocalStorageData && setFormMessage(JSON.parse(getLocalStorageData));
    dispatch(getMessagesOperation());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("message", JSON.stringify(formMessage));
  }, [formMessage]);

  const handleFormSubmit = (e) => {
    const { name, message } = formMessage;

    e.preventDefault();

    if (name.length === 0 || message.length === 0) {
      setAlertEmpty(true);
      setTimeout(() => setAlertEmpty(false), 1000);
      return;
    }
    const currentDate = new Date().toLocaleString();
    const newMessage = {
      name: name,
      message: message,
      date: currentDate,
    };

    dispatch(addMessageOperation(newMessage));
    setFormMessage(initialState);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormMessage({ ...formMessage, [name]: value });
  };
  const classes = useStyles();

  return (
    <>
      <EmptyNameAlert
        alert={alertEmpty}
        field={formMessage.name.length ? "Message" : "Name"}
      />

      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleFormSubmit}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          name="name"
          variant="outlined"
          value={formMessage.name}
          onChange={handleChange}
          required
        />

        <TextField
          id="outlined-multiline-static"
          label="Message"
          name="message"
          value={formMessage.message}
          multiline
          rows={4}
          variant="outlined"
          required
          onChange={handleChange}
        />

        <ColorButton
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send your message
        </ColorButton>
      </form>
    </>
  );
};

export default MessageForm;
