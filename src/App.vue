<template>
  <v-app class="bg-grey-lighten-5">
    <v-container fluid class="pa-4 pa-md-8">
      
      <div class="text-center mb-8">
        <h1 class="text-h4 text-md-h3 font-weight-bold mb-2" style="color: #356aca;">
          Construction Estimate
        </h1>
        <p class="text-subtitle-1 text-grey-darken-1">
          Project Specification Sheet
        </p>
      </div>

      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="2" class="rounded-lg h-100 border">
            <div class="pa-4 d-flex align-center text-white" style="background-color: #356aca;">
              <v-icon icon="mdi-domain" class="mr-3"></v-icon>
              <span class="text-h6 font-weight-bold">Company</span>
            </div>

            <v-card-text class="pa-5">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.companyName"
                    label="Company Name"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    hide-details="auto"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.ownerName"
                    label="Owner Name"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    hide-details="auto"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.phone"
                    label="Phone Number"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    hide-details="auto"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.companyAddress"
                    label="Address"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    rows="3"
                    auto-grow
                    hide-details="auto"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card elevation="2" class="rounded-lg h-100 border">
            <div class="pa-4 d-flex align-center text-white" style="background-color: #5d7887;">
              <v-icon icon="mdi-account" class="mr-3"></v-icon>
              <span class="text-h6 font-weight-bold">Client</span>
            </div>

            <v-card-text class="pa-5">
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.client"
                    label="Client Name"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    hide-details="auto"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.date"
                    type="date"
                    label="Date"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    hide-details="auto"
                    class="mb-4"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="form.site"
                    label="Site Address"
                    variant="outlined"
                    density="comfortable"
                    bg-color="white"
                    rows="3"
                    auto-grow
                    hide-details="auto"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <v-card elevation="2" class="rounded-lg border">
            <div class="d-flex align-center justify-space-between pa-5 border-bottom">
              <h2 class="text-h5 font-weight-bold text-grey-darken-3">
                Floor Specifications
              </h2>
              <v-btn
                color="#356aca"
                class="text-white px-6"
                elevation="2"
                @click="addFloor"
              >
                <v-icon start>mdi-plus</v-icon> ADD FLOOR
              </v-btn>
            </div>
            
            <v-card-text class="pa-4 bg-grey-lighten-5">
              <div v-if="form.floors.length === 0" class="text-center py-6 text-grey">
                No floors added yet. Click "Add Floor" to begin.
              </div>

              <div v-for="(floor, i) in form.floors" :key="i" class="mb-3">
                <v-card variant="outlined" class="bg-white">
                  <v-card-text class="pa-3">
                    <v-row dense align="center">
                      <v-col cols="12" sm="4">
                        <v-text-field v-model="floor.name" label="Floor Name" placeholder="e.g. Ground Floor" variant="plain" density="compact" hide-details class="font-weight-bold"></v-text-field>
                      </v-col>
                      <v-divider vertical class="mx-2 d-none d-sm-flex"></v-divider>
                      <v-col cols="6" sm="3">
                        <v-text-field v-model.number="floor.sqft" label="Sq.ft" type="number" variant="plain" density="compact" suffix="ft²" hide-details></v-text-field>
                      </v-col>
                      <v-col cols="6" sm="3">
                        <v-text-field v-model.number="floor.rate" label="Rate" type="number" variant="plain" density="compact" prefix="₹" hide-details></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="1" class="d-flex justify-end">
                        <v-btn icon color="red" variant="text" size="small" @click="removeFloor(i)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12">
          <v-card elevation="2" class="rounded-lg border">
            <div class="pa-4 d-flex align-center bg-blue-grey-lighten-5 text-blue-grey-darken-4">
               <v-icon icon="mdi-tools" class="mr-2"></v-icon>
               <span class="text-h6 font-weight-bold">Material Selection</span>
            </div>
            
            <v-card-text class="pa-5">
              <h4 class="text-overline text-primary mb-2">Structural</h4>
              <v-row dense>
                <v-col cols="12" md="4"><v-text-field v-model="form.sandType" label="Sand Type" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="12" md="4"><v-text-field v-model="form.brickPrice" label="Brick Price" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="12" md="4"><v-text-field v-model="form.cementBrands" label="Cement Brands" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>

              <h4 class="text-overline text-primary mb-2">Finishing & Electrical</h4>
              <v-row dense>
                <v-col cols="6" md="3"><v-text-field v-model="form.electricalBrand" label="Electrical Brand" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="6" md="3"><v-text-field v-model="form.switchBrand" label="Switch Brand" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="6" md="3"><v-text-field v-model="form.paintExterior" label="Ext. Paint" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="6" md="3"><v-text-field v-model="form.paintInterior" label="Int. Paint" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
              </v-row>

               <v-divider class="my-4"></v-divider>

               <h4 class="text-overline text-primary mb-2">Woodwork & Stone</h4>
               <v-row dense>
                <v-col cols="6" md="3"><v-text-field v-model="form.woodMaterial" label="Wood Material" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="6" md="3"><v-text-field v-model="form.woodQuality" label="Wood Quality" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="12" md="3"><v-text-field v-model="form.doorLockCompany" label="Lock Brand" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
                <v-col cols="6" md="3"><v-text-field v-model="form.kitchenStone" label="Kitchen Stone" variant="outlined" density="compact" bg-color="white"></v-text-field></v-col>
               </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-4 mb-16">
        <v-col cols="12">
          <v-card elevation="2" class="rounded-lg border">
            <div class="pa-4 d-flex align-center bg-green-lighten-5 text-green-darken-4">
               <v-icon icon="mdi-cash-multiple" class="mr-2"></v-icon>
               <span class="text-h6 font-weight-bold">Payment Schedule (%)</span>
            </div>
            
            <v-card-text class="pa-5">
              <v-row dense>
                <v-col cols="6" md="2"><v-text-field v-model="form.lintel" label="To Lintel" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="6" md="2"><v-text-field v-model="form.roof" label="To Roof" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="6" md="2"><v-text-field v-model="form.innerPlaster" label="In. Plaster" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="6" md="2"><v-text-field v-model="form.outerPlaster" label="Out. Plaster" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="6" md="2"><v-text-field v-model="form.tiles" label="Flooring" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="6" md="2"><v-text-field v-model="form.wiringPaint" label="Paint/Elec" suffix="%" variant="underlined" density="compact"></v-text-field></v-col>
                <v-col cols="12" class="mt-2">
                   <v-text-field v-model="form.final" label="Final Handover" suffix="%" variant="outlined" density="compact" color="success" class="font-weight-bold"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-2 mb-10">
        <v-btn
          color="success"
          size="x-large"
          rounded="pill"
          width="350"
          elevation="4"
          @click="generatePDF"
        >
          <v-icon start>mdi-file-pdf-box</v-icon>
          Generate PDF
        </v-btn>
      </v-row>

    </v-container>
  </v-app>
</template>

<script>
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default {
  data() {
    return {
      form: {
         companyName: "VIGNESH ENGINEERING AND INTERIORS",
        ownerName: "Mr. VIGNESH PANDIYAN",
        phone: "+91 99405 50471",
        companyAddress: "No:3/25, Periyar Salai, Thirumalai Nagar, Ramapuram, Chennai – 600089",

        client: "",
        site: "",
        date: "",

        floors: [
          { name: "Ground Floor", sqft: 580, rate: 2400 }
        ],
        parapetIncluded: true,
        sandType: "",
        brickPrice: "",
        cementBrands: "",
        electricalBrand: "",
        switchBrand: "",
        paintExterior: "",
        paintInterior: "",
        woodMaterial: "",
        woodQuality: "",
        doorLockCompany: "",
        shutterThickness: "",
        kitchenStone: "",
        kitchenStoneRate: 0,
        lintel: 0,
        roof: 0,
        innerPlaster: 0,
        outerPlaster: 0,
        tiles: 0,
        wiringPaint: 0,
        final: 0,
        logo: null,
      },
    };
  },
  methods: {

    addFloor() {
      this.form.floors.push({ name: "", sqft: 0, rate: 0 });
    },
    removeFloor(i) {
      this.form.floors.splice(i, 1);
    },
onLogoUpload(files) {
  if (!files) return;

  // Vuetify returns array
  const file = Array.isArray(files) ? files[0] : files;

  if (!(file instanceof Blob)) return;

  const reader = new FileReader();
  reader.onload = () => {
    this.form.logo = reader.result; // base64
  };
  reader.readAsDataURL(file);
},

generatePDF() {
 const f = this.form;
      const doc = new jsPDF("p", "pt", "a4");
      const pageWidth = doc.internal.pageSize.width;
      let y = 60;

  /* ===== HEADER ===== */
      const header = async () => {
        if (f.logo) {
          // const img = await this.toBase64(f.logo);
          doc.addImage(f.logo, "PNG", 40, 20, 50, 50);
        }
        doc.setFont("times", "bold");
        doc.setFontSize(14);
        doc.text(f.companyName, pageWidth / 2, 25, { align: "center" });
        doc.setFontSize(10);
        doc.text(`${f.ownerName} | ${f.phone}`, pageWidth / 2, 40, { align: "center" });
        doc.line(30, 45, pageWidth - 30, 45);
      };

     const footer = () => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // 🔹 LINE ABOVE FOOTER
  doc.setLineWidth(0.5);
  doc.line(
    30,                     // start X
    pageHeight - 35,        // start Y (above footer)
    pageWidth - 30,         // end X
    pageHeight - 35         // end Y
  );
  // 🔹 FOOTER TEXT
  doc.setFontSize(9);
  doc.text(
    f.companyAddress,
    pageWidth / 2,
    pageHeight - 20,
    { align: "center" }
  );
};

const signature=()=>{
doc.setFont("times", "bold");
   doc.text("PARTY SIGNATURE", 50, pageHeight - 50);
      doc.text("CONTRACTOR SIGNATURE", pageWidth-200, pageHeight - 50);
};


const pageHeight = doc.internal.pageSize.height;

const addNewPage = () => {
  footer();          // ✅ close current page
  doc.addPage();     // ➕ new page
  header();          // 🧾 header on new page
  y = 60;            // reset cursor
};


  // const sectionTitle = (text) => {
  //   doc.setFont("times", "bold");
  //   doc.setFontSize(12);
  //   if (y > doc.internal.pageSize.height - 60) {
  //     doc.addPage();
  //     y = 60;
  //     header();
  //   }
  //   doc.text(text, 40, y);
  //   y += 15;
  // };
  const sectionTitle = (text) => {
  doc.setFont("times", "bold"); 
//text underline 
  if (y > pageHeight - 80) {
    addNewPage();
  }
doc.setFontSize(12);
  doc.text(text, 40, y);
  y += 15;
};


  // const paragraph = (text) => {
  //   doc.setFont("times", "normal");
  //   doc.setFontSize(10);
  //   const lines = doc.splitTextToSize(text, pageWidth - 80);
  //   if (y + lines.length * 12 > doc.internal.pageSize.height - 40) {
  //     doc.addPage();
  //     y = 60;
  //     header();
  //   }
  //   doc.text(lines, 40, y);
  //   y += lines.length * 12 + 10;
  // };
const paragraph = (text) => {
  doc.setFont("times", "normal");
  doc.setFontSize(10);

  const lines = doc.splitTextToSize(text, pageWidth - 80);

  for (let i = 0; i < lines.length; i++) {
    if (y > pageHeight - 45) {
      addNewPage();
    }
    doc.text(lines[i], 40, y);
    y += 14; // line spacing
  }

  y += 8;
};

  header();

  
      /* ===== FIRST PAGE ===== */
      doc.setFontSize(12);
      doc.text("BUILDING WORK QUOTATION", pageWidth / 2, y, { align: "center" });
      y += 30;

      doc.setFontSize(10);
      doc.text(`SITE: ${f.site}`, 40, y);
      doc.text(`DATE: ${f.date}`, pageWidth - 160, y);
      y += 20;
      doc.text(`CLIENT: ${f.client}`, 40, y);
      y += 30;

     doc.setFont("times", "normal");
const leftMargin = 40;
const rightMargin = 40; 
const textWidth = pageWidth - leftMargin - rightMargin;

doc.text(
  `Dear Sir / Madam,

We offer our lowest rate and amount to construct a residential building with the following specifications and conditions. We assure quality materials, skilled workmanship, and timely completion of work.`,
  leftMargin,
  y,
  { maxWidth: textWidth, lineHeightFactor: 1.4 }
);

     y += 60;
     doc.setFont("times", "bold");
      autoTable(doc, {
        startY: y,
        theme: "grid",
        head: [["Floor", "Sq.ft", "Rate", "Amount"]],
        body: f.floors.map(fl => [
          fl.name,
          fl.sqft,
          `Rs.${fl.rate}`,
          `Rs.${(fl.sqft * fl.rate).toLocaleString()}`
        ])
      });

      y = doc.lastAutoTable.finalY + 30;

   
signature();
      footer();

      /* ===== SECOND PAGE ===== */
      doc.addPage();
      header();
      y = 70;


  // ================= SECTIONS =================
  const sections = [
    { title: "Terms & Conditions", content: `• Any change in wood work, tile flooring, architectural design or items not covered in this agreement will be charged separately.\n• Contract period is maximum 4 months for one floor.\n• Balance materials brought by contractor after completion will be taken back by contractor.` },
    { title: "Tiles Specification", content: `• Vitrified tiles (${f.vitrifiedSize}) @ Rs.${f.vitrifiedRate}/Sq.ft\n• Bathroom flooring ceramic tiles @ Rs.${f.bathFloorRate}/Sq.ft\n• Bathroom wall tiles glazed tiles up to ${f.bathWallHeight}\n• WC wall tiles glazed up to 3 feet\n• Kitchen wall tiles glazed up to 2 feet\n• Kitchen platform ${f.kitchenStone} @ Rs.${f.kitchenStoneRate}/Sq.ft\n• Additional tile cost if any will be borne by customer.` },
    { title: "Loft & Cupboard", content: `• One side loft of width ${f.loftWidth} in all bedrooms and kitchen\n• Black Kadappa stone cupboard on one side in all bedrooms and kitchen.` },
    { title: "Plumbing", content: `• Concealed plumbing using CPVC pipes (${f.cpvcBrand}) for hot and cold water\n• 4 inch PVC for soil line and 2 inch PVC (${f.wastePipeBrand}) for waste water\n• Heater provision provided in all bathrooms\n• Standard CP fittings provided` },
    { title: "Toilet & Kitchen Fittings", content: `• EWC (White), Wash basin (White), Stainless steel sink\n• Waterman CP fittings in all bathrooms and kitchen\n• Colour sanitary ware will be charged extra` },
    { title: "Windows & Shutters", content: `• UPVC windows with MS grill\n• Shutter thickness: ${f.shutterThickness}` },
    { title: "Doors & Wood Work", content: `• Main door frame size ${f.mainDoorFrameSize} using ${f.woodMaterial}\n• Main door shutter with polish finish\n• Other doors flush doors with enamel painting\n• Toilet door WPVC @ Rs.${f.toiletDoorRate}\n• Mortise lock @ Rs.${f.mortiseLockRate}\n• Door lock brands: ${f.doorLockCompany}` },
    { title: "Painting", content: `• Exterior: White cement 1 coat + ${f.paintExterior} 2 coats\n• Interior: White cement 1 coat + putty 2 coats + ${f.paintInterior} 2 coats\n• Ceiling: White cement + white paint` },
    { title: "Staircase Handrail", content: `• MS square bar with GI pipe handrail\n• Steps finished with rough plastering` },
    { title: "Work Process & Materials Used", content: `• Concrete: M20 grade\n• Cement: ${f.cementBrands}\n• Sand: ${f.sandType}\n• Brick work: Chamber bricks (${f.brickPrice})\n• Plastering: M-Sand with smooth inner and rough outer finish\n• Steel: Fe 500 ISI brand\n• Electrical wiring: Concealed ${f.electricalBrand}\n• Switches: ${f.switchBrand} @ Rs.${f.switchRate}` },
    { title: "Work Not Included", content: `• Bore well / Open well\n• UG sump\n• Rain water harvesting\n• Pavement blocks\n• Compound wall & gate\n• Septic tank\n• Weathering course\n• EB, water & sanitary external connections` },
    { title: "Extra Work Cost", content: `• UG Sump Brick work: Rs.${f.ugSumpBrick}/lit\n• UG Sump Tile work: Rs.${f.ugSumpTile}/lit\n• Septic Tank: Rs.${f.septicTank}/lit\n• Weathering course: Rs.${f.weatheringRate}/Sq.ft\n• Compound wall 4.5 inch: Rs.${f.compoundWall4_5}/RFT\n• Compound wall 9 inch: Rs.${f.compoundWall9}/RFT` },
    { title: "Payment Procedure", content: `• Advance to Lintel Level: ${f.lintel}%\n• Lintel to Roof Level: ${f.roof}%\n• Before Inner Plastering: ${f.innerPlaster}%\n• Before Outer Plastering: ${f.outerPlaster}%\n• Before Tiles Work: ${f.tiles}%\n• Before Wiring & Painting: ${f.wiringPaint}%\n• Final Completion & Handover: ${f.final}%` },
  ];

  sections.forEach(sec => {
    
    sectionTitle(sec.title);
    paragraph(sec.content);
      // ✅ SPACE BETWEEN SECTIONS
  y += 10;   // increase/decrease as needed
  });
 
signature();
  footer();

  doc.save("Building_Quotation_Full.pdf");
}


  }
};
</script>

<style>
.v-application {
  font-family: Roboto, sans-serif;
}
</style>

