<template>
	<yd-layout id='index'>
		<div class="header">
			<div class="header_top">宁夏四季鲜农产品综合批发市场</div>
			<div class="header_bottom">价格信息公示平台</div>
			<div id='mapChart' class="map_chart">123</div>
		</div>
		<div class="search">
			<img class="search_img" src="../../assets/img/spjg.png" alt="" />
			<div class="search_input">
				<input v-model="searchInput" class="input" type="text" placeholder="请输入品种名称" />
				<div class="btn" @click='searchClick'>
					查询>>
				</div>
				<!--<div class="btn btn_reset">
					重置
				</div>-->
				<div class='reset_icon' @click='reset'>
					<yd-icon name="refresh" size='.3rem'></yd-icon>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="thr_btn">
				<div class="list_thr" @click="thrBtn('001')" :class="thrBtnStr=='001'?'list_thr_active':''">蔬菜</div>
				<div class="list_thr" @click="thrBtn('002')" :class="thrBtnStr=='002'?'list_thr_active':''">水果</div>
				<div class="list_thr" @click="thrBtn('003')" :class="thrBtnStr=='003'?'list_thr_active':''">肉类</div>
			</div>
			<div class="list">
				<div class="list_name">品种名称</div>
				<div class="list_money_max">最高价<span style="font-size: .2rem;">(/0.5kg)</span></div>
				<div class="list_money_samll">最低价<span style="font-size: .2rem;">(/0.5kg)</span></div>
				<div class="list_money_m">平均价<span style="font-size: .2rem;">(/0.5kg)</span></div>
				<div class="list_qs">趋势</div>
			</div>
			<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
				<div slot="list" class="list bottom" v-for='(item,index) in dataList' :key='index'>
					<div class="list_name">{{item.name}}</div>
					<div class="list_money_max">￥{{item.highestPrice}}</div>
					<div class="list_money_samll">￥{{item.minimumPrice}}</div>
					<div class="list_money_m">￥{{item.price}}</div>
					<div class="list_qs">
						<img @click='goPriceChart(item.name)' src="../../assets/img/icon_qushi.png" alt="" />
					</div>
				</div>
				<!-- 数据全部加载完毕显示 -->
				<span slot="doneTip">没有更多数据了~~</span>

				<!-- 加载中提示，不指定，将显示默认加载中图标 -->
				<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

			</yd-infinitescroll>
		</div>
		<div class="footer_name">{{$root.config.footerName}}</div>
		<yd-backtop></yd-backtop>
	</yd-layout>
</template>

<script>
	import { Icons } from 'vue-ydui/dist/lib.rem/icons';
	import { BackTop } from 'vue-ydui/dist/lib.rem/backtop';
	import { InfiniteScroll } from 'vue-ydui/dist/lib.rem/infinitescroll';
	import { yc_map } from '../../assets/js/yinchuanMap.js'
	export default {
		components: {
			[Icons.name]: Icons,
			[BackTop.name]: BackTop,
			[InfiniteScroll.name]: InfiniteScroll,
		},
		data() {
			return {
				myChart: {},
				pageSize: 20,
				pageNum: 1,
				searchInput: '',
				dataList: [],
				thrBtnStr:'001',
			}
		},
		created() {

		},
		watch: {

		},
		computed: {

		},
		mounted() {
			this.myChart = echarts.init(document.getElementById('mapChart'));
			this.loadList(this.thrBtnStr);
			this.initChart();
		},
		methods: {
			thrBtn(str){
				this.thrBtnStr=str
				this.pageNum = 1
				this.dataList = [];
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loadList(this.thrBtnStr);
			},
			initChart() {
				var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

				console.log(yc_map)
				echarts.registerMap('yinchuan', yc_map);
				var option = {
					backgroundColor: 'transparent',
					title: {
						text: '',
						subtext: '',
						left: 'center',
						textStyle: {
							color: '#fff'
						}
					},
					tooltip: {
						trigger: 'item'
					},
					legend: {
						//				        orient: 'vertical',
						//				        top: 'bottom',
						//				        left: 'right',
						//				        data:['北京 Top10', '上海 Top10', '广州 Top10'],
						//				        textStyle: {
						//				            color: '#fff'
						//				        },
						//				        selectedMode: 'single'
					},
					geo: {
						map: 'yinchuan',
						label: {
							emphasis: {
								show: false
							}
						},
						roam: false,
						aspectScale:0.75,
						silent:true,
						zoom:1.2,
						itemStyle: {
							normal: {
								areaColor: 'rgba(255,255,255,.6)',
								borderColor: 'RGBA(62, 184, 242, 1)'
							},
							emphasis: {
								areaColor: 'white'
							}
						}
					},
					series: [{ //小白球
							//				        name: 'Top10',
							type: 'lines',
							zlevel: 1,
							effect: {
								show: true,
								period: 6,
								trailLength: 0.7,
								color: 'red',
								symbol: 'triangle',
								symbolSize: 5
							},
							lineStyle: {
								normal: {
									color: "#a6c84c",
									width: 0,
									curveness: 0.2
								}
							},
							data: [{
								fromName: '中卫',
								toName: '银川',
								coords: [
									[105.4028, 36.9525],
									[106.3586, 38.1775]
								]
							}, ]
						}, 
//						{ //飞机
//							type: 'lines',
//							zlevel: 2,
//							symbol: ['none', 'arrow'],
//							symbolSize: 10,
//							effect: {
//								show: true,
//								period: 6,
//								trailLength: 0,
//								symbol: planePath,
//								symbolSize: 40
//							},
//							lineStyle: {
//								normal: {
//									color: '#a6c84c',
//									width: 1,
//									opacity: 0.6,
//									curveness: 0.2
//								}
//							},
//							data: [{
//								fromName: '中卫',
//								toName: '银川',
//								coords: [
//									[105.4028, 36.9525],
//									[106.3586, 38.1775]	
//								]
//							}, ]
//						},
						{ //点
							type: 'effectScatter',
							coordinateSystem: 'geo',
							zlevel: 2,
							rippleEffect: {
								brushType: 'stroke'
							},
							label: {
								normal: {
									show: true,
									position: 'right',
									formatter: '{b}'
								}
							},
							symbolSize: function(val) {
								return val[2] / 8;
							},
							itemStyle: {
								normal: {
//									color: '#a6c84c',
									color:'white',
//									color:{
//									    type: 'radial',
//									    x: 0.5,
//									    y: 0.5,
//									    r: 0.5,
//									    colorStops: [{
//									        offset: 0, color: 'red' // 0% 处的颜色
//									    }, {
//									        offset: 1, color: 'white' // 100% 处的颜色
//									    }],
//									    global: false // 缺省为 false
//									},
								}
							},
							data:[{
								name:'中卫',
								value:[105.4028, 36.9525,100],
							},{
								name:'银川',
								value:[106.3586, 38.1775,100]
							}]
						}
					]
				};
				this.myChart.setOption(option);

			},
			searchClick() {
				this.pageNum = 1
				this.dataList = [];
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loadList(this.thrBtnStr)
			},
			reset() {
				this.searchInput = ''
				this.pageNum = 1;
				this.dataList = [];
				this.thrBtnStr='001'
				this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
				this.loadList(this.thrBtnStr)
			},
			loadList(str) {
				this.$root.ajax({
					name: 'comUploadproductprice/list ',
					params: {
						pageSize: this.pageSize,
						pageNum: this.pageNum,
						name: this.searchInput,
						categoryCode:this.thrBtnStr,
					}
				}).then((d) => {
					var arr = [...this.dataList, ...d.aaData];
					this.dataList = arr
					if(this.dataList.length >= d.dataCount) {
						/* 所有数据加载完毕 */
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
						return;
					}
					/* 单次请求数据完毕 */
					if(d.aaData.length > 0) {
						this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
					}
					this.pageNum++;
				})
			},
			goPriceChart(name) {
				if(name) {
					this.$router.push({
						name: 'priceChart',
						query: {
							name: name
						}
					})
				} else {
					this.$dialog.toast({
						mes: '品种名称不能为空,请查看数据的正确性！',
						timeout: 1500
					});
				}

			}
		}
	}
</script>

<style lang='scss'>
	@import './index.scss';
</style>