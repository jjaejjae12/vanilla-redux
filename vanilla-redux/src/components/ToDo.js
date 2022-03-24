import React from "redux";
import { connect } from "react-redux"
import { actionCreators } from "../store";
import { Link } from "react-router-dom"

function ToDo({ text, onBtnClick, id }) {
    return (    
        <li>
            <Link to={`/${id}`}>
                {text}
            </Link>
            <button onClick={onBtnClick}>DEL </button>
        </li>
    )
}


function mapDispatchProps(dispatch, ownProps) {
    return {
        onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    }
}

export default connect(null, mapDispatchProps)(ToDo);