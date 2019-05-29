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
                <FormBit submit={(values)=> {console.log(values)}}>
                    <Input title="Nome" name="name" maxLength={"4"} />
                    <Input title="Sobrenome" name="lastName" maxLength={"2"} />
                    <Input title="Rua" name="address.street" required/>
                    <Input title="Número" name="address.number" required />
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
