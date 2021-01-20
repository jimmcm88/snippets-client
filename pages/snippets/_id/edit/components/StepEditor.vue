<template>
  <div>
    <textarea ref="textarea"></textarea>
    <div class="bg-white p-8 rounded-lg text-gray-600">
      <StepMarkdown :stepBody="currentStep.body"></StepMarkdown>
    </div>
  </div>
  
</template>

<script>
  import StepMarkdown from '@/components/snippets/StepMarkdown';

  export default {
    components: {
      StepMarkdown
    },
    props: {
      currentStep: {
        required: true,
        type: Object
      }
    },
    data() {
      return {
        codemirror: null
      }
    },
    computed: {
      document() {
        return this.codemirror.getDoc();
      }
    },
    watch: {
      'currentStep.uuid'() {
        this.document.setValue(this.currentStep.body);
      }
    },
    mounted() {
      let CodeMirror = require('codemirror');

      this.codemirror = CodeMirror.fromTextArea(this.$refs.textarea, {
        indentUnit: 2,
        indentWithTabs: false,
        smartIndent:true,
        lineWrapping:true,
        lineNumbers: false,
        scrollbarStyle: null,
        extraKeys: {
          Tab: (codemirror) => codemirror.execCommand('indentMore'),
          'Shift-Tab': (codemirror) => codemirror.execCommand('indentLess'),
        }
      });
      this.document.setValue(this.currentStep.body);
      this.document.on('change', (document) => {
        this.$emit('input', document.getValue());
      });
    }

  }
</script>

<style lang="scss">
  .CodeMirror {
    @apply font-sans text-base w-full mb-6 border-dashed rounded border-2 rounded-lg border-gray-300 p-8;
  }
</style>>
