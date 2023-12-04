import c3 from "c3";
import '../node_modules/c3/c3.min.css';

import * as echarts from 'echarts';

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

// 商品的總銷售量與總銷售額（陣列解構版本，不好讀，已棄用，但難得寫出來了做個紀念 XD）

// const figures = {};

// data.forEach(order => order.content.forEach(item => {

//     if (figures[item.product.name]) {

//         figures[item.product.name][0] += item.qty;
//         figures[item.product.name][1] += item.product.price * item.qty;

//     } else {

//         figures[item.product.name] = [item.qty, item.product.price * item.qty];

//     }

// }))  

// const total = [0, 0];

// Object.values(figures).forEach(([quantity, revenue]) => {

//     total[0] += quantity; total[1] += revenue;

// })

// const qtyChartData = [];
// const revenueChartData = [];

// Object.keys(figures).forEach(key => {
    
//     qtyChartData.push([key, (figures[key][0]/total[0])]);
//     revenueChartData.push([key, (figures[key][1]/total[1])]);

// });