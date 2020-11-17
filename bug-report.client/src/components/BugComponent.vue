<template>
  <div class="bugComponent col-3">
    <router-link :to="{ name: 'ActiveBug', params: { bugId: bugProp._id }}">
      <h2>{{ bugProp.title }}</h2>
    </router-link>
    <p>{{ bugProp.description }}</p>
    <form @submit.prevent="editBug">
      <input type="text" v-model="state.changedBug.description" placeholder="description">
    </form>
    <p>Reported By: {{ bugProp.profile.name }}</p>
    <p>Posted Date: {{ bugProp.createdAt }}</p>
    <p>Updated Date: {{ bugProp.updatedAt }}</p>
    <p>Status: {{ bugProp.closed }}</p>
    <button class="btn btn-warning" @click="close">
      Close bug
    </button>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { bugService } from '../services/BugService'
export default {
  name: 'BugComponent',
  props: ['bugProp'],
  setup(props) {
    const state = reactive({
      changedBug: {},
      closedBug: {
        closed: true
      }
    })
    return {
      state,
      users: computed(() => AppState.user),
      close() {
        bugService.editBug(props.bugProp._id, state.closedBug)
      },
      editBug() {
        bugService.editBug(props.bugProp._id, state.changedBug)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bugComponent{
  text-shadow: 2px 2px 8px;
}
</style>
