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
          {{ currentStepIndex + 1 }}/{{steps.length}}. 
        </div>
        <input 
          type="text" 
          class="text-lg text-gray-600 font-header p-2 py-1 border-2 rounded border-dashed border-gray-300 bg-transparent w-full" 
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

            <AddStepButton 
              position="before"
              :snippet="snippet" 
              :currentStep="currentStep"
              @stepAdded="handleStepAdded"
            />
          </div>

          <div class="w-full mx-2">
            <StepEditor :currentStep="currentStep" v-model="currentStep.body"></StepEditor>
          </div>

          

          <div class="flex lg:flex-col order-first lg:order-last flex-row-reverse">
            <StepNavigationButton :step="nextStep">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </StepNavigationButton>

            <AddStepButton 
              position="after"
              :snippet="snippet" 
              :currentStep="currentStep"
              @stepAdded="handleStepAdded"
            />

            <DeleteStepButton
              :snippet="snippet"
              :currentStep="currentStep"
              @stepDeleted="handleStepDeleted"
              v-if="steps.length > 1"
            >
            </DeleteStepButton>
          </div>
        </div>

        <div class="w-full lg:w-4/12">
          <div class="mb-8">
            <h2 class="text-lg text-gray-600 font-medium mb-4">
              Step
            </h2>
            
            <StepList :steps="orderedStepsAsc" :currentStep="currentStep"></StepList>
          </div>
          <div class="py-6 border-t-2 border-gray-300">
              <h2 class="text-lg text-gray-600 font-medium mb-4">
                Publishing
              </h2>
              <div class="text-gray-500 text-sm">
                <p v-if="lastSaved">Last saved: {{ lastSavedFormatted }}</p>
                <p v-else>No changes saved</p>
              </div>

              <div class="flex items-baseline">  
                <input type="checkbox" name="is_public" id="is_public" v-model="snippet.is_public">

                <div class="ml-2">
                  <label class="text-sm text-gray-600" for="is_public">Make this snippet public</label>
                </div>
              </div>

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

import browseSnippet from '@/mixins/snippets/browseSnippet';
import {debounce as _debounce} from 'lodash';
import moment from 'moment';

import StepEditor from './components/StepEditor';
import StepList from '../components/StepList';
import StepNavigationButton from '../components/StepNavigationButton';
import AddStepButton from './components/AddStepButton';
import DeleteStepButton from './components/DeleteStepButton';

export default {

  components: {
    StepList,
    StepNavigationButton,
    AddStepButton,
    DeleteStepButton,
    StepEditor
  },

  mixins: [
    browseSnippet
  ],
  
  data() {
    return {
      snippet: null,
      steps: [],

      lastSaved: null
    }
  },

  head() {
    return {
      title: `Editing ${this.snippet.title || 'Untitled snippet'}`
    }
  },

  computed: {
    lastSavedFormatted() {
      return moment(this.lastSaved).format('HH:mm:ss');
    }
  },

  methods: {
    touchLasteSaved() {
      this.lastSaved = moment.now();
    },
    handleStepAdded(step) {
      this.steps.push(step);
      this.goToStep(step);
    },
    handleStepDeleted(step) {
      let previousStep = this.previousStep;

      this.steps = this.steps.filter((s) => {
        return s.uuid !== step.uuid
      });

      this.goToStep(previousStep || this.firstStep)
    }
  },

  watch: {
    'snippet.title': {
      handler: _debounce(async function(title) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
          title
        });

        this.touchLasteSaved();
      }, 500)
    },
    'snippet.is_public': {
      handler: _debounce(async function(is_public) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}`, {
          is_public
        });

        this.touchLasteSaved();
      }, 500)
    },
    currentStep: {
      deep: true,
      handler: _debounce(async function(step) {
        await this.$axios.$patch(`snippets/${this.snippet.uuid}/steps/${step.uuid}`, {
          title: step.title,
          body: step.body
        });

        this.touchLasteSaved();
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

}
</script>