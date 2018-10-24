<template>
    <div id="app">
        <vue-particles class="particles" color="#efefef" :clickEffect="false" :hoverEffect="false"></vue-particles>
        <el-container>
            <el-main>
                <el-tabs type="border-card">
                    <el-tab-pane label="小猫窝">
                        <photo class="photo"></photo>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>

    </div>
</template>

<style>
    body {
        background-color: #222222;
        overflow: hidden;
    }

    .particles {
        position:absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

</style>

<script>
  import Photo from '@/components/Photo'
  import Title from '@/components/Title'

  export default {
    name: 'MainPage',
    components: { Photo, Title }
  }
</script>