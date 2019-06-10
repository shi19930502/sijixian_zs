<template>
	<div id='uploadImg' class="information_upload">
				<div class="upload_width">
					<el-upload ref="upload" 
						:data='{savePath: "productOnline"}' 
						:file-list="fileList" 
						:limit='1' 
						:on-error='onError' 
						:on-success='onSuccess' 
						:on-change='imgChange' 
						:accept='acceptImg' 
						:action="imgAction" 
						:auto-upload='autoUpload'
						list-type="picture-card" 
						:on-preview="handlePictureCardPreview" 
						:on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</div>
				<div v-if='isUpload' @click='uploadImg' class="upload_btn">上传图片</div>
				<el-dialog :fullscreen='true' :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt>
				</el-dialog>
			</div>
</template>

<script>
	import { Upload, Dialog } from 'element-ui';
	export default {
		name:'uploadOneImg',
		components: {
			[Upload.name]: Upload,
			[Dialog.name]: Dialog,
			
		},
		props:{
			uploadNum:{
				default:0,
			},
			picUrl:{
				default:'',
				
			}
		},
		data(){
			return {
				acceptImg: 'image/*',
				fileList: [],
				imgAction: '',
				autoUpload: false,
				isUpload: false,
				successUpload: false,
				dialogVisible:false,
				dialogImageUrl:'',
				imgToken:''
			}
		},
		created(){
			var str=sessionStorage.getItem('qr_information')
			if(str&&str!='{}'){
				this.imgToken = JSON.parse(str).token
			}
			this.imgAction = ROOT_API + '/api/comm/fileUpload/file/imgUpload?token=' + this.imgToken
		},
		watch:{
			
		},
		computed:{
			
		},
		mounted(){
			
		},
		methods:{
			onSuccess(resp, file, fileList) {
				this.error=resp;
				this.errorFile=file;
				this.errorFileList=fileList
				this.$dialog.loading.close();
				if(resp.state == 0) {
					this.$nextTick(() => {
						this.$emit('update:picUrl',resp.aaData.path)
						console.log(this.picUrl )
						this.isUpload = false
						this.successUpload = true
					})
				} else {
					this.$nextTick(() => {
						this.$dialog.toast({
							mes: '图片上传失败,请重新选择！！',
							timeout: 1500
						});
						this.fileList = []
						this.isUpload = false
						document.getElementsByClassName('el-upload')[this.uploadNum].style = 'display:inline-block'
					})
				}
			},
			onError(err, file, fileList){
				
				
				this.$dialog.loading.close();
				this.$dialog.toast({
                    mes: '上传图片失败，请点击重新上传',
                    timeout: 1500
                });
			},
			imgChange(file, fileList) {
				const isLt2M = file.size / 1024 / 1024 < 4;
				if(!isLt2M) {
					this.$dialog.toast({
						mes: '图片大小不能超过4M~~',
						timeout: 1500
					});
					this.fileList = []
				} else {
					this.fileList = fileList;
					this.isUpload = true;
					if(fileList.length == 1) {
						document.getElementsByClassName('el-upload')[this.uploadNum].style = 'display:none'
					}
				}
				return isLt2M;
			},
			//打开dia
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleRemove(file, fileList) {
				this.isUpload = false;
				this.successUpload = false;
				this.fileList = [];
				if(fileList.length < 1) {
					document.getElementsByClassName('el-upload')[this.uploadNum].style = 'display:inline-block'
				}
				this.$emit('update:picUrl','')
			},
			uploadImg() {
				this.$dialog.loading.open('图片上传中...');
				this.$refs.upload.submit();
			},
		}
	}
</script>

<style lang='scss'>
	#uploadImg {
			margin-top: .25rem;
			display: flex;
			align-items: center;
			.upload_btn {
				line-height: .4rem;
				background: #018BE6;
				color: white;
				padding: .1rem;
				border-radius: .1rem;
				margin-left: .25rem;
			}
		}
</style>