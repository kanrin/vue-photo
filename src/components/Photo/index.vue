<template>
    <div class="preview-img-list" v-loading.fullscreen.lock="fullscreenLoading">
        <img class="preview-img-item" v-for="(item, index) in items" v-bind:key="index" :src="item.src" @click="$photoswipe.open(index, items)" />
    </div>
</template>

<style scoped>
    .preview-img-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .preview-img-item {
        margin: 5px;
        max-width: 100px;
        max-height: 100px;
    }
</style>

<script>
  export default {
    data () {
      return {
        fullscreenLoading: false,
        items: [{"src":"http://localhost:8000/photos/_DSC1835.JPG","w":5456,"h":3064},{"src":"http://localhost:8000/photos/_DSC2265.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2300.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2302.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2303.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2304.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2305.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2306.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2309.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2310.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2311.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2313.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2316.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2320.JPG","w":1616,"h":1080},{"src":"http://localhost:8000/photos/_DSC2323.JPG","w":1616,"h":1080}]
      }
    },
    created() {
//      this.fullscreenLoading = true;
      fetch('http://localhost:8000').then((r) => {
        if(r.ok) {
          this.req = r
        } else {
          this.req = 'fetch error'
        }
      }).catch(e => {
        this.req = e
      })
    }
  }
</script>