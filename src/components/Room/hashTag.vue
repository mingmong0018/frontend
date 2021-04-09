<template>
    <div class="tags" v-if="this.tags.length>0">
        <div id="room-tag" v-for="tag in tags" :key="tag.index">
            <span>#{{ tag.tag_content }}</span>
        </div>
    </div>
    <div class="tags" v-else>
        <div id="room-tag"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        roomId: {
            type: Number
        },
    },
    data() {
        return {
            roomNumber:this.roomId,
            tags:[],
        }
    },
    mounted() {
        if(this.roomNumber!=null) {
            this.getTags(this.roomNumber);
        }
    },
    watch: {
        roomId: function(newRoomId) {
            this.getTags(newRoomId);
        }
    },
    methods: {
        getTags(roomId) {
            axios.get('/api/roomTag', {
                params: {
                    roomId: roomId
                }
            }).then((res) => {
                this.tags=res.data;
            });    
        }
    }
}
</script>

<style>
.tags {
    width:300px;
    height:auto;
    overflow:hidden;
}
#room-tag {
    position:relative;
    height:40px;
    float:left;
}

#room-tag span {
    line-height:40px;
    margin-right:5px;
    font-size:0.9em;
    border-radius: 2px;
    background: #ffbb8e;
}

</style>