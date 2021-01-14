<template>
  <div>
    <div class="bg-white mb-16">
      <div class="container mx-auto px-6 lg:px-0 py-10 pb-16">
        <div>
          <input 
            type="text" 
            class="text-4xl text-gray-700 font-header w-full block font-medium leading-tight mb-4 p-2 border-2 border-gray-300 rounded border-dashed" 
            value=""
            placeholder="Untitled snippet"
            v-model="snippet.title"
          >

          <div class="text-gray-600 text-sm">
            Created by
            <nuxt-link
              :to={}
            >
              Jim McMillan 
            </nuxt-link>
          </div>
        </div>
      </div>  
    </div>
    <div class="container mx-auto px-6 lg:px-0">
      <div class="flex items-center mb-4">
        <div class="mr-2 text-lg font-header text-gray-600 font-medium">
          {{ currentStep.order }}/ {{steps.length}}. 
        </div>
        <input 
          type="text" 
          class="text-lg text-gray-600 font-medium p-2 py-1 border-2 rounded border-dashed border-gray-300 bg-transparent w-full" 
          placeholder="Untitled step" 
          value=""
          v-model="currentStep.title"
        >
      </div>

      <div class="flex flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-8/12 lg:mr-16 flex flex-wrap lg:flex-nowrap justify-between items-start mb-8">
          <div class="order-first flex lg:flex-col">
            <StepNavigationButton :step="previousStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </StepNavigationButton>

            <nuxt-link 
              :to="{}"
              class="block bg-blue-500 mb-2 p-3 rounded-lg"
              title="Add step before"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </nuxt-link>
          </div>

          <div class="w-full mx-2">
            <textarea class="w-full mb-6 border-dashed rounded border-2" v-model="currentStep.body"></textarea>
            <div class="bg-white p-8 rounded-lg text-gray-600">
              Markdown content
            </div>
          </div>

          

          <div class="flex lg:flex-col order-first lg:order-last flex-row-reverse">
            <StepNavigationButton :step="nextStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </StepNavigationButton>

            <nuxt-link 
              :to="{}"
              class="block bg-blue-500 mb-2 p-3 rounded-lg"
              title="Add step after"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 6V12M12 12V18M12 12H18M12 12L6 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </nuxt-link>

            <nuxt-link 
              :to="{}"
              class="block bg-blue-500 mb-2 p-3 rounded-lg"
              title="Delete step"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </nuxt-link>
          </div>
        </div>

        <div class="w-full lg:w-4/12">
          <div class="mb-8">
            <h2 class="text-lg text-gray-600 font-medium mb-4">
              Step
            </h2>
            
            <StepList :steps="orderedStepsAsc" :currentStep="currentStep"></StepList>

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

import StepList from '../components/StepList';
import StepNavigationButton from '../components/StepNavigationButton';
import {orderBy as _orderBy} from 'lodash';
import {debounce as _debounce} from 'lodash';

export default {

  components: {
    StepList,
    StepNavigationButton
  },
  data() {
    return {
      snippet: null,
      steps: []
    }
  },

  head() {
    return {
      title: `Editing ${this.snippet.title || 'Untitled snippet'}`
    }
  },

  watch: {
    'snippet.title': {
      handler: _debounce(async function(title) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
          title
        });
      }, 500)
    },
    currentStep: {
      deep: true,
      handler: _debounce(async function(step) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
          title: step.title,
          body: step.body
        }); 
      }, 500)
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