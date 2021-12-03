import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

const DoughTongQuan = ({ height, color = [] }) => {
    const theme = useTheme()
    const [counttonkho, setSumTonKho] = useState(0)
    const [countmuahang, setCountMuaHang] = useState(0)
    const [countdonhang, setCountDonHang] = useState(0)

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/SumTonKho').fetchAll()
            .then(res => {
                setSumTonKho(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/SoLuongSpDaBan').fetchAll()
            .then(res => {
                setCountMuaHang(res.data);
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.THONGKE + '/CountDonHang').fetchAll()
            .then(res => {
                setCountDonHang(res.data);
            }).catch(err => console.log(err))
    }, [])

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: [
                    {
                        value: counttonkho,
                        name: 'Tồn kho',
                    },
                    {
                        value: countmuahang,
                        name: 'Bán ra',
                    },
                    {
                        value: countdonhang,
                        name: 'Đơn hàng'
                    },
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: [...color],
            }}
        />
    )
}

export default DoughTongQuan
