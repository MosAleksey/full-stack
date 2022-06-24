import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import BarChart from "./BarChart";

const StatisticBar = ({errors_archive, errors}) => {
    const [errorsStat, setErrorsStat] = useState([])
    const [errorsFullStat, setErrorsFullStat] = useState([])

    useEffect(()=>{
        setErrorsStat(errors_archive)
        setErrorsFullStat(errors)
    },[errors, errors_archive])

    //#Врезание
    const vrezanie = [
        'Врезание',
        'Врезался',
        'Столкновение',
        'Столкнулся',
        'Столкнулись',
        'Авария'
    ]
    //#Наладочные работы
    const naladka = [
        'Калибровка',
        'Настроить',
        'Настройка',
        'Наладка',
        'Наладить',
        'Откалибровать'
    ]
    //#Сбой програмсного обеспечения
    //#Электроавтоматика
    //#Другое
    const categories = [
        {
            title: 'Врезание',
            data: vrezanie
    },
        {
            title: 'Наладочные работы',
            data: naladka
    }
    ]
    const stat_title = [
        {title:'Врезание', inv_number: '1577'},
        {title:'врезание', inv_number: '1577'},
        {title:'Врезание в патрон', inv_number: '1577'},
        {title:'Врезание в шпиндель', inv_number: '1577'},
        {title:'Столкновение', inv_number: '1577'},
        {title:'Столкновение со столом', inv_number: '1577'},
        {title:'Калибровка щупа', inv_number: '1577'},
        {title:'Оторвало дверь', inv_number: '1577'},
        {title:'Вибрация', inv_number: '1577'},
        {title:'Столкнулся', inv_number: '1577'},
        {title:'Настройка', inv_number: '1577'},
        {title:'Калибровка', inv_number: '1577'},
        {title:'Откалибровать', inv_number: '1577'}
    ]


    const one_register = (register) => {
        let string = []
        register.forEach((data, index) => {
            string.push(data.title.toLowerCase())
        })
        return string
    }

    const compare_stat = (arr_title, base_tt) => {
        let compare_arr = {labels:[], data:[]}
        let setOtherCounter = 0
        base_tt.map(object => {
            let counter_obj = {labels: object.title, counter: null}
            let counter = 0
            for (let i = 0; i < arr_title.length; i++){
                for (let j = 0; j < object.data.length; j++){
                    if (String(arr_title[i]).includes(String(object.data[j]).toLowerCase())){
                        counter ++
                        setOtherCounter ++
                        counter_obj.counter = counter
                    }
                }
            }
            compare_arr.labels.push(counter_obj.labels)
            compare_arr.data.push(counter_obj.counter)

        })
        compare_arr.labels.push('Другое')
        compare_arr.data.push(arr_title.length - setOtherCounter)
        return compare_arr
    }
    const stat_calculate = (arr_title) => {
        // console.log(compare_stat(arr_title, categories))
        console.log(compare_stat(arr_title, categories))
    }



    return (
        <div>
            <h3>Статистика отказов</h3>
            <BarChart
                err_full_stat={compare_stat(one_register(errorsFullStat), categories)}
                err_archive_stat={compare_stat(one_register(errorsStat), categories)} />
        </div>
    );
};

export default StatisticBar;

// all_stat={compare_stat(one_register(stat_title), categories)}