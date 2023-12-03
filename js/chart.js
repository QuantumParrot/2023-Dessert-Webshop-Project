import c3 from "c3";
import '../node_modules/c3/c3.min.css';
import moment from "moment";

export function renderCharts(data) {

    console.log(data);

    // 1. 月份銷售額

    const thisMonth = Number(moment().format('MM'));

    let lastMonthSales = 0;
    let thisMonthSales = 0;

    data.forEach(order =>  {

        const month = moment(order.createdTime).format('MM');
        
        if (month == thisMonth-1) { lastMonthSales += order.total }
        else if (month == thisMonth) { thisMonthSales += order.total }

    })

    document.querySelector('#last-month').textContent = `NT＄${lastMonthSales}`;
    document.querySelector('#this-month').textContent = `NT＄${thisMonthSales}`;

    // 2. 所有商品的銷售量

    const volume = {};

    data.forEach(order => order.content.forEach(item => 
    volume[item.product.name] ? 
    volume[item.product.name] += item.qty : volume[item.product.name] = item.qty));

    const totalVolume = Object.values(volume).reduce((acc,cur)=>acc+cur,0);

    const volumeChartData = [];
    Object.keys(volume).forEach(key => volumeChartData.push([key, (volume[key]/totalVolume*100)]));

    const chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: volumeChartData,
            type : 'pie',
        },
        pie: {
        },
        padding: {
            bottom: 32,
        }
    })

    const productRank = Object.keys(volume).sort((a,b)=>volume[b]-volume[a]).splice(0,3);

    const detail = document.querySelector('#chart-detail');
    let str = '';
    str = /*html*/`<div>
    <h4 class="mb-8">銷量排行前三名：</h4>
    <ul class="row g-3 list-unstyled">
        <li class="col-md-4">
            <div class="card p-6">
            ${productRank[0]}：${volume[productRank[0]]} 個
            </div>
        </li>
        <li class="col-md-4">
            <div class="card p-6">
            ${productRank[1]}：${volume[productRank[1]]} 個
            </div>
        </li>
        <li class="col-md-4">
            <div class="card p-6">
            ${productRank[2]}：${volume[productRank[2]]} 個
            </div>
        </li>
    </ul>
    </div>`;
    detail.innerHTML = str;

}