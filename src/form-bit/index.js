import React, {Component} from "react";
import {maxLength, minLength, required, setObjectValue} from "./fnUtils"

export default class FormBit extends Component {
constructor(props){
    super(props);
    this.state = {values: {}, errors: {}};
}

validate(e){
    e.preventDefault();
    let childrens = this.props.children;
    let errors = {};
    let otherErrors = false;

    if(childrens.length < 1)
        return false;
    if(childrens.map){
        childrens.map(child => {
            if(child.props.maxLength) {
                let  error = maxLength(this.state.values[child.props.name], child.props.maxLength);
                if(error) {
                    errors = {...errors, [child.props.name]:error};
                    otherErrors = true;
                } else if(!otherErrors) {
                    errors = {...errors, [child.props.name]: false}
                }
            }
            if(child.props.required) {
                let error = required(this.state.values[child.props.name], child.props.maxLength);
                if(error) {
                    errors = {...errors, [child.props.name]:error};
                    otherErrors = true;
                } else if(!otherErrors) {
                    errors = {...errors, [child.props.name]: false}
                }
            }
            if(child.props.minLength) {
                let error = minLength(this.state.values[child.props.name], child.props.minLength);
                if(error) {
                    errors = {...errors, [child.props.name]:error};
                    otherErrors = true;
                } else if(!otherErrors) {
                    errors = {...errors, [child.props.name]: false}
                }
            }
            return true;
        });
        this.setState({errors: {...this.state.errors, ...errors}});
    }
    if(!otherErrors){
        this.handleSubmit();
    }
}

handleSubmit() {
    let values = {};
    for(let key in this.state.values){
        values = setObjectValue(key.split("."), this.state.values[key], values);
    }
    console.log(values);
}

handleField(name, value){
    this.setState({values: {...this.state.values, [name]: value}})
}

drawFrom(childrens){
   return childrens.map(child => {
       if(child.props.name){
           return {
               ...child,
               props: {
                   ...child.props,
                   handleField: (name, value) => this.handleField(name, value),
                   value: this.state.values[child.props.name] || "",
                   error: this.state.errors[child.props.name]
               }
           }
       } else return child;
   });
}

render() {
    return(
        <form onSubmit={ e => this.validate(e)}>
            {this.drawFrom(this.props.children)}
        </form>
    );
}
}