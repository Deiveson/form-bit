import React, {Component} from "react";
import Range from 'react-input-range';
import "react-input-range/lib/css/index.css"

export default class InputRange extends Component {
    constructor(props){
        super(props);
        this.state = {value: { min: 0, max: 1000 }}
    }
    render() {
        return (
            <div style={{margin: "0 auto", width: "40vw", paddingTop: "15vh"}}>
                <Range
                    step={50}
                    formatLabel={value => `R$${value}`}
                    maxValue={this.props.max}
                    minValue={this.props.mix}
                    value={this.state.value}
                    onChange={value => this.setState({ value })} />
            </div>
        );
    }
}