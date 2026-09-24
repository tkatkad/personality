import { DomainKey, FacetDefinition, Item } from '../types';

export const DOMAIN_METADATA: Record<DomainKey, {
  nameEn: string;
  nameId: string;
  nameEs: string;
  taglineEn: string;
  taglineId: string;
  taglineEs: string;
  color: string;
  darkColor: string;
  bgLight: string;
  descriptionEn: string;
  descriptionId: string;
  descriptionEs: string;
}> = {
  N: {
    nameEn: 'Neuroticism',
    nameId: 'Neurotisitis (Stabilitas Emosi)',
    nameEs: 'Neuroticismo',
    taglineEn: 'Tendency to experience negative emotions such as anxiety, anger, and depression.',
    taglineId: 'Kecenderungan mengalami emosi negatif seperti kecemasan, kemarahan, dan depresi.',
    taglineEs: 'Tendencia a experimentar emociones negativas como ansiedad, ira y depresión.',
    color: '#ef4444',
    darkColor: '#f87171',
    bgLight: 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900',
    descriptionEn: 'Neuroticism refers to the tendency to experience distressing emotions easily. High scorers are prone to anxiety, mood swings, and emotional reactivity under stress, whereas low scorers (emotionally stable) tend to remain calm, balanced, and resilient.',
    descriptionId: 'Neurotisitis merujuk pada kecenderungan mengalami emosi yang bergejolak. Skor tinggi cenderung lebih cemas, peka terhadap stres, dan mengalami perubahan suasana hati, sedangkan skor rendah (stabil secara emosional) cenderung tenang dan tenang saat menghadapi kendala.',
    descriptionEs: 'El neuroticismo se refiere a la tendencia a experimentar emociones angustiosas fácilmente. Las puntuaciones altas son propensas a la ansiedad y cambios de humor, mientras que las bajas son emocionalmente estables y serenas.',
  },
  E: {
    nameEn: 'Extraversion',
    nameId: 'Ekstraversi',
    nameEs: 'Extraversión',
    taglineEn: 'Engagement with the external social world, energy, and positive emotionality.',
    taglineId: 'Keterlibatan dengan dunia sosial, tingkat energi, dan antusiasme emosional.',
    taglineEs: 'Interacción con el mundo social externo, energía y emocionalidad positiva.',
    color: '#f59e0b',
    darkColor: '#fbbf24',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900',
    descriptionEn: 'Extraversion reflects orientation toward social stimulation and positive energy. High scorers enjoy social interaction, assertiveness, and active environments, while low scorers (introverts) prefer quiet environments and solitude to recharge.',
    descriptionId: 'Ekstraversi mencerminkan antusiasme terhadap interaksi sosial dan aktivitas luar. Skor tinggi menyukai lingkungan yang ramai, sosial, dan penuh energi, sementara skor rendah (introvert) lebih nyaman dalam suasana tenang dan mandiri.',
    descriptionEs: 'La extraversión refleja la orientación hacia la estimulación social y la energía positiva. Las puntuaciones altas disfrutan de la interacción social, mientras que las personas introvertidas prefieren ambientes tranquilos.',
  },
  O: {
    nameEn: 'Openness to Experience',
    nameId: 'Keterbukaan terhadap Pengalaman',
    nameEs: 'Apertura a la Experiencia',
    taglineEn: 'Intellectual curiosity, creative imagination, and appreciation for novelty.',
    taglineId: 'Keingintahuan intelektual, imajinasi kreatif, dan keterbukaan pada ide baru.',
    taglineEs: 'Curiosidad intelectual, imaginación creativa y aprecio por la novedad.',
    color: '#3b82f6',
    darkColor: '#60a5fa',
    bgLight: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900',
    descriptionEn: 'Openness describes a person\'s cognitive flexibility, aesthetic sensitivity, and desire for variety. High scorers are imaginative, open-minded, and intellectually curious. Low scorers tend to be practical, conventional, and prefer familiar routines.',
    descriptionId: 'Keterbukaan menggambarkan fleksibilitas berpikir, kepekaan seni, dan ketertarikan pada hal baru. Skor tinggi imajinatif dan suka bereksplorasi, sedangkan skor rendah lebih praktis, realistis, dan menyukai rutinitas terstruktur.',
    descriptionEs: 'La apertura describe la flexibilidad cognitiva, la sensibilidad estética y el deseo de variedad. Puntuaciones altas son imaginativas y curiosas; las bajas son prácticas y convencionales.',
  },
  A: {
    nameEn: 'Agreeableness',
    nameId: 'Keresponsifan Sosial (Agreeableness)',
    nameEs: 'Amabilidad',
    taglineEn: 'Prosocial orientation, empathy, cooperation, and concern for social harmony.',
    taglineId: 'Kepedulian sosial, empati, kerja sama, dan keinginan menjaga keharmonisan.',
    taglineEs: 'Orientación prosocial, empatía, cooperación y armonía social.',
    color: '#10b981',
    darkColor: '#34d399',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
    descriptionEn: 'Agreeableness reflects interpersonal tone and orientation toward helping others. High scorers are trustworthy, empathetic, considerate, and cooperative. Low scorers tend to be competitive, skeptical, and candid.',
    descriptionId: 'Agreeableness mencerminkan kehangatan antarpribadi dan komitmen membantu orang lain. Skor tinggi jujur, peka emosional, dan kooperatif, sedangkan skor rendah lebih kritis, independen, dan kompetitif.',
    descriptionEs: 'La amabilidad refleja la orientación hacia la ayuda y cooperación con los demás. Puntuaciones altas son empáticas y confiables; las bajas son más competitivas e independientes.',
  },
  C: {
    nameEn: 'Conscientiousness',
    nameId: 'Kehati-hatian (Conscientiousness)',
    nameEs: 'Responsabilidad',
    taglineEn: 'Self-discipline, organization, goal-directed behavior, and dependability.',
    taglineId: 'Kedisiplinan diri, keteraturan, komitmen tujuan, dan keandalan.',
    taglineEs: 'Autodisciplina, organización, comportamiento orientado a metas y fiabilidad.',
    color: '#8b5cf6',
    darkColor: '#a78bfa',
    bgLight: 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900',
    descriptionEn: 'Conscientiousness involves the regulation and direction of impulses. High scorers are methodical, reliable, organized, and focused on achievement. Low scorers are more spontaneous, flexible, and relaxed about rules.',
    descriptionId: 'Kehati-hatian berkaitan dengan kendali impuls dan keteraturan kerja. Skor tinggi terencana, teratur, gigih, dan tepat waktu, sementara skor rendah lebih spontan, fleksibel, dan santai terhadap struktur.',
    descriptionEs: 'La responsabilidad implica la regulación de impulsos y la autodisciplina. Puntuaciones altas son metódicas, organizadas y confiables; las bajas son más espontáneas.',
  },
};

export function getDomainName(domainKey: DomainKey, lang: string): string {
  const meta = DOMAIN_METADATA[domainKey];
  if (!meta) return '';
  if (lang === 'es') return meta.nameEs || meta.nameEn;
  if (lang === 'en') return meta.nameEn;
  return meta.nameId;
}

export function getShortDomainName(domainKey: DomainKey, lang: string): string {
  if (lang === 'es') {
    switch (domainKey) {
      case 'N': return 'Neuroticismo';
      case 'E': return 'Extraversión';
      case 'O': return 'Apertura';
      case 'A': return 'Amabilidad';
      case 'C': return 'Responsabilidad';
    }
  }
  if (lang === 'en') {
    switch (domainKey) {
      case 'N': return 'Neuroticism';
      case 'E': return 'Extraversion';
      case 'O': return 'Openness';
      case 'A': return 'Agreeableness';
      case 'C': return 'Conscientiousness';
    }
  }
  switch (domainKey) {
    case 'N': return 'Neurotisitis';
    case 'E': return 'Ekstraversi';
    case 'O': return 'Keterbukaan';
    case 'A': return 'Agreeableness';
    case 'C': return 'Kehati-hatian';
  }
  return domainKey;
}

export function getDomainTagline(domainKey: DomainKey, lang: string): string {
  const meta = DOMAIN_METADATA[domainKey];
  if (!meta) return '';
  if (lang === 'es') return meta.taglineEs || meta.taglineEn;
  if (lang === 'en') return meta.taglineEn;
  return meta.taglineId;
}

export function getDomainDescription(domainKey: DomainKey, lang: string): string {
  const meta = DOMAIN_METADATA[domainKey];
  if (!meta) return '';
  if (lang === 'es') return meta.descriptionEs || meta.descriptionEn;
  if (lang === 'en') return meta.descriptionEn;
  return meta.descriptionId;
}

export function getScoreLevelLabel(level: 'Low' | 'Average' | 'High', lang: string): string {
  if (lang === 'es') {
    if (level === 'High') return 'Alto';
    if (level === 'Low') return 'Bajo';
    return 'Medio';
  }
  if (lang === 'en') {
    if (level === 'High') return 'High';
    if (level === 'Low') return 'Low';
    return 'Average';
  }
  if (level === 'High') return 'Tinggi';
  if (level === 'Low') return 'Rendah';
  return 'Rata-Rata';
}

export const FACETS_METADATA: Record<string, FacetDefinition> = {
  // Neuroticism
  N1: {
    id: 'N1', domain: 'N', nameEn: 'Anxiety', nameId: 'Kecemasan', nameEs: 'Ansiedad',
    descriptionEn: 'The apprehension, dread, and nervousness experienced in stressful situations.',
    descriptionId: 'Tingkat kekhawatiran dan ketegangan emosional saat menghadapi situasi.',
    descriptionEs: 'El grado de aprensión, temor y nerviosismo experimentado en situaciones estresantes.',
    highDescEn: 'Feels apprehensive, prone to worry and nervousness.',
    lowDescEn: 'Calm, relaxed, and composed under pressure.'
  },
  N2: {
    id: 'N2', domain: 'N', nameEn: 'Anger / Hostility', nameId: 'Kemarahan & Resentmen', nameEs: 'Ira y Hostilidad',
    descriptionEn: 'Tendency to experience anger, bitterness, and frustration.',
    descriptionId: 'Kecenderungan merasakan kekecewaan, kejengkelan, atau kemarahan.',
    descriptionEs: 'Tendencia a experimentar ira, amargura y frustración.',
    highDescEn: 'Easily frustrated, prone to feeling resentful.',
    lowDescEn: 'Even-tempered, hard to anger or agitate.'
  },
  N3: {
    id: 'N3', domain: 'N', nameEn: 'Depression', nameId: 'Kecenderungan Depresif', nameEs: 'Depresión',
    descriptionEn: 'Tendency to feel sad, discouraged, and lacking in enthusiasm.',
    descriptionId: 'Kecenderungan merasa sedih, berkecil hati, atau kurang bersemangat.',
    descriptionEs: 'Tendencia a sentirse triste, desanimado y con falta de entusiasmo.',
    highDescEn: 'Prone to feelings of sadness, guilt, and gloom.',
    lowDescEn: 'Rarely experiences despondency or deep sadness.'
  },
  N4: {
    id: 'N4', domain: 'N', nameEn: 'Self-Consciousness', nameId: 'Kecanggungan Sosial', nameEs: 'Timidez e Inseguridad Social',
    descriptionEn: 'Sensitivity to social evaluation and fear of awkwardness or shame.',
    descriptionId: 'Kepekaan terhadap penilaian orang lain dan ketakutan merasa canggung.',
    descriptionEs: 'Sensibilidad a la evaluación social y temor a la torpeza o la vergüenza.',
    highDescEn: 'Self-conscious, easily embarrassed in social settings.',
    lowDescEn: 'Comfortable with self in public, poised.'
  },
  N5: {
    id: 'N5', domain: 'N', nameEn: 'Immoderation', nameId: 'Impulsivitas / Immoderasi', nameEs: 'Inmoderación e Impulsividad',
    descriptionEn: 'Difficulty resisting strong cravings, impulses, and temptations.',
    descriptionId: 'Kesulitan menahan dorongan instan atau godaan keinginan.',
    descriptionEs: 'Dificultad para resistir antojos, impulsos y tentaciones intensas.',
    highDescEn: 'Acts on impulses, struggles with delayed gratification.',
    lowDescEn: 'Resists temptations, strong impulse control.'
  },
  N6: {
    id: 'N6', domain: 'N', nameEn: 'Vulnerability', nameId: 'Kerapuhan Stres', nameEs: 'Vulnerabilidad al Estrés',
    descriptionEn: 'Inability to cope effectively with intense pressure or crisis.',
    descriptionId: 'Ketahanan emosional saat berada di bawah tekanan hebat.',
    descriptionEs: 'Incapacidad para manejar de manera efectiva la presión intensa o crisis.',
    highDescEn: 'Feels overwhelmed by stress or panic in crises.',
    lowDescEn: 'Handles crises with composure and confidence.'
  },

  // Extraversion
  E1: {
    id: 'E1', domain: 'E', nameEn: 'Friendliness', nameId: 'Kehangatan & Keramahan', nameEs: 'Cordialidad y Calidez',
    descriptionEn: 'Warmth and affection toward other people.',
    descriptionId: 'Kehangatan dan perhatian tulus kepada orang lain.',
    descriptionEs: 'Calidez, afecto y cercanía sincera hacia otras personas.',
    highDescEn: 'Genuinely likes people and expresses warmth openly.',
    lowDescEn: 'Formal, reserved, and maintains personal distance.'
  },
  E2: {
    id: 'E2', domain: 'E', nameEn: 'Gregariousness', nameId: 'Suka Berkumpul', nameEs: 'Sociabilidad y Gregarismo',
    descriptionEn: 'Preference for the company of others and active social gatherings.',
    descriptionId: 'Keinginan berada di tengah keramaian atau perkumpulan sosial.',
    descriptionEs: 'Preferencia por la compañía de otros y eventos sociales activos.',
    highDescEn: 'Thrives in crowds, seeks social activity.',
    lowDescEn: 'Prefers small groups or solitude.'
  },
  E3: {
    id: 'E3', domain: 'E', nameEn: 'Assertiveness', nameId: 'Ketegasan (Assertiveness)', nameEs: 'Asertividad y Liderazgo',
    descriptionEn: 'Dominance, forcefulness, and social leadership skills.',
    descriptionId: 'Keberanian menyampaikan pendapat dan memimpin diskusi.',
    descriptionEs: 'Firmeza, capacidad de persuasión y liderazgo en grupos.',
    highDescEn: 'Speaks up, takes charge, and expresses opinions clearly.',
    lowDescEn: 'Prefers to remain in the background and listen.'
  },
  E4: {
    id: 'E4', domain: 'E', nameEn: 'Activity Level', nameId: 'Tingkat Aktivitas', nameEs: 'Nivel de Actividad',
    descriptionEn: 'Pace of living, stamina, and energy output.',
    descriptionId: 'Kecepatan irama hidup, energi, dan kesibukan harian.',
    descriptionEs: 'Ritmo de vida, energía y dinamismo en las actividades diarias.',
    highDescEn: 'Leads a fast-paced, energetic lifestyle.',
    lowDescEn: 'Prefers a leisurely, unhurried pace.'
  },
  E5: {
    id: 'E5', domain: 'E', nameEn: 'Excitement-Seeking', nameId: 'Pencarian Sensasi', nameEs: 'Búsqueda de Emociones',
    descriptionEn: 'Need for environmental stimulation, thrills, and adventure.',
    descriptionId: 'Kebutuhan akan pengalaman menantang dan suasana menggairahkan.',
    descriptionEs: 'Necesidad de estimulación, emociones fuertes y aventura.',
    highDescEn: 'Loves thrills, bright lights, and novel risks.',
    lowDescEn: 'Finds loud noise and risky excitement overwhelming.'
  },
  E6: {
    id: 'E6', domain: 'E', nameEn: 'Cheerfulness', nameId: 'Keceriaan & Optimisme', nameEs: 'Alegría y Optimismo',
    descriptionEn: 'Tendency to experience positive emotions like joy, enthusiasm, and optimism.',
    descriptionId: 'Kecenderungan merasakan kegembiraan, keceriaan, dan optimisme.',
    descriptionEs: 'Tendencia a experimentar emociones positivas como alegría y entusiasmo.',
    highDescEn: 'Radiates positivity, joyful and optimistic.',
    lowDescEn: 'Less exuberantly happy, serious disposition.'
  },

  // Openness
  O1: {
    id: 'O1', domain: 'O', nameEn: 'Imagination', nameId: 'Imajinasi', nameEs: 'Imaginación Creativa',
    descriptionEn: 'Active fantasy life and creative mental daydreaming.',
    descriptionId: 'Daya cipta mental, imajinasi, dan daya hayal kreatif.',
    descriptionEs: 'Vida fantasiosa activa e imaginación mental creativa.',
    highDescEn: 'Rich, vivid imagination and creative daydreaming.',
    lowDescEn: 'Focuses strictly on tangible facts and reality.'
  },
  O2: {
    id: 'O2', domain: 'O', nameEn: 'Artistic Interests', nameId: 'Apresiasi Seni & Estetika', nameEs: 'Interés Artístico y Estético',
    descriptionEn: 'Appreciation for art, beauty, poetry, and music.',
    descriptionId: 'Apresiasi terhadap keindahan seni, musik, dan keindahan estetika.',
    descriptionEs: 'Aprecio profundo por el arte, la belleza, la música y la poesía.',
    highDescEn: 'Deeply moved by art, design, and nature.',
    lowDescEn: 'Uninterested in abstract art or aesthetic theories.'
  },
  O3: {
    id: 'O3', domain: 'O', nameEn: 'Emotionality', nameId: 'Kepekaan Emosional', nameEs: 'Sensibilidad Emocional',
    descriptionEn: 'Receptivity to one\'s own inner feelings and emotional nuances.',
    descriptionId: 'Kepekaan menyadari nuansa perasaan sendiri dan orang lain.',
    descriptionEs: 'Receptividad hacia los propios sentimientos y matices emocionales.',
    highDescEn: 'Values feelings, experiences deep emotional states.',
    lowDescEn: 'Attaches low importance to subtle mood changes.'
  },
  O4: {
    id: 'O4', domain: 'O', nameEn: 'Adventurousness', nameId: 'Ketertarikan Eksplorasi', nameEs: 'Espíritu Aventurero',
    descriptionEn: 'Willingness to try new activities, foods, and foreign places.',
    descriptionId: 'Keinginan mencoba pengalaman, rute, atau budaya baru.',
    descriptionEs: 'Disposición a probar nuevas actividades, lugares y experiencias.',
    highDescEn: 'Enjoys novelty, variety, and exploring new paths.',
    lowDescEn: 'Prefers familiar routines, places, and habits.'
  },
  O5: {
    id: 'O5', domain: 'O', nameEn: 'Intellect', nameId: 'Keingintahuan Intelektual', nameEs: 'Curiosidad Intelectual',
    descriptionEn: 'Interest in solving puzzles, discussing ideas, and abstract thought.',
    descriptionId: 'Minat pada konsep abstrak, diskusi ide, dan pemecahan masalah.',
    descriptionEs: 'Interés por resolver problemas complejos, debatir ideas y pensamiento abstracto.',
    highDescEn: 'Loves complex ideas, intellectual challenges, and philosophy.',
    lowDescEn: 'Prefers practical tasks over abstract theory.'
  },
  O6: {
    id: 'O6', domain: 'O', nameEn: 'Liberalism / Values', nameId: 'Keterbukaan Nilai', nameEs: 'Apertura de Valores',
    descriptionEn: 'Readiness to reexamine social, political, and religious values.',
    descriptionId: 'Keterbukaan meninjau kembali tradisi dan norma sosial.',
    descriptionEs: 'Disposición a reexaminar valores sociales, políticos y culturales.',
    highDescEn: 'Open-minded, questions traditional authority and rules.',
    lowDescEn: 'Prefers traditional values, authority, and status quo.'
  },

  // Agreeableness
  A1: {
    id: 'A1', domain: 'A', nameEn: 'Trust', nameId: 'Kepercayaan (Trust)', nameEs: 'Confianza en los Demás',
    descriptionEn: 'Belief that others are honest, well-intentioned, and trustworthy.',
    descriptionId: 'Keyakinan bahwa orang lain berniat baik dan jujur.',
    descriptionEs: 'Creencia de que los demás son honestos y tienen buenas intenciones.',
    highDescEn: 'Assumes people are good-natured and honest.',
    lowDescEn: 'Cautious, suspicious of others\' motives.'
  },
  A2: {
    id: 'A2', domain: 'A', nameEn: 'Morality / Straightforwardness', nameId: 'Kejujuran & Ketulusan', nameEs: 'Sinceridad y Franqueza',
    descriptionEn: 'Sincerity, frankness, and lack of deception in dealing with others.',
    descriptionId: 'Ketulusan dan ketiadaan niat manipulatif saat berinteraksi.',
    descriptionEs: 'Sinceridad y transparencia al tratar con los demás sin manipulación.',
    highDescEn: 'Direct, honest, authentic, and candid.',
    lowDescEn: 'Pragmatic, willing to use diplomacy or stretch truth.'
  },
  A3: {
    id: 'A3', domain: 'A', nameEn: 'Altruism', nameId: 'Altruisme & Kemurahan Hati', nameEs: 'Altruismo y Generosidad',
    descriptionEn: 'Active concern for others\' welfare, generosity, and helpfulness.',
    descriptionId: 'Kepedulian aktif membantu dan meringankan beban orang lain.',
    descriptionEs: 'Preocupación activa por el bienestar de otros y disposición a ayudar.',
    highDescEn: 'Generous, selflessly helpful to those in need.',
    lowDescEn: 'Focuses primarily on own self-interests.'
  },
  A4: {
    id: 'A4', domain: 'A', nameEn: 'Cooperation', nameId: 'Kooperasi / Kerjasama', nameEs: 'Cooperación y Conciliación',
    descriptionEn: 'Disposition to defer to others, avoid conflict, and forgive.',
    descriptionId: 'Kecenderungan menghindari perselisihan dan mencari kompromi.',
    descriptionEs: 'Disposición a conciliar, evitar conflictos y buscar acuerdos.',
    highDescEn: 'Hates conflict, seeks win-win compromises.',
    lowDescEn: 'Competitive, willing to argue to prove a point.'
  },
  A5: {
    id: 'A5', domain: 'A', nameEn: 'Modesty', nameId: 'Kerendahan Hati', nameEs: 'Modestia y Humildad',
    descriptionEn: 'Humility and reluctance to claim superiority over others.',
    descriptionId: 'Sikap tidak menonjolkan diri atau menyombongkan kelebihan.',
    descriptionEs: 'Humildad y reticencia a presumir superioridad sobre otros.',
    highDescEn: 'Humble, unobtrusive, dislikes bragging.',
    lowDescEn: 'Self-confident, considers self superior or special.'
  },
  A6: {
    id: 'A6', domain: 'A', nameEn: 'Sympathy', nameId: 'Empati & Bela Rasa', nameEs: 'Empatía y Compasión',
    descriptionEn: 'Compassion and concern for the vulnerable and less fortunate.',
    descriptionId: 'Rasa iba dan kelembutan hati terhadap mereka yang menderita.',
    descriptionEs: 'Compasión y sensibilidad hacia los menos afortunados o que sufren.',
    highDescEn: 'Deeply empathetic toward human suffering.',
    lowDescEn: 'Objective, tough-minded, less swayed by emotion.'
  },

  // Conscientiousness
  C1: {
    id: 'C1', domain: 'C', nameEn: 'Self-Efficacy', nameId: 'Efikasi Diri', nameEs: 'Autoeficacia',
    descriptionEn: 'Confidence in one\'s capability to accomplish tasks successfully.',
    descriptionId: 'Keyakinan pada kemampuan diri menyelesaikan tugas dengan baik.',
    descriptionEs: 'Confianza en la propia capacidad para completar tareas con éxito.',
    highDescEn: 'Feels competent, capable, and effective.',
    lowDescEn: 'Doubts own abilities, feels unprepared.'
  },
  C2: {
    id: 'C2', domain: 'C', nameEn: 'Orderliness', nameId: 'Keteraturan & Kerapian', nameEs: 'Orden y Organización',
    descriptionEn: 'Personal organization, neatness, and systematic work habits.',
    descriptionId: 'Kerapian, pengorganisasian ruang, dan sistem kerja teratur.',
    descriptionEs: 'Organización personal, limpieza y hábitos de trabajo sistemáticos.',
    highDescEn: 'Methodical, neat, clean, and organized.',
    lowDescEn: 'Unorganized, messy, comfortable with disorder.'
  },
  C3: {
    id: 'C3', domain: 'C', nameEn: 'Dutifulness', nameId: 'Tanggung Jawab & Integritas', nameEs: 'Sentido del Deber',
    descriptionEn: 'Adherence to moral obligations, promises, and ethical rules.',
    descriptionId: 'Kepatuhan pada janji, aturan, dan standar etika.',
    descriptionEs: 'Adhesión estricta a obligaciones morales, promesas y reglas éticas.',
    highDescEn: 'Strictly reliable, keeps promises, ethical.',
    lowDescEn: 'Casual about obligations and rules.'
  },
  C4: {
    id: 'C4', domain: 'C', nameEn: 'Achievement-Striving', nameId: 'Orientasi Prestasi', nameEs: 'Orientación al Logro',
    descriptionEn: 'Drive for success, high aspirations, and hard work.',
    descriptionId: 'Ambisi mencapai hasil terbaik dan standar kualitas tinggi.',
    descriptionEs: 'Impulso para alcanzar el éxito, altas aspiraciones y trabajo arduo.',
    highDescEn: 'Ambitious, hard-working, goal-driven.',
    lowDescEn: 'Content with minimal effort, easygoing.'
  },
  C5: {
    id: 'C5', domain: 'C', nameEn: 'Self-Discipline', nameId: 'Kedisiplinan Diri', nameEs: 'Autodisciplina',
    descriptionEn: 'Ability to persist at tedious or difficult tasks until completed.',
    descriptionId: 'Kemampuan menyelesaikan tugas hingga tuntas meskipun membosankan.',
    descriptionEs: 'Capacidad para perseverar en tareas difíciles hasta terminarlas.',
    highDescEn: 'Finishes what was started, avoids procrastination.',
    lowDescEn: 'Procrastinates, easily distracted from goals.'
  },
  C6: {
    id: 'C6', domain: 'C', nameEn: 'Cautiousness', nameId: 'Kehati-hatian Berpikir', nameEs: 'Deliberación y Prudencia',
    descriptionEn: 'Tendency to think carefully before acting or speaking.',
    descriptionId: 'Pertimbangan matang sebelum mengambil keputusan atau beraksi.',
    descriptionEs: 'Tendencia a pensar cuidadosamente antes de actuar o hablar.',
    highDescEn: 'Deliberate, careful, weighs consequences.',
    lowDescEn: 'Impulsive, acts on the spur of the moment.'
  }
};

export const SPANISH_ITEM_TEXTS: Record<number, string> = {
  1: 'Preocuparme por las cosas.',
  2: 'Hacer amigos fácilmente.',
  3: 'Tener una imaginación vívida.',
  4: 'Confiar en los demás.',
  5: 'Completar las tareas con éxito.',
  6: 'Enojarme fácilmente.',
  7: 'Encantarme las fiestas grandes.',
  8: 'Creer en la importancia del arte.',
  9: 'Usar a los demás para mis propios fines.',
  10: 'Gustarme mantener todo ordenado.',
  11: 'Sentirme triste o decaído a menudo.',
  12: 'Tomar el control en las situaciones.',
  13: 'Experimentar mis emociones intensamente.',
  14: 'Encantarme ayudar a los demás.',
  15: 'Cumplir mis promesas.',
  16: 'Encontrar difícil acercarme a otros.',
  17: 'Estar siempre activo y en movimiento.',
  18: 'Preferir la variedad a la rutina.',
  19: 'Encantarme una buena discusión.',
  20: 'Trabajar duro para lograr mis metas.',
  21: 'Excederme en consumos o compras impulsivas.',
  22: 'Buscar aventuras y emociones.',
  23: 'Encantarme leer material desafiante.',
  24: 'Creer que soy mejor que los demás.',
  25: 'Estar siempre preparado.',
  26: 'Entrar en pánico fácilmente.',
  27: 'Irradiar alegría y positivismo.',
  28: 'Tendencia a votar por ideas progresistas.',
  29: 'Empatizar profundamente con los desfavorecidos.',
  30: 'Lanzarme a las cosas sin pensar.',
  31: 'Temer lo peor en cada situación.',
  32: 'Sentirme cómodo rodeado de personas.',
  33: 'Disfrutar de vuelos de fantasía libre.',
  34: 'Creer que los demás tienen buenas intenciones.',
  35: 'Destacar en todo lo que hago.',
  36: 'Irritarme con facilidad.',
  37: 'Hablar con muchas personas diferentes en fiestas.',
  38: 'Ver belleza en cosas que otros pasan por alto.',
  39: 'Engañar o hacer trampa para salir adelante.',
  40: 'Dejar un desorden en mi habitación o trabajo.',
  41: 'Sentirme insatisfecho conmigo mismo a veces.',
  42: 'Intentar liderar a los demás.',
  43: 'Sentir las emociones de los demás.',
  44: 'Preocuparme por el bienestar de los demás.',
  45: 'Decir siempre la verdad.',
  46: 'Temer hacer lo incorrecto en público.',
  47: 'Hacer muchas actividades en mi tiempo libre.',
  48: 'Preferir apegarme a las cosas que conozco.',
  49: 'Gritar a las personas cuando me enojo.',
  50: 'Hacer más de lo que se espera de mí.',
  51: 'Rara vez darme gustos excesivos.',
  52: 'Disfrutar de actuar de forma arriesgada.',
  53: 'Tener un vocabulario y léxico rico.',
  54: 'Presumir de mis virtudes y logros.',
  55: 'Llevar a cabo mis planes con constancia.',
  56: 'Sentirme abrumado por los acontecimientos.',
  57: 'Divertirme mucho y disfrutar la vida.',
  58: 'Creer que no hay una verdad absoluta.',
  59: 'Sentir compasión por los menos afortunados.',
  60: 'Tomar decisiones apresuradas.',
  61: 'Alterarme o perturbarme fácilmente.',
  62: 'Entrar en confianza rápidamente con otros.',
  63: 'No tener una imaginación muy abstracta.',
  64: 'Confiar en que lo que la gente dice es verdad.',
  65: 'Saber cómo hacer las cosas con eficiencia.',
  66: 'Perder la paciencia ante la presión.',
  67: 'Evitar las multitudes o lugares ruidosos.',
  68: 'No gustarme la poesía o arte abstracto.',
  69: 'Aprovecharme de la ingenuidad de otros.',
  70: 'Dejar mis pertenencias tiradas.',
  71: 'Estar lleno de dudas sobre mí mismo.',
  72: 'Convencer a otros para hacer cosas.',
  73: 'Rara vez notar mis reacciones emocionales.',
  74: 'Ser indiferente a los sentimientos ajenos.',
  75: 'Romper las reglas si me parecen ilógicas.',
  76: 'Solo sentirme cómodo con amigos cercanos.',
  77: 'Reaccionar rápidamente y con agilidad.',
  78: 'Disgustarme los cambios repentinos de rutina.',
  79: 'Insultar u ofender cuando me molesto.',
  80: 'Establecer altos estándares para mí y mi equipo.',
  81: 'Resistir fácilmente las tentaciones.',
  82: 'Actuar de forma desenfadada con amigos.',
  83: 'Disfrutar resolviendo problemas complejos.',
  84: 'Saber y sentir que soy alguien extraordinario.',
  85: 'Postergar mis deberes hasta el último minuto.',
  86: 'Sentir que no soy capaz de manejar los problemas.',
  87: 'Entretenerme y reírme con facilidad.',
  88: 'Creer que las leyes deben aplicarse estrictamente.',
  89: 'Sufrir o conmoverme por los dolores ajenos.',
  90: 'Actuar precipitadamente sin tomar precauciones.',
  91: 'Cambiar de humor muy a menudo.',
  92: 'Demostrar mi gratitud y afecto.',
  93: 'Soñar despierto con frecuencia.',
  94: 'Desconfiar de las intenciones ocultas.',
  95: 'Ser altamente efectivo en mi trabajo.',
  96: 'Molestarme fácilmente por detalles menores.',
  97: 'Preferir estar solo que en grupo.',
  98: 'No disfrutar ir a museos de arte.',
  99: 'Entorpecer u obstaculizar el paso a otros.',
  100: 'Mantener mis cosas limpias y ordenadas.',
  101: 'Sentirme desesperado o sin salida a veces.',
  102: 'Reservarme mis opiniones para no llamar la atención.',
  103: 'Notar los cambios emocionales a mi alrededor.',
  104: 'Anticiparme a las necesidades de los demás.',
  105: 'Seguir las instrucciones con cuidado y precisión.',
  106: 'Avergonzarme o apenarme con facilidad.',
  107: 'Gustarme tomarme las cosas con calma.',
  108: 'Estar apegado a las formas convencionales.',
  109: 'Tomar represalias si me siento herido.',
  110: 'Esforzarme por alcanzar la excelencia.',
  111: 'Ser capaz de controlar mis antojos e impulsos.',
  112: 'Encantarme la emoción y la adrenalina.',
  113: 'Disfrutar de discusiones teóricas y abstractas.',
  114: 'Disgustarme hablar sobre mí mismo.',
  115: 'Perder el tiempo en cosas sin importancia.',
  116: 'Mantener la calma y compostura bajo presión.',
  117: 'Ver el lado positivo de las situaciones.',
  118: 'Creer que las tradiciones deben respetarse.',
  119: 'Creer que todas las personas merecen compasión.',
  120: 'Actuar sin investigar primero las consecuencias.',
};

export function getItemText(item: Item, lang: string): string {
  if (lang === 'es') {
    return item.textEs || SPANISH_ITEM_TEXTS[item.id] || item.textEn;
  }
  if (lang === 'en') {
    return item.textEn;
  }
  return item.textId;
}

// 120 Official items from Johnson (2014) / IPIP-NEO-120 Pool
export const IPIP_120_ITEMS: Item[] = [
  // Block 1 (Items 1-30)
  { id: 1, domain: 'N', facet: 'N1', keyed: '+', textEn: 'Worry about things.', textId: 'Sering mengkhawatirkan banyak hal.' },
  { id: 2, domain: 'E', facet: 'E1', keyed: '+', textEn: 'Make friends easily.', textId: 'Mudah berteman dengan orang baru.' },
  { id: 3, domain: 'O', facet: 'O1', keyed: '+', textEn: 'Have a vivid imagination.', textId: 'Memiliki imajinasi yang sangat hidup.' },
  { id: 4, domain: 'A', facet: 'A1', keyed: '+', textEn: 'Trust others.', textId: 'Mudah memercayai niat baik orang lain.' },
  { id: 5, domain: 'C', facet: 'C1', keyed: '+', textEn: 'Complete tasks successfully.', textId: 'Mampu menyelesaikan tugas dengan sukses.' },
  { id: 6, domain: 'N', facet: 'N2', keyed: '+', textEn: 'Get angry easily.', textId: 'Mudah merasa marah atau kesal.' },
  { id: 7, domain: 'E', facet: 'E2', keyed: '+', textEn: 'Love large parties.', textId: 'Sangat menyukai pesta atau acara ramai.' },
  { id: 8, domain: 'O', facet: 'O2', keyed: '+', textEn: 'Believe in the importance of art.', textId: 'Meyakini pentingnya karya seni.' },
  { id: 9, domain: 'A', facet: 'A2', keyed: '-', textEn: 'Use others for my own ends.', textId: 'Memanfaatkan orang lain demi tujuan pribadi.' },
  { id: 10, domain: 'C', facet: 'C2', keyed: '+', textEn: 'Like to tidy up.', textId: 'Suka merapikan dan mengatur tempat kerja.' },

  { id: 11, domain: 'N', facet: 'N3', keyed: '+', textEn: 'Often feel blue.', textId: 'Sering merasa sedih atau murung.' },
  { id: 12, domain: 'E', facet: 'E3', keyed: '+', textEn: 'Take charge of situations.', textId: 'Berani mengambil kendali dalam situasi kelompok.' },
  { id: 13, domain: 'O', facet: 'O3', keyed: '+', textEn: 'Experience my emotions intensely.', textId: 'Merasakan emosi dan perasaan secara mendalam.' },
  { id: 14, domain: 'A', facet: 'A3', keyed: '+', textEn: 'Love to help others.', textId: 'Sangat senang membantu orang lain.' },
  { id: 15, domain: 'C', facet: 'C3', keyed: '+', textEn: 'Keep my promises.', textId: 'Selalu menepati janji yang telah dibuat.' },
  { id: 16, domain: 'N', facet: 'N4', keyed: '+', textEn: 'Find it difficult to approach others.', textId: 'Merasa canggung untuk menyapa orang lain.' },
  { id: 17, domain: 'E', facet: 'E4', keyed: '+', textEn: 'Am always on the go.', textId: 'Selalu aktif dan memiliki jadwal yang sibuk.' },
  { id: 18, domain: 'O', facet: 'O4', keyed: '+', textEn: 'Prefer variety to routine.', textId: 'Lebih menyukai variasi dibanding rutinitas.' },
  { id: 19, domain: 'A', facet: 'A4', keyed: '-', textEn: 'Love a good fight.', textId: 'Suka berdebat keras atau bertengkar.' },
  { id: 20, domain: 'C', facet: 'C4', keyed: '+', textEn: 'Work hard.', textId: 'Bekerja keras demi mencapai tujuan.' },

  { id: 21, domain: 'N', facet: 'N5', keyed: '+', textEn: 'Go on binges.', textId: 'Sulit menahan diri saat mengonsumsi/membeli sesuatu.' },
  { id: 22, domain: 'E', facet: 'E5', keyed: '+', textEn: 'Seek adventure.', textId: 'Menyukai petualangan dan hal menantang.' },
  { id: 23, domain: 'O', facet: 'O5', keyed: '+', textEn: 'Love to read challenging material.', textId: 'Suka membaca bacaan yang menantang pikiran.' },
  { id: 24, domain: 'A', facet: 'A5', keyed: '+', textEn: 'Believe that I am better than others.', textId: 'Merasa diri saya lebih baik dari orang lain.' },
  { id: 25, domain: 'C', facet: 'C5', keyed: '+', textEn: 'Always prepared.', textId: 'Selalu siap dan merencanakan segalanya.' },
  { id: 26, domain: 'N', facet: 'N6', keyed: '+', textEn: 'Panic easily.', textId: 'Mudah panik saat menghadapi tekanan.' },
  { id: 27, domain: 'E', facet: 'E6', keyed: '+', textEn: 'Radiate joy.', textId: 'Memancarkan keceriaan dan rasa bahagia.' },
  { id: 28, domain: 'O', facet: 'O6', keyed: '+', textEn: 'Tend to vote for liberal political candidates.', textId: 'Mendukung ide-ide sosial yang progresif/terbuka.' },
  { id: 29, domain: 'A', facet: 'A6', keyed: '+', textEn: 'Sympathize with the homeless.', textId: 'Merasa simpati mendalam pada orang yang kurang beruntung.' },
  { id: 30, domain: 'C', facet: 'C6', keyed: '+', textEn: 'Jump into things without thinking.', textId: 'Langsung bertindak tanpa berpikir panjang.' },

  // Block 2 (Items 31-60)
  { id: 31, domain: 'N', facet: 'N1', keyed: '-', textEn: 'Fear for the worst.', textId: 'Selalu mengkhawatirkan kemungkinan terburuk.' },
  { id: 32, domain: 'E', facet: 'E1', keyed: '+', textEn: 'Feel comfortable around people.', textId: 'Merasa nyaman di sekitar banyak orang.' },
  { id: 33, domain: 'O', facet: 'O1', keyed: '+', textEn: 'Enjoy wild flights of fantasy.', textId: 'Menikmati fantasi dan imajinasi yang bebas.' },
  { id: 34, domain: 'A', facet: 'A1', keyed: '+', textEn: 'Believe that others have good intentions.', textId: 'Yakin orang lain punya niat yang baik.' },
  { id: 35, domain: 'C', facet: 'C1', keyed: '+', textEn: 'Excel in what I do.', textId: 'Ingin selalu unggul dalam pekerjaan saya.' },
  { id: 36, domain: 'N', facet: 'N2', keyed: '+', textEn: 'Get irritated easily.', textId: 'Mudah merasa terganggu atau jengkel.' },
  { id: 37, domain: 'E', facet: 'E2', keyed: '+', textEn: 'Talk to a lot of different people at parties.', textId: 'Suka mengobrol dengan banyak orang di acara sosial.' },
  { id: 38, domain: 'O', facet: 'O2', keyed: '+', textEn: 'See beauty in things that others might not notice.', textId: 'Melihat keindahan pada hal yang terlewatkan orang lain.' },
  { id: 39, domain: 'A', facet: 'A2', keyed: '-', textEn: 'Cheat to get ahead.', textId: 'Rela berbuat curang demi mencapai kemajuan.' },
  { id: 40, domain: 'C', facet: 'C2', keyed: '-', textEn: 'Leave a mess in my room.', textId: 'Membiarkan kamar atau meja kerja dalam keadaan berantakan.' },

  { id: 41, domain: 'N', facet: 'N3', keyed: '+', textEn: 'Dislike myself.', textId: 'Kadang merasa kurang puas terhadap diri sendiri.' },
  { id: 42, domain: 'E', facet: 'E3', keyed: '+', textEn: 'Try to lead others.', textId: 'Berusaha memimpin orang lain dalam kelompok.' },
  { id: 43, domain: 'O', facet: 'O3', keyed: '+', textEn: 'Feel others\' emotions.', textId: 'Mudah merasakan apa yang dirasakan orang lain.' },
  { id: 44, domain: 'A', facet: 'A3', keyed: '+', textEn: 'Concern myself about others.', textId: 'Peduli dan memikirkan kesejahteraan orang lain.' },
  { id: 45, domain: 'C', facet: 'C3', keyed: '+', textEn: 'Tell the truth.', textId: 'Selalu berusaha mengatakan kejujuran.' },
  { id: 46, domain: 'N', facet: 'N4', keyed: '+', textEn: 'Am afraid that I will do the wrong thing.', textId: 'Takut melakukan kesalahan di depan umum.' },
  { id: 47, domain: 'E', facet: 'E4', keyed: '+', textEn: 'Do a lot in my spare time.', textId: 'Melakukan banyak aktivitas di waktu luang.' },
  { id: 48, domain: 'O', facet: 'O4', keyed: '+', textEn: 'Prefer to stick to things I know.', textId: 'Lebih suka bertahan pada hal-hal yang sudah dikenal.' },
  { id: 49, domain: 'A', facet: 'A4', keyed: '-', textEn: 'Yell at people.', textId: 'Bisa membentak orang lain saat emosi.' },
  { id: 50, domain: 'C', facet: 'C4', keyed: '+', textEn: 'Do more than what\'s expected of me.', textId: 'Melakukan lebih dari apa yang diharapkan dari saya.' },

  { id: 51, domain: 'N', facet: 'N5', keyed: '+', textEn: 'Rarely overindulge.', textId: 'Jarang sekali berlebihan dalam memanjakan diri.' },
  { id: 52, domain: 'E', facet: 'E5', keyed: '+', textEn: 'Enjoy being reckless.', textId: 'Menikmati sensasi tindakan yang berisiko.' },
  { id: 53, domain: 'O', facet: 'O5', keyed: '+', textEn: 'Have a rich vocabulary.', textId: 'Memiliki kosakata dan wawasan kata yang kaya.' },
  { id: 54, domain: 'A', facet: 'A5', keyed: '-', textEn: 'Boast about my virtues.', textId: 'Suka membanggakan kelebihan atau kebaikan diri.' },
  { id: 55, domain: 'C', facet: 'C5', keyed: '+', textEn: 'Carry out my plans.', textId: 'Konsisten menjalankan rencana yang dibuat.' },
  { id: 56, domain: 'N', facet: 'N6', keyed: '+', textEn: 'Become overwhelmed by events.', textId: 'Merasa kewalahan jika banyak masalah datang bersamaan.' },
  { id: 57, domain: 'E', facet: 'E6', keyed: '+', textEn: 'Have a lot of fun.', textId: 'Mudah merasa senang dan menikmati hidup.' },
  { id: 58, domain: 'O', facet: 'O6', keyed: '+', textEn: 'Believe that there is no absolute right or wrong.', textId: 'Meyakini tidak ada kebenaran mutlak tunggal.' },
  { id: 59, domain: 'A', facet: 'A6', keyed: '+', textEn: 'Feel sympathy for those who are worse off.', textId: 'Merasa prihatin pada mereka yang dalam kesulitan.' },
  { id: 60, domain: 'C', facet: 'C6', keyed: '-', textEn: 'Make rash decisions.', textId: 'Kadang mengambil keputusan secara terburu-buru.' },

  // Block 3 (Items 61-90)
  { id: 61, domain: 'N', facet: 'N1', keyed: '+', textEn: 'Am easily disturbed.', textId: 'Mudah merasa terganggu atau gelisah.' },
  { id: 62, domain: 'E', facet: 'E1', keyed: '+', textEn: 'Warm up quickly to others.', textId: 'Mudah akrab dengan orang baru.' },
  { id: 63, domain: 'O', facet: 'O1', keyed: '-', textEn: 'Do not have a good imagination.', textId: 'Kurang memiliki imajinasi yang abstrak.' },
  { id: 64, domain: 'A', facet: 'A1', keyed: '+', textEn: 'Trust that what people say is true.', textId: 'Percaya bahwa perkataan orang pada umumnya jujur.' },
  { id: 65, domain: 'C', facet: 'C1', keyed: '+', textEn: 'Know how to get things done.', textId: 'Tahu cara efisien untuk menyelesaikan pekerjaan.' },
  { id: 66, domain: 'N', facet: 'N2', keyed: '+', textEn: 'Lose my temper.', textId: 'Bisa kehilangan kesabaran saat terdesak.' },
  { id: 67, domain: 'E', facet: 'E2', keyed: '-', textEn: 'Avoid crowds.', textId: 'Cenderung menghindari kerumunan atau tempat bising.' },
  { id: 68, domain: 'O', facet: 'O2', keyed: '-', textEn: 'Do not like poetry.', textId: 'Kurang menyukai puisi atau eksperimen estetika.' },
  { id: 69, domain: 'A', facet: 'A2', keyed: '-', textEn: 'Take advantage of others.', textId: 'Cenderung mengambil keuntungan dari kelalaian orang.' },
  { id: 70, domain: 'C', facet: 'C2', keyed: '+', textEn: 'Leave my belongings around.', textId: 'Kadang menaruh barang di sembarang tempat.' },

  { id: 71, domain: 'N', facet: 'N3', keyed: '+', textEn: 'Am filled with doubts about myself.', textId: 'Sering diliputi keraguan terhadap kemampuan diri.' },
  { id: 72, domain: 'E', facet: 'E3', keyed: '+', textEn: 'Can talk others into doing things.', textId: 'Bisa meyakinkan orang lain untuk bertindak.' },
  { id: 73, domain: 'O', facet: 'O3', keyed: '-', textEn: 'Seldom notice my emotional reactions.', textId: 'Jarang memperhatikan reaksi emosional dalam diri.' },
  { id: 74, domain: 'A', facet: 'A3', keyed: '+', textEn: 'Am indifferent to the feelings of others.', textId: 'Apatis terhadap perasaan orang lain.' },
  { id: 75, domain: 'C', facet: 'C3', keyed: '+', textEn: 'Break rules.', textId: 'Kadang melanggar aturan jika dianggap tidak masuk akal.' },
  { id: 76, domain: 'N', facet: 'N4', keyed: '+', textEn: 'Only feel comfortable with friends.', textId: 'Hanya merasa nyaman saat bersama teman dekat.' },
  { id: 77, domain: 'E', facet: 'E4', keyed: '+', textEn: 'React quickly.', textId: 'Cepat tanggap dan gesit dalam bertindak.' },
  { id: 78, domain: 'O', facet: 'O4', keyed: '+', textEn: 'Dislike changes.', textId: 'Kurang menyukai perubahan mendadak pada rutinitas.' },
  { id: 79, domain: 'A', facet: 'A4', keyed: '-', textEn: 'Insult people.', textId: 'Bisa berkata pedas jika sedang kesal.' },
  { id: 80, domain: 'C', facet: 'C4', keyed: '+', textEn: 'Set high standards for myself and others.', textId: 'Menetapkan standar kualitas tinggi untuk diri dan tim.' },

  { id: 81, domain: 'N', facet: 'N5', keyed: '+', textEn: 'Easily resist temptations.', textId: 'Mudah menahan diri dari godaan instan.' },
  { id: 82, domain: 'E', facet: 'E5', keyed: '+', textEn: 'Act wild and crazy.', textId: 'Menyukai suasana santai dan liar bersama teman.' },
  { id: 83, domain: 'O', facet: 'O5', keyed: '+', textEn: 'Enjoy solving complex problems.', textId: 'Menikmati pemecahan teka-teki atau masalah rumit.' },
  { id: 84, domain: 'A', facet: 'A5', keyed: '-', textEn: 'Know that I am extraordinary.', textId: 'Merasa yakin bahwa diri saya istimewa.' },
  { id: 85, domain: 'C', facet: 'C5', keyed: '+', textEn: 'Put off duties until the last minute.', textId: 'Sering menunda pekerjaan hingga menit terakhir.' },
  { id: 86, domain: 'N', facet: 'N6', keyed: '+', textEn: 'Feel that I am unable to deal with things.', textId: 'Merasa tidak sanggup mengatasi kerumitan hidup.' },
  { id: 87, domain: 'E', facet: 'E6', keyed: '+', textEn: 'Am amused easily.', textId: 'Mudah terhibur dan tertawa.' },
  { id: 88, domain: 'O', facet: 'O6', keyed: '+', textEn: 'Believe that laws should be strictly enforced.', textId: 'Meyakini hukum dan aturan harus ditegakkan tanpa kompromi.' },
  { id: 89, domain: 'A', facet: 'A6', keyed: '+', textEn: 'Suffer for the sins of others.', textId: 'Ikut prihatin saat melihat penderitaan orang lain.' },
  { id: 90, domain: 'C', facet: 'C6', keyed: '-', textEn: 'Rush into action without taking precautions.', textId: 'Terburu-buru bertindak tanpa memperhitungkan risiko.' },

  // Block 4 (Items 91-120)
  { id: 91, domain: 'N', facet: 'N1', keyed: '+', textEn: 'Change my mood a lot.', textId: 'Suasana hati sering berubah-ubah.' },
  { id: 92, domain: 'E', facet: 'E1', keyed: '+', textEn: 'Show my gratitude.', textId: 'Sering menunjukkan rasa terima kasih dan kehangatan.' },
  { id: 93, domain: 'O', facet: 'O1', keyed: '+', textEn: 'Daydream a lot.', textId: 'Sering melamun dan membayangkan hal indah.' },
  { id: 94, domain: 'A', facet: 'A1', keyed: '+', textEn: 'Distrust people.', textId: 'Cenderung curiga pada motivasi tersembunyi orang.' },
  { id: 95, domain: 'C', facet: 'C1', keyed: '+', textEn: 'Am effective in my work.', textId: 'Sangat efektif dalam menyelesaikan pekerjaan.' },
  { id: 96, domain: 'N', facet: 'N2', keyed: '+', textEn: 'Am easily annoyed.', textId: 'Mudah merasa kesal oleh hal-hal kecil.' },
  { id: 97, domain: 'E', facet: 'E2', keyed: '+', textEn: 'Prefer to be alone.', textId: 'Lebih suka berada sendirian dibanding ramai.' },
  { id: 98, domain: 'O', facet: 'O2', keyed: '+', textEn: 'Do not enjoy going to art museums.', textId: 'Kurang menikmati kunjungan ke museum seni.' },
  { id: 99, domain: 'A', facet: 'A2', keyed: '-', textEn: 'Obstructionist when dealing with others.', textId: 'Suka mempersulit atau menghalangi urusan orang.' },
  { id: 100, domain: 'C', facet: 'C2', keyed: '+', textEn: 'Keep my things neat.', textId: 'Selalu menjaga kebersihan dan kerapian barang.' },

  { id: 101, domain: 'N', facet: 'N3', keyed: '+', textEn: 'Feel desperate.', textId: 'Sering merasa frustrasi atau kehilangan harapan.' },
  { id: 102, domain: 'E', facet: 'E3', keyed: '+', textEn: 'Hold back my opinions.', textId: 'Menahan pendapat diri agar tidak mencolok.' },
  { id: 103, domain: 'O', facet: 'O3', keyed: '+', textEn: 'Notice emotional shifts around me.', textId: 'Peka pada perubahan emosi di lingkungan sekitar.' },
  { id: 104, domain: 'A', facet: 'A3', keyed: '+', textEn: 'Anticipate others\' needs.', textId: 'Antisipatif terhadap kebutuhan orang lain.' },
  { id: 105, domain: 'C', facet: 'C3', keyed: '+', textEn: 'Follow directions carefully.', textId: 'Mengikuti instruksi kerja dengan cermat.' },
  { id: 106, domain: 'N', facet: 'N4', keyed: '+', textEn: 'Am easily embarrassed.', textId: 'Mudah merasa malu atau salah tingkah.' },
  { id: 107, domain: 'E', facet: 'E4', keyed: '+', textEn: 'Like to take it easy.', textId: 'Suka menjalani hidup dengan santai dan tenang.' },
  { id: 108, domain: 'O', facet: 'O4', keyed: '+', textEn: 'Am attached to conventional ways.', textId: 'Terikat kuat pada cara-cara konvensional.' },
  { id: 109, domain: 'A', facet: 'A4', keyed: '-', textEn: 'Retaliate when I am hurt.', textId: 'Ingin membalas jika merasa disakiti.' },
  { id: 110, domain: 'C', facet: 'C4', keyed: '+', textEn: 'Strive for excellence.', textId: 'Berusaha mencapai hasil yang terbaik.' },

  { id: 111, domain: 'N', facet: 'N5', keyed: '+', textEn: 'Am able to control my cravings.', textId: 'Mampu mengendalikan keinginan dan nafsu.' },
  { id: 112, domain: 'E', facet: 'E5', keyed: '+', textEn: 'Love excitement.', textId: 'Sangat menyukai suasana seru dan menyenangkan.' },
  { id: 113, domain: 'O', facet: 'O5', keyed: '+', textEn: 'Enjoy theoretical discussions.', textId: 'Menikmati diskusi teori dan konsep abstrak.' },
  { id: 114, domain: 'A', facet: 'A5', keyed: '-', textEn: 'Dislike talking about myself.', textId: 'Kurang suka menceritakan kelebihan diri sendiri.' },
  { id: 115, domain: 'C', facet: 'C5', keyed: '+', textEn: 'Waste my time.', textId: 'Kadang membuang waktu untuk hal tak berguna.' },
  { id: 116, domain: 'N', facet: 'N6', keyed: '+', textEn: 'Remain calm under pressure.', textId: 'Tetap tenang dan terkendali saat di bawah tekanan.' },
  { id: 117, domain: 'E', facet: 'E6', keyed: '+', textEn: 'Look on the bright side.', textId: 'Selalu melihat sisi positif dalam segala hal.' },
  { id: 118, domain: 'O', facet: 'O6', keyed: '+', textEn: 'Believe that traditions should be respected.', textId: 'Meyakini tradisi lama harus senantiasa dihormati.' },
  { id: 119, domain: 'A', facet: 'A6', keyed: '+', textEn: 'Believe that all people deserve compassion.', textId: 'Yakin setiap manusia berhak menerima kasih sayang.' },
  { id: 120, domain: 'C', facet: 'C6', keyed: '-', textEn: 'Act without investigating first.', textId: 'Langsung bertindak tanpa menyelidiki dahulu.' }
];
