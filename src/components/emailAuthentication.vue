<template>
    <div>
        <b-button variant="primary" class="mailSubmitBtn" v-b-modal.emailBtn>인증하기</b-button>
        <b-modal 
            id="emailBtn" 
            hide-footer
            title="쉐어룸 이메일 인증"
            >
            <div>
                <div>
                <b-form @submit.prevent="emailSend">
                    <b-form-group
                        label="이메일"
                        description="우리는 다른 누구와도 귀하의 이메일을 공유하지 않습니다."
                        
                    >
                    <table style="width:100%">
                        <tr>
                            
                            <td width="70%"><b-form-input
                            v-model="email"
                            id="input-1"
                            type="email"
                            placeholder="이메일을 입력하세요."
                            required
                            ></b-form-input></td>
                            <td><b-button type="submit" variant="primary" style="float:right">인증번호 요청</b-button></td>
                            
                        </tr>
                    </table>
                    </b-form-group>
                </b-form>        
                    
                </div>
                    
                    
                <div>
                 <b-form @submit.prevent="emailCertification">   
                    <b-form-group label="인증번호" label-for="input-2">
                        <table style="width:100%">
                            <tr>
                                <td width="70%"><b-form-input
                                    v-model="authValue"
                                    id="input-2"
                                    placeholder="인증번호를 입력하세요"
                                    required
                                    ></b-form-input></td>
                                
                                <td><b-button type="submit" variant="primary" style="float:right">인증하기</b-button></td>

                            </tr>
                        
                        </table>
                    </b-form-group>
                 </b-form>
                </div>
            </div>
        </b-modal>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:"",
            authValue:"",
        }
    },
    methods:{
        emailSend(){
            console.log(this.email);
            const param=new URLSearchParams({
                userEmail:this.email
            })
            axios.post('api/email',param,{
                headers:{
                    Authorization : "Bearer "+this.$store.state.Login.accessToken,
                }
            }).then(res=>{
                
                this.$store.state.EmailAuth.email=res.data[0];
                this.$store.state.EmailAuth.emailCode=res.data[1];
                
            })
        },
        emailCertification(){
            console.log(this.email)
                    console.log(this.authValue)
            if((this.email===this.$store.state.EmailAuth.email)&&(this.authValue===this.$store.state.EmailAuth.emailCode)){
                    
                    const param=new URLSearchParams({
                        id:this.$store.state.Login.userId
                    })       
                    axios.post('api/emailAuthSuccess',param,{
                        headers:{
                            Authorization : "Bearer "+this.$store.state.Login.accessToken,
                        }
                    }).then(()=>{
                        
                            alert("인증완료")
                            this.$router.go();   
                        
                    })
                
            }else{
                alert("재시도")
            }
        }
    }

}
</script>

<style>

</style>