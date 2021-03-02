// import React from "react";
import React from "react";

import Layout from "../layout/Layout";
import MessageForm from "../messageForm/MessageForm";
import MessageList from "../messageList/MessageList";

const GuestBook = () => {
  return (
    <Layout>
      <MessageForm />
      <MessageList />
    </Layout>
  );
};

export default GuestBook;