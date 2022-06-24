import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'


const clientPDF  = (errors, com_inspect, errorArchive, userWorks, userFinish) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    //
    const users_inspect = com_inspect.map(element => {
        return [
            {text: element.personal_number},
            {text: element.second_name + ' ' + element.first_name},
            {text: element.function_title}
        ]
    })

    const users_work = userWorks.map(element => {
        return [
            {text: element.personal_number},
            {text: element.second_name + ' ' + element.first_name},
            {text: element.function_title}
        ]
    })

    const users_finish = userFinish.map(element => {
        return [
            {text: element.personal_number},
            {text: element.second_name + ' ' + element.first_name},
            {text: element.function_title},
            {text: 'Подпись:__________'}
        ]
    })

    const condition_fail_akt = (errorArchive) => {
        if(errorArchive.geometry_fail_akt !== "null") {
            return {
                text: "Акт о соответствии до начала ремонта: прилагается",
                marginTop: 10,
                marginBottom: 20
            }
        }else
            return {
            text: "Акт о соответствии до начала ремонта: не прилагается",
                marginTop: 10,
                marginBottom: 20
            }
    }

    const condition_finish_akt = (errorArchive) => {
        if(errorArchive.geometry_finish_akt !== null) {
            return {
                text: "Акт о соответствии после ремонта: прилагается",
                marginTop: 10,
                marginBottom: 20
            }
        }else
            return {
                text: "Акт о соответствии после ремонта: не прилагается",
                marginTop: 10,
                marginBottom: 20
            }
    }

    //
    const content = [
        {
            text: 'ОТЧЕТ О ПРОВЕДЕННЫХ РАБОТАХ',
            bold: true,
            fontsize: 30,
            alignment: 'center',
        },
        {
            text: 'Номер заявки ' + errors.id,
            alignment: 'center',
            marginTop: 10
        },
        {text: 'Оборудование: ' + errors.m_title, marginTop: 10},
        {text: 'Инвентарный номер: ' + errors.inv_number},
        {text: 'Цех №' + errors.name},
        {text: 'Описание неисправности: ' + errors.description},
        {text: 'Состав комиссии осмотра', margin: [0,20,0,5], decoration: 'underline'},
        {
            table: {
                headerRows: 1,
                body:[
                    ['Табельный номер','ФИО','Должность'],
                    ...users_inspect
                ]
            }
        },
        {text: 'Выявленые неисправности:', marginTop: 10},
        {text: errorArchive.descript_inspect_error},
        {text: 'Выполненные работы:', marginTop: 10},
        {text: errorArchive.descript_finish_work},
        {text: 'Состав ремонтной бригады', margin: [0,20,0,5], decoration: 'underline'},
        {
            table: {
                headerRows: 1,
                body: [
                    ['Табельный номер','ФИО','Должность'],
                    ...users_work
                ]
            }
        },
        condition_fail_akt(errorArchive),
        {
            table: {
                headerRows: 1,
                body: [
                    ['Табельный номер','ФИО','Должность','Подпись'],
                    ...users_finish
                ]
            }
        },
        condition_finish_akt(errorArchive),
        {
            text: 'Начальник сервисной службы                 Подпись:________ Дата:________',
            marginTop: 20
        },
        {
            text: 'Заключение главного механика:______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
            marginTop: 20
        },
        {
            text: 'Главный механик                                         Подпись:________ Дата:________',
            marginTop: 20
        },
        {
            text: 'Дата окончания работ: ' + errorArchive.finish_date.slice(0, -14),
            marginTop: 10
        }
    ]

    const docDefinitios = {
        content: [content],
        pageSize: 'A4',
        pageMargins: [30, 60, 15, 30]

    }
    pdfMake.createPdf(docDefinitios).open()


}
export default clientPDF;

