<template>
	<yd-layout id='priceChart'>
		<div class="header">
			<ul>
				<li :class="{native:dateNum==1?true:false}" @click="searchDate(1)">按天</li>
				<li :class="{native:dateNum==2?true:false}" @click="searchDate(2)">按月</li>
				<li :class="{native:dateNum==3?true:false}" @click="searchDate(3)">按年</li>
			</ul>
		</div>
		
		<div class="content">
			<div class="date">
				<div class="select_date">
					<img src="../../assets/img/icon_timg.png" alt="" />
					<div v-if='yearFlg' class='select_date_c'>
						<select name="" id="" v-model="datetimeStart">
							<option :disabled="datetimeEnd<item" v-for="item in yearArr" :value="item">{{item}}</option>s
						</select>
					</div>
					<!--<yd-datetime v-if='yearFlg' class='select_date_c' v-model="datetimeStart" :yearFormat="yearFormat" :month-format='monthFormat'  :day-format="dayFormat" type="date" slot="right"></yd-datetime>-->
					<yd-datetime v-else   :callback='startDate' class='select_date_c' :type="dateType" v-model="datetimeStart" slot="right"></yd-datetime>
				</div>
				<div>至</div>
				<div class="select_date">
					<img src="../../assets/img/icon_timg.png" alt="" />
					<div v-if='yearFlg' class='select_date_c'>
						<select name="" id="" v-model="datetimeEnd">
							<option v-for="item in yearArr" :disabled="datetimeStart>item" :value="item">{{item}}</option>s
						</select>
					</div>
					<!--<yd-datetime v-if='yearFlg' class='select_date_c' v-model="datetimeEnd" :yearFormat="yearFormat" :month-format='monthFormat'  :day-format="dayFormat" type="date" slot="right"></yd-datetime>-->
					<yd-datetime v-else :key='dateType+"2"' :callback='endDate' class='select_date_c' :type="dateType" v-model="datetimeEnd" slot="right"></yd-datetime>
				</div>
				<div class="btn" @click='searchBtn'>查询</div>
			</div>
			<div class="title" style="padding: .4rem 0 .27rem .33rem;">价格走势图</div>
			<div id='chart' class="chart">

			</div>
			<div class="title">价格走势明细</div>
			<div class="list">
				<div class="list_name">品种名称</div>
				<div class="list_date">时间</div>
				<div class="list_price">平均价(元/0.5kg)</div>
			</div>
			<div v-show='dataList.length>0' slot='list' class="list data_list" v-for='item,index in dataList' :key='index'>
				<div class="list_name">{{$route.query.name}}</div>
				<div class="list_date">{{item.date}}</div>
				<div class="list_price">{{item.price?item.price.toFixed(2):item.price}}</div>
			</div>
			<div class="no_data" v-show='dataList.length<=0'>暂无数据</div>
		</div>
		<div class="footer_name">{{$root.config.footerName}}</div>
		<yd-backtop></yd-backtop>
	</yd-layout>
</template>

<script>
	import { DateTime } from 'vue-ydui/dist/lib.rem/datetime';
	import { BackTop } from 'vue-ydui/dist/lib.rem/backtop';
	import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll';
	export default {
		components: {
			[DateTime.name]: DateTime,
			[BackTop.name]: BackTop,
			[InfiniteScroll.name]: InfiniteScroll,
		},
		data() {
			return {
				dateNum: 1,
				datetimeStart: '',
				datetimeEnd: '',
				dataList: [],
				dateType: 'date',
				yearFlg: false,
				yearFormat: '<span>{value}<i style="font-size: 12px;margin-left: 1px;"></i></span>',
				monthFormat: '',
				dayFormat: '',
				yearArr: [],
				myChart: {},
				urlStr: 'comUploadproductprice/selectByDay'
			}
		},
		watch: {

		},
		computed: {

		},
		created() {

		},
		mounted() {
			if(this.$route.query.name) {
				this.datetimeStart = this.$root.getNumDate(6)
				this.datetimeEnd = this.$root.getNumDate(0)
				this.init();
				this.loadList()
			} else {
				this.$router.go(-1)
			}
		},
		methods: {
			searchBtn() {
				this.loadList()
			},
			loadList() {
				var startTime=this.datetimeStart;
				var endTime=this.datetimeEnd;
				if(this.urlStr=='comUploadproductprice/selectByMonth'){
					var startArr=this.datetimeStart.split('-')
					var endArr=this.datetimeEnd.split('-')
					startTime=startArr[0]+'-'+startArr[1]
					endTime=endArr[0]+'-'+endArr[1]
				}
				this.$root.ajax({
					name: this.urlStr,
					params: {
						name: this.$route.query.name,
						start: startTime,
						end:endTime ,
					}
				}).then((d) => {
					this.dataList = [...d.aaData];
					this.dataList = this.dataList.reverse()
					var xData = [];
					var yData = []
					d.aaData.forEach((item) => {
						xData.push(item.date)
						yData.push(item.price)
					})
					this.myChart.setOption({
						grid: {
							left: xData.length > 0 ? '3%' : '10%',
							right: '12%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: {
							data: xData
						},
						series: [{
							name: '平均价',
							// 根据名字对应到相应的系列
							data: yData,
						}]
					})
				})
			},
			searchDate(num) {
				this.dateNum = num
				this.urlStr = 'comUploadproductprice/selectByDay'
				if(num == 1) {
					this.yearFlg = false
					this.dateType = 'date'
					this.datetimeStart = this.$root.getNumDate(6)
					this.datetimeEnd = this.$root.getNumDate(0)
				} else if(num == 2) {
					this.yearFlg = false
					this.dateType = 'month'
					//这里加"-01"是yd-ui插件的bug
					this.datetimeStart = this.$root.getNumDate(12, 'month')+'-01'
					this.datetimeEnd = this.$root.getNumDate(0, 'month')+'-01'
					this.urlStr = 'comUploadproductprice/selectByMonth'
				} else {
					this.yearFlg = true;
					var date = new Date();
					var yearArr = [];
					var year = date.getFullYear();
					for(let a = 0; a < 20; a++) {
						yearArr.push(year - a)
					}
					this.yearArr = yearArr;
					this.datetimeStart = year - 7
					this.datetimeEnd = year
					this.urlStr = 'comUploadproductprice/selectByYear'
				}
				this.loadList()
			},
			//这里应该判断开始日期改变，结束日期为空，或者结束日期不该小于开始时间。
			
			endDate() {
				console.log('end')
			},
			startDate() {
				console.log('start')
			},
			init() {
				this.myChart = echarts.init(document.getElementById('chart'))
				var option = {
					title: {
						text: ''
					},
					legend: {
						data: [{
							name: this.$route.query.name
						}],
						x: 'center',
						show: true,
					},
					grid: {
						top: '15%',
						bottom: '3%',
					},
					xAxis: {
						boundaryGap: false,
						data: []
					},
					yAxis: [{
						type: 'value',
						name: '元/0.5kg',
						position: 'left',
						axisLabel: {
							formatter: '{value}'
						},
						splitLine: {
							show: true //不显示Y轴的横线
						},
						axisTick: {
							show: true, //这里是要不要下面的juju
						},
					}, ],
					series: [{
						name: '平均价',
						type: 'line',
						//			smooth: true,
						data: [],
						itemStyle: {
							normal: {
								color: 'rgb(255,162,38)'
							}
						},
					}]
				};
				// 使用刚指定的配置项和数据显示图表。 
				this.myChart.setOption(option);
			},
		}
	}
</script>

<style lang="scss">
	@import './priceChart'
</style>