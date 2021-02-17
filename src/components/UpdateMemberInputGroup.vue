<template>
  <div v-if="user!=null">
      
      <b-form  @submit="onSubmit">
        <div>
        
        <b-form-group
        id="input-group-1"
        label="간편 로그인"
        label-for="input-1"
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
        label="성별"
        label-for="input-5"
        class="inputTitle"
        >
        <b-form-checkbox 
          name="gender"
          :checked="user.mem_gender=='f'"
          disabled
          class="lineSpacing"
          >
          여성
        </b-form-checkbox>
        <b-form-checkbox 
          name="gender"
          :checked="user.mem_gender=='m'"
          disabled
          >
          남성
        </b-form-checkbox>
        
      </b-form-group>

      <b-form-group
        id="input-group-6"
        label="본인인증여부"
        label-for="input-6"
        class="inputTitle"
        >
        <b-form-checkbox
          id="confirm"
          :checked="user.mem_confirm=='y'"
          disabled
          class="lineSpacing"
        >인증됨</b-form-checkbox>
        <b-form-checkbox
          id="confirm"
          :checked="user.mem_confirm=='n'"
          disabled
        >인증안됨</b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary" id="sumitBtn">수정</b-button>
      </div>
     </b-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    async created(){
      await this.getMember()


    
      
    },
    data(){
        return{
          user:{

          },
          simpleLoginName:'',

        }
    },
    methods:{
        onSubmit(){
           const params=new URLSearchParams({
             id:this.user.mem_id,
             nickname:this.user.mem_nickname,
             age:this.user.mem_age
           }); 
           axios.post('api/updateMember',params,{
             headers:{
               Authorization : "Bearer "+localStorage.accessToken
             }
           }).then(res=>{
             if(res.data!="1"){
               this.$router.go();
             }else{
               this.$store.dispatch("Login/LOGOUTCLICK")
             }
           })
        },
        getMember(){
            const params=new URLSearchParams({
                id:localStorage.userId
            });
            // params.append('id',this.id);
            // params.append('pwd',this.pwd);
            axios.post('/api/getMember',params,{
            headers:{
                Authorization : "Bearer "+localStorage.accessToken
                }
            }).then(res=>{
                
            
                if(res.data!=''){
                  this.user=res.data;
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
        
        }
       
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
  font-size:1.8vh;
}
.lineSpacing{
  float:left;
  margin-right:5vw;
}
#sumitBtn{
  width:100%;

}
</style>