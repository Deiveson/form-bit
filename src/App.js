import React, {Component} from 'react';
import FormBit from "./form-bit"
import Input from "./input"
import InputComplete from "./InputComplete";
import InputRange from "./input-range";
class App extends Component{
    render() {
        return (
            <div className="App">
                <FormBit submit={(values)=> {console.log(values)}} initialValues={{name: "Deie", lastName: "Br", address: {street: "Calado"}}} >
                    {/*<Input title="Nome" name="name" minLength={"2"}/>*/}
                    {/*<Input title="Sobrenome" name="lastName" maxLength={"2"} />*/}
                    {/*<Input title="Rua" name="address.street" required/>*/}
                    {/*<Input title="Número" name="address.number" required minLength={"3"} maxLength={"4"}/>*/}
                    {/*<InputComplete options={[{label: "Qualquer Marca", value:"any_brand"}]} name={"brand"}/>*/}
                    <InputRange min={100} max={5000} />
                    <button type="submit">
                        Enviar
                    </button>
                </FormBit>
            </div>
        );
    }
}

export default App;
