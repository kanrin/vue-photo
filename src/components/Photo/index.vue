<template>
    <el-card class="box-card" shadow="never">
        <el-slider v-model="zoom" :min="100" :max="1000" label="缩放" :show-tooltip="false"></el-slider>
        <span class="preview-img-list">
            <el-card shadow="always" class="preview-box" :body-style="{ padding: '0px' }" v-for="(item, index) in items" v-bind:key="index">
                <vue-load-image>
                    <img slot="preloader" :src="load" :style="{'maxWidth': zoom + 'px' , 'maxHeight': zoom + 'px'}"/>
                    <img slot="error" :src="error" :style="{'maxWidth': zoom + 'px' , 'maxHeight': zoom + 'px'}"/>
                    <img class="preview-img-item" slot="image" :src="item.src" @click="$photoswipe.open(index, items)" :style="{'maxWidth': zoom + 'px' , 'maxHeight': zoom + 'px'}"/>
                </vue-load-image>
            </el-card>
        </span>
        <br>
        <el-pagination background small layout="prev, pager, next" :total="total" :page-size="pageSize" style="text-align: center" @current-change="onHandlePage"></el-pagination>
    </el-card>
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
  import VueLoadImage from 'vue-load-image'
  import load from '@/assets/db87a8a5a8d8d60c43672935134f4b14.gif'
  import error from '@/assets/86e07ce84f12f8162f341057987999f3.jpeg'

  export default {
    data () {
      return {
        srcs: [],
        items: [],
        total: 1,
        pageSize: 20,
        zoom: 200,
        load,
        error
      }
    },
    components: {
      'vue-load-image': VueLoadImage
    },
    created() {
      this.fullscreenLoading = true;
      fetch('http://localhost:8000/oss', {
        'content-type':'application/json',
      }).then((r) => {
        this.fullscreenLoading = false;
        if(r.ok) {
          r.json().then(j => {
            this.srcs = j
            this.total = j.length
            for (let i=0;i<this.pageSize;i++) {
              this.items.push(this.srcs[i])
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
      onHandlePage(p) {
        const getValue = (currentValue, index) => {
          const pagemin = (p-1)*this.pageSize
          const pagemax = p*this.pageSize-1
          if(index >= pagemin && index <= pagemax ) {
            return currentValue
          }
        }
        this.items = this.srcs.filter(getValue)
      },
      handleChange(v) {
        this.pageSize = v
      }
    }
  }
</script>