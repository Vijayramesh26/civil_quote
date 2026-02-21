<template>
  <v-card variant="flat" class="floor-card mb-6 overflow-hidden">
    <v-card-text class="pa-5">
      <v-row dense align="center">
        <v-col cols="12" sm="5">
          <div class="input-label mb-1">FLOOR DESIGNATION</div>
          <v-text-field
            v-model="modelValue.name"
            placeholder="e.g. Ground Floor"
            variant="solo"
            flat
            density="comfortable"
            hide-details
            class="premium-input font-weight-black"
            bg-color="white"
          >
            <template #prepend-inner>
              <v-icon
                icon="mdi-office-building"
                color="grey-lighten-1"
                size="20"
                class="mr-2"
              ></v-icon>
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="input-label mb-1" :class="{ 'text-error': !modelValue.sqft }">TOTAL AREA</div>
          <v-text-field
            v-model.number="modelValue.sqft"
            type="number"
            variant="solo"
            flat
            density="comfortable"
            suffix="SQ.FT"
            hide-details
            class="premium-input"
            :class="{ 'invalid-input': !modelValue.sqft }"
            bg-color="white"
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3">
          <div class="input-label mb-1" :class="{ 'text-error': !modelValue.rate }">BASE RATE</div>
          <v-text-field
            v-model.number="modelValue.rate"
            type="number"
            variant="solo"
            flat
            density="comfortable"
            prefix="₹"
            hide-details
            class="premium-input"
            :class="{ 'invalid-input': !modelValue.rate }"
            bg-color="white"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="1" class="d-flex justify-center justify-sm-end mt-4 mt-sm-0">
          <v-btn
            icon
            color="grey-lighten-3"
            variant="flat"
            size="small"
            @click="$emit('remove')"
            class="delete-btn elevation-1"
          >
            <v-icon color="grey-darken-1">mdi-close</v-icon>
            <v-tooltip activator="parent" location="top">Remove Floor</v-tooltip>
          </v-btn>
        </v-col>
      </v-row>

      <div class="d-flex justify-end align-center mt-4">
        <div class="text-overline font-weight-bold text-grey-darken-1 mr-3">SUBTOTAL</div>
        <div class="text-h6 font-weight-black text-gold-dark">
          ₹{{ (modelValue.sqft * modelValue.rate).toLocaleString('en-IN') }}
        </div>
      </div>
    </v-card-text>
    <div class="floor-accent"></div>
  </v-card>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue', 'remove'],
  watch: {
    'modelValue.sqft'(newVal) {
      if (newVal < 0) this.modelValue.sqft = 0
    },
    'modelValue.rate'(newVal) {
      if (newVal < 0) this.modelValue.rate = 0
    },
  },
}
</script>

<style scoped>
.floor-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 16px !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
}

.floor-card:hover {
  border-color: #c5a059;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  background: white !important;
}

.premium-input :deep(.v-field) {
  border-radius: 12px !important;
  border: 1px solid #f1f5f9 !important;
  transition: all 0.2s ease;
}

.premium-input :deep(.v-field--focused) {
  border-color: #c5a059 !important;
  box-shadow: 0 0 0 4px rgba(197, 160, 89, 0.1);
}

.input-label {
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #94a3b8;
  text-transform: uppercase;
}

.floor-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: linear-gradient(to bottom, #c5a059, #a08145);
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.floor-card:hover .floor-accent {
  opacity: 1;
}

.text-gold-dark {
  color: #a08145;
}

.delete-btn {
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background-color: #fee2e2 !important;
}

.delete-btn:hover :deep(.v-icon) {
  color: #ef4444 !important;
}

.invalid-input :deep(.v-field) {
  border-color: #ff5252 !important;
  background-color: #fff5f5 !important;
}

.text-error {
  color: #ff5252 !important;
}
</style>
