import React, {Fragment} from 'react';

const Input = props => {
        return (
            <Fragment>
                <label>
                    {props.title}:
                    <input type="text" name={props.name} onChange={ e => props.handleField(props.name, e.target.value)} value={props.value}/>
                </label><br />
            </Fragment>
        )
};

export default Input;