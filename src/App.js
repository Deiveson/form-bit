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
                <FormBit submit={(values)=> {console.log(values)}} initialValues={{name: "Deie", lastName: "Br", address: {street: "Calado"}}}>
                    <Input title="Nome" name="name" minLength={"2"}/>
                    <Input title="Sobrenome" name="lastName" maxLength={"2"} />
                    <Input title="Rua" name="address.street" required/>
                    <Input title="Número" name="address.number" required minLength={"3"}/>
                    <Fragment>
                        <button type="submit">
                            Enviar
                        </button>
                    </Fragment>
                </FormBit>
            </div>
        );
    }
}

export default App;
