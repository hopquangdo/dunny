export interface Paragraph {
  id: string
  title: string
  topic: string
  difficulty: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  language: "en-to-vi" | "vi-to-en"
  text: string
  sentenceCount: number
}

export const paragraphs: Paragraph[] = [
  // Letters: English → Vietnamese
  {
    id: "letter-1",
    title: "A Friendly Letter to a Friend",
    topic: "Letter",
    difficulty: "A2",
    language: "en-to-vi",
    text: `Dear Anna,
I hope you are doing well. I wanted to tell you about my recent trip to the countryside. The weather was beautiful, and I enjoyed walking in nature. I wish you could have joined me. Looking forward to seeing you soon.
Best regards,
Emily`,
    sentenceCount: 7,
  },
  {
    id: "letter-2",
    title: "Thank You Letter",
    topic: "Letter",
    difficulty: "B1",
    language: "en-to-vi",
    text: `Dear Mr. Tran,
I am writing to thank you for your kind support during my internship. Your guidance helped me understand the company’s workflow better and improved my professional skills. I truly appreciate your time and effort. I hope we can work together again in the future.
Sincerely,
Minh`,
    sentenceCount: 6,
  },
  {
    id: "letter-3",
    title: "Invitation to a Party",
    topic: "Letter",
    difficulty: "A2",
    language: "en-to-vi",
    text: `Hi David,
I would like to invite you to my birthday party next Saturday. It will be at my house from 4 PM. There will be food, games, and music. I hope you can come and celebrate with us.
Best,
Lisa`,
    sentenceCount: 5,
  },
  {
    id: "letter-4",
    title: "Letter of Apology",
    topic: "Letter",
    difficulty: "B2",
    language: "en-to-vi",
    text: `Dear Sarah,
I am writing to apologize for missing the meeting yesterday. It was entirely my fault, and I should have informed you in advance. I value our collaboration and hope this does not affect our work. I will make sure it does not happen again.
Sincerely,
John`,
    sentenceCount: 6,
  },

  // Letters: Vietnamese → English
  {
    id: "letter-5",
    title: "Thư Gửi Bạn Bè",
    topic: "Letter",
    difficulty: "A2",
    language: "vi-to-en",
    text: `Chào Lan,
Mình hy vọng bạn vẫn khỏe. Mình muốn kể với bạn về chuyến đi vừa rồi đến biển. Thời tiết thật đẹp và mình rất thích bơi lội. Giá như bạn cũng đi cùng thì tuyệt biết mấy. Hẹn gặp bạn sớm nhé.
Thân mến,
Hùng`,
    sentenceCount: 7,
  },
  {
    id: "letter-6",
    title: "Thư Cảm Ơn",
    topic: "Letter",
    difficulty: "B1",
    language: "vi-to-en",
    text: `Kính gửi cô Mai,
Em viết thư này để cảm ơn cô đã giúp đỡ trong quá trình học tập. Sự hướng dẫn của cô giúp em hiểu bài học tốt hơn và nâng cao kỹ năng của mình. Em rất biết ơn thời gian và công sức của cô. Hy vọng sẽ được học cùng cô trong các khóa học tiếp theo.
Trân trọng,
Lan`,
    sentenceCount: 6,
  },
  {
    id: "letter-7",
    title: "Thư Mời Dự Tiệc",
    topic: "Letter",
    difficulty: "A2",
    language: "vi-to-en",
    text: `Chào Minh,
Mình muốn mời bạn đến dự sinh nhật của mình vào thứ Bảy tới. Tiệc sẽ diễn ra tại nhà mình từ 4 giờ chiều. Sẽ có thức ăn, trò chơi và âm nhạc. Hy vọng bạn có thể đến và chung vui cùng mọi người.
Thân,
Hà`,
    sentenceCount: 5,
  },
  {
    id: "letter-8",
    title: "Thư Xin Lỗi",
    topic: "Letter",
    difficulty: "B2",
    language: "vi-to-en",
    text: `Chào chị Thu,
Mình viết thư này để xin lỗi vì đã bỏ lỡ cuộc họp hôm qua. Hoàn toàn là lỗi của mình và mình nên thông báo trước cho chị. Mình trân trọng sự hợp tác của chị và hy vọng điều này không ảnh hưởng đến công việc. Mình sẽ đảm bảo không để xảy ra lần sau.
Trân trọng,
Quân`,
    sentenceCount: 6,
  },
  {
    id: "letter-9",
    title: "Thư Chúc Mừng",
    topic: "Letter",
    difficulty: "B1",
    language: "vi-to-en",
    text: `Chào bạn An,
Mình muốn gửi lời chúc mừng bạn đã đạt giải trong cuộc thi vẽ tranh. Thật tuyệt khi thấy nỗ lực của bạn được ghi nhận. Chúc bạn luôn sáng tạo và thành công trong các dự án tiếp theo.
Thân mến,
Huy`,
    sentenceCount: 5,
  },
  {
    id: "letter-10",
    title: "Thư Xin Nghỉ Phép",
    topic: "Letter",
    difficulty: "B2",
    language: "vi-to-en",
    text: `Kính gửi sếp,
Em viết thư này xin nghỉ phép từ ngày 10 đến 15 tháng 10 để tham gia chuyến du lịch cùng gia đình. Em sẽ hoàn thành công việc còn lại trước khi nghỉ và đảm bảo không ảnh hưởng đến tiến độ dự án.
Trân trọng,
Thảo`,
    sentenceCount: 5,
  },

  {
    id: "english-importance",
    title: "The Importance of Learning English",
    topic: "Education",
    difficulty: "B1",
    language: "en-to-vi",
    text: `The importance of learning English cannot be overstated in today's globalized world. English serves as a bridge connecting people from different cultures and backgrounds. It opens doors to countless opportunities in education, career advancement, and personal growth. By mastering English, individuals gain access to a vast repository of knowledge, literature, and scientific research. Moreover, English proficiency enhances one's ability to communicate effectively in international settings, making it an invaluable skill in the modern era.`,
    sentenceCount: 5,
  },
  {
    id: "technology-impact",
    title: "Technology's Impact on Society",
    topic: "Technology",
    difficulty: "C1",
    language: "en-to-vi",
    text: `Technology has fundamentally transformed the way we live, work, and interact with one another. The digital revolution has created unprecedented opportunities for innovation and connectivity. However, it also presents challenges such as privacy concerns and digital divide issues. As artificial intelligence and automation continue to advance, society must adapt to these changes thoughtfully. The key lies in harnessing technology's potential while addressing its ethical implications and ensuring equitable access for all.`,
    sentenceCount: 5,
  },
  {
    id: "healthy-lifestyle",
    title: "Maintaining a Healthy Lifestyle",
    topic: "Health",
    difficulty: "A2",
    language: "en-to-vi",
    text: `A healthy lifestyle is essential for overall well-being and longevity. Regular exercise helps maintain physical fitness and mental clarity. Eating a balanced diet provides the nutrients our bodies need to function properly. Getting adequate sleep is crucial for recovery and cognitive performance. By making these healthy choices consistently, we can improve our quality of life and prevent many common health issues.`,
    sentenceCount: 5,
  },
  {
    id: "climate-change",
    title: "Understanding Climate Change",
    topic: "Environment",
    difficulty: "C1",
    language: "en-to-vi",
    text: `Climate change represents one of the most pressing challenges facing humanity today. Rising global temperatures are causing widespread environmental disruptions, from melting ice caps to extreme weather events. The primary driver of this phenomenon is the accumulation of greenhouse gases in the atmosphere, largely due to human activities. Addressing climate change requires coordinated international efforts and significant changes in how we produce and consume energy. The decisions we make today will determine the planet's future for generations to come.`,
    sentenceCount: 5,
  },
  {
    id: "time-management",
    title: "Effective Time Management",
    topic: "Productivity",
    difficulty: "B2",
    language: "en-to-vi",
    text: `Effective time management is a crucial skill for success in both personal and professional life. By prioritizing tasks and setting clear goals, individuals can accomplish more in less time. Breaking large projects into smaller, manageable steps makes them less overwhelming and easier to complete. Eliminating distractions and focusing on one task at a time improves productivity significantly. Learning to say no to non-essential commitments helps maintain focus on what truly matters.`,
    sentenceCount: 5,
  },
  {
    id: "reading-benefits",
    title: "The Benefits of Reading",
    topic: "Education",
    difficulty: "A2",
    language: "en-to-vi",
    text: `Reading is one of the most enriching activities a person can engage in. Books open windows to new worlds, ideas, and perspectives. Regular reading improves vocabulary, comprehension, and critical thinking skills. It also provides a healthy escape from daily stress and stimulates imagination. Whether fiction or non-fiction, every book offers valuable lessons and insights that contribute to personal growth.`,
    sentenceCount: 5,
  },
  // Vietnamese → English paragraphs
  {
    id: "van-hoa-viet-nam",
    title: "Văn Hóa Việt Nam",
    topic: "Culture",
    difficulty: "B1",
    language: "vi-to-en",
    text: `Văn hóa Việt Nam là một nền văn hóa phong phú và đa dạng với lịch sử hàng ngàn năm. Người Việt Nam luôn tự hào về truyền thống hiếu học và tôn trọng người lớn tuổi. Ẩm thực Việt Nam nổi tiếng thế giới với những món ăn đặc sắc như phở, bánh mì và bún chả. Lễ hội truyền thống như Tết Nguyên Đán thể hiện sự gắn kết của cộng đồng và gia đình. Văn hóa Việt Nam tiếp tục phát triển và hòa nhập với thế giới hiện đại.`,
    sentenceCount: 5,
  },
  {
    id: "giao-duc-viet-nam",
    title: "Giáo Dục Việt Nam",
    topic: "Education",
    difficulty: "C1",
    language: "vi-to-en",
    text: `Hệ thống giáo dục Việt Nam đã có những bước tiến đáng kể trong những thập kỷ gần đây. Chính phủ đầu tư mạnh mẽ vào cơ sở vật chất và đào tạo giáo viên. Học sinh Việt Nam thường đạt thành tích cao trong các kỳ thi quốc tế về toán học và khoa học. Tuy nhiên, hệ thống giáo dục vẫn đang chuyển đổi từ học thuộc lòng sang phát triển tư duy sáng tạo. Mục tiêu là tạo ra thế hệ trẻ có khả năng cạnh tranh trong nền kinh tế tri thức toàn cầu.`,
    sentenceCount: 5,
  },
  {
    id: "du-lich-viet-nam",
    title: "Du Lịch Việt Nam",
    topic: "Travel",
    difficulty: "A2",
    language: "vi-to-en",
    text: `Việt Nam là một điểm đến du lịch hấp dẫn với cảnh quan thiên nhiên tuyệt đẹp. Vịnh Hạ Long được UNESCO công nhận là di sản thiên nhiên thế giới. Phố cổ Hội An mang đậm nét kiến trúc truyền thống Việt Nam. Thành phố Hồ Chí Minh và Hà Nội là những trung tâm văn hóa và kinh tế sôi động. Du khách đến Việt Nam luôn được chào đón nồng nhiệt bởi sự hiếu khách của người dân địa phương.`,
    sentenceCount: 5,
  },
  {
    id: "cong-nghe-viet-nam",
    title: "Công Nghệ Việt Nam",
    topic: "Technology",
    difficulty: "C1",
    language: "vi-to-en",
    text: `Ngành công nghệ thông tin Việt Nam đang phát triển với tốc độ ấn tượng. Nhiều startup Việt Nam đã thu hút được vốn đầu tư quốc tế lớn. Chính phủ khuyến khích chuyển đổi số trong tất cả các lĩnh vực của nền kinh tế. Việt Nam đang trở thành một trung tâm quan trọng về phát triển phần mềm và dịch vụ công nghệ. Thế hệ trẻ Việt Nam có kỹ năng công nghệ cao và tinh thần khởi nghiệp mạnh mẽ.`,
    sentenceCount: 5,
  },
  {
    id: "am-thuc-viet-nam",
    title: "Ẩm Thực Việt Nam",
    topic: "Food",
    difficulty: "A2",
    language: "vi-to-en",
    text: `Ẩm thực Việt Nam nổi tiếng với hương vị đặc trưng và cách chế biến tinh tế. Phở là món ăn quốc hồn quốc tuý của Việt Nam được yêu thích trên toàn thế giới. Mỗi vùng miền có những đặc sản riêng phản ánh văn hóa địa phương. Người Việt Nam coi trọng việc ăn uống cùng gia đình và bạn bè. Ẩm thực đường phố Việt Nam mang đến trải nghiệm ẩm thực độc đáo và phong phú.`,
    sentenceCount: 5,
  },
  {
    id: "moi-truong-viet-nam",
    title: "Môi Trường Việt Nam",
    topic: "Environment",
    difficulty: "B2",
    language: "vi-to-en",
    text: `Bảo vệ môi trường đang trở thành ưu tiên hàng đầu của Việt Nam. Chính phủ đã ban hành nhiều chính sách để giảm thiểu ô nhiễm và bảo tồn tài nguyên thiên nhiên. Các tổ chức phi chính phủ và cộng đồng địa phương tích cực tham gia các hoạt động bảo vệ môi trường. Việt Nam cam kết đạt mục tiêu phát thải ròng bằng không vào năm 2050. Giáo dục về môi trường đang được đưa vào chương trình học ở các trường học.`,
    sentenceCount: 5,
  },
]

import { getCustomParagraphs } from "./custom-paragraphs"

export function getAllParagraphs(): Paragraph[] {
  const customParagraphs = getCustomParagraphs()
  return [...paragraphs, ...customParagraphs]
}

export function getParagraphById(id: string): Paragraph | undefined {
  const allParagraphs = getAllParagraphs()
  return allParagraphs.find((p) => p.id === id)
}

export function getUniqueTopics(): string[] {
  const allParagraphs = getAllParagraphs()
  return Array.from(new Set(allParagraphs.map((p) => p.topic))).sort()
}

export function getLanguageLabel(language: "en-to-vi" | "vi-to-en"): string {
  return language === "en-to-vi" ? "English → Vietnamese" : "Vietnamese → English"
}
