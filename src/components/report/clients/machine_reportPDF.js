import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
const machine_reportPDF = (errorList) => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
    // const stopList = errorList.map(list => {
    //     console.log(list)
    // })
    const stopList = errorList.map(data=> {
        let err_desc = data.errors.map(err => {
            return [
                {
                    text: '• '+err +'.\n',
                    margin: 2
                }
            ]
        })
        return [
            {text: data.inv_number + ' || ' + data.m_title},
            err_desc
        ]
    })
    const content = [
        {
            text: 'СПИСОК ОБОРУДОВАНИЯ НАХОДЯЩЕГОСЯ В ПРОСТОЕ',
            alignment: 'center',
            bold: true,
            marginBottom: 20
        },
        {
            table:{
                headerRows: 1,
                body: [
                    ['Инв.№/Наименование', 'Причины остановки'],
                    ...stopList
                ]

            }
        },
        {
            text: 'Список действителен на: ' + new Date().toLocaleDateString(),
            marginTop: 30
        }
    ]
    const docDefinitios = {
        content: [content],
        pageSize: 'A4',
        pageMargins: [30, 60, 15, 30]

    }
    pdfMake.createPdf(docDefinitios).open()
}

export default machine_reportPDF;
