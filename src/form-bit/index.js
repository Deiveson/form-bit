import React, {Component} from "react";
import {setObjectValue, setProps, maxLength, minLength, required, getObjectValue} from "./fnUtils"

export default class FormBit extends Component {
constructor(props){
    super(props);
    this.state = {values: this.props.initialValues || {} , childrens: this.props.children, send: false};
}
componentWillMount() {
    let childrens = this.state.childrens.map(child => ({
        ...child,
        props: {...child.props, handleField: (name, value) => this.handleField(name, value), value: getObjectValue(this.state.values, child.props.name? child.props.name.split("."): []) || ""}
    }));
    this.setState({childrens})
}

validate(){
    let {childrens} = this.state;
    let errors = false;

    if(childrens.length < 1)
        return false;
    if(childrens.map){
        childrens = childrens.map(child => {
            let error = "";
            if(child.props.maxLength) {
                error = maxLength(child.props.value, child.props.maxLength);
                if(error) {
                    errors = true;
                    return {...child, props: {...child.props, error}};
                }
            }
            if(child.props.minLength) {
                error = minLength(child.props.value, child.props.minLength);
                if(error) {
                    errors = true;
                    return {...child, props: {...child.props, error}};
                }
            }
            if(child.props.required) {
                error = required(child.props.value, child.props.maxLength);
                if(error) {
                    errors = true;
                    return {...child, props: {...child.props, error}};
                }
            }
            return child;
        });
    }
    if(!errors){
        this.props.submit(this.state.values);
    } else {
        this.setState({childrens});
    }
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