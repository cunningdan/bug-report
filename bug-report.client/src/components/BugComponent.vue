<template>
  <div class="bugComponent col-3">
    <router-link :to="{ name: 'ActiveBug', params: { bugId: bugProp._id }}">
      <h2>{{ bugProp.title }}</h2>
    </router-link>
    <p>{{ bugProp.description }}</p>
    <p>Reported By: {{ bugProp.profile.name }}</p>
    <p>Posted Date: {{ bugProp.createdAt }}</p>
    <p>Updated Date: {{ bugProp.updatedAt }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'BugComponent',
  props: ['bugProp'],
  setup() {
    return {
      users: computed(() => AppState.user)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
