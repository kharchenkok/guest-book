import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";

import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { v4 as uuidv4 } from "uuid";

import { addMessageOperation,getMessagesOperation } from "../../redux/operations/messageOperations";
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
      setTimeout(() => setAlertEmpty(false), 1500);
      return;
    }
    const currentDate = new Date().toLocaleString();
    const newMessage = {
      name: name,
      message: message,
      date: currentDate,
      id: uuidv4(),
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

        <Button
          variant="contained"
          color="default"
          size="large"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send your message
        </Button>
      </form>
    </>
  );
};

export default MessageForm;
