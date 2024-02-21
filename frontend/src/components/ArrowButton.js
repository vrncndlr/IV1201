import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const ArrowButton = ({ direction, type }) => {
    return (
        <button className={`arrow-button ${direction}`}>
            <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} />
        </button>
    );
};
export default ArrowButton;
