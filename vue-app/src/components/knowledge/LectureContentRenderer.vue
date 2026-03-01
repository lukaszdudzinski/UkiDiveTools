<template>
  <div class="lecture-content-renderer">
    <template v-for="(block, index) in contentArray" :key="index">
      
      <component 
        v-if="block.type === 'header'" 
        :is="`h${block.level || 3}`" 
        :id="block.id || `toc-${index}`"
        class="lecture-header"
      >
        {{ block.value }}
      </component>

      <p 
        v-else-if="block.type === 'paragraph' || block.type === 'text'"
        class="lecture-paragraph"
      >
        {{ block.value }}
      </p>

      <component 
        v-else-if="block.type === 'list'"
        :is="block.ordered ? 'ol' : 'ul'"
        class="lecture-list"
      >
        <li v-for="(item, i) in block.items" :key="i" v-html="item"></li>
      </component>

      <div 
        v-else-if="block.type === 'image'"
        class="infographic-container"
      >
        <img 
          :src="block.src" 
          :alt="block.alt || 'Infografika'" 
          class="lecture-infographic new-standard" 
          title="Kliknij, aby powiększyć"
          @click="$emit('image-click', block.src)"
        >
        <p v-if="block.caption" class="img-caption"><i>{{ block.caption }}</i></p>
      </div>

      <div 
        v-else-if="block.type === 'info-box'"
        class="highlight-box"
        :class="`style-${block.style || 'info'}`"
      >
        <strong v-if="block.title">{{ block.title }}</strong>
        <p v-html="block.content"></p>
      </div>

      <div 
        v-else-if="block.type === 'html'"
        v-html="block.value"
        class="custom-html-block"
      ></div>

    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  content: {
    type: [Array, String],
    required: true
  }
});

defineEmits(['image-click']);

const contentArray = computed(() => {
  if (Array.isArray(props.content)) {
    return props.content;
  }
  // Fallback for legacy string content - wrap it in single HTML block
  if (typeof props.content === 'string') {
    return [{ type: 'html', value: props.content }];
  }
  return [];
});
</script>

<style scoped>
.lecture-content-renderer {
  color: #e0e0e0;
  line-height: 1.6;
}
.lecture-header {
  color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.lecture-paragraph {
  margin-bottom: 1rem;
  font-size: 1.05rem;
}
.lecture-list {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}
.lecture-list li {
  margin-bottom: 0.5rem;
}
.infographic-container {
  margin: 2rem 0;
  text-align: center;
}
.lecture-infographic {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: transform 0.2s;
}
.lecture-infographic:hover {
  transform: scale(1.02);
}
.img-caption {
  font-size: 0.85em;
  color: #aaa;
  margin-top: 0.5rem;
}
.highlight-box {
  padding: 1.2rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
}
.highlight-box.style-info {
  background: rgba(33, 150, 243, 0.1);
  border-left: 4px solid #2196F3;
}
.highlight-box.style-warning {
  background: rgba(255, 99, 71, 0.1);
  border-left: 4px solid #ff4500;
}
.highlight-box strong {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}
.highlight-box p {
  margin: 0;
}
.custom-html-block {
    margin-bottom: 1rem;
}
/* For legacy HTML content that contains headers and lists */
.custom-html-block :deep(h3), .custom-html-block :deep(h4) {
    color: #fff;
    margin-top: 1.5rem;
    margin-bottom: 0.8rem;
}
.custom-html-block :deep(p) {
    margin-bottom: 1rem;
}
.custom-html-block :deep(ul) {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
}
</style>
