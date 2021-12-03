import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/styles'
import { SimpleCard } from 'app/components'
import { Card } from '@material-ui/core'
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from 'echarts/core';
import { createAPIEndpoint, ENDPIONTS } from "../../../api";


const BarChart = ({ height, color = [] }) => {
    const theme = useTheme()
    const [doanhthuthang, setDoanhThu] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/ThongKeDoanhThuThang').fetchAll()
            .then(res => {
                setDoanhThu(res.data);
            }).catch(err => console.log(err))
    }, [])

    var month = [];
    var revenue = [];
    for (var i = 0; i < doanhthuthang.length; i++) {
        month.push("Tháng " + doanhthuthang[i].month);
        revenue.push(doanhthuthang[i].doanhthu);
    }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: month,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Doanh thu',
                type: 'bar',
                barWidth: '60%',
                data: revenue
            }
        ]
    }

    return (
        <Card elevation={3} className="mb-6">
            <SimpleCard title="Thống kê doanh thu bán hàng theo tháng">
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

export default BarChart
