<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" style="width: 100%; text-align: center">
        <el-card class="box-card" shadow="never">
            <el-slider v-model="zoom" :min="100" :max="500" label="缩放" :show-tooltip="false"></el-slider>
            <span class="preview-img-list">
                <el-card shadow="always" class="preview-box" :body-style="{ padding: '0px' }" v-for="(item, index) in items" v-bind:key="index">
                    <img class="preview-img-item" :src="item.src" @click="$photoswipe.open(index, items)" :style="{'maxWidth': zoom + 'px' , 'maxHeight': zoom + 'px'}"/>
                </el-card>
            </span>
            <br>
            <el-pagination background small layout="prev, pager, next" :total="total" :page-size="pageSize" style="text-align: center" @current-change="onHandlePage"></el-pagination>
        </el-card>
    </div>
</template>

<style scoped>
    .preview-img-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 10px;
        justify-content: center;
    }
    .preview-box {
        margin: 5px;
    }
    .preview-img-item {
        padding: 0;
    }
</style>

<script>
  import { Message } from 'element-ui';

  export default {
    data () {
      return {
        fullscreenLoading: false,
        srcs: [],
        items: [],
        total: 1,
        pageSize: 20,
        zoom: 200
      }
    },
    created() {
      const _this_ = this
      _this_.fullscreenLoading = true;
      fetch('http://localhost:8000/oss', {
        'content-type':'application/json',
      }).then((r) => {
        _this_.fullscreenLoading = false;
        if(r.ok) {
          r.json().then(j => {
            _this_.srcs = j
            _this_.total = j.length
            for (let i=0;i<_this_.pageSize;i++) {
              _this_.items.push(_this_.srcs[i])
            }
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
    },
    methods: {
      onHandlePage(page) {
        const getValue = (currentValue, index) => {
          const pagemin = (page-1)*this.pageSize
          const pagemax = page*this.pageSize-1
          if(index >= pagemin && index <= pagemax ) {
            return currentValue
          }
        }
        this.items = this.srcs.filter(getValue)
      }
    }
  }
</script>