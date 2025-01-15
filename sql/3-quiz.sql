DO $$
BEGIN

    IF NOT EXISTS (SELECT 1 FROM public.methodic_quiz) THEN
INSERT INTO public.methodic_quiz (id,"name") VALUES
	 (1,'Тест Голанда');
        RAISE NOTICE 'Inserted initial data into public.methodic_quiz.';
    ELSE
        RAISE NOTICE 'Table public.methodic_quiz already contains data. Skipping inserts.';
    END IF;

END $$;