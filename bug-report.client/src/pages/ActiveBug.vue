<template>
  <div class="activeBug col bg-dark text-primary">
    <h3>{{ activeBug.title }}</h3>
    <div class="row">
      <note-component v-for="note in notes" :key="note" :note-prop="note" />
    </div>
    <form @submit.prevent="postNote">
      <input type="text" v-model="state.newNote.content">
      <button class="btn btn-warning" type="submit">
        Post Comment
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import NoteComponent from '../components/NoteComponent.vue'
export default {
  name: 'ActiveBug',
  setup(props) {
    const state = reactive({
      newNote: {}
    })
    const route = useRoute()
    onMounted(async() => {
      await bugService.getById(route.params.bugId)
      await noteService.getNotes(route.params.bugId)
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      postNote() {
        state.newNote.bugId = AppState.activeBug._id
        noteService.postNote(state.newNote)
      }
    }
  },
  components: { NoteComponent }
}
</script>

<style la
    NoteComponentng="scss" scoped>
  .activeBug{
    text-shadow: 2px 2px 8px;
  }

</style>
