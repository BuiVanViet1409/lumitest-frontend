export const translations = {
  en: {
    common: {
      search: "Search...",
      newTest: "New Test",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      loading: "Loading...",
      error: "System Error",
      status: "Status",
      actions: "Actions",
      discard: "Discard"
    },
    sidebar: {
       testCases: "Test Cases",
       webRecorder: "Web Recorder",
       releases: "Releases",
       assistant: "AI Assistant",
       generate: "Auto-Generate",
       settings: "Settings",
       profile: "Profile",
       dataDiscovery: "Data Discovery"
    },
    testCaseList: {
       title: "Test Library",
       subtitle: "Manage your quality assurance protocols",
       total: "Total Cases",
       searchPlaceholder: "Search protocols by name or ID...",
       empty: "No test cases found"
    },
    testCaseDetail: {
       back: "Back to Library",
       metadata: "Metadata",
       steps: "Execution Steps",
       environment: "Testing Environment",
       recordedBy: "Recorded By",
       version: "Protocol Version"
    },
    recorder: {
       controls: "Session Controls",
       preview: "Live Preview",
       stop: "Terminate",
       recording: "Recording Active",
       startPrompt: "Initialize a new web session to begin recording."
    },
    assistant: {
       sidebar: "Audit Log",
       inputPlaceholder: "Initialize Dialogue...",
       engineStatus: "Status: Normalized",
       synthesis: "Synthesis: Active"
    },
    generate: {
       title: "TestCase Architect",
       subtitle: "Describe your testing objective. LumiAI will synthesize a sequence automatically.",
       promptPlaceholder: "Describe the logic flow... (e.g., 'Validate checkout')",
       start: "Start Synthesis",
       generating: "Synthesizing...",
       blueprint: "Logic Blueprint",
       commit: "Commit Blueprint"
    },
    discovery: {
       title: "Data Oracle",
       subtitle: "Identify the exact location and sample data for any field in the neural mesh. Supports MongoDB & PostgreSQL.",
       searchPlaceholder: "Enter field name (e.g. user_id, status)...",
       searchBtn: "Discover Location",
       searching: "Analyzing Clusters...",
       noResults: "Field not found in active databases.",
       location: "Location",
       sampleValue: "Sample Value",
       source: "Data Source",
       connTitle: "Neural Handshake",
       connSubtitle: "Establish link to external data sphere",
       dbType: "Platform Type",
       host: "Endpoint Host",
       port: "Access Port",
       user: "Identity",
       pass: "Access Key",
       dbName: "Target Sphere",
       connectBtn: "Establish Link",
       connecting: "Initializing Handshake...",
       disconnectBtn: "Terminate Connection",
       connSuccess: "Neural Link Status: SECURE",
       connError: "Connection Fatal: Host unreachable or rejected.",
       authError: "Authentication Failed: Neural handshake rejected.",
       uriMode: "Advanced: Connection String (URI)",
       uriPlaceholder: "mongodb://user:pass@host:port/db...",
       advancedTitle: "URI Handshake",
       modeSearch: "Search Mode",
       modeCompare: "Compare Environments",
       compareSourceA: "Source Environment (A)",
       compareSourceB: "Target Environment (B)",
       aiSuggest: "AI Suggest",
       aiSuggestTooltip: "Ask AI to find relevant fields",
       identical: "Identical",
       mismatch: "Data Mismatch"
    }
  },
  vi: {
    common: {
      search: "Tìm kiếm...",
      newTest: "Tạo mới",
      save: "Lưu",
      cancel: "Hủy",
      delete: "Xóa",
      edit: "Sửa",
      loading: "Đang tải...",
      error: "Lỗi hệ thống",
      status: "Trạng thái",
      actions: "Hành động",
      discard: "Hủy bỏ"
    },
    sidebar: {
       testCases: "Kịch bản test",
       webRecorder: "Trình ghi Web",
       releases: "Phiên bản",
       assistant: "Trợ lý AI",
       generate: "Tự động tạo",
       settings: "Cài đặt",
       profile: "Hồ sơ",
       dataDiscovery: "Khám phá dữ liệu"
    },
    testCaseList: {
       title: "Thư viện Test",
       subtitle: "Quản lý các giao thức kiểm thử chất lượng",
       total: "Tổng số",
       searchPlaceholder: "Tìm kiếm kịch bản theo tên hoặc ID...",
       empty: "Không tìm thấy kịch bản nào"
    },
    testCaseDetail: {
       back: "Quay lại thư viện",
       metadata: "Thông tin",
       steps: "Các bước thực hiện",
       environment: "Môi trường Test",
       recordedBy: "Người thực hiện",
       version: "Phiên bản giao thức"
    },
    recorder: {
       controls: "Điều khiển phiên",
       preview: "Xem trước trực tiếp",
       stop: "Dừng",
       recording: "Đang ghi hình",
       startPrompt: "Khởi tạo một phiên web mới để bắt đầu ghi hình."
    },
    assistant: {
       sidebar: "Nhật ký kiểm tra",
       inputPlaceholder: "Bắt đầu hội thoại...",
       engineStatus: "Trạng thái: Bình thường",
       synthesis: "Tổng hợp: Đang hoạt động"
    },
    generate: {
       title: "Kiến trúc sư Test",
       subtitle: "Mô tả mục tiêu kiểm thử của bạn. LumiAI sẽ tự động tổng hợp trình tự.",
       promptPlaceholder: "Mô tả luồng logic... (vd: 'Xác nhận thanh toán')",
       start: "Bắt đầu tổng hợp",
       generating: "Đang tổng hợp...",
       blueprint: "Bản thiết kế logic",
       commit: "Xác nhận bản thiết kế"
    },
    discovery: {
       title: "Nhà tiên tri dữ liệu",
       subtitle: "Xác định vị trí chính xác và dữ liệu mẫu cho bất kỳ trường nào trong mạng lưới. Hỗ trợ MongoDB & PostgreSQL.",
       searchPlaceholder: "Nhập tên trường (vd: user_id, status)...",
       searchBtn: "Khám phá vị trí",
       searching: "Nhận dạng các kết cấu...",
       noResults: "Không tìm thấy trường trong các cơ sở dữ liệu hoạt động.",
       location: "Vị trí",
       sampleValue: "Giá trị mẫu",
       source: "Nguồn dữ liệu",
       connTitle: "Bắt tay thần kinh",
       connSubtitle: "Thiết lập liên kết đến vùng dữ liệu bên ngoài",
       dbType: "Loại nền tảng",
       host: "Máy chủ đích",
       port: "Cổng truy cập",
       user: "Danh tính",
       pass: "Mã xác thực",
       dbName: "Vùng mục tiêu",
       connectBtn: "Thiết lập liên kết",
       connecting: "Đang khởi tạo lệnh bắt tay...",
       disconnectBtn: "Ngắt kết nối",
       connSuccess: "Liên kết thần kinh AN TOÀN",
       connError: "Lỗi kết nối: Máy chủ không thể truy cập hoặc bị từ chối.",
       authError: "Xác thực thất bại: Thông tin đăng nhập không hợp lệ.",
       uriMode: "Nâng cao: Chuỗi kết nối (URI)",
       uriPlaceholder: "mongodb://user:pass@host:port/db...",
       advancedTitle: "Bắt tay qua URI",
       modeSearch: "Chế độ tìm kiếm",
       modeCompare: "So sánh môi trường",
       compareSourceA: "Môi trường nguồn (A)",
       compareSourceB: "Môi trường đích (B)",
       aiSuggest: "AI Gợi ý",
       aiSuggestTooltip: "Yêu cầu AI tìm các trường liên quan",
       identical: "Đồng nhất",
       mismatch: "Dữ liệu khác biệt"
    }
  }
};
