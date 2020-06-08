<template>
  <div>
    <div id="myChart" :style="{width: '95%', height: '400px'}"></div>
    <div id="myPie" :style="{width: '50%', height: '600px'}"></div>
  </div>
</template>
<script type="text/babel">
    import * as api from "@/api";
    import page from "@/mixins/page";
    
    export default {
      name: "hello",
      data() {
        return {
          msg: "Welcome to Your Vue.js App"
        };
      },
      mounted() {
        this.drawLine();
        this.drawPie();
      },
      methods: {
        drawLine() {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          // 绘制图表

          
          new Promise(async (resolve, reject) => {
                    try {

                        var lineData =  await api.analysis.lineData()
                        // console.log(lineData.memberData[0]);
                        
                        var dateJson = new Array();
                        var numberJson = new Array();

                        lineData.memberData.forEach((v,index) => {
                          Object.keys(v).forEach(function(key){
                          dateJson.push(key)
                          numberJson.push(v[key])

                          });
                        });
                        
                        dateJson = dateJson.reverse()

                        myChart.setOption({
                            title: { text: "每日新增用户" },
                            tooltip: {},
                            xAxis: {
                              data: dateJson
                            },
                            yAxis: {},
                            series: [
                              {
                                name: "销量",
                                type: "line",
                                data: numberJson
                              }
                            ]
                          });
                          
                        resolve({
                          
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            
        },
        drawPie() {
          // 基于准备好的dom，初始化echarts实例
          let myPie = this.$echarts.init(document.getElementById("myPie"));
          // 绘制图表

          new Promise(async (resolve, reject) => {
                    try {

                        var lineData =  await api.analysis.channelData()
                        // console.log(lineData.memberData[0]);
                        console.log(lineData);


                        var dateJson = new Array();
                        var numberJson = new Array();
                        var pieJson = new Array();

                        lineData.memberData.forEach((v,index) => {
                          Object.keys(v).forEach(function(key){
                          
                          var newPie = new Object;
                          newPie.name = key
                          newPie.value = v[key]
                          pieJson.push(newPie)

                          dateJson.push(key)
                          numberJson.push(v[key])

                          });
                        });

                        console.log(pieJson);
                        
                        
                        dateJson = dateJson.reverse()
                        myPie.setOption({
                      title: {
                         text: '用户来源渠道',
                        //  subtext: '纯属虚构',
                         left: 'center'
                               },
                      tooltip: {
                         trigger: 'item',
                         formatter: '{a} <br/>{b} : {c} ({d}%)'
                                 },
                      legend: {
                         orient: 'vertical',
                         left: 'left',
                         data: dateJson
                               },
                      series: [
                          {
                              name: '访问来源',
                              type: 'pie',
                              radius: '55%',
                              center: ['50%', '60%'],
                              data: pieJson,
                              emphasis: {
                                  itemStyle: {
                                      shadowBlur: 10,
                                      shadowOffsetX: 0,
                                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                                  }
                              }
                          }
                                ]
                            });
                          
                        resolve({
                          
                        })
                    } catch (e) {
                        reject(e)
                    }
                })
            
        },

      }
    };
</script>
<style lang="scss" type="text/scss" scoped>
</style>
