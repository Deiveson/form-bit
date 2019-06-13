import React, {Component, Fragment} from 'react';

class Input extends Component{
    render(){
        return (
            <Fragment>
                <label>
                    {this.props.title}:
                    <input type="text"
                           name={this.props.name} value={this.props.value} disabled={this.props.disabled}
                           onChange={e => this.props.handleField(this.props.name, e.target.value)}/>
                           <span>{this.props.error}</span>
                </label><br />
            </Fragment>
        )}
};

export default Input;