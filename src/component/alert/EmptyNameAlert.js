import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import style from "./AlertStyles.module.css";

export default class EmptyNameAlert extends Component {
  render() {
    const { alert,field } = this.props;
    return (
      <CSSTransition in={alert} classNames={style} timeout={600} unmountOnExit>
        <div className={style.alert}>{field} is empty! Enter this field</div>
      </CSSTransition>
    );
  }
}
