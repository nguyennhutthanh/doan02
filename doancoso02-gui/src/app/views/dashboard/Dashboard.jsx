import React, { Fragment } from 'react'
import { Grid, Card } from '@material-ui/core'
import DoughnutChart from './shared/DoughTongQuan'
import LineChart from './shared/LineChart'
import LineChartSL from './shared/LineChartSL'
import StarCardRight from './shared/StarCardRight'
import StarCardLeft from './shared/StarCardLeft'
import { useTheme } from '@material-ui/styles'
import { Breadcrumb } from 'app/components'
import BarChart from './shared/BarChart'

const Dashboard = () => {
    const theme = useTheme()

    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Thống Kê', path: '/dashboard' },
                        ]} />
                </div>
                <Grid container spacing={3}>
                    <Grid item md={4} xs={12}>
                        <StarCardLeft />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Card className="px-6 py-4 mb-6">
                            <div className="card-title">Tổng quan</div>
                            <DoughnutChart
                                height="300px"
                                color={[
                                    theme.palette.primary.dark,
                                    theme.palette.primary.main,
                                    theme.palette.primary.light,
                                ]}
                            />
                        </Card>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <StarCardRight />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <BarChart />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LineChart />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LineChartSL />
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default Dashboard
