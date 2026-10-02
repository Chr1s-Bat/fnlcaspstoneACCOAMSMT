import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

export default function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [operations, setOperations] = useState([]);
    const [form, setForm] = useState({ directive_name: '', domain_type: 'Trading', details: '', execution_date: '' });

    useEffect(() => {
        if (token) {
            fetchOperations();
        }
    }, [token]);

    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOperations = async() => {
        const res = await fetch(`${API_URL}/operations`, {
            headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (res.ok) setOperations(json.data);
    };

    const handleAddOperation = async(e) => {
        e.preventDefault();
        const res = await fetch(`${API_URL}/operations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            fetchOperations();
            setForm({ directive_name: '', domain_type: 'Trading', details: '', execution_date: '' });
        }
    };

    const handleLogout = async() => {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        });
        localStorage.removeItem('token');
        setToken('');
    };

    if (!token) {
        return ( <
            div className = "p-8 max-w-md mx-auto" >
            <
            h2 className = "text-xl font-bold mb-4" > ACCOAMSMT Terminal Login < /h2> <
            form onSubmit = { handleLogin }
            className = "flex flex-col gap-3" >
            <
            input type = "email"
            placeholder = "Email"
            value = { email }
            onChange = { e => setEmail(e.target.value) }
            className = "p-2 border rounded" / >
            <
            input type = "password"
            placeholder = "Password"
            value = { password }
            onChange = { e => setPassword(e.target.value) }
            className = "p-2 border rounded" / >
            <
            button type = "submit"
            className = "bg-slate-800 text-white p-2 rounded" > Authenticate < /button> <
            /form> <
            /div>
        );
    }

    return ( <
        div className = "p-8 max-w-4xl mx-auto" >
        <
        div className = "flex justify-between items-center mb-6" >
        <
        h1 className = "text-2xl font-black" > Absolute Cease & Control Dashboard < /h1> <
        button onClick = { handleLogout }
        className = "bg-red-600 text-white px-4 py-2 rounded" > Logout < /button> <
        /div>

        <
        form onSubmit = { handleAddOperation }
        className = "bg-gray-100 p-4 rounded mb-6 flex flex-col gap-3" >
        <
        h3 className = "font-bold" > Register New Strategic Directive < /h3> <
        input type = "text"
        placeholder = "Directive Name"
        value = { form.directive_name }
        onChange = { e => setForm({...form, directive_name: e.target.value }) }
        className = "p-2 border rounded"
        required / >
        <
        select value = { form.domain_type }
        onChange = { e => setForm({...form, domain_type: e.target.value }) }
        className = "p-2 border rounded" >
        <
        option > Military < /option> <
        option > Smuggling < /option> <
        option > Psyop < /option> <
        option > Marketing < /option> <
        option > Trading < /option> <
        /select> <
        input type = "date"
        value = { form.execution_date }
        onChange = { e => setForm({...form, execution_date: e.target.value }) }
        className = "p-2 border rounded"
        required / >
        <
        button type = "submit"
        className = "bg-green-600 text-white p-2 rounded" > Submit Directive < /button> <
        /form>

        <
        div className = "grid gap-3" > {
            operations.map(op => ( <
                div key = { op.id }
                className = "p-4 border rounded shadow flex justify-between items-center" >
                <
                div >
                <
                h4 className = "font-bold" > { op.directive_name } < span className = "text-sm text-blue-600" > [{ op.domain_type }] < /span> <
                /h4> <
                p className = "text-sm text-gray-600" > Execution: { op.execution_date } < /p> <
                /div> <
                span className = { `px-2 py-1 text-xs rounded ${op.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-850'}` } > { op.is_active ? 'ACTIVE COMMAND' : 'CEASED' } <
                /span> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
}
