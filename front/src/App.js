import React, { useState, useEffect } from 'react'
import logo from "./logo.png"
import './App.css';

function App() {

    const [data, setData] = useState([{}])

    useEffect(() => {
        fetch("/table").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    }, [])

    return (
        <div>
            <img src={logo} alt="Logo"/>
            <p></p>
            {(typeof data.all_rows === 'undefined') ? (
                <p> Undefined! </p>
            ) : (
                    <table>
                        <tr>
                            <th style={{ fontSize: 50 }}>TOTAL</th>
                        </tr>
                        <tr>
                            <td style={{ fontSize: 100 }}>{data.all_rows.reduce((a,v) =>  a = a + v[2] , 0 )}</td>
                        </tr>
                    </table>
            )}
            <p></p>
            {(typeof data.all_rows === 'undefined') ? (
                <p> Undefined! </p>
            ) : (
                    <table>
                        <tr>
                            <th>№</th>
                            <th>заказ №</th>
                            <th>стоимость,$</th>
                            <th>стоимость в руб.</th>
                            <th>срок поставки</th>
                        </tr>
                        {data.all_rows.map((row, key) => {
                            return (
                                <tr key={key}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{row[2]}</td>
                                    <td>{row[3]}</td>
                                    <td>{row[4]}</td>
                                </tr>
                            )
                            })
                        }
                    </table>
            )}
        </div>
    )
}

export default App
