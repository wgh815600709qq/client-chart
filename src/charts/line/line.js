import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

export default class App extends React.Component {
    //清除上个页面定时器
    componentWillUnmount() {
        clearInterval(this.appInterval);
    }
    //获取数据,生命周期函数激活
    componentDidMount() {
        //数据初始化
        var myDisplay = echarts.init(document.getElementById('display'));
        //获取历史值
        fetch('http://localhost:8888/logs/query')
            .then((res) => { return res.json() })
            .then(data => {
                console.log('data', data)
                // this.setState({historydata:data});
            })
        myDisplay.setOption({
            title: { text: '数据显示' },
            tooltip: {},
            legend: {
                data: ['Ch1Val', 'Ch2Val', 'Ch3Val', 'Ch4Val', 'DAVal', 'ExVal']
            },
            xAxis: [
                {
                    type: 'category',
                    data: [],
                    splitLine: {
                        show: false
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '                  简单数据显示',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: 'Ch1Val',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Ch2Val',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Ch3Val',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Ch4Val',
                    type: 'line',
                    data: []
                },
                {
                    name: 'DAVal',
                    type: 'line',
                    data: []
                },
                {
                    name: 'ExVal',
                    type: 'line',
                    data: []
                }
            ]
        });
        //charts suits the screen
        window.onresize = function () {
            myDisplay.resize();
        };

    }
    render() {
        return (
            <div id="display" style={{
                // width: 700,
                height: 400
            }}>
            </div>
        )
    }
}
