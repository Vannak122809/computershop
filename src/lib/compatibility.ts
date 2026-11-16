import { CustomPCSelection } from './types';

export interface CompatibilityReport {
  isValid: boolean;
  warningsKh: string[];
  warningsEn: string[];
  errorsKh: string[];
  errorsEn: string[];
  totalPriceUsd: number;
  estimatedWattage: number;
  recommendedPsuWatts: number;
  partCount: number;
}

export function checkCompatibility(selection: CustomPCSelection): CompatibilityReport {
  const errorsKh: string[] = [];
  const errorsEn: string[] = [];
  const warningsKh: string[] = [];
  const warningsEn: string[] = [];

  const { cpu, motherboard, ram, storage_ssd, gpu, case: pcCase, cooler, psu } = selection;

  // 1. Calculate Price
  let totalPriceUsd = 0;
  let partCount = 0;

  Object.values(selection).forEach((product) => {
    if (product && product.price_usd) {
      totalPriceUsd += product.sale_price_usd ?? product.price_usd;
      partCount++;
    }
  });

  // 2. Calculate Wattages
  const cpuTdp = cpu?.part_spec?.tdpWatts || (cpu ? 65 : 0);
  const gpuTdp = gpu?.part_spec?.tdpWatts || (gpu ? 150 : 0);
  const baseSystemWattage = (cpu || motherboard || ram || storage_ssd) ? 80 : 0;
  const estimatedWattage = cpuTdp + gpuTdp + baseSystemWattage;

  // Recommended PSU = estimated * 1.25, rounded up to nearest 50
  const recommendedPsuWatts = estimatedWattage > 0 
    ? Math.max(450, Math.ceil((estimatedWattage * 1.25) / 50) * 50)
    : 0;

  // 3. CPU vs Motherboard Socket
  if (cpu && motherboard && cpu.part_spec?.socket && motherboard.part_spec?.socket) {
    if (cpu.part_spec.socket !== motherboard.part_spec.socket) {
      errorsKh.push(
        `មិនត្រូវគ្នា៖ CPU Socket (${cpu.part_spec.socket}) មិនត្រូវគ្នាជាមួយ Motherboard Socket (${motherboard.part_spec.socket}) ទេ។`
      );
      errorsEn.push(
        `Incompatible: CPU Socket (${cpu.part_spec.socket}) does not match Motherboard Socket (${motherboard.part_spec.socket}).`
      );
    }
  }

  // 4. Motherboard RAM Type vs RAM Module
  if (motherboard && ram && motherboard.part_spec?.ramType && ram.part_spec?.ramType) {
    if (motherboard.part_spec.ramType !== ram.part_spec.ramType) {
      errorsKh.push(
        `មិនត្រូវគ្នា៖ Motherboard គាំទ្រតែប្រភេទ ${motherboard.part_spec.ramType} ប៉ុន្តែអ្នកបានជ្រើសរើស RAM ${ram.part_spec.ramType}។`
      );
      errorsEn.push(
        `Incompatible: Motherboard supports ${motherboard.part_spec.ramType} but selected RAM is ${ram.part_spec.ramType}.`
      );
    }
  }

  // 5. GPU Length vs Case Max GPU Clearance
  if (gpu && pcCase && gpu.part_spec?.gpuLengthMm && pcCase.part_spec?.caseMaxGpuMm) {
    if (gpu.part_spec.gpuLengthMm > pcCase.part_spec.caseMaxGpuMm) {
      errorsKh.push(
        `ទំហំ Case តូចពេក៖ ប្រវែង GPU (${gpu.part_spec.gpuLengthMm}mm) លើសពីទំហំអតិបរមារបស់ Case (${pcCase.part_spec.caseMaxGpuMm}mm)។`
      );
      errorsEn.push(
        `Clearance Issue: GPU length (${gpu.part_spec.gpuLengthMm}mm) exceeds Case maximum GPU limit (${pcCase.part_spec.caseMaxGpuMm}mm).`
      );
    }
  }

  // 6. CPU Cooler Height vs Case Max Cooler Height
  if (cooler && pcCase && cooler.part_spec?.coolerHeightMm && pcCase.part_spec?.caseMaxCoolerMm) {
    if (cooler.part_spec.coolerHeightMm > pcCase.part_spec.caseMaxCoolerMm) {
      errorsKh.push(
        `កម្ពស់ Cooler ខ្ពស់ពេក៖ កម្ពស់ Cooler (${cooler.part_spec.coolerHeightMm}mm) ខ្ពស់ជាងកម្រិតដែល Case អាចដាក់បាន (${pcCase.part_spec.caseMaxCoolerMm}mm)។`
      );
      errorsEn.push(
        `Clearance Issue: Cooler height (${cooler.part_spec.coolerHeightMm}mm) exceeds Case clearance (${pcCase.part_spec.caseMaxCoolerMm}mm).`
      );
    }
  }

  // 7. PSU Wattage Check
  if (psu && psu.part_spec?.tdpWatts && recommendedPsuWatts > 0) {
    if (psu.part_spec.tdpWatts < recommendedPsuWatts) {
      warningsKh.push(
        `ការព្រមានអំពីភ្លើង៖ PSU ${psu.part_spec.tdpWatts}W អាចនឹងតូចជាងការណែនាំ (${recommendedPsuWatts}W) សម្រាប់ដំណើរការរលូន។`
      );
      warningsEn.push(
        `Power Warning: Selected PSU (${psu.part_spec.tdpWatts}W) is lower than recommended wattage (${recommendedPsuWatts}W).`
      );
    }
  }

  return {
    isValid: errorsKh.length === 0,
    warningsKh,
    warningsEn,
    errorsKh,
    errorsEn,
    totalPriceUsd,
    estimatedWattage,
    recommendedPsuWatts,
    partCount,
  };
}
