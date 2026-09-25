-- ==============================================================================
-- AURA FRAGRANCE OS — PRODUCTION SEED DATA
-- ==============================================================================

insert into public.fragrance_formulas (code, name, tagline, story, olfactory_character, intensity, price, concentration, image_url) values
('FR-01', 'Santalum Vetiver', 'An earthly anchor under shifting winds.', 'Dry, petrichor atmosphere of a cedar grove after seasonal rains. Grounding Indian sandalwood marries Haitian vetiver.', 'Mineral, Dry Woody, Resinous', 4, 240.00, 'Extrait de Parfum (28%)', 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200'),
('FR-02', 'Lapis Lazuli', 'A deep cobalt blue, dust-born sea draft.', 'Synesthetic cold blues, ozone rain, and wet granite masonry anchored by sacred frankincense resin.', 'Ozonic, Cold Metallic, Mineral', 3, 220.00, 'Eau de Parfum (20%)', 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1200'),
('FR-03', 'Black Amber & Papyrus', 'Ancient scrolls bathed in resinous warmth.', 'Smoky Egyptian papyrus bound in aged labdanum and raw bourbon vanilla crystals.', 'Resinous, Warm Amber, Smoky', 5, 260.00, 'Extrait de Parfum (32%)', 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=1200'),
('FR-04', 'Neroli Blanche', 'Solar white blossoms illuminated by dawn light.', 'Calabrian bergamot, bitter orange petitgrain, and crystal musk offering radiant floral clarity.', 'Citrus Solar, Fresh Floral', 2, 195.00, 'Cologne Forte (15%)', 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=1200');

insert into public.maceration_batches (batch_code, name, olfactory_family, concentration, aging_days, status, volume_bottles) values
('BT-882', 'Santalum Vetiver', 'Mineral Woody', 'Extrait de Parfum (28%)', 42, 'filtration', 120),
('BT-883', 'Lapis Lazuli (Ozone Accord)', 'Ozonic Metallic', 'Eau de Parfum (20%)', 14, 'maceration', 80),
('BT-880', 'Black Amber & Papyrus', 'Resinous Oriental', 'Extrait de Parfum (32%)', 60, 'ready', 150),
('BT-884', 'Neroli Blanche', 'Citrus Solar', 'Cologne Forte (15%)', 21, 'bottling', 200);
