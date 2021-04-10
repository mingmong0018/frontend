<template>
      
  <div v-if="user!=null">
      
      <b-form  @submit="onSubmit">
        <input type="hidden" name="id" :value="user.mem_id">
        <div>
          <div class="profile_background">
            <div class="profile_image">
              <img :src="imgUrl" refs="fixImage" style="width:100%;height:100%;"/>
            </div>
            <!-- <label><img src="@/static/images/profileSelect.png" /></label> -->
            <label class="profile_edit" for="input-file"><div style="width:30px;height:30px;text-align:center"><img src="@/static/images/profileSelect.png" width="20px" ></div> </label>
              <input type="file" @change="onChangeImage" refs="changeImage" id="input-file" style="display:none">
          </div>
          <b-form-group
            id="input-group-1"
            label="이메일"
            label-for="input-1"
            description="귀하의 이메일을 다른 사람과 공유하지 않습니다."
          >
            <b-form-input
              id="input-1"
              v-model="user.mem_email"
              type="email"
              placeholder="이메일을 입력해주세요."
            ></b-form-input>
          </b-form-group>
          <b-form-group
          id="input-group-2"
          label="간편 로그인"
          label-for="input-2"
          class="inputTitle"
          >
          
          <b-form-input
            id="id"
            name="id"
            v-model="simpleLoginName"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="닉네임*"
          label-for="input-3"
          class="inputTitle"
        >
          <b-form-input
            id="nickname"
            name="nickname"
            v-model="user.mem_nickname" 
            :state="validation" 
            placeholder="닉네임을 입력해주세요"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
          2-8자로 제한됩니다.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
          괜찮습니다.
          </b-form-valid-feedback>
          </b-form-group>

          <b-form-group
          id="input-group-4"
          label="나이*"
          label-for="input-4"
          class="inputTitle"
          >
          <b-form-input
            required
            id="age"
            name="age"
            type=number
            v-model="user.mem_age"
            min=10
            max=100
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-5"
          label="성별*"
          label-for="input-5"
          class="inputTitle"
          >
          <b-radio 
            name="gender"
            value="f"
            checked v-model='user.mem_gender'
           
            >
            여성
          </b-radio>
          <b-radio 
            name="gender"
            value="m"
            checked v-model='user.mem_gender'
            
            >
            남성
          </b-radio>
          
          
        </b-form-group>

        <b-form-group
          id="input-group-6"
          label="본인인증여부*"
          label-for="input-6"
          class="inputTitle"
          >
          <b-form-checkbox
            id="confirm"
            :checked="user.mem_confirm=='y'"
            disabled
            class="lineSpacing"
          >인증됨</b-form-checkbox>

          <template v-if="user.mem_confirm=='n'">
            <emailModal/>
          </template>
           
        </b-form-group>
        <br>
        <b-button type="submit" variant="primary" id="sumitBtn">수정</b-button>
      </div>
     </b-form>
  </div>
</template>

<script>
import axios from 'axios'
import emailModal from '@/components/Member/emailAuthentication.vue'
export default {
    components:{
      emailModal
    },
    async created(){
      await this.getMember()

    
      
    },
    data(){
        return{
          
          files:null,
          imgUrl:null,
          simpleLoginName:null,
          user:{

          },
          
        }
    },
    methods:{
        onChangeImage(e){
          this.files=e.target.files[0];
          this.imgUrl=URL.createObjectURL(this.files);
          console.log(this.imgUrl);
        },
        onSubmit(){
           const formData=new FormData(); 
           formData.append('image',this.files)
           formData.append('email',this.user.mem_email)
           formData.append('id',this.user.mem_id)
           formData.append('gender',this.user.mem_gender)
           formData.append('nickname',this.user.mem_nickname)
           formData.append('age',this.user.mem_age)
           
           axios.post('api/updateMember',formData,{
             headers:{
               Authorization : "Bearer "+this.$store.state.Login.accessToken,
               'Content-Type': 'multipart/form-data',
             }
           }).then(res=>{
             if(res.data!="1"){
              //  this.$router.go();
              this.getMember();
              alert("수정이 완료되었습니다!");
             }
           })
        },
        getMember(){
            const params=new URLSearchParams({
                id:this.$store.state.Login.userId
            });
            // axios.post(process.env.VUE_APP_AXIOS_URL+'/getMember',params,{
            // headers:{
            //     Authorization : "Bearer "+this.$store.state.Login.accessToken
            //     }
            // })
            axios({
               url:process.env.VUE_APP_AXIOS_URL+'/getMember',
               method:'GET',
               params:{
                 id:this.$store.state.Login.userId
               },
               headers:{
                Authorization : "Bearer "+this.$store.state.Login.accessToken
                }
            }).then(res=>{
            
                if(res.data!=''){
                  console.log(res.data);
                  // this.gender=res.data.mem_gender;
                  this.user=res.data;
                  this.imgUrl=res.data.mem_image;
                  const tmp=String(res.data.mem_id).split("_").reverse();
                  if(tmp[1]=="google"){
                    this.simpleLoginName="구글"
                  }else if(tmp[1]=="naver"){
                    this.simpleLoginName="네이버"
                  }else{
                    this.simpleLoginName="카카오"
                  }
                }else{
                  this.$store.dispatch("Login/LOGOUTCLICK")
                } 

            }).catch(( err ) => {
                console.log( err );
                throw err;
            })
        
        },
       
    },
    computed:{
        
        validation() {
        const nickName=String(this.user.mem_nickname);
        return nickName.length > 1 && nickName.length < 8
      },
     
       
    }

}
</script>

<style scope>
.inputTitle{
  font-size:14px;
}
.lineSpacing{
  float:left;
  margin-right:5vw;
}
#sumitBtn{
  width:100%;

}
.profile_background{
  width:100%;
  height:80px;
  margin-top: 30px;
  margin-bottom: 30px;
  
}
.profile_image{
  margin: 0 auto;
  width:80px;
  height:80px;
  border-radius:50%;
  overflow: hidden;
  
}
.profile_edit{
  
  margin:0 55%;
  background: black;
  width:30px;
  height:30px;
  border-radius:50%;
  overflow: hidden;
}
.mailSubmitBtn{
  float:right;font-size:14px;margin-bottom:10px
}
</style>