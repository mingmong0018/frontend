<template>
    <div id="register-room-wrap">
        <div id="register-room">
            <div class="title">방 등록하기</div>
            <b-form>
                
                <b-form-group id="input-group-1" label="제목" label-for="title">
                    <b-form-input
                    id="title"
                    v-model="form.title"
                    placeholder="제목을 작성해 주세요. (50자 이내)"
                    required
                    :state="Boolean(form.title.length>0)"
                    @keyup="titleChar"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-2"
                    label="방 위치(주소)"
                    label-for="address"
                    description="안전을 위해 상세주소를 수집하지 않습니다. 동/호수 등은 문의 시 별도로 안내해 주세요 :-)"
                >
                    <b-row>
                        <b-col sm="10">
                            <b-form-input
                                id="address"
                                v-model="form.address"
                                placeholder="주소를 입력하세요"
                                required
                                readonly
                                :state="Boolean(form.address.length>0)"
                            />
                        </b-col>
                        <b-col sm="2">
                            <b-button @click="callDaumPost">주소검색</b-button>
                        </b-col>
                    </b-row>
                </b-form-group>

                <b-form-group
                    id="input-group-3"
                    label="방 사진 등록"
                    label-for="room-images"
                >
                    <b-form-file
                        id="room-images"
                        accept="image/jpeg, image/jpg, image/png, image/gif"
                        v-model="form.images"
                        :state="Boolean(form.images.length>0)"
                        placeholder="파일을 선택하세요."
                        no-drop
                        multiple
                        browse-text="파일선택"
                        @change="onChangeImage"
                    ></b-form-file>
                </b-form-group>
                <span style="font-size:0.8em;">등록된 사진 ({{ imageName.length }})</span>
                <div id="preview">
                    <div id="preview-image" v-for="image in this.imageName" :key="image.index">
                        <img :src="image">
                    </div>
                </div>
                <div style="padding-bottom:10px;">보증금 / 월세</div>
                <b-form-group description="만원 단위로 입력하세요.">
                <b-row>
                    <b-col>
                        <label class="sr-only" for="room-deposit">보증금</label>
                        <b-input-group prepend="보증금"
                            id="input-group-4"
                        >
                            <b-form-input id="room-deposit" type="number" min="0" v-model="form.deposit"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col>
                        <label class="sr-only" for="room-rent">월세</label>
                        <b-input-group prepend="월세"
                            id="input-group-5"
                        >
                            <b-form-input type="number" id="room-rent" min="1" v-model="form.rent"></b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
                </b-form-group>

                <b-form-group id="input-group-6" label="방 옵션" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        id="roomOption"
                        v-model="form.roomOption"
                        :options="roomOptions"
                        :aria-describedby="ariaDescribedby"
                    ></b-form-checkbox-group>
                </b-form-group>

                <b-form-group id="input-group-7" label="기타 옵션" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        id="etcOption"
                        v-model="form.etcOption"
                        :options="etcOptions"
                        :aria-describedby="ariaDescribedby"
                    ></b-form-checkbox-group>
                </b-form-group>

                <b-form-group
                    id="input-group-8"
                    label="방 소개"
                    label-for="room-report"
                    description="옵션 외의 조건 등을 상세하게 설명해 주세요 :-)"
                >
                    <b-form-textarea
                        id="room-report"
                        v-model="form.report"
                        placeholder="방 소개를 입력하세요.(10자 이상)"
                        @keyup="reportChar"
                        rows="10"
                        :state="Boolean(form.report.length>=10)"
                        :no-auto-shrink="shrink"
                        no-resize
                    ></b-form-textarea>
                </b-form-group>

                <b-form-group
                    id="input-group-9"
                    label="해시태그"
                    label-for="room-tag"
                    description="해시태그를 입력 후 'enter'키 또는 '추가'버튼을 눌러 추가해 주세요."
                >
                    <div class="hash-tag">
                        <div class="tags" v-for="(hashtag,index) in this.form.roomTag" :key="hashtag.index">
                            {{ hashtag }}
                            <img src="cancel.png" width="10" @click="deleteTag(index)">
                        </div>
                    </div>
                    <b-row>
                        <b-col cols="10" md="7">
                            <b-input-group size="sm" prepend="#">
                                <b-form-input id="room-tag" @keyup.enter="addTag"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols="2">
                            <b-button size="md" @click="addTag">추가</b-button>
                        </b-col>
                    </b-row>
                </b-form-group>

                <b-button 
                    @click="onSubmit" 
                    variant="primary" 
                    style="width: 150px; height: 50px; margin-left: calc(50% - 85px); margin-top:30px; margin-bottom:50px;"
                >
                    등록하기
                </b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                id:'',
                title:'',
                address:'',
                images:[],
                deposit:0,
                rent:0,
                report:'',
                roomOption:[],
                etcOption:[],
                roomTag:[]
            },
            imageName:[],
            roomOptions:[],
            etcOptions:[],
            shrink:true
        }
    },
    methods: {
        deleteTag(i) {
            this.form.roomTag.splice(i, 1);
        },
        addTag() {
            const roomTags=document.getElementById('room-tag').value;
            if(roomTags.length>0) {
                this.form.roomTag.push(roomTags);
                document.getElementById('room-tag').value='';
            }else {
                alert('태그를 입력하세요');
                document.getElementById('room-tag').focus();
            }
        },
        onChangeImage(e){
            this.imageName=[];
            e.target.files.forEach(image => {
                this.imageName.push(URL.createObjectURL(image));
            });
        },
        titleChar(e) {
            if(e.target.value.length > 50) {
                alert("글자수는 50자 이내로 제한됩니다.");
                e.target.value=e.target.value.substring(0, 50);
            }
        },
        reportChar(e) {
            if(e.target.value.length > 1000) {
                alert("글자수는 1000자 이내로 제한됩니다.");
                e.target.value=e.target.value.substring(0, 50);
            }
        },
        callDaumPost() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    if(data.autoJibunAddress!='') {
                        this.form.address=data.autoJibunAddress;
                    }else {
                        this.form.address=data.jibunAddress;
                    }
                }
            }).open();
        },
        onSubmit() {
            const formData=new FormData();
            formData.append('id',this.form.id);
            formData.append('title',this.form.title);
            formData.append('address',this.form.address);
            formData.append('deposit',this.form.deposit);
            formData.append('rent',this.form.rent);
            formData.append('report',this.form.report);
            let roomTags='';
            // 태그 배열을 문자열로 변환
            this.form.roomTag.forEach(tag => {
                roomTags=roomTags+tag+',';
            });
            // 마지막 쉼표 제거
            roomTags=roomTags.slice(0, -1);
            formData.append('roomTag',roomTags);
            const option = this.form.roomOption.concat(this.form.etcOption);
            formData.append('option',option);
            for(let i = 0; i < this.form.images.length; i++){
                formData.append("images"+i, this.form.images[i]);
            }
            axios.post(process.env.VUE_APP_AXIOS_URL+'/room',formData,
            {
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken,
                    'Content-Type': 'multipart/form-data',
                }
            }).then(res=>{
                if(res.data=="error") {
                    alert("일시적인 문제로 방을 등록하지 못했습니다. 관리자에게 문의해주세요.");
                }else {
                    alert("등록되었습니다. 내 방으로 이동합니다 :-)");
                    this.$router.push({name: 'RoomDetail', query: {roomId: String(res.data), changed: true}});
                }
            })
        }
    },
    created() {
        const params=new URLSearchParams({
            id:this.$store.state.Login.userId
        });
        axios({
            url: process.env.VUE_APP_AXIOS_URL+'/getMember', 
            method: "GET",
            params: params,
            headers:{
                Authorization : "Bearer "+this.$store.state.Login.accessToken
            }
        }).then((res) => {
            if(res.data!='') {
                this.form.id=res.data.mem_id;
            }else{
                this.$store.dispatch("Login/LOGOUTCLICK")
            } 
        }).catch(( err ) => {
        console.log( err );
        throw err;
        })
    },
    mounted() {
        axios({
        url: process.env.VUE_APP_AXIOS_URL+'/options', 
        method: "GET"
        }).then((res) => {
            const options=res.data;
            options.forEach(item => {
                if(item.option_group=='room') {
                    this.roomOptions.push({text: item.option_name, value: item.option_id});
                }else if(item.option_group=='etc') {
                    this.etcOptions.push({text: item.option_name, value: item.option_id});
                }
            });
        });
    }
}
</script>

<style scoped src="@/static/css/registerUpdateRoom.css">
</style>

<style scoped>
</style>
