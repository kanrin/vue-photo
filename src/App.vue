<template>
    <div id="app">
        <el-container>
            <el-main>
                <photo class="photo"></photo>
            </el-main>
        </el-container>
    </div>
</template>

<style>
    body {
        background-color: #ffc7da;
        /*overflow: hidden;*/
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

  export default {
    name: 'MainPage',
    components: { Photo }
  }
</script>