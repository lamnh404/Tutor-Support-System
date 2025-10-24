# Student Profile - Hướng dẫn sử dụng

## Các thay đổi đã thực hiện

### 1. Routes mới
- **`/tutor/:id`** - Trang profile của gia sư (thay vì `/:id`)
- **`/student/:id`** - Trang profile của sinh viên (MỚI)

### 2. Files đã cập nhật
- `src/App.tsx` - Thêm import StudentProfile và route `/student/:id`
- `src/pages/TutorSearch/TutorCard.tsx` - Update link từ `/:id` thành `/tutor/:id`

### 3. Files mới
- `src/pages/StudentProfile/StudentCard.tsx` - Component card để hiển thị thông tin sinh viên

## Cách test StudentProfile

### Option 1: Truy cập trực tiếp URL
1. Chạy dev server:
   ```bash
   npm run dev
   ```

2. Truy cập URL với các student ID có sẵn:
   - http://localhost:5173/student/student1
   - http://localhost:5173/student/student2

### Option 2: Sử dụng StudentCard component
Để hiển thị danh sách sinh viên, bạn có thể tạo một trang mới hoặc thêm vào trang hiện có:

```tsx
import StudentCard from '~/pages/StudentProfile/StudentCard'
import { initialStudents } from '~/pages/StudentProfile/StudentData'

// Trong component của bạn:
{initialStudents.map((student) => (
  <StudentCard key={student.id} student={student} />
))}
```

## Student IDs có sẵn trong mock data
- `student1` - Nguyễn Văn Minh (CS, Năm 3, GPA 3.65)
- `student2` - Phạm Thị Hương (đọc file StudentData.tsx để xem thêm)

## Cấu trúc StudentProfile

StudentProfile hiển thị:
1. **Header Card**:
   - Avatar
   - Tên, MSSV
   - Khoa, năm học
   - GPA với badge màu theo mức
   - Quick stats (phong cách học, hình thức)
   - Buttons: Gửi tin nhắn, Đặt lịch dạy

2. **Tabs**:
   - **Thông tin**: Giới thiệu, thông tin học vụ, mục tiêu, thành tích, môn cần hỗ trợ
   - **Lịch sử học**: Danh sách gia sư đã học, ratings
   - **Môn học**: Các môn đang học hiện tại

## Tính năng
- ✅ Responsive design
- ✅ Ant Design components
- ✅ Gradient backgrounds
- ✅ Hover effects
- ✅ Copy profile link
- ✅ Favorite toggle
- ✅ Navigation
- ✅ Mock data với 2+ students

## Next Steps (tùy chọn)
1. Tạo StudentSearch page tương tự TutorSearch
2. Tích hợp API thay vì mock data
3. Thêm filtering/sorting cho students
4. Thêm messaging/booking functionality
