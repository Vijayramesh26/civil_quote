<template>
  <v-app class="app-container">
    <!-- Premium App Bar -->
    <v-app-bar
      elevation="0"
      class="px-md-8 border-b glass-header"
      color="rgba(255, 255, 255, 0.8)"
      height="90"
    >
      <div class="d-flex align-center">
        <div class="logo-box mr-4 elevation-3 overflow-hidden d-flex align-center justify-center bg-white">
          <v-img src="/logo.png" cover width="52" height="52"></v-img>
        </div>
        <div>
          <h1 class="text-h5 font-weight-black text-slate mb-0 tracking-tight">
            URU<span class="text-gold">DHI</span>
          </h1>
          <div class="d-flex align-center mt-n1">
            <div class="status-dot mr-2"></div>
            <p class="text-caption text-grey-darken-1 font-weight-black uppercase-tracking-small">
              Premium Project Estimator
            </p>
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex align-center mr-6">
        <div class="text-right">
          <div class="text-caption text-grey-darken-1 font-weight-bold">QUOTATION DATE</div>
          <div class="text-subtitle-2 font-weight-black text-slate">
            {{ store.client.date || 'NOT SET' }}
          </div>
        </div>
      </div>
      <v-btn
        color="#c5a059"
        variant="elevated"
        class="text-white px-8 d-none d-md-flex premium-btn"
        height="50"
        rounded="xl"
        prepend-icon="mdi-file-export"
        @click="exportPdf"
        :disabled="!isFormValid"
      >
        GENERATE QUOTE
      </v-btn>
    </v-app-bar>

    <v-main class="main-content">
      <!-- Sophisticated Background Pattern -->
      <div class="bg-pattern"></div>

      <v-container class="py-12 px-4 px-md-12 maxWidth-xl position-relative">
        <v-row>
          <!-- Left Column: Form Details -->
          <v-col cols="12" lg="8">
            <v-row>
              <v-col cols="12" md="6">
                <v-card class="premium-card" elevation="0">
                  <SectionHeader
                    title="Entity Information"
                    subtitle="Provider Details"
                    icon="mdi-shield-check"
                  />
                  <v-card-text class="pt-2 px-6 pb-6">
                    <v-text-field
                      v-model="store.company.name"
                      label="Company Name"
                      variant="outlined"
                      density="comfortable"
                      class="mb-4 rounded-xl"
                      bg-color="white"
                      hide-details
                    ></v-text-field>
                    <v-row dense>
                      <v-col cols="12">
                        <v-text-field
                          v-model="store.company.owner"
                          label="Proprietor"
                          variant="outlined"
                          density="comfortable"
                          hide-details
                          class="mb-4 sm-mb-0 rounded-xl"
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.company.phone"
                          label="Primary Contact"
                          variant="outlined"
                          density="comfortable"
                          hide-details
                          class="rounded-xl"
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.company.phone2"
                          label="Secondary Contact"
                          variant="outlined"
                          density="comfortable"
                          hide-details
                          class="rounded-xl"
                          bg-color="white"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-textarea
                      v-model="store.company.address"
                      label="Registered Address"
                      variant="outlined"
                      rows="3"
                      hide-details
                      class="mt-4 rounded-xl"
                      bg-color="white"
                    ></v-textarea>

                    <div class="mt-6">
                      <v-file-input
                        label="Override Brand Identity"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-image-plus-outline"
                        prepend-icon=""
                        accept="image/*"
                        @change="handleLogoUpload"
                        hide-details
                        class="logo-upload"
                      ></v-file-input>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6">
                <v-card class="premium-card" elevation="0">
                  <SectionHeader
                    title="Project Details"
                    subtitle="Client Specifications"
                    icon="mdi-account-group"
                  />
                  <v-card-text class="pt-2 px-6 pb-6">
                    <v-text-field
                      v-model="store.client.name"
                      label="Client Entity"
                      variant="outlined"
                      density="comfortable"
                      class="mb-4 rounded-xl"
                      bg-color="white"
                      hide-details
                    ></v-text-field>
                    <v-text-field
                      v-model="store.client.date"
                      label="Proposal Date"
                      type="date"
                      variant="outlined"
                      density="comfortable"
                      class="mb-4 rounded-xl"
                      bg-color="white"
                      hide-details
                    ></v-text-field>
                    <v-textarea
                      v-model="store.client.site"
                      label="Site Location"
                      variant="outlined"
                      rows="3"
                      hide-details
                      class="rounded-xl"
                      bg-color="white"
                    ></v-textarea>
                    <div class="mt-5 d-flex align-center text-grey-darken-1">
                      <v-icon icon="mdi-map-marker-radius-outline" size="18" class="mr-2"></v-icon>
                      <span class="text-caption font-weight-bold uppercase-tracking-small"
                        >Ensure site address is precise</span
                      >
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Floor Specifications -->
            <v-card class="premium-card mt-8" elevation="0">
              <SectionHeader
                title="Architectural Floors"
                subtitle="Build Volumes"
                icon="mdi-layers-triple"
              >
                <template #action>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        v-bind="props"
                        variant="flat"
                        color="#c5a059"
                        size="small"
                        rounded="lg"
                        prepend-icon="mdi-plus"
                        class="text-white px-4 font-weight-black"
                      >
                        ADD FLOOR
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="name in ['First Floor', 'Second Floor', 'Head Room', 'Custom']"
                        :key="name"
                        @click="addFloorWithName(name)"
                      >
                        <v-list-item-title>{{ name }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </template>
              </SectionHeader>

              <v-card-text class="px-6 pb-6">
                <div
                  v-if="store.floors.length === 0"
                  class="text-center py-12 bg-white rounded-xl border-dashed"
                >
                  <v-icon
                    icon="mdi-file-document-plus-outline"
                    size="64"
                    color="grey-lighten-3"
                  ></v-icon>
                  <p class="text-grey-darken-1 mt-4 font-weight-bold">
                    Initialize your estimate by adding a floor volume.
                  </p>
                  <v-btn
                    variant="outlined"
                    color="gold"
                    class="mt-4"
                    prepend-icon="mdi-plus"
                    @click="store.addFloor"
                    >Begin Assessment</v-btn
                  >
                </div>

                <div class="floor-list">
                  <FloorItem
                    v-for="(floor, index) in store.floors"
                    :key="index"
                    v-model="store.floors[index]"
                    @remove="store.removeFloor(index)"
                  />
                </div>
              </v-card-text>
            </v-card>

            <!-- Supporting Documents & Attachments -->
            <v-card class="premium-card mt-8" elevation="0">
              <SectionHeader
                title="Appendices"
                subtitle="Supporting Documents"
                icon="mdi-attachment"
              />
              <v-card-text class="px-6 pb-6">
                <v-row>
                  <v-col cols="12">
                    <p class="text-caption text-grey-darken-1 mb-4 font-weight-medium">
                      Attach site photos, architectural plans, or supplementary PDF agreements to be appended at the end of your quotation.
                    </p>
                    <v-file-input
                      label="Upload Images or PDFs"
                      variant="outlined"
                      density="comfortable"
                      prepend-inner-icon="mdi-plus-box-outline"
                      prepend-icon=""
                      class="rounded-xl"
                      accept="image/*,application/pdf"
                      multiple
                      hide-details
                      @change="handleAttachmentUpload"
                    ></v-file-input>
                  </v-col>
                </v-row>

                <div v-if="store.attachments && store.attachments.length > 0" class="mt-6">
                  <div class="text-overline font-weight-black text-slate-light mb-2">ATTACHED FILES ({{ store.attachments.length }})</div>
                  <v-list class="bg-slate-soft rounded-xl pa-2">
                    <v-list-item
                      v-for="(file, index) in store.attachments"
                      :key="index"
                      class="mb-1 rounded-lg bg-white border"
                    >
                      <template #prepend>
                        <v-icon :icon="file.type.includes('pdf') ? 'mdi-file-pdf-box' : 'mdi-file-image-outline'" :color="file.type.includes('pdf') ? 'error' : 'gold'"></v-icon>
                      </template>
                      <v-list-item-title class="text-caption font-weight-bold text-slate">{{ file.name }}</v-list-item-title>
                      <template #append>
                        <v-btn icon="mdi-close" variant="text" density="comfortable" color="grey" @click="store.removeAttachment(index)"></v-btn>
                      </template>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card-text>
            </v-card>

            <!-- Comprehensive Material Selection -->
            <v-card class="premium-card mt-8" elevation="0">
              <SectionHeader
                title="Technical Specifications"
                subtitle="Quality & Material Standards"
                icon="mdi-palette-swatch"
              />
              <v-card-text class="px-6 pb-6">
                <v-row>
                  <!-- Structural -->
                  <v-col cols="12" md="4">
                    <div class="group-header mb-4">
                      <v-icon icon="mdi-hard-hat" color="gold" size="18" class="mr-2"></v-icon>
                      <span>STRUCTURAL</span>
                    </div>
                    <v-text-field
                      v-model="store.materials.concreteGrade"
                      label="Concrete Grade"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.concreteBrand"
                      label="Concrete Brand"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.steelBrand"
                      label="Steel Brand/Grade"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.sandType"
                      label="Sand Specification"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.brickPrice"
                      label="Brick Quality/Rate"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.cementBrands"
                      label="Cement Selection"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>

                  <!-- Finishing: Tiles & Paint -->
                  <v-col cols="12" md="4">
                    <div class="group-header mb-4">
                      <v-icon icon="mdi-brush" color="gold" size="18" class="mr-2"></v-icon>
                      <span>FINISHING & TILES</span>
                    </div>
                    <v-text-field
                      v-model="store.materials.paintInterior"
                      label="Interior Palette"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.paintExterior"
                      label="Exterior Protection"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-row dense>
                      <v-col cols="7">
                        <v-text-field
                          v-model="store.materials.vitrifiedSize"
                          label="Vitrified Size"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model.number="store.materials.vitrifiedRate"
                          label="Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row dense>
                      <v-col cols="7">
                        <v-text-field
                          v-model="store.materials.bathWallHeight"
                          label="Bath Wall Ht"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model.number="store.materials.bathFloorRate"
                          label="Floor Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>

                  <!-- Plumbing & Electrical -->
                  <v-col cols="12" md="4">
                    <div class="group-header mb-4">
                      <v-icon
                        icon="mdi-lightning-bolt"
                        color="gold"
                        size="18"
                        class="mr-2"
                      ></v-icon>
                      <span>SYSTEMS</span>
                    </div>
                    <v-text-field
                      v-model="store.materials.electricalBrand"
                      label="Wire Brand"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-row dense>
                      <v-col cols="7">
                        <v-text-field
                          v-model="store.materials.switchBrand"
                          label="Switch Brand"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="5">
                        <v-text-field
                          v-model.number="store.materials.switchRate"
                          label="Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-text-field
                      v-model="store.materials.cpvcBrand"
                      label="CPVC Pipe Brand"
                      variant="outlined"
                      density="compact"
                      class="mb-2"
                    ></v-text-field>
                    <v-text-field
                      v-model="store.materials.wastePipeBrand"
                      label="Waste Pipe Brand"
                      variant="outlined"
                      density="compact"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-divider class="my-6"></v-divider>

                <v-row>
                  <!-- Woodwork & Hardware -->
                  <v-col cols="12" md="6">
                    <div class="group-header mb-4">
                      <v-icon icon="mdi-door" color="gold" size="18" class="mr-2"></v-icon>
                      <span>WOOD & OPENINGS</span>
                    </div>
                    <v-row dense>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.materials.woodMaterial"
                          label="Main Door Wood"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.materials.mainDoorFrameSize"
                          label="Frame Size"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.materials.shutterThickness"
                          label="Shutter Thick"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="store.materials.doorLockCompany"
                          label="Lock Company"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model.number="store.materials.mortiseLockRate"
                          label="Mortise Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model.number="store.materials.toiletDoorRate"
                          label="Toilet Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="store.materials.loftWidth"
                          label="Loft Width"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="store.materials.kitchenStone"
                          label="Kitchen Stone Type"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model.number="store.materials.kitchenStoneRate"
                          label="Stone Rate"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>

                  <!-- Extra Work Costing -->
                  <v-col cols="12" md="6">
                    <div class="group-header mb-4">
                      <v-icon icon="mdi-currency-inr" color="gold" size="18" class="mr-2"></v-icon>
                      <span>EXTRA WORK & OTHERS</span>
                    </div>
                    <v-row dense>
                      <v-col cols="12">
                        <v-text-field
                          v-model="store.materials.staircaseHandrail"
                          label="Staircase Specification"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="store.materials.workNotIncluded"
                          label="Exclusions / Not Included"
                          variant="outlined"
                          density="compact"
                          rows="3"
                          class="mb-2"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.ugSumpBrick"
                          label="UG Sump Brick/L"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.ugSumpTile"
                          label="UG Sump Tiles/L"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.septicTank"
                          label="Septic Tank/L"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.weatheringRate"
                          label="Weathering/Sqft"
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                          class="mb-2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.compoundWall4_5"
                          label='Wall 4.5" RFT'
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model.number="store.materials.compoundWall9"
                          label='Wall 9" RFT'
                          prefix="₹"
                          variant="outlined"
                          density="compact"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Right Column: Summary & Payment -->
          <v-col cols="12" lg="4">
            <div class="sticky-sidebar">
              <!-- Valuation Card -->
              <v-card class="valuation-card mb-8 shadow-premium" elevation="0">
                <div class="valuation-body pa-8">
                  <div class="d-flex justify-space-between align-center mb-1">
                    <span class="text-overline font-weight-black text-slate-light letter-spacing-2"
                      >Project Total</span
                    >
                    <v-icon icon="mdi-seal-variant" color="#c5a059" size="24"></v-icon>
                  </div>
                  <div class="text-h3 font-weight-black text-slate mb-6 tabular-nums">
                    {{ store.formattedTotalAmount }}
                  </div>

                  <v-divider class="mb-6"></v-divider>

                  <v-row no-gutters>
                    <v-col cols="6" class="border-e pr-4">
                      <div
                        class="text-caption font-weight-bold text-slate-light uppercase-tracking-small mb-1"
                      >
                        Total Coverage
                      </div>
                      <div class="text-h6 font-weight-black text-slate">
                        {{ totalSqft }}
                        <span class="text-caption font-weight-bold text-slate-light">SQ.FT</span>
                      </div>
                    </v-col>
                    <v-col cols="6" class="pl-6">
                      <div
                        class="text-caption font-weight-bold text-slate-light uppercase-tracking-small mb-1"
                      >
                        Avg per Sq.ft
                      </div>
                      <div class="text-h6 font-weight-black text-slate">₹{{ avgRate }}</div>
                    </v-col>
                  </v-row>
                </div>
                <!-- Preview Action -->
                <div class="pa-4 bg-slate-soft text-center border-t">
                  <v-btn
                    variant="text"
                    block
                    color="#c5a059"
                    class="font-weight-black"
                    prepend-icon="mdi-file-eye-outline"
                    @click="handlePreview"
                  >
                    PREVIEW QUOTE PDF
                  </v-btn>
                </div>
                <div class="valuation-footer pa-4 text-center">
                  <span class="text-caption font-weight-black text-white-70 letter-spacing-1"
                    >OFFICIAL PROJECT ASSESSMENT</span
                  >
                </div>
              </v-card>

              <!-- Preview Dialog -->
              <v-dialog v-model="showPreview" maxWidth="900" height="90vh">
                <v-card class="rounded-xl overflow-hidden d-flex flex-column" height="100%">
                  <v-card-title class="d-flex align-center py-4 px-6 bg-white border-b">
                    <div>
                      <span class="text-h6 font-weight-black text-slate">DOCUMENT PREVIEW</span>
                      <p class="text-caption text-grey-darken-1 mb-0 mt-n1">
                        Review your generated quotation before finalizing
                      </p>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon="mdi-close"
                      variant="tonal"
                      @click="showPreview = false"
                      density="comfortable"
                    ></v-btn>
                  </v-card-title>

                  <v-card-text class="pa-0 bg-grey-lighten-4 flex-grow-1">
                    <iframe
                      v-if="previewPdfUrl"
                      :src="previewPdfUrl"
                      width="100%"
                      height="100%"
                      style="border: none"
                    ></iframe>
                    <div v-else class="d-flex align-center justify-center h-100">
                      <v-progress-circular indeterminate color="#c5a059"></v-progress-circular>
                    </div>
                  </v-card-text>

                  <v-card-actions class="pa-6 bg-white border-t">
                    <v-btn variant="text" class="px-6 font-weight-bold" @click="showPreview = false"
                      >CANCEL</v-btn
                    >
                    <v-spacer></v-spacer>
                    <v-btn
                      color="#c5a059"
                      variant="flat"
                      class="text-white px-8 font-weight-black"
                      rounded="xl"
                      prepend-icon="mdi-download"
                      @click="exportPdf"
                    >
                      DOWNLOAD FINAL PDF
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Escrow Card -->
              <v-card class="premium-card mb-8" elevation="0">
                <SectionHeader
                  title="Escrow Terms"
                  subtitle="Invoicing Milestones"
                  icon="mdi-handshake-outline"
                />
                <v-card-text class="px-6 pb-6">
                  <div class="payment-timeline">
                    <div
                      class="payment-step"
                      v-for="(val, key) in store.paymentSchedule"
                      :key="key"
                    >
                      <div class="step-line"></div>
                      <div class="step-indicator"></div>
                      <div class="step-content">
                        <div class="d-flex justify-space-between align-center">
                          <span
                            class="text-caption font-weight-black text-slate-light text-uppercase tracking-wider"
                            >{{ key }}</span
                          >
                          <div class="d-flex align-center">
                            <input
                              type="number"
                              :value="store.paymentSchedule[key]"
                              @input="updatePayment(key, $event.target.value, $event)"
                              class="compact-input"
                              min="0"
                              max="100"
                            />
                            <span class="ml-1 text-caption font-weight-bold text-grey">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <v-divider class="my-6"></v-divider>

                  <div
                    class="pa-4 bg-slate-soft rounded-xl d-flex justify-space-between align-center"
                  >
                    <div>
                      <div
                        class="text-caption font-weight-black text-grey-darken-1 uppercase-tracking-small"
                      >
                        TOTAL ALLOCATION
                      </div>
                      <div class="text-h6 font-weight-black text-slate">
                        {{ totalPercent }}% / 100%
                      </div>
                    </div>
                    <v-progress-circular
                      :model-value="totalPercent"
                      :color="
                        totalPercent === 100 ? 'success' : totalPercent > 100 ? 'error' : 'orange'
                      "
                      size="42"
                      width="6"
                    ></v-progress-circular>
                  </div>

                  <div
                    v-if="totalPercent !== 100"
                    class="mt-4 pa-3 rounded-lg bg-orange-lighten-5 d-flex align-center"
                  >
                    <v-icon
                      icon="mdi-alert-circle-outline"
                      color="orange"
                      size="20"
                      class="mr-3"
                    ></v-icon>
                    <span class="text-caption font-weight-bold text-orange-darken-3">
                      Allocation must be exactly 100% (Current: {{ totalPercent }}%)
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Mobile Bottom Navigation for Quick Actions -->
    <v-footer
      app
      v-if="$vuetify.display.xs"
      class="pa-4 glass-footer border-t"
      color="rgba(255, 255, 255, 0.9)"
    >
      <v-row no-gutters align="center">
        <v-col cols="7">
          <div class="text-caption font-weight-bold text-grey-darken-1 mb-n1">TOTAL ESTIMATE</div>
          <div class="text-h5 font-weight-black text-slate">{{ store.formattedTotalAmount }}</div>
        </v-col>
        <v-col cols="5">
          <v-btn
            block
            color="gold-dark"
            height="48"
            rounded="lg"
            class="text-white font-weight-black shadow-sm"
            @click="exportPdf"
            :disabled="!isFormValid || isGenerating"
            :loading="isGenerating"
          >
            GENERATE
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import { useEstimateStore } from './stores/estimate'
import { generateEstimatePDF } from './services/pdfService'
import SectionHeader from './components/SectionHeader.vue'
import FloorItem from './components/FloorItem.vue'

export default {
  components: {
    SectionHeader,
    FloorItem,
  },
  setup() {
    const store = useEstimateStore()
    return { store }
  },
  computed: {
    totalSqft() {
      return this.store.floors.reduce((sum, f) => sum + (f.sqft || 0), 0)
    },
    avgRate() {
      if (this.totalSqft === 0) return 0
      return Math.round(this.store.totalAmount / this.totalSqft)
    },
    totalPercent() {
      return Object.values(this.store.paymentSchedule).reduce(
        (sum, val) => sum + (Number(val) || 0),
        0,
      )
    },
    isFormValid() {
      const hasClient = !!this.store.client.name
      const hasFloors = this.store.floors.length > 0
      const floorsValid = this.store.floors.every((f) => f.sqft > 0 && f.rate > 0)
      const paymentValid = this.totalPercent === 100

      return hasClient && hasFloors && floorsValid && paymentValid
    },
  },
  methods: {
    addFloorWithName(name) {
      if (name === 'Custom') {
        this.store.addFloor()
      } else {
        this.store.floors.push({ name: name, sqft: 0, rate: 0 })
      }
    },
    handleLogoUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = () => {
        this.store.updateLogo(reader.result)
      }
      reader.readAsDataURL(file)
    },
    async handleAttachmentUpload(event) {
      const files = event.target.files
      if (!files) return

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        
        reader.onload = () => {
          this.store.addAttachment({
            name: file.name,
            type: file.type,
            data: reader.result // Base64 string
          })
        }
        reader.readAsDataURL(file)
      }
      // Reset input soSame file can be uploaded again if removed
      event.target.value = ''
    },
    async exportPdf() {
      this.isGenerating = true
      try {
        await generateEstimatePDF(this.store.$state)
      } finally {
        this.isGenerating = false
      }
    },
    async handlePreview() {
      this.isGenerating = true
      try {
        this.previewPdfUrl = await generateEstimatePDF(this.store.$state, 'dataurl')
        this.showPreview = true
      } finally {
        this.isGenerating = false
      }
    },
    updatePayment(key, value, event) {
      const num = Math.floor(Number(value) || 0)
      const othersTotal = Object.entries(this.store.paymentSchedule)
        .filter(([k]) => k !== key)
        .reduce((sum, [_, v]) => sum + (Number(v) || 0), 0)

      const allowed = Math.max(0, 100 - othersTotal)
      const finalValue = Math.min(num, allowed)

      this.store.paymentSchedule[key] = finalValue

      // If user tried to go higher than allowed, manually reset the input field
      if (event && event.target && Number(event.target.value) !== finalValue) {
        event.target.value = finalValue
      }
    },
  },
  data() {
    return {
      showPreview: false,
      previewPdfUrl: null,
      isGenerating: false,
    }
  },
}
</script>

<style>
:root {
  --primary-gold: #c5a059;
  --gold-deep: #a08145;
  --dark-slate: #1e293b;
  --slate-light: #64748b;
  --bg-premium: #f4f7fa;
  --card-border: rgba(226, 232, 240, 0.7);
}

.text-gold {
  color: var(--primary-gold) !important;
}
.text-slate {
  color: var(--dark-slate) !important;
}
.text-slate-light {
  color: var(--slate-light) !important;
}
.text-white-70 {
  color: rgba(255, 255, 255, 0.9) !important;
}
.text-white-60 {
  color: rgba(255, 255, 255, 0.75) !important;
}
.text-white-50 {
  color: rgba(255, 255, 255, 0.6) !important;
}
.text-white {
  color: #ffffff !important;
}

.app-container {
  font-family: 'Outfit', 'Inter', sans-serif !important;
  background-color: var(--bg-premium) !important;
}

.main-content {
  position: relative;
  min-height: 100vh;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50vh;
  background:
    radial-gradient(circle at 90% 10%, rgba(197, 160, 89, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 10% 90%, rgba(30, 41, 59, 0.03) 0%, transparent 40%);
  pointer-events: none;
}

/* Glass Header */
.glass-header {
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8) !important;
}

.logo-box {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.4);
}

.premium-card {
  background: white !important;
  border: 1px solid var(--card-border) !important;
  border-radius: 24px !important;
  transition: all 0.3s ease;
}

.premium-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.03) !important;
}

/* Valuation Card */
.valuation-card {
  background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
  border-radius: 28px !important;
  overflow: hidden;
  position: relative;
}

.valuation-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(197, 160, 89, 0.1) 0%, transparent 70%);
}

.valuation-footer {
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

/* Timeline Custom */
.payment-timeline {
  padding-left: 10px;
}

.payment-step {
  position: relative;
  padding-bottom: 15px;
  padding-left: 25px;
}

.step-line {
  position: absolute;
  left: 3px;
  top: 10px;
  bottom: 0;
  width: 2px;
  background: #f1f5f9;
}

.payment-step:last-child .step-line {
  display: none;
}

.step-indicator {
  position: absolute;
  left: 0;
  top: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #cbd5e1;
  border: 2px solid white;
  z-index: 1;
}

.payment-step:hover .step-indicator {
  background: var(--primary-gold);
  transform: scale(1.2);
}

.compact-input {
  width: 45px;
  border: none;
  background: #f8fafc;
  padding: 4px 6px;
  border-radius: 6px;
  font-weight: 800;
  text-align: right;
  color: var(--dark-slate);
  outline: none;
  transition: all 0.2s ease;
}

.compact-input:focus {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Utilities */
.tracking-tight {
  letter-spacing: -0.5px;
}
.uppercase-tracking-small {
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 0.65rem;
}
.letter-spacing-1 {
  letter-spacing: 1px;
}
.letter-spacing-2 {
  letter-spacing: 2px;
}
.border-white-10 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}
.bg-slate-soft {
  background-color: #f8fafc;
}

.shadow-premium {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
}

.premium-btn {
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.premium-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(197, 160, 89, 0.2) !important;
}

.group-header {
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--slate-light);
  display: flex;
  align-items: center;
}

.sticky-sidebar {
  position: sticky;
  top: 110px;
}

.glass-footer {
  backdrop-filter: blur(10px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.premium-card {
  animation: fadeIn 0.5s ease backwards;
}

.v-col:nth-child(1) .premium-card {
  animation-delay: 0.1s;
}
.v-col:nth-child(2) .premium-card {
  animation-delay: 0.2s;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .sticky-sidebar {
    position: relative;
    top: 0;
  }
}
</style>
