<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container mx-auto px-6 lg:px-0 py-10 pb-16">
        <div>
          <h1 class="text-4xl text-gray-700 font-medium leading-tight mb-4">
            {{ snippet.title }}
          </h1>

          <div class="text-gray-600 text-sm">
            Created by
            <nuxt-link
              :to={}
            >
              {{ snippet.author.data.name }}
            </nuxt-link>
          </div>
        </div>
      </div>  
    </div>
    <div class="container mx-auto px-6 lg:px-0">
      <h2 class="text-lg text-gray-600 font-medium mb-4">
        1/1. {{ currentStep.title }}
      </h2>

      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-8/12 lg:mr-16 flex flex-wrap lg:flex-nowrap justify-between items-start mb-8">
          <div class="order-first">
            <StepNavigationButton :step="previousStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </StepNavigationButton>
          </div>

          <div class="bg-white p-8 rounded-lg text-gray-600 w-full mx-2">
            {{ currentStep.body }}
          </div>

          <div class="flex flex-row lg:flex-col order-first lg:order-last">
            <StepNavigationButton :step="nextStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </StepNavigationButton>

            <nuxt-link 
              :to="{
                name: 'snippets-id-edit',
                params: {
                  id: snippet.uuid
                },
                query: {
                  step: currentStep.uuid
                }
              }"
              class="block bg-blue-500 mb-2 p-3 rounded-lg order-first lg:order-last"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </nuxt-link>
          </div>
        </div>

        <div class="w-full lg:w-4/12">
          <div class="mb-8">
            <h2 class="text-lg text-gray-600 font-medium mb-4">
              Step
            </h2>

            <StepList :steps="steps" :currentStep="currentStep"></StepList>
          </div>
          <div class="text-gray-500 text-sm">
            Use ctrl + shift + left or right on tyour keyboard to navigate between steps
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>
import StepList from './components/StepList'
import StepNavigationButton from './components/StepNavigationButton'
import {orderBy as _orderBy} from 'lodash';

export default {
  components: {
    StepList,
    StepNavigationButton
  },
  head() {
    return {
      title: `${this.snippet.title || 'Untitled snippet'}`
    }
  },
  data() {
    return {
      snippet: null,
      steps: []
    }
  },
  async asyncData({ app, params }) {
    let snippet = await app.$axios.$get(`snippets/${params.id}`);

    return {
      snippet: snippet.data,
      steps: snippet.data.steps.data
    }
  },
  computed: {
    orderedStepsAsc() {
      return _orderBy(this.steps, 'order', 'asc');
    },
    orderedStepsDesc() {
      return _orderBy(this.steps, 'order', 'desc');
    },
    firstStep() {
      return this.orderedStepsAsc[0];
    },
    previousStep() {
      return this.orderedStepsDesc.find(
        (step) => step.order < this.currentStep.order
      ) || null
    },
    nextStep() {
      return this.orderedStepsAsc.find(
        (step) => step.order > this.currentStep.order
      ) || null
    },
    currentStep() {
      return this.orderedStepsAsc.find(
        (step) => step.uuid === this.$route.query.step
      ) || this.firstStep
    },
  }
}
</script>