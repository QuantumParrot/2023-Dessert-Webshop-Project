import moment from "moment";

export function renderCharts(data) {

    // console.log(data);

    data = data.filter(order => order.isFinished);

    // const thisMonth = Number(moment().format('MM'));
    
    const thisMonth = 12;

    const thisMonthCalc = orderCalcultor(data.filter(order => moment(order.createdTime).format('MM') == thisMonth));
    const lastMonthCalc = orderCalcultor(data.filter(order => moment(order.createdTime).format('MM') == thisMonth - 1));

    // 1. 月份銷售額及排行

    document.querySelector('#last-month').textContent = `NT＄${lastMonthCalc.revenue_total()}`;
    document.querySelector('#this-month').textContent = `NT＄${thisMonthCalc.revenue_total()}`;

    document.querySelector('#last-month-rank').innerHTML = rankHTMLTemplate(lastMonthCalc.revenue_ranks().splice(0,3));
    document.querySelector('#this-month-rank').innerHTML = rankHTMLTemplate(thisMonthCalc.revenue_ranks().splice(0,3));

    // 2. 商品總銷售量 & 商品總銷售額

    const figures = orderCalcultor(data).figures();

    // 2-1. 商品總銷售額

    const revenueChartData = [];

    Object.keys(figures).forEach(key => revenueChartData.push({ name: key, value: figures[key].revenue }));
    
    renderPieChart(revenueChartData);

    // 2-2. 商品總銷售量

    const qtyChartData = Object.keys(figures).sort((a,b) => figures[a].qty - figures[b].qty);

    const [champion, championData] = orderCalcultor(data).revenue_ranks().splice(0,1)[0];

    renderBarChart(qtyChartData, qtyChartData.map(key => {
        return key !== champion ? figures[key].qty : { value: figures[key].qty, itemStyle: { color: '#D1741F' } } 
    }));

}

// 渲染圓餅圖

function renderPieChart(data) {

    const revenueChartElement = document.querySelector('#revenue-chart');
    revenueChartElement.style.height = '300px';
    
    const revenueChart = echarts.init(revenueChartElement);
    const option = {
        color: vintageColorPalettes,
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: window.innerWidth > 768 ? 'veritical' : 'horizontal',
            left: 'left',
            type: 'scroll',
            pageButtonGap: 16,
            pageButtonItemGap: 8,
            backgroundColor: 'white',
            borderRadius: 8,
            padding: window.innerWidth > 768 ? 16 : 8,
        },
        grid: {
            top: '10%',
        },
        series: [
            {
                name: '商品銷售額',
                type: 'pie',
                radius: '95%',
                label: {
                    show: false,
                },
                data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                top: window.innerWidth > 768 ? null : '21%',
            }
        ]
    };

    option && revenueChart.setOption(option);

}

// 渲染柱狀圖

function renderBarChart(xAxis, data) {

    const qtyChartElement = document.querySelector('#qty-chart');
    qtyChartElement.style.height = '400px';

    const qtyChart = echarts.init(qtyChartElement);
    const option = {
        width: '100%',
        color: ['#9EB384'],
        title: {
            left: 'center',
            subtext: '橘色為當前的銷售額冠軍',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { 
                type: 'shadow'
            }
        },
        grid: {
            left: '5%',
            right: '2%',
            bottom: '10%',
            // containLabel: true,
        },
        yAxis: {
            type: 'category',
            data: xAxis,
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                show: false,
                // interval: 1,
                margin: 20,
            },
        },
        xAxis: {
            type: 'value'
        },
        series: [
            {
                type: 'bar',
                data,
                name: '商品銷售數量',
                barCategoryGap: '10%',
            }
        ]
    };

    option && qtyChart.setOption(option);

}

// 訂單數據計算工具

function orderCalcultor(orders) {

    const figures = {};
    
    orders.forEach(order => order.content.forEach(item => {

        if (figures[item.product.name]) {

            figures[item.product.name].qty += item.qty;
            figures[item.product.name].revenue += item.qty*item.product.price;

        } else {

            figures[item.product.name] = { qty: item.qty, revenue: item.qty*item.product.price }

        }

    }));

    return {
        figures: function() {
            return figures;
        },
        revenue_ranks: function() {
            return Object.keys(figures).sort((a,b) => figures[b].revenue - figures[a].revenue).map(i => [i, figures[i]]);
        },
        revenue_total: function() {
            return orders.reduce((acc, curr) => acc + (curr.total - curr.deliveryFee), 0);
        },
    }
    
}

// 調色盤

// const classicColorPalettes = [
//     '#A9B388',
//     '#B0926A',
//     '#BBAB8C',
//     '#C08261',
//     '#C4C1A4',
//     '#DED0B6',
//     '#E1C78F',
//     '#E2C799',
//     '#EFB495',
//     '#FAEED1',
//     '#FFC6AC'
// ];

const vintageColorPalettes = [
    '#d87c7c',
    '#919e8b',
    '#d7ab82',
    '#6e7074',
    '#61a0a8',
    '#efa18d',
    '#787464',
    '#cc7e63',
    '#724e58',
    '#4b565b'
]

function rankHTMLTemplate(ranks) {

    const colors = {
        "1": "#FFB11B",
        "2": "#BDC0BA",
        "3": "#A36336",
    }

    let str = '';
    ranks.map(([name, data], index) => str += /*html*/`
    <li class="d-flex justify-content-between">
        <div class="d-flex gap-2">
            <span><span class="material-icons" style="color: ${colors[index+1]}">military_tech</span></span>
            <span>${name}</span>
        </div>
        <span class="fs-7 text-muted">NT＄ ${data.revenue}</span>
    </li>
    `);
    return str;

}