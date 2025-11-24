<script setup>
import { ref, inject } from 'vue'

const text = ref('')
const comments = ref([])
const profile = inject('profile')
function Comment(text) {
  this.author = profile.value.getName() || 'anon'
  this.date = new Date()
  this.text = text
}
function submitComment() {
  if (text.value.trim() === '') return
  comments.value.push(new Comment(text.value))
  text.value = ''
}

</script>
<template>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-scroll-area class="fit comment-container q-py-sm">
      <q-item class="comment" v-for="(comment, index) in comments" :key="index">
        <q-item-section>
          <div class="comment-header q-gutter-x-sm">
            <q-avatar size="1.5rem">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <q-item-label class="comment-author">{{ comment.author }}</q-item-label>
            <q-item-label class="comment-date text-grey">
              {{ comment.date.toLocaleTimeString() }}
            </q-item-label>
          </div>
        </q-item-section>
        <q-item-section>
          <p class="comment-text">{{ comment.text }}</p>
        </q-item-section>
      </q-item>
      <q-form @submit.prevent="submitComment" class="q-mt-md q-pa-sm fixed-bottom">
        <q-input v-model="text" dense outlined autogrow placeholder="Leave a comment" />
        <div class="flex row full-width reverse q-mt-sm">
          <q-btn rounded type="submit" label="Post" color="primary" />
        </div>
      </q-form>
    </q-scroll-area>
  </transition>
</template>

<style lang="scss" scoped>
.comment-container {
  height: 100%;
  overflow-y: auto;
}

.comment {
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0.5rem;

  &::after {
    content: '';
    display: block;
    height: 0.1rem;
    background-color: $secondary;
    margin-top: 0.5rem;
    width: 100%;
    align-self: center;
  }


  .comment-header {
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;

    .comment-author {
      font-weight: bold;
    }

    .comment-date {
      margin: 0 0 0 auto;
    }
  }

  .comment-text {
    white-space: pre-wrap;
  }
}
</style>
