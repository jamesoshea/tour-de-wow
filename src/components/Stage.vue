<template>
  <div :class="stageClasses">
    <h3>Day {{ index + 1 }}: {{ stage.startTown }} to {{ stage.endTown }}</h3>
    <div>
      {{ stage.heightGain }} meters of climbing in
      {{ stage.distance }} kilometres
    </div>
  </div>
</template>

<script>
export default {
  name: "Stage",
  props: {
    currentStage: Number,
    index: Number,
    stage: Object
  },
  computed: {
    stageClasses() {
      return {
        stage: true,
        "stage-active": this.currentStage === this.index + 1
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$ff-serif: "Roboto Slab", serif;
$ff-sans-serif: "Roboto", sans-serif;

div {
  font-family: $ff-sans-serif;
}

.stage {
  opacity: 0.7;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
}

.stage-active {
  opacity: 1;
}
</style>
