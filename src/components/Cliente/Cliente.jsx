import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const Cliente =()=>{
    let{id} = useParams();

    const [clientes, setClientes]=useState({
        id,
        nome:"",
        email:""
    })

    const handleChange=(e)=>{
        setClientes({...clientes,[e.target.name]:e.target.value})};

    const handleSubmit =(e)=>{
        e.preventDefault();
        fetch(`http://localhost:5000/clientes/${id ? id :""}`,{
            method:"post",
            headers:{
                'Content-Type': "application/json"
            },
            body:JSON.stringify(clientes)
        }).then(()=>{
            navigate("/")
        })      
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:5000/clientes/${id}`)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                setClientes(data)
            })
        }
    },[id])

    return(
        <>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    placeholder="Insira seu nome"
                    value={clientes.nome}
                    onChange={handleChange}
                    />
            </p>
            <p>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Insira seu e-mail"
                    value={clientes.email}
                    onChange={handleChange}
                />
            </p>
            <button type="submit">Cadastrar</button>
        </form>
        </>
    )
}

export default Cliente