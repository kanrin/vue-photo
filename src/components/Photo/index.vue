<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" style="width: 100%; text-align: center">
        <el-card class="box-card" shadow="never">
            <span class="preview-img-list">
                <el-card shadow="always" class="preview-box" :body-style="{ padding: '0px' }" v-for="(item, index) in items" v-bind:key="index">
                    <img class="preview-img-item" :src="item.src" @click="$photoswipe.open(index, items)" />
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
    }
    .preview-box {
        align-self: center;
    }
    .preview-img-item {
        margin: 5px;
        max-width: 200px;
        max-height: 200px;
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
        pageSize: 20
      }
    },
    created() {
      const _this_ = this
      _this_.fullscreenLoading = true;
      fetch('/oss', {
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