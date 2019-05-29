import React, {Component} from "react";
import {setObjectValue, setProps, getProps, maxLength, minLength, required, getObjectValue} from "./fnUtils"

export default class FormBit extends Component {
constructor(props){
    super(props);
    this.state = {values: this.props.initialValues || {} , childrens: this.props.children, send: false};
}
componentDidMount() {
    let childrens = this.state.childrens.map(child => ({
        ...child,
        props: {...child.props, handleField: (name, value) => this.handleField(name, value), value: getObjectValue(this.state.values, child.props.name? child.props.name.split("."): [])}
    }));

    this.setState({childrens})
}

validate(){
    let {childrens} = this.state;
    let haveError = false;

    if(childrens.length < 1)
        return false;
    if(childrens.map){
        childrens.map(child => {
            if(child.props.maxLength) {
                if(this.setError(maxLength(child.props.value, child.props.maxLength), child.props.name, "maxLength"))
                    haveError = true;
            }
            if(child.props.minLength) {
                if(this.setError(minLength(child.props.value, child.props.minLength), child.props.name, "minLength"))
                    haveError = true;
            }
            if(child.props.required) {
                if(this.setError(required(child.props.value), child.props.name, "required"))
                    haveError = true;
            }
            return true;
        });
    }
    if (!haveError) {
        this.props.submit(this.state.values);
    }
}

setError(error, name, type){
    if(error){
        let nextErrors = getProps(this.state.childrens, "error", name) || {};
        nextErrors[type] = error;
        let childrens = setProps(this.state.childrens, {name: "error", value: nextErrors}, name);
        this.setState({childrens});
        return true;
    }
    return false;
}

handleSubmit(e) {
    e.preventDefault();
    this.validate()
}

handleField(name, value){
    let localValues = setObjectValue(name.split("."), value, this.state.values);
    this.setState({values: localValues});

    let childrens = setProps(this.state.childrens, {name: "value", value}, name);
    this.setState({childrens});

}

render() {
    return(
        <form onSubmit={ e => this.handleSubmit(e)}>
            {this.state.childrens}
        </form>
    );
}
}