import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/styles'
import { SimpleCard } from 'app/components'
import { Card } from '@material-ui/core'
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from 'echarts/core';
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

const LineChartSL = ({ height, color = [] }) => {
    const theme = useTheme()

    const [sanphambanchay, setSpBanNhieuNhat] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/ThongKeSanPhamBanChay').fetchAll()
            .then(res => {
                setSpBanNhieuNhat(res.data);
            }).catch(err => console.log(err))
    }, [])

    var Name = [];
    var Count = [];
    for (let i = 0; i < sanphambanchay.length; i++) {
        Name.push(sanphambanchay[i].name);
        Count.push(sanphambanchay[i].count);
    }
    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {},
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Name
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} Sp'
            }
        },
        series: [
            {
                name: 'Số lượng',
                type: 'line',
                data: Count,
                markPoint: {
                    data: null
                },
                markLine: {
                    data: [
                        { type: 'average', name: 'Avg' },
                        [
                            {
                                symbol: 'none',
                                x: '90%',
                                yAxis: 'max'
                            },
                            {
                                symbol: 'circle',
                                label: {
                                    position: 'start',
                                    formatter: 'Max'
                                },
                                type: 'max',
                                name: 'Số lượng'
                            }
                        ]
                    ]
                }
            }
        ]
    }

    return (
        <Card elevation={3} className="mb-6">
            <SimpleCard title="Thống kê số lượng sản phẩm bán nhiều nhất">
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

export default LineChartSL
