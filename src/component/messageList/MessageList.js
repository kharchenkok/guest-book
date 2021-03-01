import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoaderSpiner from "../loader/Loader";

import style from "./MessageList.module.css";

const MessageList = () => {
  const messagesData = useSelector((state) => state.messages);
  const loader = useSelector((state) => state.loader);

  return (
    <div className={style.messagelist__wrapper}>
      <h2 className={style.messagelist__title}>Guest messages:</h2>
      {loader && <LoaderSpiner />}
      <TransitionGroup component="ul" className={style.messagelist__list}>
        {messagesData.map((elem, index) => (
          <CSSTransition
            key={elem.id}
            in={messagesData.length > 0}
            timeout={250}
            classNames={style}
          >
            <li className={style.messagelist__item}>
              <p className={style.messagelist__style}>
                {index + 1 + "."}
                <span className={style.messagelist__name}>{elem.name}</span>
                <span className={style.messagelist__date}>({elem.date})</span>
              </p>
              <p className={style.messagelist__style}>"{elem.message}"</p>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default MessageList;
