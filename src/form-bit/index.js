import React, {Component} from "react";
import { setObjectValue, setProps, getProps, maxLength, minLength, required } from "./fnUtils"

export default class FormBit extends Component {
constructor(props){
    super(props);
    this.state = {values: {}, childrens: this.props.children, send: false};
}
componentDidMount() {
    let childrens = setProps(this.props.children, {name: "handleField", value: (name, value) => this.handleField(name, value)});
    this.setState({childrens})
}
componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.send === true && this.state.send === false)
        this.validate()
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
            if(child.props.minLength) {
                if(this.setError(required(child.props.value), child.props.name, "required"))
                    haveError = true;
            }
            return true;
        });
    }
    if (!haveError) {
        this.props.submit(this.state.values);
        this.setState({send: true});
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

    let childrens = setProps(this.state.childrens, {name: "value", value});
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