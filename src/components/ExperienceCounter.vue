<script setup>
import { ref, computed } from 'vue';

const animatedExp = ref(0)
function animateExperience(experienceEarned) {
  const duration = 1500 // 1.5 seconds
  const steps = 60
  const increment = experienceEarned.value / steps
  let currentStep = 0

  const timer = setInterval(() => {
    currentStep++
    animatedExp.value = Math.floor(increment * currentStep)

    if (currentStep >= steps) {
      animatedExp.value = experienceEarned.value
      clearInterval(timer)
    }
  }, duration / steps)
}
const props = defineProps({
  experienceEarned: {
    type: Number,
    required: true,
    default: 0
  }
})
const experienceEarned = computed(() => props.experienceEarned)
animateExperience(experienceEarned)
</script>

<template>
  <div v-if="experienceEarned > 0" class="experience-gained">
    <div class="text-center">
      <div :class="$q.dark.isActive ? 'experience-label dark' : 'experience-label light'">Experience Earned</div>
      <div class="experience-counter">+{{ animatedExp }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.experience-gained {
  padding: 0.75rem 0.5rem 0.25rem 0.5rem;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(103, 58, 183, 0.1) 100%);
  border-radius: 8px;

  .experience-label {
    background-color: transparent;
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 110, 129, 0.2);
  }

  .experience-counter {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(145deg, $primary-dark 35%, $accent-dark 65%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: bounce 0.6s ease-out;
  }
}
</style>
