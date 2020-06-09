import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

export default class App extends React.Component {
    //清除上个页面定时器
    componentWillUnmount() {
        // clearInterval(this.appInterval);
    }
    //获取数据,生命周期函数激活
    componentDidMount() {
        //数据初始化
        var myDisplay = echarts.init(document.getElementById('display'));
        //获取历史值
        fetch('http://localhost:8989/logs/analysis', {
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            method: 'GET'
        })
            .then((res) => { return res.json() })
            .then(response => {
                console.log('data', response.data)
                let result = response.data
                // this.setState({historydata:data});
                myDisplay.setOption({
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: result.xAxis,
                        axisLabel: {//坐标轴刻度标签的相关设置。
                            formatter: function (params) {
                                var newParamsName = "";// 最终拼接成的字符串
                                var paramsNameNumber = params.length;// 实际标签的个数
                                var provideNumber = 12;// 每行能显示的字的个数
                                var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                                /**
                                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                                 */
                                // 条件等同于rowNumber>1
                                if (paramsNameNumber > provideNumber) {
                                    /** 循环每一行,p表示行 */
                                    for (var p = 0; p < rowNumber; p++) {
                                        var tempStr = "";// 表示每一次截取的字符串
                                        var start = p * provideNumber;// 开始截取的位置
                                        var end = start + provideNumber;// 结束截取的位置
                                        // 此处特殊处理最后一行的索引值
                                        if (p == rowNumber - 1) {
                                            // 最后一次不换行
                                            tempStr = params.substring(start, paramsNameNumber);
                                        } else {
                                            // 每一次拼接字符串并换行
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr;// 最终拼成的字符串
                                    }

                                } else {
                                    // 将旧标签的值赋给新标签
                                    newParamsName = params;
                                }
                                //将最终的字符串返回
                                return newParamsName
                            }

                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: result.series,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                });
            })

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
