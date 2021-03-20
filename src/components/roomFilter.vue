<template>
    <b-modal
        id="room-filter"
        title="검색 조건 설정"
        centered
        @ok="onSubmit"
    >
        <div id="filter">
            <div id="room-price">
                <div id="filter-deposit">
                    <div class="mini-title">보증금</div>
                    <input type="number" v-model="form.minDeposit" id="min-deposit"/>원 ~
                    <input type="number" v-model="form.maxDeposit" id="max-deposit"/>원
                </div>
                <div id="filter-rent">
                    <div class="mini-title">월세</div>
                    <input type="number" v-model="form.minRent" id="min-rent"/>원 ~
                    <input type="number" v-model="form.maxRent" id="max-rent"/>원
                    <br><div style="padding:5px 0 0 80px; font-size:0.8em;">&#8251;&nbsp;만 원 단위로 입력하세요.</div>
                </div>
            </div>
            <div id="option">
                <div id="room-option">
                    <b-form-group id="input-group-1" label="방 옵션" v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                            id="roomOption"
                            v-model="form.roomOption"
                            :options="roomOptions"
                            :aria-describedby="ariaDescribedby"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
                <div id="etc-option">
                    <b-form-group id="input-group-2" label="기타 옵션" v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                            id="etcOption"
                            v-model="form.etcOption"
                            :options="etcOptions"
                            :aria-describedby="ariaDescribedby"
                        ></b-form-checkbox-group>
                    </b-form-group>
                </div>
            </div>
        </div>
    </b-modal>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            form: {
                roomOption:[],
                etcOption:[],
                minDeposit:0,
                maxDeposit:9999,
                minRent:0,
                maxRent:9999
            },
            roomOptions:[],
            etcOptions:[]
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();
            this.getFilteringList();
        },
        getFilteringList() {
            const optionArr = this.form.roomOption.concat(this.form.etcOption);
            let option='';
            optionArr.forEach(item => {
                option=option+item+',';
            });
            option=option.slice(0, -1);
            const params = {
                options:option,
                minDeposit:this.form.minDeposit,
                maxDeposit:this.form.maxDeposit,
                minRent:this.form.minRent,
                maxRent:this.form.maxRent,
            }
            console.log(params);
            axios({
                url: '/api/filterList', 
                params: params,
            }).then((res) => {
                console.log(res.data);
            });
        }
    },
    created() {
        axios({
            url: '/api/options', 
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

<style>
    #filter-deposit {
        margin-bottom:15px;
    }
    #room-price {
        margin-bottom:25px;
    }
    #room-option {
        margin-bottom:25px;
    }
    #min-deposit, #max-deposit, #min-rent, #max-rent {
        width:120px;
        margin-right:5px;
    }
    .mini-title {
        float:left;
        width:80px;
        height:auto;
        overflow:hidden;
    }

    #filter {
        width:100%;
        padding:20px 30px;
        overflow: hidden;
    }

    #room-price input {
        text-align: right;
    }
</style>