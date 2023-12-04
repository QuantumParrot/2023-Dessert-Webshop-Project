import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

import moment from "moment";

export function renderCharts(data) {

    // 有完成的訂單才可以納入統計

    data = data.filter(order => order.isFinished);

    // console.log(data);

    // 1. 月份銷售額（扣掉運費！）

    const thisMonth = Number(moment().format('MM'));

    let lastMonthSales = 0;
    let thisMonthSales = 0;

    data.forEach(order => {

        const month = moment(order.createdTime).format('MM');
        
        if (month == thisMonth-1) { 

            lastMonthSales += order.content.reduce((acc,cur)=>acc+(cur.qty*cur.product.price),0);

        }

        else if (month == thisMonth) { 
            
            thisMonthSales += order.content.reduce((acc,cur)=>acc+(cur.qty*cur.product.price),0); 
        
        }

    })

    document.querySelector('#last-month').textContent = `NT＄${lastMonthSales}`;
    document.querySelector('#this-month').textContent = `NT＄${thisMonthSales}`;

    // 3. 商品總銷售額佔比 (C3)

    const figures = {};

    data.forEach(order => order.content.forEach(item => {

        if (figures[item.product.name]) {

            figures[item.product.name].qty += item.qty;
            figures[item.product.name].revenue += item.product.price * item.qty;

        } else {

            figures[item.product.name] = {};
            figures[item.product.name].qty = item.qty;
            figures[item.product.name].revenue = item.product.price * item.qty;

        } 

    }));

    // const total = Object.values(figures).reduce((acc,cur)=>acc+cur,0);

    const revenueChartData = [];
    
    Object.keys(figures).forEach(key => revenueChartData.push([key, figures[key].revenue]));

    const chart = c3.generate({
        bindto: '#revenue-chart',
        color: {
            pattern: [
                '#EFB495',
                '#FAEED1',
                '#DED0B6',
                '#BBAB8C',
                '#C08261',
                '#E2C799',
                '#B0926A',
                '#E1C78F',
                '#A9B388',
                '#C4C1A4',
                '#FFC6AC',
            ],
        },
        data: {
            columns: revenueChartData,
            type : 'pie',
        },
        pie: {
            label: {
                show: false
            },
        },
        padding: {
            bottom: 32,
        }
    })

    // 2. 商品總銷量 (echarts)

    const sortChartData = Object.keys(figures).sort((a,b) => figures[b].qty - figures[a].qty);

    renderBarChart(sortChartData, sortChartData.map(key => figures[key].qty));

}

function renderBarChart(xAxis, values) {

    echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

    const qtyChartElement = document.querySelector('#qty-chart');
    qtyChartElement.style.height = '320px';

    const qtyChart = echarts.init(qtyChartElement);
    const option = {
        color: ['#77BCB7'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { 
                type: 'shadow'
            }
        },
        grid: {
            left: '2%',
            right: '2%',
            bottom: '10%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: xAxis,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 1,
                margin: 20,
            },
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                data: values,
                name: '銷售數量',
                barWidth: '60%',
            }
        ]
    };

    option && qtyChart.setOption(option);

}