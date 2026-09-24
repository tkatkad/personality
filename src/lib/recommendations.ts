import { DomainKey, DomainScore } from '../types';
import { getDomainName } from '../data/ipip-neo-120';

export interface RecommendationGuide {
  furtherStudies: string[];
  recommendedCourses: string[];
  recommendedBooks: { title: string; author: string; reason: string }[];
  dailyExercises: string[];
}

export interface FutureCareerRole {
  title: string;
  field: string;
  description: string;
  keySkills: string[];
  growthTag: string; // e.g. "Sangat Tinggi (High Growth 2026-2036)"
}

export function getCareerDevelopmentGuides(
  domains: Record<DomainKey, DomainScore>,
  language: string = 'id'
): RecommendationGuide {
  const sortedKeys = (['N', 'E', 'O', 'A', 'C'] as DomainKey[]).sort(
    (a, b) => domains[b].totalScore - domains[a].totalScore
  );

  const top1 = sortedKeys[0];
  const top2 = sortedKeys[1];

  const cScore = domains.C.totalScore;
  const eScore = domains.E.totalScore;
  const oScore = domains.O.totalScore;
  const aScore = domains.A.totalScore;
  const nScore = domains.N.totalScore;

  // 1. Further Studies & Certifications
  const furtherStudies: string[] = [];
  if (cScore >= 75) {
    furtherStudies.push(
      language === 'es'
        ? 'Gestión de Proyectos Profesional (PMP®) / Certificación Agile Scrum Master'
        : language === 'en'
        ? 'Project Management Professional (PMP®) / Agile Scrum Master Certification'
        : 'Sertifikasi Manajemen Proyek Profesional (PMP®) / Agile Scrum Master'
    );
    furtherStudies.push(
      language === 'es'
        ? 'S1/S2 Administración de Empresas, Cadena de Suministro o Análisis de Datos'
        : language === 'en'
        ? 'Master in Business Administration (MBA), Supply Chain, or Data Analytics'
        : 'Magister Manajemen / Magister Sains Analitika Data & Manajemen Operasional'
    );
  } else {
    furtherStudies.push(
      language === 'es'
        ? 'Certificación en Metodología Lean & Eficiencia Operativa'
        : language === 'en'
        ? 'Lean Professional & Operational Efficiency Certification'
        : 'Sertifikasi Manajemen Operasional & Lean System'
    );
  }

  if (eScore >= 75) {
    furtherStudies.push(
      language === 'es'
        ? 'Especialización en Negociación Estratégica, Liderazgo Ejecutivo y Ventas B2B'
        : language === 'en'
        ? 'Executive Leadership & Strategic B2B Sales Specialization'
        : 'Spesialisasi Kepemimpinan Eksekutif, Negosiasi Bisnis & B2B Sales'
    );
  } else {
    furtherStudies.push(
      language === 'es'
        ? 'Certificación Técnica en Arquitectura de Software, Ciencia de Datos o Diseño UX'
        : language === 'en'
        ? 'Technical Certification in Software Architecture, Data Science, or Systems Design'
        : 'Sertifikasi Keahlian Khusus (Data Science, UX Research, atau Technical Architecture)'
    );
  }

  if (oScore >= 75) {
    furtherStudies.push(
      language === 'es'
        ? 'Estudios en Innovación Tecnológica, Inteligencia Artificial aplicada o Pensamiento de Diseño'
        : language === 'en'
        ? 'Innovation Management, Applied Artificial Intelligence, or Design Thinking'
        : 'Program Studi / Sertifikasi Inovasi Produk, AI Implementation, & Design Thinking'
    );
  }

  if (aScore >= 75) {
    furtherStudies.push(
      language === 'es'
        ? 'S1/S2 Gestión de Recursos Humanos, Psicología Organizacional o Experiencia del Cliente'
        : language === 'en'
        ? 'Human Capital Management, Organizational Psychology, or Customer Experience (CX)'
        : 'Sertifikasi Manajemen Modal Manusia (CHRP / HR Manager) & Psikologi Organisasi'
    );
  }

  // 2. Recommended Courses
  const recommendedCourses: string[] = [];
  if (oScore >= 70) {
    recommendedCourses.push(
      language === 'es'
        ? 'Curso de Estrategia de Innovación y Metodología Design Thinking'
        : language === 'en'
        ? 'Strategic Innovation & Design Thinking Masterclass'
        : 'Kursus Strategic Innovation & Design Thinking Workshop'
    );
    recommendedCourses.push(
      language === 'es'
        ? 'Aplicación Práctica de Inteligencia Artificial para Profesionales'
        : language === 'en'
        ? 'Practical AI Implementation for Business Professionals'
        : 'Kursus Implementasi Praktis Generative AI dalam Dunia Kerja'
    );
  } else {
    recommendedCourses.push(
      language === 'es'
        ? 'Curso de Optimización de Procesos e Excelencia Operativa'
        : language === 'en'
        ? 'Process Optimization & Operational Excellence Course'
        : 'Kursus Efisiensi Proses Kerja & Manajemen Sistem'
    );
  }

  if (eScore >= 70) {
    recommendedCourses.push(
      language === 'es'
        ? 'Entrenamiento Avanzado en Oratoria, Persuasión y Presentaciones Ejecutivas'
        : language === 'en'
        ? 'Public Speaking, Persuasive Executive Pitching & Toastmasters'
        : 'Pelatihan Public Speaking, Pitching Eksekutif & Persuasi Bisnis'
    );
  } else {
    recommendedCourses.push(
      language === 'es'
        ? 'Curso de Comunicación Asíncrona y Redacción de Documentos de Estrategia'
        : language === 'en'
        ? 'Effective Asynchronous Communication & Strategic Business Writing'
        : 'Kursus Komunikasi Asinkron & Penulisan Dokumen Strategis Bisnis'
    );
  }

  if (cScore >= 70) {
    recommendedCourses.push(
      language === 'es'
        ? 'Masterclass de Gestión del Tiempo, OKRs y Planificación de Prioridades'
        : language === 'en'
        ? 'Time Management, OKRs Execution & Strategic Prioritization Masterclass'
        : 'Kursus Manajemen Waktu, Eksekusi OKR & Penentuan Prioritas Kerja'
    );
  }

  // 3. Recommended Books
  const recommendedBooks: { title: string; author: string; reason: string }[] = [];

  recommendedBooks.push({
    title: 'Atomic Habits (Perubahan Kecil yang Memberikan Hasil Luar Biasa)',
    author: 'James Clear',
    reason:
      language === 'es'
        ? 'Esencial para construir rutinas de trabajo altamente efectivas y mantener la disciplina sistemática.'
        : language === 'en'
        ? 'Essential for building highly effective daily workplace systems and sustainable career discipline.'
        : 'Sangat krusial untuk membangun sistem kebiasaan harian yang konsisten dan eksekusi kerja yang disiplin.',
  });

  if (top1 === 'C' || top2 === 'C') {
    recommendedBooks.push({
      title: 'Deep Work (Aturan untuk Meraih Sukses di Dunia yang Penuh Gangguan)',
      author: 'Cal Newport',
      reason:
        language === 'es'
          ? 'Guía indispensable para maximizar la concentración profunda y producir resultados de alto valor sin distracciones.'
          : language === 'en'
          ? 'Indispensable guide to mastering distraction-free deep concentration and producing high-value output.'
          : 'Panduan wajib untuk melatih fokus mendalam tanpa terdistraksi dan menghasilkan karya berkualitas tinggi.',
    });
  }

  if (top1 === 'E' || top2 === 'E') {
    recommendedBooks.push({
      title: 'How to Win Friends and Influence People (Cara Mencari Kawan dan Memengaruhi Orang Lain)',
      author: 'Dale Carnegie',
      reason:
        language === 'es'
          ? 'Potencia tus habilidades interpersonales, liderazgo de equipos y persuasión profesional.'
          : language === 'en'
          ? 'Sharpen your interpersonal influence, team motivation, and professional networking leadership.'
          : 'Mempertajam kemampuan komunikasi interpersonal, kepemimpinan tim, serta jaringan profesional.',
    });
  } else {
    recommendedBooks.push({
      title: 'Quiet: The Power of Introverts in a World That Can\'t Stop Talking',
      author: 'Susan Cain',
      reason:
        language === 'es'
          ? 'Aprende a aprovechar la fuerza de la reflexión profunda, la escucha atenta y la estrategia silenciosa.'
          : language === 'en'
          ? 'Learn how to leverage the immense power of deep listening, quiet reflection, and thoughtful strategy.'
          : 'Memahami cara mengoptimalkan kekuatan analisa mendalam, kemampuan mendengar, dan strategi independen.',
    });
  }

  if (top1 === 'O' || top2 === 'O') {
    recommendedBooks.push({
      title: 'Thinking, Fast and Slow (Berpikir, Cepat dan Lambat)',
      author: 'Daniel Kahneman',
      reason:
        language === 'es'
          ? 'Profundiza en los sesgos cognitivos y toma decisiones estratégicas más acertadas en tu carrera.'
          : language === 'en'
          ? 'Gain profound insights into cognitive biases and improve critical decision-making accuracy.'
          : 'Memahami bias kognitif dan meningkatkan akurasi pengambilan keputusan strategis dalam karir.',
    });
  }

  if (top1 === 'A' || top2 === 'A') {
    recommendedBooks.push({
      title: 'Crucial Conversations (Percakapan Krusial Saat Taruhan Tinggi)',
      author: 'Kerry Patterson et al.',
      reason:
        language === 'es'
          ? 'Aprende a manejar discusiones difíciles en el trabajo con diplomacia, empatía y firmeza.'
          : language === 'en'
          ? 'Master high-stakes workplace dialogues with empathy, diplomacy, and constructive resolution.'
          : 'Menguasai seni berdiskusi saat situasi penuh tekanan dengan empati, diplomasi, dan solusi memuaskan.',
    });
  }

  // 4. Daily Practical Exercises
  const dailyExercises: string[] = [];
  dailyExercises.push(
    language === 'es'
      ? 'Ejercicio de Planificación Matutina (Top 3 Prioridades): Anota las 3 tareas más importantes antes de revisar correos o redes.'
      : language === 'en'
      ? 'Morning Top 3 Priorities Drill: Write down your 3 vital tasks before opening emails or messaging apps.'
      : 'Latihan Top 3 Prioritas Harian: Tuliskan 3 tugas terpenting setiap pagi sebelum membuka email/pesan.'
  );

  dailyExercises.push(
    language === 'es'
      ? 'Técnica de Escucha Activa: En reuniones, resume lo que dijo la otra persona antes de dar tu respuesta.'
      : language === 'en'
      ? 'Active Listening Simulation: Summarize the other person\'s point before presenting your rebuttal or response.'
      : 'Latihan Active Listening: Dalam rapat, rangkum poin pembicara lain sebelum Anda menyampaikan tanggapan.'
  );

  dailyExercises.push(
    language === 'es'
      ? 'Evaluación Semanal de Reflexión: Dedica 15 minutos los viernes para revisar qué funcionó bien y qué mejorar.'
      : language === 'en'
      ? 'Weekly Progress Retrospective: Spend 15 minutes every Friday reviewing achievements and process bottlenecks.'
      : 'Evaluasi Mingguan (15 Menit Setiap Jumat): Tinjau pencapaian, hambatan kerja, dan rencana perbaikan minggu depan.'
  );

  if (nScore >= 65) {
    dailyExercises.push(
      language === 'es'
        ? 'Latihan Respiración y Pausa Mental: Realiza 3 minutos de respiración diafragmática al sentir tensión por plazos.'
        : language === 'en'
        ? 'Stress Resilience Breathing Drill: Take a 3-minute mindful pause when facing tight deadlines or friction.'
        : 'Latihan Regulasi Emosi (Teknik Pernapasan 3 Menit): Lakukan jeda saat menghadapi tenggat waktu ketat.'
    );
  }

  return {
    furtherStudies: furtherStudies.slice(0, 3),
    recommendedCourses: recommendedCourses.slice(0, 3),
    recommendedBooks: recommendedBooks.slice(0, 4),
    dailyExercises: dailyExercises.slice(0, 4),
  };
}

/**
 * Calculates concrete future job professions (10-Year Horizon 2026-2036)
 * based on Big Five trait combination.
 */
export function getFutureCareerProjections(
  domains: Record<DomainKey, DomainScore>,
  language: string = 'id'
): FutureCareerRole[] {
  const cScore = domains.C.totalScore;
  const eScore = domains.E.totalScore;
  const oScore = domains.O.totalScore;
  const aScore = domains.A.totalScore;
  const nScore = domains.N.totalScore;

  const roles: FutureCareerRole[] = [];

  // 1. High Openness + High Conscientiousness -> AI Ethics, Systems Architecture, Prompt Engineering
  if (oScore >= 70 && cScore >= 70) {
    roles.push({
      title:
        language === 'es'
          ? 'Ingeniero de Prompts & Estratega de IA Generativa'
          : language === 'en'
          ? 'AI Prompt Engineer & Generative Systems Strategist'
          : 'Prompt Engineer & Generative AI Systems Strategist',
      field: language === 'es' ? 'Inteligencia Artificial y Tecnología' : language === 'en' ? 'AI & Technology' : 'Teknologi & Kecerdasan Buatan',
      description:
        language === 'es'
          ? 'Diseña instrucciones complejas y arquitecturas de conocimiento para integrar modelos de IA generativa en procesos empresariales con alta precisión.'
          : language === 'en'
          ? 'Designs complex instructions and knowledge architectures to seamlessly integrate generative AI into enterprise workflows with high accuracy.'
          : 'Merancang instruksi konteks kompleks dan arsitektur pengetahuan untuk mengintegrasikan sistem AI Generatif ke dalam alur kerja bisnis secara presisi.',
      keySkills: ['Prompt Architecture', 'LLM Context Engineering', 'System Workflow Design'],
      growthTag: '🔥 High Demand (2026–2036)',
    });

    roles.push({
      title:
        language === 'es'
          ? 'Auditor de Ética de IA y Cumplimiento de Algoritmos'
          : language === 'en'
          ? 'AI Ethics & Algorithmic Audit Officer'
          : 'AI Ethics & Algorithmic Audit Specialist',
      field: language === 'es' ? 'Gobernanza Digital y Riesgo' : language === 'en' ? 'Digital Governance & Risk' : 'Gobernansi & Risiko Digital',
      description:
        language === 'es'
          ? 'Garantiza que los algoritmos automatizados y sistemas de IA cumplan con regulaciones de privacidad, minimicen sesgos kognitivos y protejan datos.'
          : language === 'en'
          ? 'Ensures automated algorithms and AI models adhere to privacy laws, eliminate cognitive bias, and maintain data integrity.'
          : 'Memastikan sistem kecerdasan buatan dan algoritma perusahaan bebas dari bias kognitif, patuh pada regulasi privasi data, dan etis secara hukum.',
      keySkills: ['AI Governance', 'Algorithmic Auditing', 'Regulatory Compliance'],
      growthTag: '📈 Exponential Growth',
    });
  }

  // 2. High Extraversion + High Openness -> Business Transformation, Community Leadership, Ecosystem Strategy
  if (eScore >= 70 || oScore >= 75) {
    roles.push({
      title:
        language === 'es'
          ? 'Líder de Transformación Digital y Adopción de IA'
          : language === 'en'
          ? 'AI Business Transformation Lead'
          : 'AI Business Transformation Lead',
      field: language === 'es' ? 'Estrategia y Liderazgo Executivo' : language === 'en' ? 'Executive Strategy' : 'Strategi Bisnis & Transformasi',
      description:
        language === 'es'
          ? 'Juega un papel clave en inspirar y dirigir a los equipos en la transición tecnológica, conectando la visión de negocio con soluciones digitales.'
          : language === 'en'
          ? 'Bridges executive leadership and technical teams to spearhead organization-wide digital and AI adoption seamlessly.'
          : 'Memimpin perubahan budaya dan adopsi teknologi di perusahaan, menjembatani visi pimpinan eksekutif dengan tim teknikal.',
      keySkills: ['Change Management', 'Executive Pitching', 'AI Business Strategy'],
      growthTag: '🚀 Core Leadership Role',
    });

    roles.push({
      title:
        language === 'es'
          ? 'Gerente de Ecosistemas y Alianzas Estratégicas Digitales'
          : language === 'en'
          ? 'Digital Ecosystem & Strategic Partnerships Manager'
          : 'Digital Ecosystem & Strategic Partnership Manager',
      field: language === 'es' ? 'Desarrollo de Negocio Global' : language === 'en' ? 'Global Business Growth' : 'Pengembangan Ekosistem Bisnis',
      description:
        language === 'es'
          ? 'Construye redes de cooperación entre startups, plataformas en la nube y grandes corporaciones para crear nuevas fuentes de valor.'
          : language === 'en'
          ? 'Builds collaborative networks between cloud platforms, tech startups, and global enterprises to unlock new revenue streams.'
          : 'Membangun jejaring kemitraan strategis antara platform digital, startup, dan korporasi global untuk memperluas ekosistem bisnis.',
      keySkills: ['B2B Negotiation', 'Ecosystem Strategy', 'Cross-Industry Networking'],
      growthTag: '🌐 Global High Demand',
    });
  }

  // 3. High Conscientiousness -> ESG, Supply Chain Resilience, Data Risk
  if (cScore >= 68) {
    roles.push({
      title:
        language === 'es'
          ? 'Especialista en Operaciones ESG y Ketahanan Cadena de Suministro'
          : language === 'en'
          ? 'ESG & Sustainable Supply Chain Operations Architect'
          : 'ESG & Sustainable Supply Chain Specialist',
      field: language === 'es' ? 'Sostenibilidad y Cadena de Suministro' : language === 'en' ? 'Sustainability & Supply Chain' : 'Operasional & Keberlanjutan (ESG)',
      description:
        language === 'es'
          ? 'Asegura que la cadena de producción global sea verde, responda a regulaciones de huella de carbono y mantenga la eficiencia operatif.'
          : language === 'en'
          ? 'Orchestrates eco-friendly global supply chains, tracking carbon footprints and maintaining operational resilience.'
          : 'Mengelola rantai pasok global yang ramah lingkungan (ESG), memantau jejak karbon, serta mengoptimalkan ketahanan operasional.',
      keySkills: ['ESG Standards', 'Supply Chain Analytics', 'Operational Precision'],
      growthTag: '🌱 Sustainable Future',
    });
  }

  // 4. High Agreeableness -> Human Capital, CX, Mental Wellbeing
  if (aScore >= 68) {
    roles.push({
      title:
        language === 'es'
          ? 'Arquitecto de Salud Mental y Bienestar Organizacional'
          : language === 'en'
          ? 'Chief Employee Experience & Wellbeing Architect'
          : 'Chief Employee Experience & Wellbeing Architect',
      field: language === 'es' ? 'Recursos Humanos y Psicología' : language === 'en' ? 'HR & Workplace Psychology' : 'Manajemen Modal Manusia & Kesejahteraan',
      description:
        language === 'es'
          ? 'Diseña programas de retención y ambiente de trabajo empático para prevenir el burnout en entornos de trabajo híbridos y remotos.'
          : language === 'en'
          ? 'Designs empathetic workplace environments and retention strategies to prevent burnout in remote and hybrid teams.'
          : 'Merancang lingkungan kerja yang empati, fleksibel, dan mendukung kesehatan mental karyawan di era kerja remote/hybrid.',
      keySkills: ['Empathy & HR Strategy', 'Workplace Psychology', 'Conflict Resolution'],
      growthTag: '❤️ High Retention Value',
    });
  }

  // Fallback / General modern roles
  if (roles.length < 4) {
    roles.push({
      title:
        language === 'es'
          ? 'Diseñador de Experiencia de Usuario e Interacción Humano-IA'
          : language === 'en'
          ? 'Human-AI Experience & Interaction Designer'
          : 'Human-AI Experience (UX) Designer',
      field: language === 'es' ? 'Diseño de Producto Digital' : language === 'en' ? 'Digital Product Design' : 'Desain Produk Digital & UX',
      description:
        language === 'es'
          ? 'Crea interfaces intuïtiuas para que para cualquier persona sea fácil y cómodo interactuar con copilotos de inteligencia artificial.'
          : language === 'en'
          ? 'Crafts intuitive interfaces that make human collaboration with AI co-pilots seamless, clear, and delightful.'
          : 'Merancang antarmuka produk digital yang intuitif dan mudah digunakan saat manusia berinteraksi dengan asisten/copilot AI.',
      keySkills: ['UX Research', 'AI Interaction Design', 'User Centricity'],
      growthTag: '🎨 Product Core',
    });
  }

  return roles.slice(0, 5);
}
