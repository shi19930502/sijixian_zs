<template>
	<div id='comHeader' :style="backgroundStyle" class="com_header" :class='{colorBa:!backgroundClass,imgBa:backgroundClass,isName:!name&&backgroundClass}'>
		<div v-if='backgroundClass' class="com_header_c">
			<img class="c_img" src="../assets/img/banner_logo@2x.png" alt="" />
			<div class="com_header_c_c">
				<div class="header_name">塞上农鲜汇网上批发市场</div>
				<div v-if='name' class="header_people">货主：{{name}}</div>
			</div>
		</div>
		<div v-else>
			个人信息
		</div>
		<slot></slot>
	</div>
</template>

<script>
	//	import bg from '../assets/img/banner_bg.png'
	export default {
		name: 'comHeader',
		props: {
			backgroundStyle: {
				default: function() {
					return {
						//						background:`url(${bg}) no-repeat ` ,
						//						backgroundSize:'contain',
					}
				}
			},
			backgroundClass: {
				type: Boolean,
				default: true,
			},
			name: {
				default: ''
			}

		},
		data() {
			return {

			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	#comHeader {
		width: 100%;
		padding: .4rem .23rem 0;
		height: 2.19rem;
		.com_header_c {
			display: flex;
			color: white;
			.c_img {
				width: .48rem;
				height: .4rem;
				margin-right: .11rem;
			}
			.com_header_c_c {
				padding-right: .82rem;
				width: 100%;
				.header_name {
					margin-bottom: .05rem;
					font-size: .36rem;
					font-weight: bold;
				}
			}
		}
		.header_people {
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.message {
			width: 100%;
			position: absolute;
			left: 0;
			top: 1.45rem;
			.message_children {
				border-radius: 0.04rem;
				background: white;
				width: 92%;
				margin: auto;
				padding: 0.48rem 0.25rem;
				font-size: 0.3rem;
				color: #2C2E2C;
				font-weight: bold;
				align-items: center;
				box-shadow: 5px 10px 18px rgba(6, 58, 95, 0.1);
				display: flex;
				img {
					margin-right: 0.13rem;
					width: 0.32rem;
					height: 0.3rem;
				}
			}
		}
	}
	
	#comHeader.colorBa {
		color: white;
		font-weight: bold;
		font-size: .36rem;
		padding-top: .58rem;
		background: linear-gradient(45deg, rgba(140, 211, 98, 1), rgba(183, 219, 104, 1));
	}
	
	#comHeader.imgBa {
		background-color: white;
		background: url(../assets/img/banner_bg.png) no-repeat;
		background-size: 100% 100%;
	}
	
	#comHeader.isName {
		padding-top: .53rem;
	}
</style>