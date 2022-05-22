import React, {useEffect, useState} from 'react';
import {Bar, Line} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'
import {Button} from "react-bootstrap";

const BarChart = ({err_stat}) => {
    const [data_element, setDataElement] = useState([])

    const fill_labels = () => {
        console.log(data_element.labels)
    }

    const Bar_data = {
        labels: data_element.labels,
        datasets: [{
            axis: 'y',
            label: 'Все отказы',
            data: data_element.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    }
    const options = {
        maintainAspectRatio: false,

    }

    useEffect(()=>{
        setDataElement(err_stat)
    },[])
    return (
        <div>
            <div>
                <Bar
                    data={Bar_data}
                    height={400}
                    options={options}
                />
            </div>
        </div>
    );
};

export default BarChart;