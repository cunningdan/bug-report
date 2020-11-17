<template>
  <div class="home container-fluid">
    <h1>Bugs</h1>
    <form @submit.prevent="postBug">
      <input type="text" v-model="state.newBug.title"> <br>
      <input type="text" v-model="state.newBug.description">
      <button type="submit" class="btn btn-danger">
        Post Bug
      </button>
    </form>
    <div class="row">
      <bug-component v-for="bug in bugs" :key="bug" :bug-prop="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import BugComponent from '../components/BugComponent'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      newBug: {
        closed: false
      }
    })
    onMounted(() => {
      bugService.getBugs()
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      postBug() {
        bugService.postBug(state.newBug)
      }
    }
  },
  components: { BugComponent }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
