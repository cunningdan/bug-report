<template>
  <div class="noteComponent col text-center">
    <h5>{{ noteProp.content }}</h5>
    <p>Posted by: {{ noteProp.profile.name }}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'NoteComponent',
  props: ['noteProp'],
  setup() {
    return {
      users: computed(() => AppState.user)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
