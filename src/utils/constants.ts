import type {ExpertiseCode} from "~/utils/definitions.tsx";

export const API_ROOT = 'http://localhost:8017'

export const EXPERTISES: { code: ExpertiseCode; name: string }[] = [
  { code: 'MACHINE_LEARNING', name: 'Học máy' },
  { code: 'SOFTWARE_ENGINEERING', name: 'Kỹ thuật phần mềm' },
  { code: 'DATA_SCIENCE', name: 'Khoa học dữ liệu' },
  { code: 'ARTIFICIAL_INTELLIGENCE', name: 'Trí tuệ nhân tạo' },
  { code: 'CYBERSECURITY', name: 'An ninh mạng' },
  { code: 'WEB_DEVELOPMENT', name: 'Phát triển web' },
  { code: 'MOBILE_DEVELOPMENT', name: 'Phát triển di động' },
  { code: 'DATABASE_DESIGN', name: 'Thiết kế cơ sở dữ liệu' },
  { code: 'ALGORITHMS', name: 'Thuật toán' },
  { code: 'COMPUTER_NETWORKS', name: 'Mạng máy tính' },
  { code: 'EMBEDDED_SYSTEMS', name: 'Hệ thống nhúng' },
  { code: 'SIGNAL_PROCESSING', name: 'Xử lý tín hiệu' },
  { code: 'CONTROL_SYSTEMS', name: 'Hệ thống điều khiển' },
  { code: 'THERMODYNAMICS', name: 'Nhiệt động lực học' },
  { code: 'MECHANICAL_DESIGN', name: 'Thiết kế cơ khí' },
  { code: 'PROCESS_ENGINEERING', name: 'Công nghệ chế biến' },
  { code: 'MATERIALS_SCIENCE', name: 'Khoa học vật liệu' }
]