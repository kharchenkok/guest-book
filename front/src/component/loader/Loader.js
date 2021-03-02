import React from 'react';
import Loader from 'react-loader-spinner'
import style from './Loader.module.css'

const LoaderSpiner = () => {
    return (
        <Loader
        className={style.loader}
         type="Circles"
         color="#f50057"
         height={100}
         width={100}
         timeout={3000} //3 secs
 
      />
    );
};

export default LoaderSpiner;
