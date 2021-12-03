import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/styles'
import { SimpleCard } from 'app/components'
import { Card } from '@material-ui/core'
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from 'echarts/core';
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

const LineChart = ({ height, color = [] }) => {
    const theme = useTheme()

    const [doanhthungay, setDoanhThuNgay] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/ThongKeDoanhThuNgayTrongThang').fetchAll()
            .then(res => {
                setDoanhThuNgay(res.data);
            }).catch(err => console.log(err))
    }, [])

    var month = [];
    var Total = [];
    var day = [];
    for (let i = 0; i < doanhthungay.length; i++) {
        Total.push(doanhthungay[i].doanhthu);
        day.push("Ngày " + doanhthungay[i].day + "/" + doanhthungay[i].thang);
        month.push(doanhthungay[i].thang);
    }
    const option = {
        xAxis: {
            type: 'category',
            data: day
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: Total,
                type: 'line'
            }
        ]
    }

    return (
        <Card elevation={3} className="mb-6">
            <SimpleCard title="Thống kê doanh thu theo ngày trong tháng">
                <ReactEchartsCore
                    height="400px"
                    color={[
                        theme.palette.primary.main,
                        theme.palette.primary.light,
                    ]}
                    option={option} echarts={echarts} />
            </SimpleCard>
        </Card>
    )
}

export default LineChart
