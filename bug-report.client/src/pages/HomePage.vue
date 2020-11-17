<template>
  <div class="home container-fluid bg-dark text-primary">
    <h1 class="text-primary">
      Bugs
    </h1>
    <form @submit.prevent="postBug">
      <input type="text" v-model="state.newBug.title" placeholder="Title"> <br>
      <input type="text" v-model="state.newBug.description" placeholder="Description"> <br>
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
