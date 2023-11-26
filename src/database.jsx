import {useEffect, useState} from "react";

const {Client} = require('pg');

const Databse = (query) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const client = new Client({
                host: 'localhost',
                user:'postgres',
                port: 5432,
                password: '3001',
                database: 'postgres'
            });
            try {
                await client.connect();
                const res = await client.query(query);
                setData(res.rows);
            }catch (err){
                setError(err);
            }finally {
                client.end();
            }
        }
        fetchData();
    }, [query]);
    return {data, error};
};


export default Databse;
