-- Seed data for OpenExec
-- Note: Profiles need to be linked to auth.users, so we only seed tenants and non-auth tables.

-- 1. Seed Tenant
INSERT INTO tenants (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Acme Global', 'acme-global')
ON CONFLICT DO NOTHING;

-- 2. Seed Insights
INSERT INTO insights (tenant_id, entity_id, insight_type, confidence, impact_score, shap_explanation, recommended_action)
VALUES 
('00000000-0000-0000-0000-000000000001', 'QUOTE-2026-XF', 'root_cause', 0.85, 0.92, '{"Legal_delay": 0.32, "Finance_queue": 0.15}', 'Escalate to Legal VP for immediate review.'),
('00000000-0000-0000-0000-000000000001', 'QUOTE-2026-XF', 'behavioral', 0.78, 0.65, '{"Step_skipped": "Technical Validation"}', 'Enforce Technical Validation step for EMEA region.'),
('00000000-0000-0000-0000-000000000001', NULL, 'systemic', 0.95, 0.88, '{"Avg_delay": "4.2 days"}', 'Increase analyst headcount in APAC region to resolve systemic approval bottlenecks.');

-- 3. Seed Workflow Graph
INSERT INTO workflow_graphs (tenant_id, entity_type, from_state, to_state, transition_count, probability)
VALUES 
('00000000-0000-0000-0000-000000000001', 'Quote', 'Draft', 'Technical Qual', 1200, 0.95),
('00000000-0000-0000-0000-000000000001', 'Quote', 'Technical Qual', 'Legal Review', 1100, 0.92),
('00000000-0000-0000-0000-000000000001', 'Quote', 'Legal Review', 'Approved', 800, 0.72);