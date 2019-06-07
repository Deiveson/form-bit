import React, {Fragment} from 'react';

const Input = props => {
        return (
            <Fragment>
                <label>
                    {props.title}:
                    <input type="text" name={props.name} value={props.value} onChange={ e => props.handleField(props.name, e.target.value)}/><span>{props.error}</span>
                </label><br />
            </Fragment>
        )
};

export default Input;