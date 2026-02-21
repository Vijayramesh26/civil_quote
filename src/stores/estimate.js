import { defineStore } from 'pinia'

export const useEstimateStore = defineStore('estimate', {
  state: () => ({
    company: {
      name: 'VIGNESH ENGINEERING AND INTERIORS',
      owner: 'Mr. VIGNESH',
      phone: '+91 82202 02302',
      phone2: '',
      address: '2/153-C, Elumiyampatti,\nPappireddipatti,\nAndiyur Post, TK,\nDharmapuri - 636 905',
      logo: '/logo.png',
    },
    client: {
      name: '',
      site: '',
      date: new Date().toISOString().substr(0, 10),
    },
    floors: [{ name: 'Ground Floor', sqft: 580, rate: 2400 }],
    materials: {
      sandType: '',
      brickPrice: '',
      cementBrands: '',
      electricalBrand: '',
      switchBrand: '',
      switchRate: 0,
      paintExterior: '',
      paintInterior: '',
      woodMaterial: '',
      woodQuality: '',
      doorLockCompany: '',
      shutterThickness: '',
      kitchenStone: '',
      kitchenStoneRate: 0,
      vitrifiedSize: '2x2',
      vitrifiedRate: 0,
      bathFloorRate: 0,
      bathWallHeight: '7 feet',
      cpvcBrand: 'Astral',
      wastePipeBrand: 'Supreme',
      mainDoorFrameSize: "5'x3'",
      toiletDoorRate: 0,
      mortiseLockRate: 0,
      ugSumpBrick: 0,
      ugSumpTile: 0,
      septicTank: 0,
      weatheringRate: 0,
      compoundWall4_5: 0,
      compoundWall9: 0,
      loftWidth: '2 feet',
      concreteGrade: 'M20 grade',
      concreteBrand: '',
      steelBrand: 'Fe 500 ISI brand',
      staircaseHandrail: 'MS square bar with GI pipe handrail',
      workNotIncluded:
        '• Bore well / Open well\n• UG sump\n• Rain water harvesting\n• Pavement blocks\n• Compound wall & gate\n• Septic tank\n• Weathering course\n• EB, water & sanitary external connections',
    },
    paymentSchedule: {
      lintel: 0,
      roof: 0,
      innerPlaster: 0,
      outerPlaster: 0,
      tiles: 0,
      wiringPaint: 0,
      final: 0,
    },
    attachments: [],
  }),
  getters: {
    totalAmount: (state) => {
      return state.floors.reduce((sum, f) => sum + (f.sqft || 0) * (f.rate || 0), 0)
    },
    formattedTotalAmount: (state) => {
      return state.floors
        .reduce((total, floor) => total + floor.sqft * floor.rate, 0)
        .toLocaleString('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
        })
    },
  },
  actions: {
    addFloor() {
      this.floors.push({ name: '', sqft: 0, rate: 0 })
    },
    removeFloor(index) {
      this.floors.splice(index, 1)
    },
    updateLogo(logoData) {
      this.company.logo = logoData
    },
    addAttachment(fileData) {
      this.attachments.push(fileData)
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1)
    },
  },
})
