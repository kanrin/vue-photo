<template>
    <div class="block">
        <el-carousel height="350px" style="align-items: center">
            <el-carousel-item v-for="(item, index) in items" v-bind:key="index" style="align-items: center;text-align: center">
                <img class="car" :src="item.src">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>


<style scoped>
    .car{
        width:auto;
        height:auto;
        max-width:100%;
        max-height:100%;
        align-items: center;
    }
</style>

<script>
  import { Message } from 'element-ui';

  export default {
    data () {
      return {
        fullscreenLoading: false,
        items: []
      }
    },
    created() {
      const _this_ = this
      _this_.fullscreenLoading = true;
      fetch('http://localhost:8000/carousel/0', {
        'content-type':'application/json',
      }).then((r) => {
        _this_.fullscreenLoading = false;
        if(r.ok) {
          r.json().then(j => {
            _this_.items = j
          })
        } else {
          Message({
            message: 'Network Error',
            type: 'warning',
            duration: 5 * 1000
          })
        }
      }).catch(e => {
        Message({
          message: e,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  }
</script>