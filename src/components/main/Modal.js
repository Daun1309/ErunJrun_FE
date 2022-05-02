import React, { useState } from 'react';
import { history } from '../../redux/configureStore';
import "../../shared/Modal.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Modal = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    };

    return (
        <div>
            <button
            className="btn-modal"
            onClick = {toggleModal}>
                <FaUser/> 
            </button>

            {modal && (
                <div className="madal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <p onClick={() => {history.push("/mypage");}}>
                            마이 페이지</p>
                        <p onClick={() => {}}>
                            계정 설정</p>
                        <hr/>
                        <p onClick={() => {}}>로그아웃</p>
                        <button
                        className="close-modal"
                        onClick = {toggleModal}>
                            <AiOutlineClose/>
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default Modal;
