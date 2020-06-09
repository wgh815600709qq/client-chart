import React from 'react';
import { Table, Tag, Space } from 'antd';
import {useState, useEffect, useCallback} from 'react';

function Tables() {
    const [data, setData] = useState([])
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
        {
            title: 'random_string',
            key: 'random_string',
            dataIndex: 'random_string',
        },
        {
            title: 'url',
            key: 'url',
            dataIndex: 'url'
        },
        {
            title: 'user_id',
            key: 'user_id',
            dataIndex: 'user_id'
        },
        {
            title: 'user_agent',
            key: 'user_agent',
            dataIndex: 'user_agent'
        },
        {
            title: 'sign',
            key: 'sign',
            dataIndex: 'sign'
        },       
    ];

    useEffect(() => {
        fetch('http://localhost:8989/logs/queryAll', {
            headers: {'Content-Type': 'application/json'},
            mode: 'cors',
            method: 'GET'
        })
        .then((res) => { return res.json() })
        .then(response => {
            console.log('data', response.data)
            setData(response.data)
            // this.setState({historydata:data});
        })
    }, [])

    return <Table columns={columns} dataSource={data} />
}

export default Tables