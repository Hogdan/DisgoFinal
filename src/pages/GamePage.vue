<script setup>
import { ref, computed } from 'vue'
import eventsData from './events.js'
import CommentSection from 'src/components/CommentSection.vue'

const today = ref(new Date())
const events = ref([...eventsData].sort((a, b) => b.year - a.year))
const correctOrder = computed(() => [...eventsData].sort((a, b) => b.year - a.year))
const guessesRemaining = ref(4)
const rightDrawerOpen = ref(false)

let firstSelectedEvent = null
let firstSelectedIndex = null

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
function swapEvent(event, index) {
  if (guessesRemaining.value === 0) return // Prevent swapping after guesses are used up
  if (firstSelectedEvent === event) {
    // Deselect if the same event is clicked again
    const selected = document.querySelectorAll('.game-card')[index]
    fadeOut(selected)
    firstSelectedEvent = null
    firstSelectedIndex = null
    return
  }
  if (!firstSelectedEvent) {
    if (document.querySelectorAll('.game-card')[index].classList.contains('correct')) return
    firstSelectedEvent = event
    const selected = document.querySelectorAll('.game-card')[index]
    selected.classList.add('selected')
    firstSelectedIndex = index
  } else {
    if (document.querySelectorAll('.game-card')[index].classList.contains('correct')) return
    // insert first event into second event's position and push array items accordingly
    const secondIndex = events.value.indexOf(event)
    if (firstSelectedIndex !== -1 && secondIndex !== -1) {
      events.value.splice(secondIndex, 0, events.value.splice(firstSelectedIndex, 1)[0])
    }
    const selected = document.querySelectorAll('.game-card')[firstSelectedIndex]
    fadeOut(selected)
    firstSelectedEvent = null
    firstSelectedIndex = null
  }
}

function fadeOut(selected) {
  selected.classList.add('fade-out')
  setTimeout(() => {
    selected.classList.remove('fade-out')
    selected.classList.remove('selected')
  }, 500)
}

function checkAnswers() {
  // Check which events are in the correct position
  for (let i = 0; i < events.value.length; i++) {
    if (events.value[i].year === correctOrder.value[i].year) {
      const buttons = document.querySelectorAll('.game-card')
      buttons[i].classList.add('correct')
    }
  }
  if (guessesRemaining.value > 0) {
    guessesRemaining.value--
  } else {
    // No guesses left, reveal all correct answers
    const buttons = document.querySelectorAll('.game-card')
    for (let i = 0; i < events.value.length; i++) {
      if (events.value[i].year === correctOrder.value[i].year) {
        buttons[i].classList.add('correct')
      }
    }
  }
}
</script>

<template>
  <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered :width="300"
    :class="$q.dark.isActive ? 'dark box-shadow' : 'light box-shadow'">
    <CommentSection />
  </q-drawer>
  <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <q-page class="flex column items-center q-px-sm">
      <div class="page-title q-my-md"><span>Daily Puzzle</span><small>{{ today.toDateString() }}</small></div>
      <div class='content'>
        <div class="row items-center">
          <q-btn class="col-4" flat dense label="comments" fixed-bottom right @click="toggleRightDrawer()" />
          <small class="col-4 text-center">Recent</small>

        </div>
        <div class="flex column items-center game-container q-gutter-y-sm">
          <q-btn v-for="(event, index) in events" :key="event.year"
            :class="$q.dark.isActive ? 'dark game-card' : 'light game-card'" @click="swapEvent(event, index)"
            :label="event.title" />
          <small>Past</small>
          <div class="flex row button-row full-width justify-between q-mt-md">
            <div class="flex row items-center q-gutter-x-sm">
              <p>Remaining Guesses:</p>
              <span class="q-gutter-x-sm">
                <q-icon v-for="n in guessesRemaining" :key="n" name="circle"></q-icon>
              </span>
            </div>
            <div class="flex row items-center q-ml-sm">
              <q-btn rounded glossy color="positive" label="Check Answers" @click="checkAnswers" />
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<style lang="scss" scoped>
.correct {
  background-color: $positive !important;
}

.selected {
  box-shadow: 0 4px 10px rgba(65, 233, 255, 0.651), 0 -4px 10px rgba(71, 227, 255, 0.637);
}

.fade-out {
  animation: fadeOut 0.5s forwards;

  @keyframes fadeOut {
    from {
      box-shadow: 0 4px 10px rgba(65, 233, 255, 0.651), 0 -4px 10px rgba(71, 227, 255, 0.637);
    }

    to {
      box-shadow: none;
    }
  }
}

.content {
  width: 100%;
  max-width: 40rem;
}

.game-container {
  width: 100%;
  padding: 0;

  .button-row {
    @media (max-width: $media-width) {
      justify-content: center;
      flex-direction: row;
      gap: 1rem 0;
    }
  }

  .game-card {
    width: 100%;

  }
}
</style>
