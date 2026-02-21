import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { PDFDocument } from 'pdf-lib'

export const generateEstimatePDF = async (estimate, outputType = 'save') => {
  const doc = new jsPDF('p', 'pt', 'a4')
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height
  let y = 60

  const f = estimate // state from store

  // Helper to ensure empty instead of undefined
  const safe = (val) => (val === undefined || val === null ? '' : val)

  const company = f.company
  const client = f.client
  const materials = f.materials
  const payment = f.paymentSchedule

  /* ===== HEADER ===== */
  const header = () => {
    if (company.logo) {
      try {
        doc.addImage(company.logo, 'PNG', 40, 20, 50, 50)
      } catch (e) {
        console.error('Logo add error:', e)
      }
    }
    doc.setFont('times', 'bold')
    doc.setFontSize(16)
    doc.setTextColor(197, 160, 89) // Gold color
    doc.text(company.name || 'URUDHI CONSTRUCTION', pageWidth / 2, 35, { align: 'center' })

    doc.setFontSize(10)
    doc.setTextColor(30, 41, 59) // Dark Slate
    const phoneDisplay = company.phone2
      ? `${company.phone} / ${company.phone2}`
      : company.phone || ''
    doc.text(`${safe(company.owner)} | ${phoneDisplay}`, pageWidth / 2, 50, { align: 'center' })

    doc.setDrawColor(197, 160, 89)
    doc.setLineWidth(1)
    doc.line(30, 60, pageWidth - 30, 60)
  }

  const footer = () => {
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(30, pageHeight - 35, pageWidth - 30, pageHeight - 35)

    doc.setFontSize(9)
    doc.setTextColor(100, 100, 100)
    doc.text(safe(company.address), pageWidth / 2, pageHeight - 20, { align: 'center' })
  }

  const signature = () => {
    doc.setFont('times', 'bold')
    doc.setTextColor(30, 41, 59)
    doc.text('PARTY SIGNATURE', 50, pageHeight - 65)
    doc.text('CONTRACTOR SIGNATURE', pageWidth - 200, pageHeight - 65)
  }

  const addNewPage = () => {
    footer()
    doc.addPage()
    header()
    y = 80
  }

  const sectionTitle = (text) => {
    if (y > pageHeight - 80) addNewPage()
    doc.setFont('times', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(197, 160, 89)
    doc.text(text, 40, y)
    y += 18
  }

  const paragraph = (text) => {
    doc.setFont('times', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(30, 41, 59)

    const lines = doc.splitTextToSize(text, pageWidth - 80)

    for (let i = 0; i < lines.length; i++) {
      if (y > pageHeight - 45) addNewPage()
      doc.text(lines[i], 40, y)
      y += 14
    }
    y += 8
  }

  header()

  /* ===== FIRST PAGE ===== */
  doc.setFontSize(14)
  doc.setTextColor(30, 41, 59)
  doc.text('BUILDING WORK QUOTATION', pageWidth / 2, y + 20, { align: 'center' })
  y += 50

  doc.setFontSize(10)
  doc.text(`SITE: ${safe(client.site)}`, 40, y)
  doc.text(`DATE: ${safe(client.date)}`, pageWidth - 160, y)
  y += 20
  doc.text(`CLIENT: ${safe(client.name)}`, 40, y)
  y += 30

  doc.text(
    `Dear Sir / Madam,
 
We offer our lowest rate and amount to construct a residential building with the following specifications and conditions. We assure quality materials, skilled workmanship, and timely completion of work.`,
    40,
    y,
    { maxWidth: pageWidth - 80, lineHeightFactor: 1.4 },
  )

  y += 60
  autoTable(doc, {
    startY: y,
    theme: 'grid',
    head: [['Floor', 'Area (Sq.ft)', 'Rate (Rs)', 'Amount (Rs)']],
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] },
    body: (f.floors || []).map((fl) => [
      fl.name,
      fl.sqft,
      fl.rate,
      (fl.sqft * fl.rate).toLocaleString('en-IN'),
    ]),
  })

  y = doc.lastAutoTable.finalY + 30

  const total = (f.floors || []).reduce((sum, fl) => sum + fl.sqft * fl.rate, 0)
  doc.setFont('times', 'bold')
  doc.text(`Total Estimated Amount: Rs.${total.toLocaleString('en-IN')}`, pageWidth - 40, y, {
    align: 'right',
  })

  signature()
  footer()

  /* ===== SECOND PAGE ===== */
  doc.addPage()
  header()
  y = 85

  const sections = [
    {
      title: 'Terms & Conditions',
      content: `• Any change in wood work, tile flooring, architectural design or items not covered in this agreement will be charged separately.\n• Contract period is maximum 4 months for one floor.\n• Balance materials brought by contractor after completion will be taken back by contractor.`,
    },
    {
      title: 'Tiles Specification',
      content: `• Vitrified tiles (${safe(materials.vitrifiedSize)}) @ Rs.${safe(materials.vitrifiedRate)}/Sq.ft\n• Bathroom flooring ceramic tiles @ Rs.${safe(materials.bathFloorRate)}/Sq.ft\n• Bathroom wall tiles glazed tiles up to ${safe(materials.bathWallHeight)}\n• WC wall tiles glazed up to 3 feet\n• Kitchen wall tiles glazed up to 2 feet\n• Kitchen platform ${safe(materials.kitchenStone)} @ Rs.${safe(materials.kitchenStoneRate)}/Sq.ft\n• Additional tile cost if any will be borne by customer.`,
    },
    {
      title: 'Loft & Cupboard',
      content: `• One side loft of width ${safe(materials.loftWidth)} in all bedrooms and kitchen\n• Black Kadappa stone cupboard on one side in all bedrooms and kitchen.`,
    },
    {
      title: 'Plumbing',
      content: `• Concealed plumbing using CPVC pipes (${safe(materials.cpvcBrand)}) for hot and cold water\n• 4 inch PVC for soil line and 2 inch PVC (${safe(materials.wastePipeBrand)}) for waste water\n• Heater provision provided in all bathrooms\n• Standard CP fittings provided`,
    },
    {
      title: 'Toilet & Kitchen Fittings',
      content: `• EWC (White), Wash basin (White), Stainless steel sink\n• Waterman CP fittings in all bathrooms and kitchen\n• Colour sanitary ware will be charged extra`,
    },
    {
      title: 'Windows & Shutters',
      content: `• UPVC windows with MS grill\n• Shutter thickness: ${safe(materials.shutterThickness)}`,
    },
    {
      title: 'Doors & Wood Work',
      content: `• Main door frame size ${safe(materials.mainDoorFrameSize)} using ${safe(materials.woodMaterial)}\n• Main door shutter with polish finish\n• Other doors flush doors with enamel painting\n• Toilet door WPVC @ Rs.${safe(materials.toiletDoorRate)}\n• Mortise lock @ Rs.${safe(materials.mortiseLockRate)}\n• Door lock brands: ${safe(materials.doorLockCompany)}`,
    },
    {
      title: 'Painting',
      content: `• Exterior: White cement 1 coat + ${safe(materials.paintExterior)} 2 coats\n• Interior: White cement 1 coat + putty 2 coats + ${safe(materials.paintInterior)} 2 coats\n• Ceiling: White cement + white paint`,
    },
    {
      title: 'Staircase Handrail',
      content: `• ${safe(materials.staircaseHandrail)}\n• Steps finished with rough plastering`,
    },
    {
      title: 'Work Process & Materials Used',
      content: `• Concrete: ${safe(materials.concreteGrade)} (${safe(materials.concreteBrand)})\n• Cement: ${safe(materials.cementBrands)}\n• Sand: ${safe(materials.sandType)}\n• Brick work: Chamber bricks (${safe(materials.brickPrice)})\n• Plastering: M-Sand with smooth inner and rough outer finish\n• Steel: ${safe(materials.steelBrand)}\n• Electrical wiring: Concealed ${safe(materials.electricalBrand)}\n• Switches: ${safe(materials.switchBrand)} @ Rs.${safe(materials.switchRate)}`,
    },
    {
      title: 'Work Not Included',
      content: safe(materials.workNotIncluded),
    },
    {
      title: 'Extra Work Cost',
      content: `• UG Sump Brick work: Rs.${safe(materials.ugSumpBrick)}/lit\n• UG Sump Tile work: Rs.${safe(materials.ugSumpTile)}/lit\n• Septic Tank: Rs.${safe(materials.septicTank)}/lit\n• Weathering course: Rs.${safe(materials.weatheringRate)}/Sq.ft\n• Compound wall 4.5 inch: Rs.${safe(materials.compoundWall4_5)}/RFT\n• Compound wall 9 inch: Rs.${safe(materials.compoundWall9)}/RFT`,
    },
    {
      title: 'Payment Procedure',
      content: `• Advance to Lintel Level: ${safe(payment.lintel)}%\n• Lintel to Roof Level: ${safe(payment.roof)}%\n• Before Inner Plastering: ${safe(payment.innerPlaster)}%\n• Before Outer Plastering: ${safe(payment.outerPlaster)}%\n• Before Tiles Work: ${safe(payment.tiles)}%\n• Before Wiring & Painting: ${safe(payment.wiringPaint)}%\n• Final Completion & Handover: ${safe(payment.final)}%`,
    },
  ]

  sections.forEach((sec) => {
    sectionTitle(sec.title)
    paragraph(sec.content)
    y += 5
  })

  signature()
  footer()

  // Convert jsPDF to ArrayBuffer
  const pdfBytes = doc.output('arraybuffer')

  // Use pdf-lib to merge attachments
  const finalDoc = await PDFDocument.load(pdfBytes)

  if (f.attachments && f.attachments.length > 0) {
    for (const attachment of f.attachments) {
      const dataUrl = attachment.data
      const bytes = await fetch(dataUrl).then((res) => res.arrayBuffer())

      if (attachment.type.includes('pdf')) {
        const attachDoc = await PDFDocument.load(bytes)
        const copiedPages = await finalDoc.copyPages(attachDoc, attachDoc.getPageIndices())
        copiedPages.forEach((page) => finalDoc.addPage(page))
      } else if (attachment.type.includes('image')) {
        let image
        if (attachment.type.includes('png')) {
          image = await finalDoc.embedPng(bytes)
        } else {
          image = await finalDoc.embedJpg(bytes)
        }

        const page = finalDoc.addPage([pageWidth, pageHeight])
        const { width, height } = image.scaleToFit(pageWidth - 80, pageHeight - 80)
        page.drawImage(image, {
          x: pageWidth / 2 - width / 2,
          y: pageHeight / 2 - height / 2,
          width,
          height,
        })
      }
    }
  }

  const mergedPdfBytes = await finalDoc.save()

  if (outputType === 'dataurl') {
    const base64 = await finalDoc.saveAsBase64({ dataUri: true })
    return base64
  }

  // Save the merged PDF
  const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `Estimate_${client.name || 'Project'}.pdf`
  link.click()
  URL.revokeObjectURL(url)
}
