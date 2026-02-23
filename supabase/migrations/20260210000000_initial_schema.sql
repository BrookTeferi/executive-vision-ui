-- OpenExec Initial Schema Migration
-- Date: February 10, 2026

-- 1. Create enum for Insight Types
DO $$ BEGIN
    CREATE TYPE insight_type AS ENUM (
        'root_cause',
        'behavioral',
        'temporal',
        'systemic',
        'predictive'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Tenants Table
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Profiles Table (Link users to tenants)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,
    full_name TEXT,
    role TEXT CHECK (role IN ('admin', 'analyst', 'viewer')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Raw Events Table
CREATE TABLE IF NOT EXISTS raw_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    actor_role TEXT,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_raw_events_tenant_entity ON raw_events(tenant_id, entity_id);
CREATE INDEX IF NOT EXISTS idx_raw_events_timestamp ON raw_events(timestamp DESC);

-- 5. Workflow Graphs Table
CREATE TABLE IF NOT EXISTS workflow_graphs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL,
    from_state TEXT NOT NULL,
    to_state TEXT NOT NULL,
    transition_count BIGINT DEFAULT 0,
    probability DOUBLE PRECISION DEFAULT 0.0,
    UNIQUE(tenant_id, entity_type, from_state, to_state)
);

CREATE INDEX IF NOT EXISTS idx_workflow_graphs_tenant ON workflow_graphs(tenant_id);

-- 6. Features Table
CREATE TABLE IF NOT EXISTS features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_id TEXT NOT NULL,
    transition_score DOUBLE PRECISION,
    duration_zscore DOUBLE PRECISION,
    sequence_deviation DOUBLE PRECISION,
    metadata JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(tenant_id, entity_id)
);

-- 7. Insights Table
CREATE TABLE IF NOT EXISTS insights (
    insight_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    entity_id TEXT, -- NULL for systemic insights
    insight_type insight_type NOT NULL,
    confidence DOUBLE PRECISION,
    impact_score DOUBLE PRECISION,
    shap_explanation JSONB DEFAULT '{}'::jsonb,
    recommended_action TEXT,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_insights_tenant_type ON insights(tenant_id, insight_type);
CREATE INDEX IF NOT EXISTS idx_insights_entity ON insights(entity_id) WHERE entity_id IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE raw_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_graphs ENABLE ROW LEVEL SECURITY;
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- Helper Function to get tenant_id of current user
CREATE OR REPLACE FUNCTION get_user_tenant()
RETURNS UUID AS $$
    SELECT tenant_id FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE;

-- RLS Policies

-- Tenants: Users can see their own tenant
CREATE POLICY "Users can view their own tenant" ON tenants
    FOR SELECT USING (id = get_user_tenant());

-- Profiles: Users can see their own profile
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (id = auth.uid());

-- Raw Events
CREATE POLICY "Users can view events for their tenant" ON raw_events
    FOR SELECT USING (tenant_id = get_user_tenant());

-- Workflow Graphs
CREATE POLICY "Users can view graphs for their tenant" ON workflow_graphs
    FOR SELECT USING (tenant_id = get_user_tenant());

-- Features
CREATE POLICY "Users can view features for their tenant" ON features
    FOR SELECT USING (tenant_id = get_user_tenant());

-- Insights
CREATE POLICY "Users can view insights for their tenant" ON insights
    FOR SELECT USING (tenant_id = get_user_tenant());