-- Al Rehab production release, platform channel only.
-- The account has an independent professional-presence administrative grant.
-- Never promote app cards or archived offers as a side-effect of this release.
begin;

do $$
begin
  if not exists (
    select 1
    from public.provider_public_profiles pub
    join public.provider_profiles pp on pp.id = pub.provider_profile_id
    join public.subscription_plans plan on plan.id = pub.plan_id
    join public.billing_account_grants grant_row
      on grant_row.user_id = pp.user_id and grant_row.plan_id = plan.id
    where pub.public_provider_code = 'BR-2000029'
      and pub.slug = 'alrehab-home-clean'
      and pub.verification_status = 'verified'
      and private.is_operational_provider_profile(pub.id)
      and plan.code = 'professional-presence'
      and (plan.features ->> 'publish_platform')::boolean = true
      and grant_row.kind = 'grant'
      and grant_row.revoked_at is null
      and grant_row.starts_at <= now() and grant_row.ends_at > now()
  ) then
    raise exception 'BR-2000029 is not currently eligible for professional platform publication';
  end if;
  if exists (
    select 1 from public.provider_public_profiles
    where public_provider_code = 'BR-2000003' and slug = 'alrehab-home-clean'
  ) then
    raise exception 'Archived Al Rehab identity collision';
  end if;
end;
$$;

-- The original public read policy incorrectly required the APP publication
-- channel, even when the public platform landing page was approved.
drop policy if exists provider_public_profiles_public_read on public.provider_public_profiles;
create policy provider_public_profiles_public_read on public.provider_public_profiles
for select to anon, authenticated
using (
  publication_status = 'published'
  and verification_status = 'verified'
  and provider_profile_id is not null
  and private.is_operational_provider_profile(id)
  and (app_publication_status = 'published' or landing_page_status = 'published')
);

-- One canonical platform account; no duplicate provider or workspace.
insert into public.platform_provider_accounts
  (provider_public_profile_id, provider_numeric_id, display_name, status)
select id, 2000029, name_ar, 'active'
from public.provider_public_profiles
where public_provider_code = 'BR-2000029' and slug = 'alrehab-home-clean'
on conflict (provider_public_profile_id) do update
set status = 'active', display_name = excluded.display_name, updated_at = now();

-- Four actual, bilingual services from the canonical taxonomy link.
-- Their existing APP is_published flags remain untouched.
-- Explicit owner authorization for this production platform release applies
-- only to these existing records, not to any draft or archived offer.
with approved_platform_service_slugs(source_id, slug) as (
  values
    ('a14b5c5b-b668-40cd-9658-17840bcb5f41'::uuid, 'home-villa-cleaning'),
    ('ac60b1db-7eb0-4066-b917-bab79b26dcce'::uuid, 'sofa-cleaning'),
    ('7ae0f640-5b6c-4e7e-b6f6-9ba49304d590'::uuid, 'facade-glass-cleaning'),
    ('10d0ed89-3a3e-4e02-a79b-31ffc0df97ec'::uuid, 'sanitization-pest-control')
)
insert into public.platform_content_cards
  (platform_provider_account_id, card_type, title_ar, title_en,
   description_ar, description_en, image_urls, content, status, published_at)
select acct.id, 'service', svc.title_ar, svc.title_en,
       svc.description_ar, svc.description_en, array[]::text[],
       jsonb_build_object(
         'slug', slugs.slug,
         'source_id', svc.id::text,
         'taxonomy_service_id', svc.service_id::text,
         'provider_public_code', 'BR-2000029',
         'channel', 'platform',
         'approval_basis', 'explicit_owner_publication_request_2026-10-27'
       ),
       'published', now()
from approved_platform_service_slugs slugs
join public.provider_services svc on svc.id = slugs.source_id
join public.platform_services taxonomy on taxonomy.id = svc.service_id and taxonomy.is_active
join public.provider_public_profiles pub on pub.id = svc.provider_id
join public.platform_provider_accounts acct on acct.provider_public_profile_id = pub.id
where pub.public_provider_code = 'BR-2000029'
  and acct.status = 'active'
  and nullif(btrim(svc.title_ar), '') is not null
  and nullif(btrim(svc.title_en), '') is not null
  and nullif(btrim(svc.description_ar), '') is not null
  and nullif(btrim(svc.description_en), '') is not null
  and not exists (
    select 1 from public.platform_content_cards previous
    where previous.platform_provider_account_id = acct.id
      and previous.card_type = 'service'
      and previous.content ->> 'source_id' = svc.id::text
  );

do $$
begin
  if (select count(*) from public.platform_content_cards cards
      join public.platform_provider_accounts acct on acct.id = cards.platform_provider_account_id
      where acct.provider_numeric_id = 2000029 and cards.card_type = 'service'
        and cards.status = 'published') <> 4 then
    raise exception 'Rehab four-service platform release integrity check failed';
  end if;
end;
$$;

-- Publish the PLATFORM presence only; keep app and marketplace independent.
update public.provider_public_profiles
set publication_status = 'published',
    landing_page_status = 'published',
    landing_page_published_at = coalesce(landing_page_published_at, now()),
    published_at = coalesce(published_at, now()),
    updated_at = now()
where public_provider_code = 'BR-2000029' and slug = 'alrehab-home-clean'
  and verification_status = 'verified';

commit;
