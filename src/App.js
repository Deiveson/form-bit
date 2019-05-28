import React, {Component, Fragment} from 'react';
import FormBit from "./form-bit"
import Input from "./input"
class App extends Component{
    constructor(props){
        super(props);
        this.state = {submit: false}
    }

    render() {
        return (
            <div className="App">
                <FormBit submit={(values)=> {console.log(values)}} send={this.state.submit}>
                    <Input title="Nome" name="name" minLength="3" required />
                    <Input title="Sobrenome" name="lastName" required />
                    <Input title="Rua" name="address.street" required/>
                    <Input title="Número" name="address.number" required />
                    <Fragment>
                        <button onClick={() => this.setState({submit: true})}>
                            Enviar
                        </button>
                    </Fragment>
                </FormBit>
            </div>
        );
    }
}

export default App;
