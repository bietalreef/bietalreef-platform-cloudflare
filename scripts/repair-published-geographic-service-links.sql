-- Link already-published platform services to existing company taxonomy records.
-- This does not alter service publication, verification, or coverage.
BEGIN;
DO $$
BEGIN
 IF (SELECT count(*) FROM public.platform_content_cards pc JOIN public.platform_provider_accounts pa ON pa.id=pc.platform_provider_account_id JOIN public.provider_public_profiles pp ON pp.id=pa.provider_public_profile_id WHERE pp.slug='alrehab-home-clean' AND pc.card_type='service' AND pc.status='published' AND pc.content->>'channel'='platform' AND pc.content->>'slug' IN ('courtyard-parking-cleaning','post-construction-cleaning','deep-cleaning','pre-move-in-cleaning','majlis-cleaning','carpet-rug-cleaning')) <> 6 THEN
   RAISE EXCEPTION 'Expected six published Rehab service cards were not found';
 END IF;
END $$;
WITH links(card_slug, primary_slug, extra_slug) AS (VALUES
 ('courtyard-parking-cleaning','facades-tanks-cleaning-321',NULL),
 ('post-construction-cleaning','homes-buildings-cleaning-306',NULL),
 ('deep-cleaning','homes-buildings-cleaning-302',NULL),
 ('pre-move-in-cleaning','homes-buildings-cleaning-307',NULL),
 ('majlis-cleaning','steam-upholstery-cleaning-312',NULL),
 ('carpet-rug-cleaning','steam-upholstery-cleaning-310','steam-upholstery-cleaning-311')
), mapped AS (
 SELECT pc.id, p.id::text primary_id, e.id::text extra_id
 FROM links l JOIN public.provider_public_profiles pp ON pp.slug='alrehab-home-clean'
 JOIN public.platform_provider_accounts pa ON pa.provider_public_profile_id=pp.id
 JOIN public.platform_content_cards pc ON pc.platform_provider_account_id=pa.id AND pc.content->>'slug'=l.card_slug
 JOIN public.platform_services p ON p.slug=l.primary_slug AND p.is_active
 LEFT JOIN public.platform_services e ON e.slug=l.extra_slug AND e.is_active
 WHERE pc.card_type='service' AND pc.status='published' AND pc.content->>'channel'='platform'
)
UPDATE public.platform_content_cards pc
SET content=pc.content || jsonb_build_object(
 'taxonomy_service_id',coalesce(nullif(pc.content->>'taxonomy_service_id',''),mapped.primary_id),
 'taxonomy_service_ids',(SELECT jsonb_agg(DISTINCT x) FROM (
   SELECT jsonb_array_elements_text(CASE WHEN jsonb_typeof(pc.content->'taxonomy_service_ids')='array' THEN pc.content->'taxonomy_service_ids' ELSE '[]'::jsonb END) AS x
   UNION ALL SELECT mapped.primary_id UNION ALL SELECT mapped.extra_id WHERE mapped.extra_id IS NOT NULL
   UNION ALL SELECT nullif(pc.content->>'taxonomy_service_id','') WHERE nullif(pc.content->>'taxonomy_service_id','') IS NOT NULL
 ) v WHERE x IS NOT NULL)
),updated_at=now()
FROM mapped WHERE pc.id=mapped.id;
WITH slugs(service_group,service_slug) AS (VALUES
 ('painting-decoration','painting'),('plumbing-sanitary','plumbing'),
 ('ac-maintenance','hvac'),('carpentry-wood-floors','carpentry')
)
UPDATE public.platform_content_cards pc
SET content=jsonb_set(pc.content,'{slug}',to_jsonb(s.service_slug),true),updated_at=now()
FROM public.platform_provider_accounts pa
JOIN public.provider_public_profiles pp ON pp.id=pa.provider_public_profile_id AND pp.slug='provider-3000485'
JOIN slugs s ON true
WHERE pc.platform_provider_account_id=pa.id AND pc.card_type='service' AND pc.status='published'
 AND pc.content->>'channel'='platform' AND pc.content->>'service_group'=s.service_group
 AND nullif(pc.content->>'slug','') IS NULL;
COMMIT;
