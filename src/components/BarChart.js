import React, {useEffect, useState} from 'react';
import {Bar, Line} from "react-chartjs-2";
import {Chart as ChartJs} from 'chart.js/auto'
import {Button} from "react-bootstrap";

const BarChart = ({err_full_stat, err_archive_stat}) => {
    const [dataFullelement, setDataFullElement] = useState([])
    const [dataArchelement, setDataArchElement] = useState([])

    const fill_labels = () => {
        console.log(dataFullelement.labels)
    }

    const Bar_data = {
        labels: dataFullelement.labels,
        datasets: [{
            axis: 'y',
            label: 'Все отказы',
            data: dataFullelement.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        },
            {
                axis: 'y',
                label: 'Завершенные заявки',
                data: dataArchelement.data,
                backgroundColor: [
                    'rgba(27,110,8,0.2)'
                ],
                borderColor: [
                    'rgb(27,110,8)'
                ],
                borderWidth: 1
            }
        ]
    }
    const options = {
        maintainAspectRatio: false,

    }

    useEffect(()=>{
        setDataFullElement(err_full_stat)
        setDataArchElement(err_archive_stat)
    },[err_full_stat, err_archive_stat])
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