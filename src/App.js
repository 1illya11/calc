
import * as math from "mathjs";

import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "./components/Button"
import Input from "./components/Input"

//mongodb+srv://reservcars:123456iI@cluster0.simyqc9.mongodb.net/calculator

const App = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState("");

    const addToText = (val) => {
        setText((text) => [...text, val + ""]);
    };

    const calculateResult = () => {
        const input = text.join(""); // Remove commas
        console.log(input);
         if(input.includes("sqrt")){
             const result =math.sqrt(input.slice(4))
            setResult(result.toFixed(3));
        }
        else if(input.includes("ln")){

            console.log(math.log10(input.slice(2)));
            const result = math.log10(input.slice(2));
            setResult(result.toFixed(3));
        }
        else{
            setResult(math.evaluate(input));
            console.log(input);
        }
    };

    const resetInput = () => {
        setText("");
        setResult("");
    };

    const buttonColor = "#f2a33c";

    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getHistory")
            .then(response => setItems(response.data))
            .catch(error => console.error(error));
    }, []);

    console.log(items);


    return (
        <div className="App">
            <div className="calc-wrapper">
                <Input text={text} result={result} />
                <div className="row">
                    <Button symbol="7" handleClick={addToText} />
                    <Button symbol="8" handleClick={addToText} />
                    <Button symbol="9" handleClick={addToText} />
                    <Button symbol="/" color={buttonColor} handleClick={addToText} />
                    <Button symbol="^2" color={buttonColor} handleClick={addToText} />
                </div>
                <div className="row">
                    <Button symbol="4" handleClick={addToText} />
                    <Button symbol="5" handleClick={addToText} />
                    <Button symbol="6" handleClick={addToText} />
                    <Button symbol="*" color={buttonColor} handleClick={addToText} />
                    <Button symbol="sqrt" color={buttonColor} handleClick={addToText} />
                </div>
                <div className="row">
                    <Button symbol="1" handleClick={addToText} />
                    <Button symbol="2" handleClick={addToText} />
                    <Button symbol="3" handleClick={addToText} />
                    <Button symbol="+" color={buttonColor} handleClick={addToText} />
                    <Button symbol="ln" color={buttonColor} handleClick={addToText} />
                </div>
                <div className="row">
                    <Button symbol="0" handleClick={addToText} />
                    <Button symbol="." handleClick={addToText} />
                    <Button symbol="=" handleClick={calculateResult} />
                    <Button symbol="-" color={buttonColor} handleClick={addToText} />
                </div>
                <Button symbol="Clear" color="red" handleClick={resetInput} />
            </div>
        </div>
    );
};

export default App;