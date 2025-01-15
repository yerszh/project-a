DO $$
BEGIN

    IF NOT EXISTS (SELECT 1 FROM public.methodic_categories) THEN

INSERT INTO public.methodic_categories (id, "name", name_ru, name_kz) VALUES
    ('1', 'Business Management & Administration', 'Управление бизнесом и Администрирование', 'Бизнес басқару және Әкімшілік'),
    ('2', 'Health Science', 'Здравоохранение', 'Денсаулық сақтау'),
    ('3', 'Manufacturing', 'Производство', 'Өндіріс'),
    ('4', 'Finance', 'Финансы', 'Қаржы'),
    ('5', 'Marketing', 'Маркетинг', 'Маркетинг'),
    ('6', 'Education & Training', 'Образование и Обучение', 'Білім және Оқыту'),
    ('7', 'Information Technology', 'Информационные технологии', 'Ақпараттық технологиялар'),
    ('8', 'Agriculture, Food & Natural Resources', 'Сельское хозяйство, Пищевая продукция и Природные ресурсы', 'Ауыл шаруашылығы, Азық-түлік және Табиғи ресурстар'),
    ('9', 'Architecture & Construction', 'Архитектура и Строительство', 'Сәулет және Құрылыс'),
    ('10', 'Human Services', 'Социальные услуги', 'Әлеуметтік қызметтер'),
    ('11', 'Transportation, Distribution & Logistics', 'Транспорт, Дистрибуция и Логистика', 'Көлік, Бөлініс және Логистика'),
    ('12', 'Hospitality & Tourism', 'Гостеприимство и Туризм', 'Қонақжайлылық және Туризм'),
    ('13', 'Law, Public Safety, Corrections & Security', 'Право, Общественная безопасность, Исправительные учреждения и Безопасность', 'Құқық, Қоғамдық қауіпсіздік, Түзету мекемелері және Қауіпсіздік'),
    ('14', 'Government & Public Administration', 'Государственное управление и Администрация', 'Мемлекеттік басқару және Әкімшілік'),
    ('15', 'Science, Technology, Engineering & Mathematics', 'Наука, Технологии, Инженерное дело и Математика', 'Ғылым, Технологиялар, Инженерия және Математика'),
    ('16', 'Arts, Audio/Video Technology & Communications', 'Искусства, Аудио/Видео технологии и Коммуникации', 'Өнер, Аудио/Бейне технологиялар және Байланыс');
            
            RAISE NOTICE 'Inserted initial data into public.methodic_categories.';
    ELSE
        RAISE NOTICE 'Table public.methodic_categories already contains data. Skipping inserts.';
    END IF;

END $$;