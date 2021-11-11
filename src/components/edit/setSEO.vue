<template>
  <div class="seo">
    <strong class="seo-label">SEO блок:</strong>
    <div class="seo-inputs">
      <div class="seo-input">
        <label for="URL">URL:</label>
        <input
          type="text"
          id="URL"
          placeholder="URL"
          v-model="inputSEOURL"
          @input="pushData"
        />
      </div>
      <div class="seo-input">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          v-model="inputSEOTitle"
          @input="pushData"
        />
      </div>
      <div class="seo-input">
        <label for="keywords">Keywords:</label>
        <input
          type="text"
          id="keywords"
          placeholder="word"
          v-model="inputSEOWords"
          @input="pushData"
        />
      </div>
      <div class="seo-input seo-textarea">
        <label for="seoDescription">Description</label>
        <textarea
          id="seoDescription"
          placeholder="Description"
          v-model="inputSEODescription"
          @input="pushData"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputSEOURL: this.objSEOURL,
      inputSEOTitle: this.objSEOTitle,
      inputSEOWords: this.objSEOWords,
      inputSEODescription: this.objSEODescription,
    };
  },
  
  props: ["objSEOURL", "objSEOTitle", "objSEOWords", "objSEODescription"],

  methods: {
    pushData() {
      let inputValue = {
        seoURL: this.inputSEOURL,
        seoTitle: this.inputSEOTitle,
        seoWords: this.inputSEOWords,
        seoDescription: this.inputSEODescription,
      }
      for (let key in inputValue) {
        if (inputValue[key] === undefined) {
          inputValue[key] = '';
        }
}
      this.$emit("push-data", inputValue);
    },
  },
};
</script>

<style scoped>
.seo-input label {
  margin-right: 20px;
}
.seo-input input {
  width: 300px;
}
.seo-textarea textarea {
  resize: none;
  width: 500px;
  height: 100px;
}
.seo-label {
  margin-right: 30px;
}
.seo,
.seo-textarea {
  display: flex;
}
.seo {
  margin-top: 30px;
  margin-bottom: 50px;
}
.seo-inputs {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: space-between;
}
</style>
