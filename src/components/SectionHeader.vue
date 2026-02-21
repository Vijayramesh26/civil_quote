<template>
  <div class="pa-4 d-flex align-center section-header mb-6">
    <div class="icon-box mr-4 elevation-2">
      <v-icon :icon="icon" color="white" size="20"></v-icon>
    </div>
    <div class="header-content">
      <span
        class="text-overline font-weight-black letter-spacing-2 text-slate-light d-block mb-n1"
        >{{ subtitle || 'Specification' }}</span
      >
      <span class="text-h6 font-weight-black text-slate uppercase-tracking">{{ title }}</span>
    </div>
    <v-spacer></v-spacer>
    <slot name="action"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.section-header {
  position: relative;
}

.icon-box {
  background: linear-gradient(135deg, #c5a059 0%, #a08145 100%);
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.text-slate-light {
  color: #64748b;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}

.uppercase-tracking {
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
